import {
    ArrowLeft,
    Calendar,
    ChevronDown,
    CreditCard,
    Filter,
    MoreVertical,
    Package,
    Search,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

// Dummy data
type Order = {
  id: number;
  title: string;
  sub: string;
  status: "Completed" | "Pending" | "Draft" | "Failed" | "Processing";
  credits: number;
  total: string;
  created: string;
  workspace: string;
};

const orders: Order[] = [
  {
    id: 1,
    title: "Credit purchase",
    sub: "Add-on credit",
    status: "Completed",
    credits: 1000,
    total: "$10.00 one-time",
    created: "October 7",
    workspace: "Personal",
  },
  {
    id: 2,
    title: "Spark",
    sub: "Monthly",
    status: "Draft",
    credits: 1500,
    total: "$19.00 per month",
    created: "July 12",
    workspace: "Personal",
  },
  {
    id: 3,
    title: "Quanta",
    sub: "Add-on credit",
    status: "Pending",
    credits: 12000,
    total: "$99.00 one-time",
    created: "February 4",
    workspace: "Personal",
  },
  {
    id: 4,
    title: "Spark",
    sub: "Monthly",
    status: "Completed",
    credits: 1500,
    total: "$19.00 per month",
    created: "May 17",
    workspace: "Personal",
  },
  {
    id: 5,
    title: "Spark",
    sub: "Monthly",
    status: "Draft",
    credits: 1500,
    total: "$19.00 per month",
    created: "February 21",
    workspace: "Acme, Inc.",
  },
  {
    id: 6,
    title: "Spark",
    sub: "Monthly",
    status: "Completed",
    credits: 1500,
    total: "$19.00 per month",
    created: "Oct 24, 2024",
    workspace: "Personal",
  },
  {
    id: 7,
    title: "Spark",
    sub: "Monthly",
    status: "Failed",
    credits: 1500,
    total: "RUB 19.00 per month",
    created: "Oct 23, 2024",
    workspace: "Personal",
  },
  {
    id: 8,
    title: "Nova",
    sub: "Annual",
    status: "Completed",
    credits: 5000,
    total: "$199.00 per year",
    created: "March 3",
    workspace: "Personal",
  },
  {
    id: 9,
    title: "Blaze",
    sub: "Monthly",
    status: "Pending",
    credits: 2000,
    total: "$29.00 per month",
    created: "April 12",
    workspace: "Personal",
  },
  {
    id: 10,
    title: "Helix",
    sub: "Add-on credit",
    status: "Processing",
    credits: 3000,
    total: "$25.00 one-time",
    created: "January 8",
    workspace: "Personal",
  },
  {
    id: 11,
    title: "Spark",
    sub: "Monthly",
    status: "Draft",
    credits: 1500,
    total: "$19.00 per month",
    created: "August 15",
    workspace: "Personal",
  },
  {
    id: 12,
    title: "Credit purchase",
    sub: "Add-on credit",
    status: "Completed",
    credits: 800,
    total: "$8.00 one-time",
    created: "September 9",
    workspace: "Personal",
  },
];

const getStatusColor = (status: Order["status"]) => {
  switch (status) {
    case "Completed":
      return "bg-green-500/20 text-green-400 border-green-500/30";
    case "Pending":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    case "Failed":
      return "bg-red-500/20 text-red-400 border-red-500/30";
    case "Draft":
      return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    case "Processing":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/30";
  }
};

export default function AllOrders() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const filtered = useMemo(() => {
    let data = [...orders];

    if (search) {
      data = data.filter(
        (o) =>
          o.title.toLowerCase().includes(search.toLowerCase()) ||
          o.sub.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (statusFilter !== "All") {
      data = data.filter((o) => o.status === statusFilter);
    }

    if (sortBy === "date") {
      data = data.sort((a, b) => a.id - b.id);
    } else if (sortBy === "credits") {
      data = data.sort((a, b) => b.credits - a.credits);
    }

    return data;
  }, [search, statusFilter, sortBy]);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
          Orders
        </h1>
        <button
          onClick={() => navigate("/dashboard")}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-white font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 mb-6 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg">
            <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Status
            </span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent border-none text-sm text-gray-800 dark:text-white focus:outline-none cursor-pointer"
            >
              <option value="All">All</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Draft">Draft</option>
              <option value="Failed">Failed</option>
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Sort by:
              </span>
              <span className="text-sm font-medium text-gray-800 dark:text-white">
                {sortBy === "date"
                  ? "Date"
                  : sortBy === "credits"
                  ? "Credits"
                  : "Default"}
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
                    setSortBy("date");
                    setShowSortDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Date
                </button>
                <button
                  onClick={() => {
                    setSortBy("credits");
                    setShowSortDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 last:rounded-b-lg"
                >
                  Credits
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Total Count */}
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total{" "}
            <span className="text-blue-500 font-medium">
              {filtered.length} orders
            </span>
          </p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Order
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Workspace
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Credits
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Total
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Created
                </th>
                <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filtered.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-200 hover:shadow-sm"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center shadow-md">
                        <Package className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">
                          {order.title}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {order.sub}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {order.workspace}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusColor(
                        order.status
                      )}`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          order.status === "Completed"
                            ? "bg-green-400"
                            : order.status === "Pending"
                            ? "bg-yellow-400"
                            : order.status === "Failed"
                            ? "bg-red-400"
                            : order.status === "Processing"
                            ? "bg-blue-400"
                            : "bg-gray-400"
                        }`}
                      />
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <CreditCard className="w-4 h-4" />
                      {order.credits.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-gray-800 dark:text-white">
                      {order.total}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      {order.created}
                    </div>
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
          {filtered.map((order) => (
            <div
              key={order.id}
              className="p-4 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-200 hover:shadow-md"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center shadow-md">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">
                      {order.title}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {order.sub}
                    </p>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">
                    Workspace:
                  </span>
                  <span className="text-gray-800 dark:text-white">
                    {order.workspace}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">
                    Credits:
                  </span>
                  <span className="text-gray-800 dark:text-white flex items-center gap-1">
                    <CreditCard className="w-4 h-4" />
                    {order.credits.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">
                    Total:
                  </span>
                  <span className="font-medium text-gray-800 dark:text-white">
                    {order.total}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">
                    Created:
                  </span>
                  <span className="text-gray-800 dark:text-white flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {order.created}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusColor(
                    order.status
                  )}`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      order.status === "Completed"
                        ? "bg-green-400"
                        : order.status === "Pending"
                        ? "bg-yellow-400"
                        : order.status === "Failed"
                        ? "bg-red-400"
                        : order.status === "Processing"
                        ? "bg-blue-400"
                        : "bg-gray-400"
                    }`}
                  />
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400">No orders found</p>
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
}
