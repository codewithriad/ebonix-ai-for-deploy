import { useTheme } from "@/pages/HomePage/ThemeProvider";
import {
    ChevronDown,
    MoreVertical,
    Plus,
    Search,
} from "lucide-react";
import { useState } from "react";

interface Plugin {
  id: string;
  name: string;
  description: string;
  version: string;
  author: string;
  status: "active" | "inactive";
}

const Plugins = () => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // Mock plugin data
  const plugins: Plugin[] = [
    {
      id: "1",
      name: "Cryptomus",
      description: "Cryptomus integration for Alkeedo",
      version: "1.0.0",
      author: "Alkeedo",
      status: "active",
    },
    {
      id: "2",
      name: "Loops",
      description: "Loops integration for Alkeedo",
      version: "1.0.0",
      author: "Alkeedo",
      status: "active",
    },
    {
      id: "3",
      name: "Brevo",
      description: "Brevo integration for Alkeedo",
      version: "1.0.0",
      author: "Alkeedo",
      status: "active",
    },
    {
      id: "4",
      name: "Mailchimp",
      description: "Mailchimp integration for Alkeedo",
      version: "1.0.0",
      author: "Alkeedo",
      status: "active",
    },
    {
      id: "5",
      name: "Cloud Storage",
      description: "Cloud storage (CDN) integration for Alkeedo",
      version: "1.4.0",
      author: "Alkeedo",
      status: "active",
    },
    {
      id: "6",
      name: "Razorpay",
      description: "Razorpay integration for Alkeedo",
      version: "3.0.0",
      author: "Alkeedo",
      status: "active",
    },
    {
      id: "7",
      name: "Iyzico",
      description: "Iyzico integration for Alkeedo",
      version: "3.0.1",
      author: "Alkeedo",
      status: "active",
    },
    {
      id: "8",
      name: "Paystack",
      description: "Paystack integration for Alkeedo",
      version: "3.0.1",
      author: "Alkeedo",
      status: "active",
    },
    {
      id: "9",
      name: "YooKassa",
      description: "YooKassa integration for Alkeedo",
      version: "3.0.1",
      author: "Alkeedo",
      status: "active",
    },
  ];

  const filteredPlugins = plugins.filter((plugin) => {
    const matchesSearch =
      plugin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plugin.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || plugin.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h1
              className={`text-2xl sm:text-3xl font-bold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Plugins
            </h1>
            <button 
              onClick={() => alert('Install plugin functionality - This would open a modal or navigate to plugin marketplace')}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg transition-all duration-300 flex items-center gap-2 justify-center hover:scale-105 shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Install plugin
            </button>
          </div>

          {/* Search and Filter */}
          <div
            className={`rounded-xl border p-4 mb-6 ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200 shadow-md"
            }`}
          >
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full border rounded-lg pl-10 pr-4 py-2.5 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    theme === "dark"
                      ? "bg-gray-900 border-gray-700 text-white placeholder-gray-400"
                      : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className={`appearance-none border rounded-lg pl-4 pr-10 py-2.5 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer ${
                    theme === "dark"
                      ? "bg-gray-900 border-gray-700 text-white"
                      : "bg-gray-50 border-gray-300 text-gray-900"
                  }`}
                >
                  <option value="all">Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <ChevronDown
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                />
              </div>
            </div>

            {/* Plugin Count */}
            <div
              className={`mt-3 text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Total {filteredPlugins.length} plugins
            </div>
          </div>

          {/* Plugin Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {filteredPlugins.map((plugin) => (
              <div
                key={plugin.id}
                className={`rounded-xl border p-5 transition-all duration-300 hover:scale-[1.02] ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700 hover:border-gray-600"
                    : "bg-white border-gray-200 hover:border-gray-300 shadow-md hover:shadow-lg"
                }`}
              >
                {/* Card Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`text-lg font-semibold mb-1 ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {plugin.name}
                    </h3>
                    {plugin.status === "active" && (
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs font-medium text-green-500">
                          Active
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Three-dot Menu */}
                  <div className="relative">
                    <button
                      onClick={() =>
                        setOpenMenuId(openMenuId === plugin.id ? null : plugin.id)
                      }
                      className={`p-2 rounded-lg transition-colors ${
                        theme === "dark"
                          ? "hover:bg-gray-700"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <MoreVertical
                        className={`w-5 h-5 ${
                          theme === "dark" ? "text-gray-400" : "text-gray-600"
                        }`}
                      />
                    </button>

                    {/* Dropdown Menu */}
                    {openMenuId === plugin.id && (
                      <div
                        className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg border z-10 ${
                          theme === "dark"
                            ? "bg-gray-800 border-gray-700"
                            : "bg-white border-gray-200"
                        }`}
                      >
                        <button
                          className={`w-full text-left px-4 py-2 text-sm transition-colors rounded-t-lg ${
                            theme === "dark"
                              ? "hover:bg-gray-700 text-gray-300"
                              : "hover:bg-gray-100 text-gray-700"
                          }`}
                        >
                          Configure
                        </button>
                        <button
                          className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                            theme === "dark"
                              ? "hover:bg-gray-700 text-gray-300"
                              : "hover:bg-gray-100 text-gray-700"
                          }`}
                        >
                          Disable
                        </button>
                        <button
                          className={`w-full text-left px-4 py-2 text-sm transition-colors rounded-b-lg ${
                            theme === "dark"
                              ? "hover:bg-gray-700 text-red-400"
                              : "hover:bg-gray-100 text-red-600"
                          }`}
                        >
                          Uninstall
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p
                  className={`text-sm mb-4 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {plugin.description}
                </p>

                {/* Version and Author */}
                <div
                  className={`text-xs ${
                    theme === "dark" ? "text-gray-500" : "text-gray-500"
                  }`}
                >
                  Version {plugin.version} | by{" "}
                  <span className="font-medium">{plugin.author}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredPlugins.length === 0 && (
            <div className="text-center py-12">
              <p
                className={`text-lg ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                No plugins found
              </p>
            </div>
          )}

          {/* Footer */}
          <div
            className={`text-center text-sm py-4 ${
              theme === "dark" ? "text-gray-500" : "text-gray-500"
            }`}
          >
            All rights reserved. © 2025 Alkeedo | Version 3.8.5
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plugins;
