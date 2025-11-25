import {
    Bot,
    Calendar,
    ChevronDown,
    Filter,
    MoreVertical,
    Plus,
    Search,
    X,
} from "lucide-react";
import { useState } from "react";

interface Assistant {
  id: string;
  name: string;
  avatar?: string;
  initials: string;
  created: string;
  status: "active" | "inactive";
  backgroundColor: string;
}

const Assistants = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const [sortBy, setSortBy] = useState("default");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAssistantName, setNewAssistantName] = useState("");

  // Mock data - replace with actual data from your backend
  const [assistants, setAssistants] = useState<Assistant[]>([
    {
      id: "1",
      name: "Language Tutor",
      initials: "LT",
      created: "November 10",
      status: "active",
      backgroundColor: "bg-blue-600",
    },
    {
      id: "2",
      name: "Assistant Helper",
      initials: "AH",
      created: "November 12",
      status: "active",
      backgroundColor: "bg-gray-700",
    },
    {
      id: "3",
      name: "Mail Guru",
      avatar: "📧",
      initials: "MG",
      created: "May 17, 2024",
      status: "active",
      backgroundColor: "bg-orange-500",
    },
    {
      id: "4",
      name: "Captain Contradiction",
      initials: "CC",
      created: "August 5",
      status: "active",
      backgroundColor: "bg-gray-700",
    },
    {
      id: "5",
      name: "Katsy",
      avatar: "🐱",
      initials: "K",
      created: "May 17, 2024",
      status: "active",
      backgroundColor: "bg-orange-600",
    },
  ]);

  const toggleStatus = (id: string) => {
    setAssistants(
      assistants.map((assistant) =>
        assistant.id === id
          ? {
              ...assistant,
              status: assistant.status === "active" ? "inactive" : "active",
            }
          : assistant
      )
    );
  };

  const handleAddAssistant = () => {
    if (newAssistantName.trim()) {
      const colors = ["bg-blue-600", "bg-purple-600", "bg-green-600", "bg-red-600", "bg-yellow-600", "bg-pink-600"];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const newAssistant: Assistant = {
        id: Date.now().toString(),
        name: newAssistantName,
        initials: newAssistantName.substring(0, 2).toUpperCase(),
        created: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric" }),
        status: "active",
        backgroundColor: randomColor,
      };
      setAssistants([newAssistant, ...assistants]);
      setNewAssistantName("");
      setShowAddModal(false);
    }
  };

  const filteredAssistants = assistants.filter((assistant) => {
    const matchesSearch = assistant.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || assistant.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sortedAssistants = [...filteredAssistants].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "date") {
      return new Date(b.created).getTime() - new Date(a.created).getTime();
    }
    return 0;
  });

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
          Assistants
        </h1>
        <button 
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#9EFF00] hover:bg-[#8EEF00] text-gray-900 font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
        >
          <Plus className="w-5 h-5" />
          <span>Add assistant</span>
        </button>
      </div>

      {/* Add Assistant Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Add New Assistant</h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setNewAssistantName("");
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Assistant Name
                </label>
                <input
                  type="text"
                  value={newAssistantName}
                  onChange={(e) => setNewAssistantName(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddAssistant()}
                  placeholder="Enter assistant name..."
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  autoFocus
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setNewAssistantName("");
                  }}
                  className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddAssistant}
                  disabled={!newAssistantName.trim()}
                  className="flex-1 px-4 py-2.5 bg-[#9EFF00] hover:bg-[#8EEF00] text-gray-900 font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Assistant
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filters Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 mb-6 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search assistants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg">
            <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Status</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as "all" | "active" | "inactive")}
              className="bg-transparent border-none text-sm text-gray-800 dark:text-white focus:outline-none cursor-pointer"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <span className="text-sm text-gray-600 dark:text-gray-400">Sort by:</span>
              <span className="text-sm font-medium text-gray-800 dark:text-white">
                {sortBy === "name" ? "Name" : sortBy === "date" ? "Date" : "Default"}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>

            {showSortDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
                <button
                  onClick={() => {
                    setSortBy("default");
                    setShowSortDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 first:rounded-t-lg"
                >
                  Default
                </button>
                <button
                  onClick={() => {
                    setSortBy("name");
                    setShowSortDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Name
                </button>
                <button
                  onClick={() => {
                    setSortBy("date");
                    setShowSortDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 last:rounded-b-lg"
                >
                  Date
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Total Count */}
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total <span className="text-blue-500 font-medium">{filteredAssistants.length} assistants</span>
          </p>
        </div>
      </div>

      {/* Assistants Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Assistant
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Created
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {sortedAssistants.map((assistant) => (
                <tr
                  key={assistant.id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-200 hover:shadow-sm cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg ${assistant.backgroundColor} flex items-center justify-center font-semibold text-white text-sm shadow-md`}
                      >
                        {assistant.avatar || assistant.initials}
                      </div>
                      <span className="font-medium text-gray-800 dark:text-white">
                        {assistant.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      {assistant.created}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleStatus(assistant.id)}
                      className={`relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all hover:scale-105 ${
                        assistant.status === "active"
                          ? "bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30"
                          : "bg-gray-500/20 text-gray-400 border border-gray-500/30 hover:bg-gray-500/30"
                      }`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          assistant.status === "active" ? "bg-green-400" : "bg-gray-400"
                        }`}
                      />
                      <span className="capitalize">{assistant.status}</span>
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end">
                      <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">
                        <MoreVertical className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden divide-y divide-gray-200 dark:divide-gray-700">
          {sortedAssistants.map((assistant) => (
            <div
              key={assistant.id}
              className="p-4 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-200 hover:shadow-md cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-lg ${assistant.backgroundColor} flex items-center justify-center font-semibold text-white shadow-md`}
                  >
                    {assistant.avatar || assistant.initials}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">
                      {assistant.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
                      <Calendar className="w-3 h-3" />
                      {assistant.created}
                    </p>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => toggleStatus(assistant.id)}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    assistant.status === "active"
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      assistant.status === "active" ? "bg-green-400" : "bg-gray-400"
                    }`}
                  />
                  <span className="capitalize">{assistant.status}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sortedAssistants.length === 0 && (
          <div className="text-center py-12">
            <Bot className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400">No assistants found</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-400 dark:text-gray-500">
          All rights reserved. © 2025 Aineedx | Version 3.6.5
        </p>
      </div>
    </div>
  );
};

export default Assistants;
