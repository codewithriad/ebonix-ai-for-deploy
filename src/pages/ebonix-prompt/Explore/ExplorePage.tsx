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
import { Clock, Heart, Share2, Sparkles, Star, TrendingUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AppSidebar } from "../AppSidebar";
import { ChatHeader } from "../ChatHeader";

const creations = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  title: `Amazing Creation ${i + 1}`,
  creator: `Creator ${i + 1}`,
  type: i % 3 === 0 ? "Image" : i % 3 === 1 ? "Video" : "Chat",
  likes: Math.floor(Math.random() * 1000),
  isLiked: false,
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
  const [likedItems, setLikedItems] = useState<Set<number>>(new Set());
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

  const toggleLike = (id: number) => {
    setLikedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Image":
        return <Star className="w-4 h-4" />;
      case "Video":
        return <TrendingUp className="w-4 h-4" />;
      case "Chat":
        return <Sparkles className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  const getTypeGradient = (type: string) => {
    switch (type) {
      case "Image":
        return "from-lime-400/30 via-lime-300/20 to-lime-200/10 dark:from-primary/25 dark:via-primary/15 dark:to-transparent";
      case "Video":
        return "from-cyan-400/30 via-cyan-300/20 to-cyan-200/10 dark:from-accent/25 dark:via-accent/15 dark:to-transparent";
      case "Chat":
        return "from-lime-400/25 via-cyan-300/20 to-cyan-200/10 dark:from-primary/20 dark:via-accent/15 dark:to-transparent";
      default:
        return "from-lime-400/30 to-lime-200/10 dark:from-primary/25 dark:to-transparent";
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
        <div className="flex flex-col flex-1 bg-background">
          <div className="block md:hidden">
            <ChatHeader />
          </div>

          <div className="flex-1 bg-background text-foreground p-4 sm:p-6 lg:p-8 w-full min-h-screen overflow-y-auto">
            <div className="max-w-7xl mx-auto space-y-8">
              {/* Header Section */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-lime-400/30 to-cyan-400/30 dark:from-primary/20 dark:to-accent/20 flex items-center justify-center border-2 border-lime-400/40 dark:border-primary/30 shadow-lg shadow-lime-400/20 dark:shadow-primary/20">
                      <Sparkles className="w-6 h-6 text-lime-600 dark:text-primary" />
                    </div>
                    <div>
                      <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-lime-600 to-cyan-600 dark:from-primary dark:to-accent bg-clip-text text-transparent">
                        Explore
                      </h1>
                      <p className="text-muted-foreground text-sm md:text-base">
                        Discover amazing AI creations from the community
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full sm:w-40 bg-white dark:bg-card border-2 border-gray-200 dark:border-border hover:border-lime-400 dark:hover:border-primary/50 focus:ring-2 focus:ring-lime-400/30 dark:focus:ring-primary/20 transition-all shadow-sm">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-popover border-2 border-gray-200 dark:border-border">
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="image">Images</SelectItem>
                      <SelectItem value="video">Videos</SelectItem>
                      <SelectItem value="chat">Chats</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="trending">
                    <SelectTrigger className="w-full sm:w-40 bg-white dark:bg-card border-2 border-gray-200 dark:border-border hover:border-lime-400 dark:hover:border-primary/50 focus:ring-2 focus:ring-lime-400/30 dark:focus:ring-primary/20 transition-all shadow-sm">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-popover border-2 border-gray-200 dark:border-border">
                      <SelectItem value="trending">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4" />
                          Trending
                        </div>
                      </SelectItem>
                      <SelectItem value="recent">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          Most Recent
                        </div>
                      </SelectItem>
                      <SelectItem value="popular">
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4" />
                          Most Popular
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {creations.map((creation) => {
                  const isLiked = likedItems.has(creation.id);
                  return (
                    <Card
                      key={creation.id}
                      className="group bg-white dark:bg-card border-2 border-gray-200 dark:border-border hover:border-lime-400 dark:hover:border-primary/50 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-lime-400/20 dark:hover:shadow-primary/20 hover:-translate-y-1"
                    >
                      {/* Card Image/Preview */}
                      <div
                        className={`aspect-video bg-gradient-to-br ${getTypeGradient(
                          creation.type
                        )} flex items-center justify-center relative overflow-hidden`}
                      >
                        {/* Animated gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-lime-400/10 via-transparent to-cyan-400/10 dark:from-primary/5 dark:via-transparent dark:to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Center icon */}
                        <div className="relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-br from-lime-400/40 to-cyan-400/40 dark:from-primary/30 dark:to-accent/30 flex items-center justify-center border-2 border-lime-400/50 dark:border-primary/40 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                          <Sparkles className="w-10 h-10 text-lime-600 dark:text-primary group-hover:text-cyan-600 dark:group-hover:text-accent transition-colors duration-300" />
                        </div>

                        {/* Type badge */}
                        <div className="absolute top-3 right-3 z-20">
                          <div className="px-3 py-1.5 rounded-full bg-white/90 dark:bg-background/80 backdrop-blur-md text-xs font-semibold text-gray-700 dark:text-foreground border-2 border-lime-400/50 dark:border-primary/40 flex items-center gap-1.5 shadow-lg">
                            {getTypeIcon(creation.type)}
                            {creation.type}
                          </div>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute top-0 left-0 w-32 h-32 bg-lime-400/20 dark:bg-primary/15 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-cyan-400/20 dark:bg-accent/15 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                      </div>

                      {/* Card Content */}
                      <CardContent className="p-5 space-y-4 bg-gradient-to-b from-white to-gray-50/50 dark:from-card dark:to-card/50">
                        <div className="space-y-1">
                          <h3 className="font-bold text-lg text-gray-900 dark:text-foreground group-hover:text-lime-600 dark:group-hover:text-primary transition-colors line-clamp-1">
                            {creation.title}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-muted-foreground">
                            by{" "}
                            <span className="text-gray-700 dark:text-foreground font-semibold">
                              {creation.creator}
                            </span>
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t-2 border-gray-200 dark:border-border">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => toggleLike(creation.id)}
                              className={`flex items-center gap-1.5 transition-all duration-200 ${
                                isLiked
                                  ? "text-lime-600 dark:text-primary"
                                  : "text-gray-400 dark:text-muted-foreground hover:text-lime-600 dark:hover:text-primary"
                              }`}
                            >
                              <Heart
                                className={`w-5 h-5 transition-all duration-200 ${
                                  isLiked
                                    ? "fill-lime-600 dark:fill-primary"
                                    : ""
                                }`}
                              />
                              <span className="text-sm font-bold">
                                {creation.likes + (isLiked ? 1 : 0)}
                              </span>
                            </button>
                            <button className="text-gray-400 dark:text-muted-foreground hover:text-cyan-600 dark:hover:text-accent transition-colors duration-200">
                              <Share2 className="w-5 h-5" />
                            </button>
                          </div>
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-lime-400/20 to-cyan-400/20 dark:from-primary/10 dark:to-accent/10 border-2 border-lime-400/50 dark:border-primary/40 text-lime-700 dark:text-primary hover:bg-gradient-to-r hover:from-lime-400 hover:to-cyan-400 dark:hover:bg-primary hover:text-white dark:hover:text-primary-foreground hover:border-lime-500 dark:hover:border-primary hover:shadow-lg hover:shadow-lime-400/30 dark:hover:shadow-primary/30 transition-all duration-300 font-bold"
                          >
                            Remix
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Load More Section */}
              <div className="flex justify-center pt-8">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-lime-400/50 dark:border-primary/40 text-lime-700 dark:text-primary hover:bg-lime-400/20 dark:hover:bg-primary/10 hover:border-lime-500 dark:hover:border-primary hover:shadow-lg hover:shadow-lime-400/20 dark:hover:shadow-primary/20 transition-all duration-300 font-bold"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Load More Creations
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
