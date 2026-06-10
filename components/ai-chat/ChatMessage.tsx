import Markdown from "react-markdown";
import { cn } from "@/lib/utils";
import type { ChatMessage as ChatMessageType } from "@/hooks/useChat";

interface ChatMessageProps {
  message: ChatMessageType;
  isStreaming?: boolean;
}

export function ChatMessage({ message, isStreaming }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed",
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-foreground [&_strong]:font-semibold [&_em]:italic [&_p]:mb-2 [&_p:last-child]:mb-0"
        )}
      >
        {isUser ? (
          message.content
        ) : (
          <>
            <Markdown>{message.content}</Markdown>
            {isStreaming && message.content && (
              <span className="inline-block w-[2px] h-[1em] bg-foreground/70 animate-pulse align-text-bottom ml-0.5" />
            )}
          </>
        )}
        {isStreaming && !message.content && (
          <span className="inline-flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-pulse" />
            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-pulse [animation-delay:150ms]" />
            <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60 animate-pulse [animation-delay:300ms]" />
          </span>
        )}
      </div>
    </div>
  );
}
