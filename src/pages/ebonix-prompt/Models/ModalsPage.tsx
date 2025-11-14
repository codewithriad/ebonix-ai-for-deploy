import { SidebarProvider } from "@/components/ui/sidebar";
import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { AppSidebar } from "../AppSidebar";

interface Model {
  id: string;
  name: string;
  provider: string;
  description: string;
  features: string[];
  icon: string;
}

interface AIModel {
  id: string;
  name: string;
  provider: string;
  description: string;
  icon: string;
  locked?: boolean;
}

const models: Model[] = [
  {
    id: "gpt5",
    name: "GPT 5",
    provider: "OpenAI",
    description: "The best model for coding and agentic tasks across domains",
    features: ["chat", "code", "web"],
    icon: "🔮",
  },
  {
    id: "gpt5mini",
    name: "GPT 5 mini",
    provider: "OpenAI",
    description:
      "A faster, more cost-efficient version of GPT-5 for well-defined tasks",
    features: ["chat", "code", "web"],
    icon: "⚡",
  },
  {
    id: "gpt5nano",
    name: "GPT 5 nano",
    provider: "OpenAI",
    description: "Fastest, most cost-efficient version of GPT-5",
    features: ["chat", "code", "web"],
    icon: "🚀",
  },
  {
    id: "o4mini",
    name: "O4 mini",
    provider: "OpenAI",
    description: "Faster, more affordable reasoning model",
    features: ["chat", "code", "web"],
    icon: "💡",
  },
  {
    id: "o3mini",
    name: "O3 mini",
    provider: "OpenAI",
    description: "A small model alternative to o3",
    features: ["code", "web"],
    icon: "⭐",
  },
  {
    id: "gpt4o",
    name: "GPT 4o",
    provider: "OpenAI",
    description: "Fast, intelligent, flexible GPT model",
    features: ["chat", "code"],
    icon: "🎯",
  },
  {
    id: "gpt4omini",
    name: "GPT 4o mini",
    provider: "OpenAI",
    description: "Fast, affordable small model for focused tasks",
    features: ["chat", "code"],
    icon: "✨",
  },
  {
    id: "gpt41",
    name: "GPT 4.1",
    provider: "OpenAI",
    description: "Flagship GPT model for complex tasks",
    features: ["chat", "code"],
    icon: "👑",
  },
  {
    id: "gpt41mini",
    name: "GPT 4.1 mini",
    provider: "OpenAI",
    description: "Balanced for intelligence, speed, and cost",
    features: ["chat", "code"],
    icon: "⚖️",
  },
  {
    id: "gpt41nano",
    name: "GPT 4.1 nano",
    provider: "OpenAI",
    description: "Fastest, most cost-effective GPT-4.1 model",
    features: ["chat", "code"],
    icon: "🔥",
  },
  {
    id: "gpt35turbo",
    name: "GPT 3.5 turbo",
    provider: "OpenAI",
    description: "Legacy GPT model for cheaper chat and non-chat tasks",
    features: ["web"],
    icon: "📝",
  },
  {
    id: "gptimage1",
    name: "GPT Image 1",
    provider: "OpenAI",
    description: "State-of-the-art image generation model",
    features: ["image"],
    icon: "🖼️",
  },
];

const aiModels: AIModel[] = [
  {
    id: "gptimage1",
    name: "GPT Image 1",
    provider: "OpenAI",
    description: "State-of-the-art image generation model",
    icon: "🖼️",
  },
  {
    id: "dalle3",
    name: "DALL-E 3",
    provider: "OpenAI",
    description:
      "Previous generation image generation model with improved caption fidelity and image quality",
    icon: "🎨",
  },
  {
    id: "grok2",
    name: "Grok 2 Image",
    provider: "xAI",
    description:
      "Image generation model, capable of creating high-quality, detailed images from text prompts.",
    icon: "✖️",
    locked: true,
  },
  {
    id: "nanoBanana",
    name: "Nano Banana",
    provider: "Google",
    description:
      "Google's state-of-the-art image generation and editing model.",
    icon: "🔍",
    locked: true,
  },
];

export default function ModalsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [isDark, setIsDark] = useState(true);
  const [aiSearchQuery, setAiSearchQuery] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const filteredModels = models.filter(
    (model) =>
      model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAIModels = aiModels.filter(
    (model) =>
      model.name.toLowerCase().includes(aiSearchQuery.toLowerCase()) ||
      model.description.toLowerCase().includes(aiSearchQuery.toLowerCase())
  );

  const handleCardClick = (model: Model) => {
    setSelectedModel(model);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedModel(null);
    setAiSearchQuery("");
  };

  const getFeatureIcon = (feature: string) => {
    switch (feature) {
      case "chat":
        return "💬";
      case "code":
        return "⚡";
      case "web":
        return "🌐";
      case "image":
        return "🖼️";
      default:
        return "✨";
    }
  };

  return (
    <SidebarProvider>
      <div className="flex flex-col md:flex-row w-full min-h-screen overflow-x-hidden">
        {/* Sidebar */}
        <div className="w-full md:w-auto flex-shrink-0">
          <AppSidebar
            onNewChat={() => {}}
            chatHistory={[]}
            onSelectChat={() => {}}
            onDeleteChat={() => {}}
          />
        </div>

        {/* main content */}
        <main
          className="
            flex-1
            bg-background 
            text-foreground 
            p-4 sm:p-6 md:p-8 
            w-full 
            min-h-screen 
            overflow-y-auto
          "
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
              <NavLink to={"/app"}>
                <p className="text-base text-para">Dashboard</p>
              </NavLink>
              <h1
                className={`text-3xl sm:text-4xl font-bold mt-4 ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                Models
              </h1>
            </div>

            <div className="relative mb-8">
              <Search
                className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  isDark ? "text-gray-400" : "text-gray-500"
                }`}
              />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-12 pr-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 ${
                  isDark
                    ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-blue-500"
                    : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-400"
                }`}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredModels.map((model) => (
                <div
                  key={model.id}
                  onClick={() => handleCardClick(model)}
                  className={`rounded-xl border p-6 cursor-pointer transition-all hover:scale-105 hover:shadow-xl ${
                    isDark
                      ? "bg-gray-800 border-gray-700 hover:border-gray-600"
                      : "bg-white border-gray-200 hover:border-gray-300 shadow-sm"
                  }`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${
                        isDark ? "bg-gray-700" : "bg-gray-100"
                      }`}
                    >
                      {model.icon}
                    </div>
                    <div className="flex-1">
                      <h3
                        className={`text-lg font-semibold mb-1 ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {model.name}
                      </h3>
                      <p
                        className={`text-sm ${
                          isDark ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {model.provider}
                      </p>
                    </div>
                  </div>
                  <p
                    className={`text-sm mb-4 ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {model.description}
                  </p>
                  <div className="flex gap-2">
                    {model.features.map((feature) => (
                      <div
                        key={feature}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${
                          isDark ? "bg-gray-700" : "bg-gray-100"
                        }`}
                      >
                        {getFeatureIcon(feature)}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-60 backdrop-blur-sm">
              <div
                ref={modalRef}
                className={`relative w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden ${
                  isDark ? "bg-gray-800" : "bg-white"
                }`}
              >
                <div
                  className={`flex items-center justify-between p-6 border-b ${
                    isDark ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <h2
                    className={`text-2xl font-bold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Models
                  </h2>
                  <button
                    onClick={closeModal}
                    className={`p-2 rounded-lg transition-colors ${
                      isDark ? "hover:bg-gray-700" : "hover:bg-gray-100"
                    }`}
                  >
                    <X
                      className={`w-6 h-6 ${
                        isDark ? "text-gray-400" : "text-gray-600"
                      }`}
                    />
                  </button>
                </div>

                <div className="p-6 max-h-[70vh] overflow-y-auto">
                  <div className="relative mb-6">
                    <input
                      type="text"
                      placeholder="Search models"
                      value={aiSearchQuery}
                      onChange={(e) => setAiSearchQuery(e.target.value)}
                      className={`w-full pl-4 pr-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 ${
                        isDark
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500"
                          : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-400"
                      }`}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredAIModels.map((aiModel) => (
                      <div
                        key={aiModel.id}
                        className={`rounded-xl border p-5 transition-all ${
                          aiModel.locked
                            ? "opacity-60 cursor-not-allowed"
                            : "cursor-pointer hover:scale-105"
                        } ${
                          isDark
                            ? "bg-gray-700 border-gray-600 hover:border-gray-500"
                            : "bg-gray-50 border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${
                              isDark ? "bg-gray-600" : "bg-white"
                            }`}
                          >
                            {aiModel.icon}
                          </div>
                          <div className="flex-1">
                            <h3
                              className={`font-semibold mb-1 ${
                                isDark ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {aiModel.name}
                            </h3>
                            <p
                              className={`text-xs ${
                                isDark ? "text-gray-400" : "text-gray-600"
                              }`}
                            >
                              {aiModel.provider}
                            </p>
                          </div>
                        </div>
                        <p
                          className={`text-sm ${
                            isDark ? "text-gray-300" : "text-gray-700"
                          }`}
                        >
                          {aiModel.description}
                        </p>
                        {aiModel.locked && (
                          <div
                            className={`mt-3 flex items-center gap-2 text-xs ${
                              isDark ? "text-gray-400" : "text-gray-600"
                            }`}
                          >
                            <span>💎</span>
                            <span>Upgrade plan</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={closeModal}
                    className="w-full mt-6 py-3 rounded-xl font-semibold transition-all hover:shadow-lg bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </SidebarProvider>
  );
}
