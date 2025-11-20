import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Heart, Share2, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AppSidebar } from "../AppSidebar";
import { ChatHeader } from "../ChatHeader";

const creations = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  title: `Amazing Creation ${i + 1}`,
  creator: `Creator ${i + 1}`,
  type: i % 3 === 0 ? "Image" : i % 3 === 1 ? "Video" : "Chat",
  likes: Math.floor(Math.random() * 1000),
}));

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

export default function ExplorePage() {
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
          <div className="block md:hidden">
            <ChatHeader />
          </div>

          <div
            className="flex-1
            bg-background 
            text-foreground 
            p-4 sm:p-6 md:p-8 
            w-full 
            min-h-screen 
            overflow-y-auto"
          >
            <div className="p-8 max-w-7xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">
                    Explore
                  </h1>
                  <p className="text-muted-foreground">
                    Discover amazing creations from the community
                  </p>
                </div>
                <div className="flex gap-3">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40 bg-card border-border">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="image">Images</SelectItem>
                      <SelectItem value="video">Videos</SelectItem>
                      <SelectItem value="chat">Chats</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="trending">
                    <SelectTrigger className="w-40 bg-card border-border">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="trending">Trending</SelectItem>
                      <SelectItem value="recent">Most Recent</SelectItem>
                      <SelectItem value="popular">Most Popular</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {creations.map((creation) => (
                  <Card
                    key={creation.id}
                    className="bg-card border-border hover:border-primary/50 overflow-hidden group cursor-pointer hover:shadow-glow-subtle transition-all"
                  >
                    <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center relative">
                      <Sparkles className="w-12 h-12 text-primary/50 group-hover:text-primary transition-colors" />
                      <div className="absolute top-3 right-3">
                        <span className="px-3 py-1 rounded-full bg-card/80 backdrop-blur-sm text-xs font-medium text-foreground border border-border">
                          {creation.type}
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-4 space-y-3">
                      <div>
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {creation.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          by {creation.creator}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-muted-foreground">
                          <button className="flex items-center gap-1 hover:text-primary transition-colors">
                            <Heart className="w-4 h-4" />
                            <span className="text-sm">{creation.likes}</span>
                          </button>
                          <button className="hover:text-accent transition-colors">
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                        >
                          Remix
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
