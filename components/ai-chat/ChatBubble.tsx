"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChatWindow } from "./ChatWindow";
import { useChat } from "@/hooks/useChat";

const PEEK_KEY = "portfolio-chat-peeked";

export function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPeek, setShowPeek] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const chat = useChat();
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem(PEEK_KEY)) return;

    const timer = setTimeout(() => {
      setShowPeek(true);
      sessionStorage.setItem(PEEK_KEY, "1");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showPeek) return;

    const dismiss = setTimeout(() => setShowPeek(false), 10000);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowPeek(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(dismiss);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showPeek]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "?" && !isOpen) {
        const tag = (e.target as HTMLElement).tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || (e.target as HTMLElement).isContentEditable) return;
        e.preventDefault();
        setShowPeek(false);
        setIsOpen(true);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleOpen = useCallback(() => {
    setShowPeek(false);
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  return (
    <>
      <AnimatePresence>
        {isOpen && <ChatWindow onClose={handleClose} chat={chat} />}
      </AnimatePresence>

      <AnimatePresence>
        {showPeek && !isOpen && (
          <motion.button
            onClick={handleOpen}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 right-4 z-40 max-w-[260px] cursor-pointer rounded-lg border border-border bg-background px-4 py-3 text-left sm:right-6 sm:bottom-24"
          >
            <p className="text-sm text-foreground">
              Got questions about my work or experience? Ask away, I&apos;m happy to chat.
            </p>
            <span className="mt-1 block text-[11px] text-muted-foreground">
              AI-powered replies based on my real experience
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <motion.div
        className="fixed bottom-4 right-4 z-40 flex flex-col items-center gap-1.5 sm:bottom-6 sm:right-6"
        initial={shouldReduceMotion ? false : { scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.3, delay: 1 }}
      >
        {!isOpen && (
          <kbd className="hidden sm:block rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
            ?
          </kbd>
        )}
        <Button
          ref={triggerRef}
          onClick={() => {
            setShowPeek(false);
            if (isOpen) {
              handleClose();
            } else {
              setIsOpen(true);
            }
          }}
          size="lg"
          className="h-12 w-12 rounded-full p-0"
          aria-label={isOpen ? "Close chat" : "Open chat"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </>
            )}
          </svg>
        </Button>
      </motion.div>
    </>
  );
}
