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
              <div className="bg-white/70 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200 dark:border-gray-700 shadow-lg dark:shadow-[0_0_20px_rgba(0,0,0,0.4)] rounded-2xl p-4 sm:p-5 mb-6 transition-all duration-300 hover:shadow-xl dark:hover:shadow-[0_0_25px_rgba(0,0,0,0.6)]">
                <div className="flex flex-col gap-4">
                  {/* 🔍 First Row: Search + Sort */}
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    {/* Search */}
                    <div className="relative flex-1 w-full">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
                      <input
                        type="text"
                        placeholder="Search voices..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/80 dark:bg-gray-800/70 border border-gray-300 dark:border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>

                    {/* Sort (Desktop) */}
                    <div ref={sortRef} className="relative hidden sm:block">
                      <button
                        onClick={() => setShowSortDropdown(!showSortDropdown)}
                        className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-800/70 rounded-lg px-3 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-blue-50 dark:hover:bg-gray-700 transition-all"
                      >
                        <span className="font-medium">{sortBy}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform ${
                            showSortDropdown ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {showSortDropdown && (
                        <div className="absolute top-full mt-2 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg dark:shadow-[0_0_15px_rgba(0,0,0,0.4)] z-10 min-w-[180px] animate-in fade-in slide-in-from-top-1 duration-150">
                          {sortOptions.map((option) => (
                            <button
                              key={option}
                              onClick={() => {
                                setSortBy(option);
                                setShowSortDropdown(false);
                              }}
                              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                                sortBy === option
                                  ? "bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400"
                                  : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 🧩 Second Row: Filters */}
                  <div className="flex flex-wrap items-center gap-2">
                    {[
                      {
                        label: "Language",
                        options: languageOptions,
                        filter: languageFilter,
                        setFilter: setLanguageFilter,
                        show: showLanguageDropdown,
                        setShow: setShowLanguageDropdown,
                        ref: languageRef,
                      },
                      {
                        label: "Use case",
                        options: useCaseOptions,
                        filter: useCaseFilter,
                        setFilter: setUseCaseFilter,
                        show: showUseCaseDropdown,
                        setShow: setShowUseCaseDropdown,
                        ref: useCaseRef,
                      },
                      {
                        label: "Tone",
                        options: toneOptions,
                        filter: toneFilter,
                        setFilter: setToneFilter,
                        show: showToneDropdown,
                        setShow: setShowToneDropdown,
                        ref: toneRef,
                      },
                      {
                        label: "Age",
                        options: ageOptions,
                        filter: ageFilter,
                        setFilter: setAgeFilter,
                        show: showAgeDropdown,
                        setShow: setShowAgeDropdown,
                        ref: ageRef,
                      },
                      {
                        label: "Gender",
                        options: genderOptions,
                        filter: genderFilter,
                        setFilter: setGenderFilter,
                        show: showGenderDropdown,
                        setShow: setShowGenderDropdown,
                        ref: genderRef,
                      },
                    ].map(
                      (
                        {
                          label,
                          options,
                          filter,
                          setFilter,
                          show,
                          setShow,
                          ref,
                        },
                        index
                      ) => (
                        <div ref={ref} key={index} className="relative">
                          <button
                            onClick={() => setShow(!show)}
                            className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-800/70 rounded-lg px-3 py-1.5 text-xs sm:text-sm text-gray-700 dark:text-gray-100 hover:bg-blue-50 dark:hover:bg-gray-700 transition-all"
                          >
                            <span>{filter === "All" ? label : filter}</span>
                            <ChevronDown
                              className={`w-3 h-3 transition-transform ${
                                show ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          {show && (
                            <div className="absolute top-full mt-2 left-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg dark:shadow-[0_0_15px_rgba(0,0,0,0.4)] z-10 min-w-[160px] animate-in fade-in slide-in-from-top-1 duration-150">
                              {options.map((option) => (
                                <button
                                  key={option}
                                  onClick={() => {
                                    setFilter(option);
                                    setShow(false);
                                  }}
                                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                                    filter === option
                                      ? "bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400"
                                      : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                                  }`}
                                >
                                  {option}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    )}

                    {/* Sort on Mobile */}
                    <div ref={sortRef} className="relative sm:hidden ml-auto">
                      <button
                        onClick={() => setShowSortDropdown(!showSortDropdown)}
                        className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-800/70 px-3 py-1.5 rounded-lg text-xs text-gray-700 dark:text-gray-100 hover:bg-blue-50 dark:hover:bg-gray-700 transition-all"
                      >
                        <span>{sortBy}</span>
                        <ChevronDown
                          className={`w-3 h-3 transition-transform ${
                            showSortDropdown ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {showSortDropdown && (
                        <div className="absolute top-full mt-2 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg dark:shadow-[0_0_15px_rgba(0,0,0,0.4)] z-10 min-w-[160px] animate-in fade-in slide-in-from-top-1 duration-150">
                          {sortOptions.map((option) => (
                            <button
                              key={option}
                              onClick={() => {
                                setSortBy(option);
                                setShowSortDropdown(false);
                              }}
                              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                                sortBy === option
                                  ? "bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400"
                                  : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {sortedVoices.map((voice) => (
                    <div
                      key={voice.id}
                      className="group rounded-2xl p-5 border transition-all duration-300
          bg-gradient-to-b from-white to-gray-50 border-gray-200 
          hover:border-indigo-400 hover:shadow-[0_0_25px_rgba(99,102,241,0.2)]
          dark:from-gray-900 dark:to-gray-800 dark:border-gray-700 
          dark:hover:border-indigo-500/60 dark:hover:shadow-[0_0_25px_rgba(99,102,241,0.4)]"
                    >
                      {/* Header */}
                      <div className="flex items-start gap-3 mb-4">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold
            bg-gradient-to-br from-indigo-500 to-purple-500 shadow-[0_0_15px_rgba(99,102,241,0.4)]"
                        >
                          {voice.initial}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3
                            className="text-gray-900 dark:text-white text-lg font-semibold mb-1 
              group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors"
                          >
                            {voice.name}
                          </h3>
                          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                            <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                            </div>
                            <span>Public</span>
                          </div>
                        </div>
                      </div>

                      {/* Details */}
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        {voice.gender}
                      </p>

                      <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-4">
                        <span className="font-medium text-gray-800 dark:text-gray-300">
                          Languages:
                        </span>
                        <div className="flex items-center gap-1 text-gray-700 dark:text-gray-200">
                          {voice.languages.map((flag, index) => (
                            <span key={index}>{flag}</span>
                          ))}
                          <span className="text-gray-500 dark:text-gray-400">
                            +{voice.languageCount}
                          </span>
                        </div>
                      </div>

                      {/* Voice Visualizer */}
                      <div
                        className="flex items-center gap-2 sm:gap-3 mb-4 rounded-lg p-3 shadow-inner
          bg-gradient-to-t from-gray-100 via-gray-50 to-white 
          dark:from-gray-950 dark:via-gray-800 dark:to-gray-700"
                      >
                        <button className="flex-shrink-0 text-indigo-500 dark:text-indigo-400 hover:opacity-80 transition-colors">
                          <Play className="w-5 h-5" />
                        </button>
                        <div className="flex-1 flex items-end gap-[2px] h-14 overflow-hidden">
                          {Array.from({ length: 35 }).map((_, i) => (
                            <div
                              key={i}
                              className="flex-1 rounded-md bg-gradient-to-t from-indigo-500 via-purple-500 to-pink-400 transition-all duration-300 ease-in-out"
                              style={{
                                height: `${Math.random() * 70 + 30}%`,
                                animation: `pulse ${
                                  Math.random() * 1.2 + 0.8
                                }s ease-in-out infinite alternate`,
                                animationDelay: `${i * 0.05}s`,
                              }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Button */}
                      <button
                        onClick={() => handleUseVoice(voice.name)}
                        className="w-full font-medium py-2.5 rounded-lg transition-all duration-300
            bg-gradient-to-r from-indigo-500 to-purple-500 text-white
            hover:from-indigo-600 hover:to-purple-600 hover:shadow-[0_0_20px_rgba(147,51,234,0.3)]
            dark:from-indigo-600 dark:to-purple-600 dark:hover:shadow-[0_0_25px_rgba(147,51,234,0.4)]"
                      >
                        Use this voice
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="text-gray-500 text-lg mb-2 dark:text-gray-400">
                    No voices found
                  </div>
                  <p className="text-gray-600 text-sm dark:text-gray-500">
                    Try adjusting your search or filters
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Upgrade Modal */}
        {showUpgradeModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
            <div className="relative bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl max-w-md w-full p-6 sm:p-8 border border-gray-700 shadow-[0_0_40px_rgba(0,0,0,0.6)] transition-transform duration-300 scale-100 hover:scale-[1.02]">
              {/* Close Button */}
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Icon */}
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(255,165,0,0.4)]">
                  <Crown className="w-8 h-8 text-white drop-shadow-md" />
                </div>

                {/* Title + Text */}
                <h2 className="text-2xl font-bold text-white mb-2">
                  Upgrade Required
                </h2>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  To use{" "}
                  <span className="text-white font-semibold">
                    {selectedVoice}
                  </span>{" "}
                  voice, please upgrade your plan to unlock premium features.
                </p>

                {/* Buttons */}
                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-[0_0_25px_rgba(147,51,234,0.5)] transition-all">
                    Upgrade Now
                  </button>
                  <button
                    onClick={() => setShowUpgradeModal(false)}
                    className="w-full bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium py-3 rounded-lg transition-colors border border-gray-600"
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
