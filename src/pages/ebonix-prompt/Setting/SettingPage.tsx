import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useEffect, useRef, useState } from "react";
import { AppSidebar } from "../AppSidebar";
import { ChatHeader } from "../ChatHeader";

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

export default function SettingsPage() {
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
          <ChatHeader />

          <div
            className="flex-1
                    bg-background 
                    text-foreground 
                    p-4 sm:p-6 md:p-8 
                    w-full 
                    min-h-screen 
                    overflow-y-auto"
          >
            <div className="p-8 max-w-4xl mx-auto space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Settings</h1>
                <p className="text-muted-foreground">
                  Manage your account and preferences
                </p>
              </div>

              <Card className="bg-card border-border">
                <CardHeader>
                  <h2 className="text-foreground text-2xl font-bold">
                    Profile
                  </h2>
                  <CardDescription className="text-muted-foreground">
                    Update your personal information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground">
                      Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      className="bg-background border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="bg-background border-border"
                    />
                  </div>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Save Changes
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <h2 className="text-foreground text-2xl font-bold">
                    Voice Preferences
                  </h2>
                  <CardDescription className="text-muted-foreground">
                    Configure default voice settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="voice" className="text-foreground">
                      Default Voice
                    </Label>
                    <Select defaultValue="default">
                      <SelectTrigger
                        id="voice"
                        className="bg-background border-border"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border-border">
                        <SelectItem value="default">Default Voice</SelectItem>
                        <SelectItem value="male">Male Voice</SelectItem>
                        <SelectItem value="female">Female Voice</SelectItem>
                        <SelectItem value="sage">Renaissance Sage</SelectItem>
                        <SelectItem value="muse">Digital Muse</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Save Preferences
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <h2 className="text-foreground text-2xl font-bold">
                    API Access
                  </h2>
                  <CardDescription className="text-muted-foreground">
                    Manage your API keys and integrations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="api" className="text-foreground">
                      API Key
                    </Label>
                    <Input
                      id="api"
                      type="password"
                      value="••••••••••••••••"
                      readOnly
                      className="bg-background border-border"
                    />
                  </div>
                  <Button
                    variant="outline"
                    className="border-border text-foreground hover:bg-muted"
                  >
                    Generate New Key
                  </Button>
                </CardContent>
              </Card>
            </div>{" "}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
