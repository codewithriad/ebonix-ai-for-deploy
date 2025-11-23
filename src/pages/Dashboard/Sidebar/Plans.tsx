import { ChevronDown, MoreVertical, Plus, Search } from "lucide-react";
import { useState } from "react";

interface Plan {
  id: string;
  name: string;
  shortCode: string;
  billingCycle: "Monthly" | "Yearly" | "One time";
  price: number;
  created: string;
  status: "Active" | "Inactive";
  featured?: boolean;
}

export default function Plans() {
  const [plans, setPlans] = useState<Plan[]>([
    {
      id: "1",
      name: "Internal",
      shortCode: "I",
      billingCycle: "Monthly",
      price: 10.0,
      created: "Aug 5, 2024",
      status: "Inactive",
    },
    {
      id: "2",
      name: "Blitz",
      shortCode: "B",
      billingCycle: "One time",
      price: 299.0,
      created: "Jul 18, 2024",
      status: "Active",
    },
    {
      id: "3",
      name: "Quanta",
      shortCode: "Q",
      billingCycle: "One time",
      price: 99.0,
      created: "Jul 18, 2024",
      status: "Active",
    },
    {
      id: "4",
      name: "Welcome Pass",
      shortCode: "WP",
      billingCycle: "Monthly",
      price: 5.0,
      created: "May 3, 2024",
      status: "Inactive",
    },
    {
      id: "5",
      name: "Apex",
      shortCode: "A",
      billingCycle: "Yearly",
      price: 990.0,
      created: "Mar 25, 2024",
      status: "Active",
      featured: true,
    },
    {
      id: "6",
      name: "Flow",
      shortCode: "F",
      billingCycle: "Yearly",
      price: 590.0,
      created: "Mar 25, 2024",
      status: "Active",
    },
    {
      id: "7",
      name: "Spark",
      shortCode: "S",
      billingCycle: "Yearly",
      price: 190.0,
      created: "Mar 25, 2024",
      status: "Active",
    },
    {
      id: "8",
      name: "Apex",
      shortCode: "A",
      billingCycle: "Monthly",
      price: 99.0,
      created: "Mar 25, 2024",
      status: "Active",
    },
    {
      id: "9",
      name: "Flow",
      shortCode: "F",
      billingCycle: "Monthly",
      price: 59.0,
      created: "Mar 25, 2024",
      status: "Active",
      featured: true,
    },
    {
      id: "10",
      name: "Spark",
      shortCode: "S",
      billingCycle: "Monthly",
      price: 19.0,
      created: "Mar 25, 2024",
      status: "Active",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterBillingCycle, setFilterBillingCycle] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const toggleStatus = (id: string) => {
    setPlans(
      plans.map((plan) =>
        plan.id === id
          ? {
              ...plan,
              status:
                plan.status === "Active"
                  ? "Inactive"
                  : ("Active" as "Active" | "Inactive"),
            }
          : plan
      )
    );
  };

  const filteredPlans = plans.filter((plan) => {
    const matchesSearch = plan.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesBilling =
      filterBillingCycle === "all" || plan.billingCycle === filterBillingCycle;
    const matchesStatus =
      filterStatus === "all" || plan.status === filterStatus;
    return matchesSearch && matchesBilling && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold">Plans</h1>
          <button className="px-4 py-2 bg-lime-400 hover:bg-lime-500 text-gray-900 rounded-lg font-medium transition-colors flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Create new plan
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            {/* Search */}
            <div className="flex-1 w-full relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search plans..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Billing Cycle Filter */}
            <button className="px-4 py-2.5 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors flex items-center gap-2 text-sm">
              <span className="text-gray-400">⊝</span>
              <span>Billing cycle</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* Status Filter */}
            <button className="px-4 py-2.5 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors flex items-center gap-2 text-sm">
              <span className="text-gray-400">⊝</span>
              <span>Status</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm whitespace-nowrap">
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-700 hover:bg-gray-600 border-none rounded-lg px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm appearance-none cursor-pointer pr-8"
              >
                <option value="default">Default</option>
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="created">Created</option>
              </select>
              <ChevronDown className="w-4 h-4 -ml-7 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Total Count */}
        <p className="text-sm text-gray-400 mb-4">
          Total {filteredPlans.length} plans
        </p>

        {/* Plans Table */}
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-850 border-b border-gray-700">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Billing cycle
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="w-12"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredPlans.map((plan) => (
                  <tr
                    key={plan.id}
                    className="hover:bg-gray-750 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-gray-700 flex items-center justify-center font-bold text-sm">
                          {plan.shortCode}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{plan.name}</span>
                          {plan.featured && (
                            <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded text-xs font-medium">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {plan.billingCycle}
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      ${plan.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-gray-300">{plan.created}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleStatus(plan.id)}
                        className="flex items-center gap-2 group"
                      >
                        <div
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            plan.status === "Active"
                              ? "bg-green-600"
                              : "bg-gray-600"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              plan.status === "Active"
                                ? "translate-x-6"
                                : "translate-x-1"
                            }`}
                          />
                        </div>
                        <span
                          className={`text-sm font-medium ${
                            plan.status === "Active"
                              ? "text-green-400"
                              : "text-gray-400"
                          }`}
                        >
                          {plan.status}
                        </span>
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-1 hover:bg-gray-700 rounded transition-colors">
                        <MoreVertical className="w-5 h-5 text-gray-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden divide-y divide-gray-700">
            {filteredPlans.map((plan) => (
              <div
                key={plan.id}
                className="p-4 hover:bg-gray-750 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-gray-700 flex items-center justify-center font-bold text-sm">
                      {plan.shortCode}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{plan.name}</span>
                        {plan.featured && (
                          <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded text-xs font-medium">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400">
                        {plan.billingCycle}
                      </p>
                    </div>
                  </div>
                  <button className="p-1 hover:bg-gray-700 rounded transition-colors">
                    <MoreVertical className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-xl font-bold">
                      ${plan.price.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-400">
                      Created {plan.created}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleStatus(plan.id)}
                    className="flex items-center gap-2"
                  >
                    <div
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        plan.status === "Active"
                          ? "bg-green-600"
                          : "bg-gray-600"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          plan.status === "Active"
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        plan.status === "Active"
                          ? "text-green-400"
                          : "text-gray-400"
                      }`}
                    >
                      {plan.status}
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
