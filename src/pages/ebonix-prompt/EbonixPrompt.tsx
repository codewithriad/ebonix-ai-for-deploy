import { Bot } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SidebarProvider } from "../../components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { ChatHeader } from "./ChatHeader";
import { ChatInput } from "./ChatInput";
import { ChatMessage } from "./ChatMessage";
import { PromptSuggestions } from "./PromptSuggestions";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatHistory {
  id: string;
  title: string;
  timestamp: Date;
  messages: Message[];
}

const EbonixPrompt = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | undefined>();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const saveChatToHistory = (messages: Message[]) => {
    if (messages.length === 0) return;

    const chatTitle =
      messages[0].content.substring(0, 50) +
      (messages[0].content.length > 50 ? "..." : "");
    const chatId = currentChatId || Date.now().toString();

    setChatHistory((prev) => {
      const existingIndex = prev.findIndex((chat) => chat.id === chatId);
      const newChat: ChatHistory = {
        id: chatId,
        title: chatTitle,
        timestamp: new Date(),
        messages: [...messages],
      };

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = newChat;
        return updated;
      } else {
        return [newChat, ...prev];
      }
    });

    if (!currentChatId) {
      setCurrentChatId(chatId);
    }
  };

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "Thank you for your message! I'm EbonixAI, your intelligent assistant. I'm here to help you with any questions or tasks you might have. How can I assist you today?",
        isUser: false,
        timestamp: new Date(),
      };
      const finalMessages = [...newMessages, aiMessage];
      setMessages(finalMessages);
      saveChatToHistory(finalMessages);
      setIsLoading(false);
    }, 1500);
  };

  const handleNewChat = () => {
    setMessages([]);
    setCurrentChatId(undefined);
  };

  const handleSelectChat = (chatId: string) => {
    const chat = chatHistory.find((c) => c.id === chatId);
    if (chat) {
      setMessages(chat.messages);
      setCurrentChatId(chatId);
    }
  };

  const handleDeleteChat = (chatId: string) => {
    setChatHistory((prev) => prev.filter((chat) => chat.id !== chatId));
    if (currentChatId === chatId) {
      handleNewChat();
    }
  };

  const handleSelectPrompt = (prompt: string) => {
    handleSendMessage(prompt);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar
          onNewChat={handleNewChat}
          chatHistory={chatHistory}
          onSelectChat={handleSelectChat}
          onDeleteChat={handleDeleteChat}
          currentChatId={currentChatId}
        />

        <div className="flex flex-col flex-1 bg-chat-background">
          <ChatHeader />

          <div className="flex-1 overflow-hidden bg-background text-foreground">
            {messages.length === 0 ? (
              // Welcome screen
              <div className="flex flex-col items-center justify-center h-full px-4 py-8">
                <div className="max-w-2xl w-full text-center mb-8">
                  <div className="bg-gradient-glow rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                    <Bot className="h-8 w-8 text-primary" />
                  </div>
                  <h1 className="text-3xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
                    Welcome to EbonixAI
                  </h1>
                  <p className="text-lg text-muted-foreground mb-8">
                    Your intelligent AI assistant is ready to help. Ask me
                    anything or try one of these suggestions:
                  </p>
                  <PromptSuggestions onSelectPrompt={handleSelectPrompt} />
                </div>
              </div>
            ) : (
              // Chat messages
              <div className="flex-1 overflow-y-auto">
                <div className="max-w-4xl mx-auto p-4">
                  {messages.map((message) => (
                    <ChatMessage
                      key={message.id}
                      message={message.content}
                      isUser={message.isUser}
                      timestamp={message.timestamp}
                    />
                  ))}
                  {isLoading && (
                    <div className="flex gap-3 p-4 rounded-lg mb-4 bg-chat-assistant mr-8">
                      <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md bg-muted">
                        <Bot className="h-4 w-4" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="text-sm font-medium">EbonixAI</div>
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-primary rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-primary rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>
            )}
          </div>

          <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default EbonixPrompt;
