import { User, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp?: Date;
}

export function ChatMessage({ message, isUser, timestamp }: ChatMessageProps) {
  return (
    <div className={cn(
      "flex gap-3 p-4 rounded-lg mb-4 transition-all duration-200",
      isUser 
        ? "bg-chat-user ml-8 shadow-sm" 
        : "bg-chat-assistant mr-8 shadow-sm"
    )}>
      <div className={cn(
        "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md",
        isUser 
          ? "bg-primary text-primary-foreground" 
          : "bg-muted"
      )}>
        {isUser ? (
          <User className="h-4 w-4" />
        ) : (
          <Bot className="h-4 w-4" />
        )}
      </div>
      <div className="flex-1 space-y-2">
        <div className="text-sm font-medium">
          {isUser ? "You" : "EbonixAI"}
        </div>
        <div className="text-sm leading-relaxed">
          {message}
        </div>
        {timestamp && (
          <div className="text-xs text-muted-foreground">
            {timestamp.toLocaleTimeString()}
          </div>
        )}
      </div>
    </div>
  );
}