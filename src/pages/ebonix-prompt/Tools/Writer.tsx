import { SidebarProvider } from "@/components/ui/sidebar";
import { ChevronDown, Layout, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { AppSidebar } from "../AppSidebar";

interface Template {
  id: number;
  title: string;
  description: string;
  category: string;
  icon: string;
  iconBg: string;
}

const templates: Template[] = [
  {
    id: 1,
    title: "AI Writer",
    description: "Don't need a template? Start writing with our AI writer.",
    category: "Writing Tools",
    icon: "📝",
    iconBg: "bg-orange-500",
  },
  {
    id: 2,
    title: "Call to Action",
    description:
      "Eye-catching calls to action that will encourage conversions and boost your sales.",
    category: "Website",
    icon: "📢",
    iconBg: "bg-purple-500",
  },
  {
    id: 3,
    title: "Landing Page Headline Writer",
    description:
      "Unique and catchy headlines that are perfect for your product or service.",
    category: "Website",
    icon: "H",
    iconBg: "bg-orange-500",
  },
  {
    id: 4,
    title: "Website Sub-headline",
    description:
      "Create delightfully informative sub-headlines (H2) for your websites and landing pages.",
    category: "Website",
    icon: "H1",
    iconBg: "bg-blue-500",
  },
  {
    id: 5,
    title: "Product Page - Title and Meta Descriptions",
    description:
      "Write SEO optimized title tags and meta descriptions that will rank well on Google for product pages.",
    category: "E-Commerce",
    icon: "SEO",
    iconBg: "bg-orange-600",
  },
  {
    id: 6,
    title: "Blog Post - Title and Meta Descriptions",
    description:
      "Write SEO optimized title tags and meta descriptions for blog posts that will rank well on Google.",
    category: "Website",
    icon: "SEO",
    iconBg: "bg-blue-600",
  },
  {
    id: 7,
    title: "Services Page - Title and Meta Descriptions",
    description:
      "Write SEO optimized title tags and meta descriptions for services pages.",
    category: "Business and Strategy",
    icon: "SEO",
    iconBg: "bg-orange-600",
  },
  {
    id: 8,
    title: "Homepage - Title and Meta Descriptions",
    description:
      "Write SEO optimized title tags and meta descriptions for homepage.",
    category: "Website",
    icon: "SEO",
    iconBg: "bg-purple-600",
  },
  {
    id: 9,
    title: "Unique Value Propositions",
    description:
      "Create a clear statement that describes the benefit of your offer.",
    category: "Business and Strategy",
    icon: "🎯",
    iconBg: "bg-orange-500",
  },
  {
    id: 10,
    title: "Facebook Ad Copy",
    description:
      "Create engaging Facebook ad copy that drives clicks and conversions.",
    category: "Ads",
    icon: "📱",
    iconBg: "bg-blue-500",
  },
  {
    id: 11,
    title: "Instagram Caption",
    description: "Write captivating Instagram captions that boost engagement.",
    category: "Social Media",
    icon: "📸",
    iconBg: "bg-pink-500",
  },
  {
    id: 12,
    title: "Email Subject Lines",
    description:
      "Craft compelling email subject lines that increase open rates.",
    category: "Email",
    icon: "✉️",
    iconBg: "bg-green-500",
  },
];

const categories = [
  "All",
  "Website",
  "Social Media",
  "Email",
  "E-Commerce",
  "Business and Strategy",
  "Ads",
  "Writing Tools",
];

const sortOptions = ["Default", "Name (A-Z)", "Name (Z-A)", "Category"];

export default function Writer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Default");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const categoryRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categoryRef.current &&
        !categoryRef.current.contains(event.target as Node)
      ) {
        setShowCategoryDropdown(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setShowSortDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter templates based on search and category
  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort templates
  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    switch (sortBy) {
      case "Name (A-Z)":
        return a.title.localeCompare(b.title);
      case "Name (Z-A)":
        return b.title.localeCompare(a.title);
      case "Category":
        return a.category.localeCompare(b.category);
      default:
        return 0;
    }
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
          <div className="border-b border-gray-800 px-4 sm:px-6 py-4 max-w-7xl mx-auto">
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-4 sm:mb-6">
              <Layout className="w-4 h-4" />
              <NavLink to={"/app"}>
                <span>Dashboard</span>
              </NavLink>
            </div>

            <div className="mb-2">
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                Writer templates
              </h1>
              <p className="text-gray-400 text-sm sm:text-base">
                Choose one of the predefined template presets or continue with
                free form
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="px-4 sm:px-6 py-4 sm:py-6 max-w-7xl mx-auto">
            {/* Search and Filter Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-card border border-gray-700 rounded-lg pl-10 pr-10 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-gray-600"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3">
                {/* Category Dropdown */}
                <div ref={categoryRef} className="relative">
                  <button
                    onClick={() =>
                      setShowCategoryDropdown(!showCategoryDropdown)
                    }
                    className="flex items-center justify-center gap-2 bg-card border border-gray-700 rounded-lg px-4 py-2.5 hover:bg-gray-750 transition-colors min-w-[120px]"
                  >
                    <Layout className="w-4 h-4" />
                    <span className="hidden sm:inline">{selectedCategory}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        showCategoryDropdown ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {showCategoryDropdown && (
                    <div className="absolute top-full mt-2 right-0 sm:left-0 bg-background rounded-lg shadow-xl z-10 min-w-[200px] max-h-[300px] overflow-y-auto">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => {
                            setSelectedCategory(category);
                            setShowCategoryDropdown(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 hover:bg-gray-700 transition-colors ${
                            selectedCategory === category
                              ? "bg-gray-700 text-blue-400"
                              : "text-foreground hover:text-background"
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Sort Dropdown */}
                <div ref={sortRef} className="relative">
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <span className="hidden sm:inline">Sort by:</span>
                    <button
                      onClick={() => setShowSortDropdown(!showSortDropdown)}
                      className="flex items-center gap-1 text-foreground transition-colors bg-card  border border-gray-700 px-3 py-2.5 rounded-lg"
                    >
                      <span>{sortBy}</span>
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          showSortDropdown ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {showSortDropdown && (
                    <div className="absolute top-full mt-2 right-0 bg-card border border-gray-700 rounded-lg shadow-xl z-10 min-w-[180px]">
                      {sortOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => {
                            setSortBy(option);
                            setShowSortDropdown(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 hover:bg-card transition-colors ${
                            sortBy === option
                              ? "bg-card text-blue-400"
                              : "text-gray-300"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {(selectedCategory !== "All" || searchQuery) && (
              <div className="flex items-center gap-2 mb-4">
                <span className="text-gray-400 text-sm">Active filters:</span>
                {selectedCategory !== "All" && (
                  <span className="inline-flex items-center gap-1 bg-card text-blue-400 text-xs px-3 py-1 rounded-full">
                    {selectedCategory}
                    <button
                      onClick={() => setSelectedCategory("All")}
                      className="hover:text-blue-300"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 bg-purple-500/20 text-purple-400 text-xs px-3 py-1 rounded-full">
                    Search: "{searchQuery}"
                    <button
                      onClick={() => setSearchQuery("")}
                      className="hover:text-purple-300"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            )}

            <p className="text-gray-400 text-sm mb-6">
              Total {sortedTemplates.length}{" "}
              {sortedTemplates.length === 1 ? "template" : "templates"}
            </p>

            {/* Templates Grid */}
            {sortedTemplates.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
                {sortedTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="bg-card border border-border rounded-xl p-6 hover:bg-accent/20 cursor-pointer transition-all shadow-sm"
                  >
                    <div
                      className={`w-12 h-12 ${template.iconBg} rounded-full flex items-center justify-center text-white font-bold text-lg mb-4 group-hover:scale-110 transition-transform`}
                    >
                      {template.icon}
                    </div>

                    <h3 className="text-base sm:text-lg font-semibold mb-2 group-hover:text-blue-400 transition-colors">
                      {template.title}
                    </h3>

                    <p className="text-gray-500 text-sm mb-4 leading-relaxed line-clamp-3">
                      {template.description}
                    </p>

                    <span className="inline-block bg-gray-400 dark:bg-gray-700 text-background dark:text-foreground text-xs px-3 py-1 rounded-full">
                      {template.category}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg mb-2">
                  No templates found
                </div>
                <p className="text-gray-600 text-sm">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
