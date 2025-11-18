import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/pages/ebonix-prompt/AppSidebar";
import {
  ChevronRight,
  Clock,
  Image,
  MessageSquare,
  Sparkles,
  TrendingUp,
  Video,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

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

const EbonixAiHome = () => {
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

  const quickActions = [
    {
      icon: MessageSquare,
      title: "New Chat",
      description: "Start a conversation with AI",
      link: "/app/chat",
      gradient: "from-blue-500/20 via-blue-400/20 to-purple-500/20",
      iconColor: "text-blue-500 dark:text-blue-400",
      hoverShadow:
        "hover:shadow-lg hover:shadow-blue-500/10 dark:hover:shadow-blue-500/20",
    },
    {
      icon: Image,
      title: "New Image",
      description: "Generate stunning visuals",
      link: "/app/imagine",
      gradient: "from-purple-500/20 via-pink-400/20 to-pink-500/20",
      iconColor: "text-purple-500 dark:text-purple-400",
      hoverShadow:
        "hover:shadow-lg hover:shadow-purple-500/10 dark:hover:shadow-purple-500/20",
    },
    {
      icon: Video,
      title: "New Video",
      description: "Create dynamic content",
      link: "/app/video",
      gradient: "from-pink-500/20 via-orange-400/20 to-orange-500/20",
      iconColor: "text-pink-500 dark:text-pink-400",
      hoverShadow:
        "hover:shadow-lg hover:shadow-pink-500/10 dark:hover:shadow-pink-500/20",
    },
  ];

  const recentCreations = [
    {
      id: 1,
      type: "Chat",
      title: "Poetry about the cosmos",
      time: "2h ago",
      icon: MessageSquare,
      color: "text-blue-500 dark:text-blue-400",
    },
    {
      id: 2,
      type: "Image",
      title: "Renaissance portrait",
      time: "5h ago",
      icon: Image,
      color: "text-purple-500 dark:text-purple-400",
    },
    {
      id: 3,
      type: "Video",
      title: "Product showcase",
      time: "1d ago",
      icon: Video,
      color: "text-pink-500 dark:text-pink-400",
    },
  ];

  const trendingItems = [
    {
      id: 1,
      title: "AI Art Revolution",
      creator: "Digital Artist",
      likes: 1200,
    },
    {
      id: 2,
      title: "Future of Storytelling",
      creator: "Content Creator",
      likes: 890,
    },
    {
      id: 3,
      title: "Code Assistant Demo",
      creator: "Tech Innovator",
      likes: 2100,
    },
  ];

  return (
    <SidebarProvider>
      <div className="flex flex-col md:flex-row w-full min-h-screen overflow-x-hidden bg-background">
        {/* Sidebar */}
        <div className="w-full md:w-auto flex-shrink-0">
          <AppSidebar
            onNewChat={handleNewChat}
            chatHistory={chatHistory}
            onSelectChat={handleSelectChat}
            onDeleteChat={handleDeleteChat}
            currentChatId={currentChatId}
          />
        </div>

        {/* Main content */}
        <main className="flex-1 bg-gray-50 dark:bg-background text-foreground w-full min-h-screen overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
            {/* Hero Section */}
            <div className="text-center mb-10 sm:mb-12 lg:mb-16 space-y-4 sm:space-y-6 animate-in fade-in duration-700">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl mb-3 sm:mb-4 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 dark:from-blue-500/30 dark:via-purple-500/30 dark:to-pink-500/30 backdrop-blur-sm">
                <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 dark:text-blue-400 animate-pulse" />
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 dark:text-white">
                Welcome to{" "}
                <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
                  Ebonix AI
                </span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto text-gray-600 dark:text-gray-400 px-4">
                Your creative AI platform for diverse content creation.
                Generate, create, and innovate with the power of artificial
                intelligence.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="mb-10 sm:mb-12 lg:mb-16">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                {quickActions.map((action, index) => (
                  <NavLink
                    to={action.link}
                    key={action.title}
                    className={`group cursor-pointer rounded-xl sm:rounded-2xl p-5 sm:p-6 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] bg-white dark:bg-card hover:bg-gray-100 dark:hover:bg-accent/5 border border-gray-200 dark:border-border shadow-sm hover:shadow-md ${action.hoverShadow}`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div
                      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                    >
                      <action.icon
                        className={`w-7 h-7 sm:w-8 sm:h-8 ${action.iconColor}`}
                      />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-muted-foreground">
                      {action.description}
                    </p>
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Recent Creations */}
            <div className="mb-10 sm:mb-12 lg:mb-16">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  Recent Creations
                </h2>
                <button className="flex items-center gap-1 text-xs sm:text-sm font-medium transition-all text-primary hover:text-primary/80 hover:gap-2 self-start sm:self-auto">
                  View All <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
              <div className="space-y-3">
                {recentCreations.map((creation, index) => (
                  <div
                    key={creation.id}
                    className="rounded-xl p-3 sm:p-4 flex items-center justify-between cursor-pointer transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] bg-white dark:bg-card hover:bg-gray-100 dark:hover:bg-accent/5 border border-gray-200 dark:border-border hover:border-primary/30 shadow-sm hover:shadow-md"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center bg-gray-100 dark:bg-accent/10 flex-shrink-0">
                        <creation.icon
                          className={`w-5 h-5 sm:w-6 sm:h-6 ${creation.color}`}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm sm:text-base text-gray-900 dark:text-white truncate">
                          {creation.title}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                          {creation.type}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-500 ml-2 flex-shrink-0">
                      {creation.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending from Explore */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
                  <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  Trending from Explore
                </h2>
                <button className="flex items-center gap-1 text-xs sm:text-sm font-medium transition-all text-primary hover:text-primary/80 hover:gap-2 self-start sm:self-auto">
                  View All <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                {trendingItems.map((item, index) => (
                  <div
                    key={item.id}
                    className="group cursor-pointer rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] bg-white dark:bg-card border border-gray-200 dark:border-border hover:border-primary/30 shadow-sm hover:shadow-lg"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-blue-500/10 dark:via-purple-500/10 dark:to-pink-500/10 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent dark:via-white/10 group-hover:scale-110 transition-transform duration-500"></div>
                      <Sparkles className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 transition-all duration-300 text-blue-400 dark:text-blue-400/70 group-hover:text-blue-500 dark:group-hover:text-blue-400 group-hover:scale-110 group-hover:rotate-12 relative z-10" />
                    </div>
                    <div className="p-4 sm:p-5">
                      <p className="font-semibold mb-1 text-sm sm:text-base text-foreground group-hover:text-primary transition-colors truncate">
                        {item.title}
                      </p>
                      <p className="text-xs sm:text-sm mb-2 sm:mb-3 text-muted-foreground truncate">
                        by {item.creator}
                      </p>
                      <div className="flex items-center gap-1 text-xs sm:text-sm">
                        <span className="text-muted-foreground">
                          ❤️ {item.likes.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default EbonixAiHome;
