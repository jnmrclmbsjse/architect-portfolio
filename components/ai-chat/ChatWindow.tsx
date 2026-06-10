"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChatDisclaimer } from "./ChatDisclaimer";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import type { useChat } from "@/hooks/useChat";

interface ChatWindowProps {
  onClose: () => void;
  chat: ReturnType<typeof useChat>;
}

export function ChatWindow({ onClose, chat }: ChatWindowProps) {
  const { messages, isLoading, error, remaining, isRateLimited, sendMessage, resetChat } = chat;
  const scrollRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-20 right-4 z-40 flex flex-col w-[calc(100vw-2rem)] max-w-sm h-[min(500px,calc(100vh-8rem))] rounded-lg border border-border bg-background shadow-lg sm:right-6 sm:bottom-24"
    >
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <h2 className="font-heading text-sm font-semibold">Ask Junmar</h2>
          {remaining < 20 && !isRateLimited && (
            <span className="text-[10px] text-muted-foreground">
              {remaining} left
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {messages.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetChat}
              className="h-7 px-2 text-xs text-muted-foreground"
            >
              Clear
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-7 w-7 p-0"
            aria-label="Close chat"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </Button>
        </div>
      </div>

      <ChatDisclaimer />

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-8">
            Ask me about my experience, projects, or technical approach.
          </p>
        )}
        {messages.map((msg, i) => (
          <ChatMessage
            key={i}
            message={msg}
            isStreaming={isLoading && i === messages.length - 1 && msg.role === "assistant"}
          />
        ))}
        {error && (
          <p className="text-xs text-destructive text-center">{error}</p>
        )}
      </div>

      <ChatInput
        onSend={sendMessage}
        disabled={isLoading}
        isRateLimited={isRateLimited}
      />
    </motion.div>
  );
}
