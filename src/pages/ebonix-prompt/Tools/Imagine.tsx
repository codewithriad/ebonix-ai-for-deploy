import { SidebarProvider } from "@/components/ui/sidebar";
import { Cpu, Image, MessageSquare, Search, X, Zap } from "lucide-react";
import { useState } from "react";
import { AppSidebar } from "../AppSidebar";

interface Model {
  id: number;
  name: string;
  provider: string;
  description: string;
  icon: string;
  capabilities: string[];
}

const models: Model[] = [
  {
    id: 1,
    name: "GPT 5",
    provider: "OpenAI",
    description: "The best model for coding and agentic tasks across domains",
    icon: "🤖",
    capabilities: ["image", "code", "web"],
  },
  {
    id: 2,
    name: "GPT 5 mini",
    provider: "OpenAI",
    description:
      "A faster, more cost-efficient version of GPT-5 for well-defined tasks",
    icon: "🤖",
    capabilities: ["message", "code", "web"],
  },
  {
    id: 3,
    name: "GPT 5 nano",
    provider: "OpenAI",
    description: "Fastest, most cost-efficient version of GPT-5",
    icon: "🤖",
    capabilities: ["message", "code", "web"],
  },
  {
    id: 4,
    name: "O4 mini",
    provider: "OpenAI",
    description: "Faster, more affordable reasoning model",
    icon: "🤖",
    capabilities: ["image", "code", "web"],
  },
  {
    id: 5,
    name: "O3 mini",
    provider: "OpenAI",
    description: "A small model alternative to o3",
    icon: "🤖",
    capabilities: ["code", "web"],
  },
  {
    id: 6,
    name: "GPT 4o",
    provider: "OpenAI",
    description: "Fast, intelligent, flexible GPT model",
    icon: "🤖",
    capabilities: ["message", "code"],
  },
  {
    id: 7,
    name: "GPT 4o mini",
    provider: "OpenAI",
    description: "Fast, affordable small model for focused tasks",
    icon: "🤖",
    capabilities: ["message", "code"],
  },
  {
    id: 8,
    name: "GPT 4.1",
    provider: "OpenAI",
    description: "Flagship GPT model for complex tasks",
    icon: "🤖",
    capabilities: ["message", "code"],
  },
  {
    id: 9,
    name: "GPT 4.1 mini",
    provider: "OpenAI",
    description: "Balanced for intelligence, speed, and cost",
    icon: "🤖",
    capabilities: ["message", "code"],
  },
  {
    id: 10,
    name: "GPT 4.1 nano",
    provider: "OpenAI",
    description: "Fastest, most cost-effective GPT-4.1 model",
    icon: "🤖",
    capabilities: ["message", "code"],
  },
  {
    id: 11,
    name: "GPT 3.5 turbo",
    provider: "OpenAI",
    description: "Legacy GPT model for cheaper chat and non-chat tasks",
    icon: "🤖",
    capabilities: ["refresh"],
  },
  {
    id: 12,
    name: "GPT Image 1",
    provider: "OpenAI",
    description: "State-of-the-art image generation model",
    icon: "🤖",
    capabilities: ["message"],
  },
  {
    id: 13,
    name: "DALL-E 3",
    provider: "OpenAI",
    description:
      "Previous generation image generation model with improved caption fidelity and image quality",
    icon: "🤖",
    capabilities: ["message"],
  },
  {
    id: 14,
    name: "TTS 1",
    provider: "OpenAI",
    description: "Text-to-speech model optimized for speed",
    icon: "🤖",
    capabilities: [],
  },
  {
    id: 15,
    name: "Command A Reasoning",
    provider: "Cohere",
    description:
      "Cohere's first reasoning model, able to 'think' before generating an output in a way that allows it to perform well in certain...",
    icon: "🧠",
    capabilities: [],
  },
];

const capabilityIcons: { [key: string]: JSX.Element } = {
  image: <Image className="w-4 h-4" />,
  code: <Zap className="w-4 h-4" />,
  web: <Cpu className="w-4 h-4" />,
  message: <MessageSquare className="w-4 h-4" />,
  refresh: <div className="w-4 h-4">🔄</div>,
};

export default function Imagine() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter models based on search
  const filteredModels = models.filter((model) => {
    const matchesSearch =
      model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.provider.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <SidebarProvider>
      <div className="flex flex-col md:flex-row w-full min-h-fit overflow-x-hidden">
        {/* Sidebar */}
        <div className="w-full md:w-auto flex-shrink-0 bg-background">
          <AppSidebar
            onNewChat={() => {}}
            chatHistory={[]}
            onSelectChat={() => {}}
            onDeleteChat={() => {}}
          />
        </div>

        {/* Main content */}
        <main className="flex-1 bg-background text-foreground p-4 sm:p-6 md:p-8 w-full min-h-screen overflow-y-auto">
          {/* Header */}
          <div className="max-w-7xl mx-auto mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-6">Models</h1>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-card border border-gray-700 rounded-xl pl-12 pr-12 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Models Grid */}
          <div className="max-w-7xl mx-auto">
            {filteredModels.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredModels.map((model) => (
                  <div
                    key={model.id}
                    className="bg-card border border-border rounded-xl p-6 hover:bg-accent/10 cursor-pointer transition-all group"
                  >
                    {/* Model Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                        {model.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold mb-1 group-hover:text-blue-400 transition-colors">
                          {model.name}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {model.provider}
                        </p>
                      </div>
                    </div>

                    {/* Model Description */}
                    <p className="text-sm text-gray-400 mb-4 leading-relaxed line-clamp-3">
                      {model.description}
                    </p>

                    {/* Capabilities */}
                    {model.capabilities.length > 0 && (
                      <div className="flex items-center gap-2">
                        {model.capabilities.map((capability, index) => (
                          <div
                            key={index}
                            className="text-gray-400 hover:text-gray-300 transition-colors"
                          >
                            {capabilityIcons[capability]}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg mb-2">
                  No models found
                </div>
                <p className="text-gray-600 text-sm">
                  Try adjusting your search query
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
