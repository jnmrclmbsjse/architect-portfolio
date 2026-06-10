"use client";

import { useState, type KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  isRateLimited?: boolean;
}

export function ChatInput({ onSend, disabled, isRateLimited }: ChatInputProps) {
  const [value, setValue] = useState("");

  function handleSend() {
    if (!value.trim() || disabled) return;
    onSend(value);
    setValue("");
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="border-t border-border p-3">
      {isRateLimited ? (
        <p className="text-xs text-muted-foreground text-center py-2">
          Message limit reached. Try again later.
        </p>
      ) : (
        <div className="flex gap-2">
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about my experience..."
            disabled={disabled}
            rows={1}
            className="flex-1 resize-none rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50"
          />
          <Button
            size="sm"
            onClick={handleSend}
            disabled={disabled || !value.trim()}
            className="shrink-0 self-end"
          >
            Send
          </Button>
        </div>
      )}
    </div>
  );
}
