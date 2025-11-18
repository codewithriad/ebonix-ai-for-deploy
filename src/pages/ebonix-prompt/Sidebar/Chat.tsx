import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/pages/ebonix-prompt/AppSidebar";
import { ChevronDown, Search } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const assistants = [
  {
    id: "1",
    name: "Kee, the bot",
    role: "Universal AI bot",
    description: "",
    icon: "🌀",
    bgGradient: "from-green-400 to-blue-500",
  },
  {
    id: "2",
    name: "Captain Contradiction",
    role: "Disagreement Specialist",
    description: "Disagreement Specialist",
    icon: "📦",
    bgGradient: "from-gray-700 to-gray-700",
  },
  {
    id: "3",
    name: "Katzy",
    role: "Cat",
    description: "An AI assistant behaves like a cat.",
    icon: "🐱",
    bgGradient: "from-orange-400 to-orange-500",
  },
  {
    id: "4",
    name: "Mail Guru",
    role: "Email assistant",
    description: "Create polished, professional emails from drafts",
    icon: "✉️",
    bgGradient: "from-orange-500 to-orange-600",
  },
];

export default function Chat() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Default");
  const [showSortMenu, setShowSortMenu] = useState(false);

  const filteredAssistants = assistants.filter(
    (assistant) =>
      assistant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assistant.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

        {/* Main content */}
        <main className="flex-1 bg-background text-foreground p-4 sm:p-6 md:p-8 w-full min-h-screen overflow-y-auto">
          <div className="max-w-[1800px] mx-auto">
            {/* Header */}
            <div className="mb-8">
              <NavLink
                to={"/app"}
                className="text-xs sm:text-sm text-muted-foreground hover:text-gray-200 mb-2 block"
              >
                ← Dashboard
              </NavLink>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                Assistants
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Choose one of the AI assistants to chat with
              </p>
            </div>

            {/* Search and Sort Bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-card border border-border rounded-lg pl-12 pr-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="relative">
                <button
                  onClick={() => setShowSortMenu(!showSortMenu)}
                  className="flex items-center gap-2 bg-card border border-border rounded-lg px-4 py-3 text-foreground hover:bg-accent focus:outline-none whitespace-nowrap w-full sm:w-auto justify-between sm:justify-start"
                >
                  <span className="text-sm">Sort by: {sortBy}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                {showSortMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-10">
                    <button
                      onClick={() => {
                        setSortBy("Default");
                        setShowSortMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-accent text-sm rounded-t-lg"
                    >
                      Default
                    </button>
                    <button
                      onClick={() => {
                        setSortBy("Name");
                        setShowSortMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-accent text-sm rounded-b-lg"
                    >
                      Name
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Total count */}
            <div className="text-sm text-muted-foreground mb-6">
              Total {filteredAssistants.length} assistants
            </div>

            {/* Assistants Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredAssistants.map((assistant) => (
                <div
                  key={assistant.id}
                  className="bg-card border border-border rounded-xl p-6 hover:bg-accent/20 cursor-pointer transition-all shadow-sm"
                >
                  <div className="flex flex-col items-center text-center">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${assistant.bgGradient} rounded-full flex items-center justify-center text-3xl mb-4`}
                    >
                      {assistant.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-1">
                      {assistant.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {assistant.role}
                    </p>
                    {assistant.description && (
                      <p className="text-sm text-muted-foreground/70">
                        {assistant.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
