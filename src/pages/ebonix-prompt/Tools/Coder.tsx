import { SidebarProvider } from "@/components/ui/sidebar";
import { Info, Layout, Menu, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AppSidebar } from "../AppSidebar";

type Props = {};

const Coder = (props: Props) => {
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleGenerate = () => {
    if (description.trim() && language.trim()) {
      setIsGenerating(true);
      // Simulate generation - replace with actual API call
      setTimeout(() => {
        setIsGenerating(false);
        console.log("Code generated!", { description, language });
      }, 2000);
    }
  };

  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen overflow-x-hidden bg-background">
        {/* Mobile Overlay */}
        {isMobileSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
            fixed md:sticky top-0 left-0 h-screen z-50 md:z-auto
            transition-all duration-300 ease-in-out
            ${isSidebarCollapsed ? "md:w-16" : "md:w-64"}
            ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0
            bg-gray-900 border-r border-gray-800
          `}
        >
          {/* Desktop Collapse Toggle */}
          {/* .............. */}

          {/* Mobile Close Button */}
          <button
            onClick={() => setIsMobileSidebarOpen(false)}
            className="md:hidden absolute right-4 top-4 text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className={`h-full overflow-y-auto ${
              isSidebarCollapsed ? "px-2" : "px-4"
            }`}
          >
            <AppSidebar
              onNewChat={() => {}}
              chatHistory={[]}
              onSelectChat={() => {}}
              onDeleteChat={() => {}}
            />
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 w-full min-h-screen overflow-y-auto flex flex-col">
          {/* Mobile Header with Menu Button */}
          <div className="md:hidden sticky top-0 z-30 bg-gray-900 border-b border-gray-800 px-4 py-3 flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="text-gray-400 hover:text-white"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-semibold text-foreground">
              Coding Assistant
            </h2>
          </div>

          {/* Header */}
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                <Layout className="w-4 h-4" />
                <NavLink
                  to={"/app"}
                  className="hover:text-white transition-colors"
                >
                  <span className="text-para">Dashboard</span>
                </NavLink>
              </div>

              <div>
                <h1 className="text-foreground text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                  Coding Assistant
                </h1>
                <p className="text-para text-sm sm:text-base">
                  Generate high quality code in seconds.
                </p>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="max-w-4xl mx-auto">
              {/* Form Card */}
              <div className="bg-gray-400 dark:bg-gray-900 rounded-2xl p-5 sm:p-6 lg:p-10">
                <h2 className="text-foreground text-lg sm:text-xl font-semibold mb-6 sm:mb-8">
                  Prompts
                </h2>

                {/* Description Field */}
                <div className="mb-5 sm:mb-6">
                  <label className="flex items-center gap-2 text-sm font-medium mb-3">
                    <span className="text-red-500">*</span>
                    <span className="text-para">Description</span>
                    <Info className="w-4 h-4 text-gray-500" />
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe request"
                    rows={5}
                    className="w-full bg-gray-600 dark:bg-transparent dark:border dark:border-gray-800 rounded-lg px-4 py-3 text-white  dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all"
                  />
                </div>

                {/* Programming Language Field */}
                <div className="mb-6 sm:mb-8">
                  <label className="flex items-center gap-2 text-sm font-medium mb-3">
                    <span className="text-red-500">*</span>
                    <span className="text-para">Programming language</span>
                  </label>
                  <input
                    type="text"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    placeholder="PHP, JavaScript etc."
                    className="w-full bg-gray-600 dark:bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white  dark:placeholder-para focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Generate Button */}
                <button
                  onClick={handleGenerate}
                  disabled={
                    !description.trim() || !language.trim() || isGenerating
                  }
                  className="w-full bg-green-600 hover:bg-green-400 disabled:bg-gray-800 disabled:cursor-not-allowed text-gray-50 disabled:text-gray-600 font-medium py-3 sm:py-3.5 rounded-lg flex items-center justify-center gap-2 transition-all disabled:hover:bg-gray-800"
                >
                  <Sparkles className="w-5 h-5" />
                  <span className="text-sm sm:text-base">
                    {isGenerating ? "Generating..." : "Generate Result"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Coder;
