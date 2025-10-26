import { SidebarProvider } from "@/components/ui/sidebar";
import {
  ChevronDown,
  ChevronLeft,
  Crown,
  Layout,
  Lock,
  Menu,
  Play,
  Search,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { AppSidebar } from "../AppSidebar";

interface Voice {
  id: number;
  name: string;
  initial: string;
  isPublic: boolean;
  gender: string;
  languages: string[];
  languageCount: number;
}

const voices: Voice[] = [
  {
    id: 1,
    name: "Sage",
    initial: "S",
    isPublic: true,
    gender: "Female",
    languages: ["🇫🇷", "🇮🇳"],
    languageCount: 54,
  },
  {
    id: 2,
    name: "Coral",
    initial: "C",
    isPublic: true,
    gender: "Female",
    languages: ["🇫🇷", "🇮🇳"],
    languageCount: 54,
  },
  {
    id: 3,
    name: "Ash",
    initial: "A",
    isPublic: true,
    gender: "Male",
    languages: ["🇬🇧", "🇫🇷"],
    languageCount: 54,
  },
  {
    id: 4,
    name: "Shimmer",
    initial: "S",
    isPublic: true,
    gender: "Female",
    languages: ["🇫🇷", "🇮🇳"],
    languageCount: 54,
  },
  {
    id: 5,
    name: "Nova",
    initial: "N",
    isPublic: true,
    gender: "Female",
    languages: ["🌍", "🇮🇳"],
    languageCount: 54,
  },
  {
    id: 6,
    name: "Onyx",
    initial: "O",
    isPublic: true,
    gender: "Male",
    languages: ["🇵🇹", "🇮🇳"],
    languageCount: 54,
  },
  {
    id: 7,
    name: "Fable",
    initial: "F",
    isPublic: true,
    gender: "Female",
    languages: ["🇫🇷", "🇮🇳"],
    languageCount: 54,
  },
  {
    id: 8,
    name: "Echo",
    initial: "E",
    isPublic: true,
    gender: "Male",
    languages: ["🇬🇧", "🇮🇳"],
    languageCount: 54,
  },
  {
    id: 9,
    name: "Alloy",
    initial: "A",
    isPublic: true,
    gender: "Female",
    languages: ["🇫🇷", "🇮🇳"],
    languageCount: 54,
  },
];

const sortOptions = ["Default", "Name (A-Z)", "Name (Z-A)", "Gender"];
const languageOptions = ["All", "English", "French", "Spanish", "German"];
const useCaseOptions = ["All", "Narration", "Podcast", "Video", "Audiobook"];
const toneOptions = ["All", "Friendly", "Professional", "Casual", "Energetic"];
const ageOptions = ["All", "Young", "Middle", "Senior"];
const genderOptions = ["All", "Male", "Female", "Neutral"];

export default function VoiceOver() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Default");
  const [languageFilter, setLanguageFilter] = useState("All");
  const [useCaseFilter, setUseCaseFilter] = useState("All");
  const [toneFilter, setToneFilter] = useState("All");
  const [ageFilter, setAgeFilter] = useState("All");
  const [genderFilter, setGenderFilter] = useState("All");

  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showUseCaseDropdown, setShowUseCaseDropdown] = useState(false);
  const [showToneDropdown, setShowToneDropdown] = useState(false);
  const [showAgeDropdown, setShowAgeDropdown] = useState(false);
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);

  const sortRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);
  const useCaseRef = useRef<HTMLDivElement>(null);
  const toneRef = useRef<HTMLDivElement>(null);
  const ageRef = useRef<HTMLDivElement>(null);
  const genderRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setShowSortDropdown(false);
      }
      if (
        languageRef.current &&
        !languageRef.current.contains(event.target as Node)
      ) {
        setShowLanguageDropdown(false);
      }
      if (
        useCaseRef.current &&
        !useCaseRef.current.contains(event.target as Node)
      ) {
        setShowUseCaseDropdown(false);
      }
      if (toneRef.current && !toneRef.current.contains(event.target as Node)) {
        setShowToneDropdown(false);
      }
      if (ageRef.current && !ageRef.current.contains(event.target as Node)) {
        setShowAgeDropdown(false);
      }
      if (
        genderRef.current &&
        !genderRef.current.contains(event.target as Node)
      ) {
        setShowGenderDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  // Filter and sort voices
  const filteredVoices = voices.filter((voice) => {
    const matchesSearch =
      voice.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      voice.gender.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGender =
      genderFilter === "All" || voice.gender === genderFilter;

    return matchesSearch && matchesGender;
  });

  const sortedVoices = [...filteredVoices].sort((a, b) => {
    switch (sortBy) {
      case "Name (A-Z)":
        return a.name.localeCompare(b.name);
      case "Name (Z-A)":
        return b.name.localeCompare(a.name);
      case "Gender":
        return a.gender.localeCompare(b.gender);
      default:
        return 0;
    }
  });

  const handleUseVoice = (voiceName: string) => {
    setSelectedVoice(voiceName);
    setShowUpgradeModal(true);
  };

  return (
    <SidebarProvider>
      <div className="flex w-full h-screen overflow-hidden bg-background">
        {/* Mobile Overlay */}
        {isMobileSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}

        {/* Sidebar - Fixed position */}
        <aside
          className={`
            fixed md:relative left-0 top-0 h-screen z-50 md:z-auto
            transition-all duration-300 ease-in-out
            ${isSidebarCollapsed ? "md:w-16" : "md:w-64"}
            ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0
            bg-gray-900 border-r border-gray-800
            flex-shrink-0
          `}
        >
          {/* Desktop Collapse Toggle */}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="hidden md:flex absolute -right-3 top-6 w-6 h-6 bg-gray-800 border border-gray-700 rounded-full items-center justify-center hover:bg-gray-700 transition-colors z-10"
          >
            <ChevronLeft
              className={`w-4 h-4 transition-transform ${
                isSidebarCollapsed ? "rotate-180" : ""
              }`}
            />
          </button>

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
              // isCollapsed={isSidebarCollapsed}
            />
          </div>
        </aside>

        {/* Main content - Scrollable */}
        <main className="flex-1 w-full h-screen overflow-y-auto">
          {/* Mobile Header with Menu Button */}
          <div className="md:hidden sticky top-0 z-30 bg-gray-900 border-b border-gray-800 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileSidebarOpen(true)}
                className="text-gray-400 hover:text-white"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h2 className="text-lg font-semibold">Voice over</h2>
            </div>
            <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1.5 rounded-lg transition-colors text-sm">
              <Lock className="w-3 h-3" />
              <span>Clone</span>
            </button>
          </div>

          <div className="p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="pb-6 mb-6 max-w-7xl mx-auto">
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                <Layout className="w-4 h-4" />
                <NavLink
                  to={"/app"}
                  className="hover:text-foreground transition-colors"
                >
                  <span>Dashboard</span>
                </NavLink>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1">
                  <h1 className="text-foreground text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                    Voice over
                  </h1>
                  <p className="text-para text-sm sm:text-base">
                    Select one of the following voices and start transform your
                    words to voice easily.
                  </p>
                </div>

                <button className="hidden md:flex items-center gap-2 bg-ebonix-purple-dark hover:bg-gray-600 text-white px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap">
                  <Lock className="w-4 h-4" />
                  <span className="text-ebonix-white text-sm">
                    Clone your voice
                  </span>
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto">
              {/* Search and Filter Bar */}
              <div className="bg-card border border-gray-300 rounded-xl p-3 sm:p-4 mb-4">
                <div className="flex flex-col gap-3">
                  {/* First Row: Search and Sort */}
                  <div className="flex items-center gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full  dark:bg-cardShadow border rounded-lg pl-10 pr-4 py-2 text-para text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div
                      ref={sortRef}
                      className="relative flex-shrink-0 hidden sm:block"
                    >
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-para hidden lg:inline">
                          Sort by:
                        </span>
                        <button
                          onClick={() => setShowSortDropdown(!showSortDropdown)}
                          className="flex items-center gap-2 bg-card border border-para px-3 py-2 rounded-lg  transition-colors"
                        >
                          <span className="text-para">{sortBy}</span>
                          <ChevronDown
                            className={`w-4 h-4 text-para transition-transform ${
                              showSortDropdown ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </div>

                      {showSortDropdown && (
                        <div className="absolute top-full mt-2 right-0 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10 min-w-[180px]">
                          {sortOptions.map((option) => (
                            <button
                              key={option}
                              onClick={() => {
                                setSortBy(option);
                                setShowSortDropdown(false);
                              }}
                              className={`w-full text-left px-4 py-2.5 hover:bg-gray-700 transition-colors text-sm ${
                                sortBy === option
                                  ? "bg-gray-700 text-blue-400"
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

                  {/* Second Row: Filters */}
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Language Filter */}
                    <div ref={languageRef} className="relative">
                      <button
                        onClick={() =>
                          setShowLanguageDropdown(!showLanguageDropdown)
                        }
                        className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-xs sm:text-sm hover:bg-gray-700 transition-colors"
                      >
                        <span className="text-gray-400">
                          {languageFilter === "All"
                            ? "Language"
                            : languageFilter}
                        </span>
                        <ChevronDown
                          className={`w-3 h-3 transition-transform ${
                            showLanguageDropdown ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {showLanguageDropdown && (
                        <div className="absolute top-full mt-2 left-0 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10 min-w-[160px]">
                          {languageOptions.map((option) => (
                            <button
                              key={option}
                              onClick={() => {
                                setLanguageFilter(option);
                                setShowLanguageDropdown(false);
                              }}
                              className={`w-full text-left px-4 py-2.5 bg-card transition-colors text-sm ${
                                languageFilter === option
                                  ? "bg-gray-700 text-blue-400"
                                  : "text-gray-300"
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Use Case Filter */}
                    <div ref={useCaseRef} className="relative">
                      <button
                        onClick={() =>
                          setShowUseCaseDropdown(!showUseCaseDropdown)
                        }
                        className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-xs sm:text-sm hover:bg-gray-700 transition-colors"
                      >
                        <span className="text-gray-400">
                          {useCaseFilter === "All" ? "Use case" : useCaseFilter}
                        </span>
                        <ChevronDown
                          className={`w-3 h-3 transition-transform ${
                            showUseCaseDropdown ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {showUseCaseDropdown && (
                        <div className="absolute top-full mt-2 left-0 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10 min-w-[160px]">
                          {useCaseOptions.map((option) => (
                            <button
                              key={option}
                              onClick={() => {
                                setUseCaseFilter(option);
                                setShowUseCaseDropdown(false);
                              }}
                              className={`w-full text-left px-4 py-2.5 hover:bg-gray-700 transition-colors text-sm ${
                                useCaseFilter === option
                                  ? "bg-gray-700 text-blue-400"
                                  : "text-gray-300"
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Tone Filter */}
                    <div ref={toneRef} className="relative">
                      <button
                        onClick={() => setShowToneDropdown(!showToneDropdown)}
                        className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-xs sm:text-sm hover:bg-gray-700 transition-colors"
                      >
                        <span className="text-gray-400">
                          {toneFilter === "All" ? "Tone" : toneFilter}
                        </span>
                        <ChevronDown
                          className={`w-3 h-3 transition-transform ${
                            showToneDropdown ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {showToneDropdown && (
                        <div className="absolute top-full mt-2 left-0 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10 min-w-[160px]">
                          {toneOptions.map((option) => (
                            <button
                              key={option}
                              onClick={() => {
                                setToneFilter(option);
                                setShowToneDropdown(false);
                              }}
                              className={`w-full text-left px-4 py-2.5 hover:bg-gray-700 transition-colors text-sm ${
                                toneFilter === option
                                  ? "bg-gray-700 text-blue-400"
                                  : "text-gray-300"
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Age Filter */}
                    <div ref={ageRef} className="relative">
                      <button
                        onClick={() => setShowAgeDropdown(!showAgeDropdown)}
                        className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-xs sm:text-sm hover:bg-gray-700 transition-colors"
                      >
                        <span className="text-gray-400">
                          {ageFilter === "All" ? "Age" : ageFilter}
                        </span>
                        <ChevronDown
                          className={`w-3 h-3 transition-transform ${
                            showAgeDropdown ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {showAgeDropdown && (
                        <div className="absolute top-full mt-2 left-0 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10 min-w-[160px]">
                          {ageOptions.map((option) => (
                            <button
                              key={option}
                              onClick={() => {
                                setAgeFilter(option);
                                setShowAgeDropdown(false);
                              }}
                              className={`w-full text-left px-4 py-2.5 hover:bg-gray-700 transition-colors text-sm ${
                                ageFilter === option
                                  ? "bg-gray-700 text-blue-400"
                                  : "text-gray-300"
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Gender Filter */}
                    <div ref={genderRef} className="relative">
                      <button
                        onClick={() =>
                          setShowGenderDropdown(!showGenderDropdown)
                        }
                        className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-xs sm:text-sm hover:bg-gray-700 transition-colors"
                      >
                        <span className="text-gray-400">
                          {genderFilter === "All" ? "Gender" : genderFilter}
                        </span>
                        <ChevronDown
                          className={`w-3 h-3 transition-transform ${
                            showGenderDropdown ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {showGenderDropdown && (
                        <div className="absolute top-full mt-2 left-0 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10 min-w-[160px]">
                          {genderOptions.map((option) => (
                            <button
                              key={option}
                              onClick={() => {
                                setGenderFilter(option);
                                setShowGenderDropdown(false);
                              }}
                              className={`w-full text-left px-4 py-2.5 hover:bg-gray-700 transition-colors text-sm ${
                                genderFilter === option
                                  ? "bg-gray-700 text-blue-400"
                                  : "text-gray-300"
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Sort on Mobile */}
                    <div
                      ref={sortRef}
                      className="relative flex-shrink-0 sm:hidden ml-auto"
                    >
                      <button
                        onClick={() => setShowSortDropdown(!showSortDropdown)}
                        className="flex items-center gap-2 bg-gray-800 border border-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-700 transition-colors text-xs"
                      >
                        <span>{sortBy}</span>
                        <ChevronDown
                          className={`w-3 h-3 transition-transform ${
                            showSortDropdown ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {showSortDropdown && (
                        <div className="absolute top-full mt-2 right-0 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-10 min-w-[160px]">
                          {sortOptions.map((option) => (
                            <button
                              key={option}
                              onClick={() => {
                                setSortBy(option);
                                setShowSortDropdown(false);
                              }}
                              className={`w-full text-left px-4 py-2.5 hover:bg-gray-700 transition-colors text-sm ${
                                sortBy === option
                                  ? "bg-gray-700 text-blue-400"
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
              </div>

              <p className="text-gray-400 text-xs sm:text-sm mb-6">
                Total {sortedVoices.length} voices / 604 hidden
              </p>

              {/* Voices Grid */}
              {sortedVoices.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
                  {sortedVoices.map((voice) => (
                    <div
                      key={voice.id}
                      className="bg-card border border-border rounded-xl p-4 sm:p-5 hover:bg-accent/10 transition-all"
                    >
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                          {voice.initial}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base sm:text-lg font-semibold mb-1">
                            {voice.name}
                          </h3>
                          <div className="flex items-center gap-1 text-xs text-gray-400">
                            <div className="w-3 h-3 rounded-full bg-gray-600 flex items-center justify-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                            </div>
                            <span>Public</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-gray-300 mb-2">
                        {voice.gender}
                      </p>

                      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 mb-4">
                        <span>Languages:</span>
                        <div className="flex items-center gap-1">
                          {voice.languages.map((flag, index) => (
                            <span key={index}>{flag}</span>
                          ))}
                          <span>+{voice.languageCount}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 sm:gap-3 mb-4 bg-gray-800/50 rounded-lg p-2 sm:p-3">
                        <button className="flex-shrink-0 text-gray-400 hover:text-white transition-colors">
                          <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                        <div className="flex-1 flex items-center gap-0.5 h-6 sm:h-8">
                          {Array.from({ length: 30 }).map((_, i) => (
                            <div
                              key={i}
                              className="flex-1 bg-gray-600 rounded-sm"
                              style={{
                                height: `${Math.random() * 60 + 20}%`,
                                opacity: 0.6,
                              }}
                            />
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => handleUseVoice(voice.name)}
                        className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 sm:py-2.5 rounded-lg transition-colors text-sm"
                      >
                        Use this voice
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 lg:py-16">
                  <div className="text-gray-500 text-lg lg:text-xl mb-2">
                    No voices found
                  </div>
                  <p className="text-gray-600 text-sm">
                    Try adjusting your search or filters
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Upgrade Modal */}
        {showUpgradeModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4">
            <div className="bg-gray-800 rounded-2xl max-w-md w-full p-6 sm:p-8 border border-gray-700 relative">
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-8 h-8 text-white" />
                </div>

                <h2 className="text-2xl font-bold mb-2">Upgrade Required</h2>
                <p className="text-gray-400 mb-6">
                  To use{" "}
                  <span className="text-white font-semibold">
                    {selectedVoice}
                  </span>{" "}
                  voice, you need to upgrade your package to access premium
                  features.
                </p>

                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all">
                    Upgrade Now
                  </button>
                  <button
                    onClick={() => setShowUpgradeModal(false)}
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 rounded-lg transition-colors"
                  >
                    Maybe Later
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </SidebarProvider>
  );
}
