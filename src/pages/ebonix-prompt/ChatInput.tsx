import { cn } from "@/lib/utils";
import { Mic, Paperclip, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t bg-background p-4">
      <div className="mx-auto max-w-4xl">
        <div className="relative flex items-end gap-2">
          <div className="flex-1">
            <div className="relative">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything"
                className={cn(
                  "min-h-[44px] max-h-32 resize-none rounded-xl border-input bg-background px-4 py-3 pr-12 text-foreground",
                  "focus:ring-2 focus:ring-primary focus:border-transparent",
                  "placeholder:text-muted-foreground"
                )}
                disabled={disabled}
              />
              <div className="absolute right-2 bottom-2 flex gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-foreground"
                >
                  <Paperclip className="h-4 w-4 text-foreground" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                >
                  <Mic className="h-4 w-4 text-foreground" />
                </Button>
              </div>
            </div>
          </div>
          <Button
            onClick={handleSend}
            disabled={!message.trim() || disabled}
            className={cn(
              "h-12 w-12 rounded-xl",
              "bg-primary hover:bg-primary/90",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "transition-all duration-200"
            )}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
