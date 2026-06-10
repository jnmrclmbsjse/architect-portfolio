"use client";

import { useState, useCallback, useRef, useEffect } from "react";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const STORAGE_KEY = "portfolio-chat-messages";
const MAX_MESSAGES = 40;

function loadMessages(): ChatMessage[] {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed)) return parsed.slice(-MAX_MESSAGES);
  } catch {}
  return [];
}

function saveMessages(messages: ChatMessage[]) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch {}
}

function capMessages(messages: ChatMessage[]): ChatMessage[] {
  if (messages.length <= MAX_MESSAGES) return messages;
  return messages.slice(-MAX_MESSAGES);
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [remaining, setRemaining] = useState(20);
  const abortRef = useRef<AbortController | null>(null);
  const hydrated = useRef(false);

  useEffect(() => {
    if (!hydrated.current) {
      hydrated.current = true;
      const stored = loadMessages();
      if (stored.length > 0) setMessages(stored);
    }
  }, []);

  useEffect(() => {
    if (hydrated.current) {
      saveMessages(messages);
    }
  }, [messages]);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      setError(null);
      const userMessage: ChatMessage = { role: "user", content: trimmed };
      setMessages((prev) => capMessages([...prev, userMessage]));
      setIsLoading(true);

      const history = messages.slice(-18);

      abortRef.current = new AbortController();

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: trimmed, history }),
          signal: abortRef.current.signal,
        });

        const rateLimitHeader = res.headers.get("X-RateLimit-Remaining");
        if (rateLimitHeader !== null) {
          setRemaining(parseInt(rateLimitHeader, 10));
        }

        if (!res.ok) {
          const data = await res.json().catch(() => null);
          throw new Error(
            data?.error ??
              (res.status === 429
                ? "Message limit reached. Try again later."
                : "Something went wrong.")
          );
        }

        const reader = res.body?.getReader();
        if (!reader) throw new Error("No response stream");

        const decoder = new TextDecoder();
        let assistantContent = "";

        setMessages((prev) => capMessages([...prev, { role: "assistant", content: "" }]));

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          assistantContent += decoder.decode(value, { stream: true });
          const snapshot = assistantContent;
          setMessages((prev) => [
            ...prev.slice(0, -1),
            { role: "assistant", content: snapshot },
          ]);
        }
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") return;
        const message =
          err instanceof Error ? err.message : "Something went wrong.";
        setError(message);
        setMessages((prev) => {
          if (prev.at(-1)?.role === "assistant" && prev.at(-1)?.content === "") {
            return prev.slice(0, -1);
          }
          return prev;
        });
      } finally {
        setIsLoading(false);
        abortRef.current = null;
      }
    },
    [messages, isLoading]
  );

  const resetChat = useCallback(() => {
    abortRef.current?.abort();
    setMessages([]);
    setError(null);
    setIsLoading(false);
    try { sessionStorage.removeItem(STORAGE_KEY); } catch {}
  }, []);

  return {
    messages,
    isLoading,
    error,
    remaining,
    isRateLimited: remaining <= 0,
    sendMessage,
    resetChat,
  };
}
