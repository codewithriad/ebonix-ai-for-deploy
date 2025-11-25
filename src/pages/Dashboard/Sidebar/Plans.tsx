import { ChevronDown, MoreVertical, Plus, Search, X } from "lucide-react";
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
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPlan, setNewPlan] = useState({
    name: "",
    shortCode: "",
    billingCycle: "Monthly" as "Monthly" | "Yearly" | "One time",
    price: "",
    status: "Active" as "Active" | "Inactive",
    featured: false,
  });

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

  const handleCreatePlan = () => {
    setShowCreateModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setNewPlan({
      name: "",
      shortCode: "",
      billingCycle: "Monthly",
      price: "",
      status: "Active",
      featured: false,
    });
  };

  const handleSubmitPlan = (e: React.FormEvent) => {
    e.preventDefault();
    
    const plan: Plan = {
      id: String(plans.length + 1),
      name: newPlan.name,
      shortCode: newPlan.shortCode,
      billingCycle: newPlan.billingCycle,
      price: parseFloat(newPlan.price),
      created: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      status: newPlan.status,
      featured: newPlan.featured,
    };

    setPlans([plan, ...plans]);
    handleCloseModal();
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Plans</h1>
          <button 
            onClick={handleCreatePlan}
            className="px-4 py-2 bg-lime-400 hover:bg-lime-500 text-gray-900 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create new plan
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-6 shadow-md">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            {/* Search */}
            <div className="flex-1 w-full relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" />
              <input
                type="text"
                placeholder="Search plans..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg pl-10 pr-4 py-2.5 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Billing Cycle Filter */}
            <button className="px-4 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors flex items-center gap-2 text-sm text-gray-900 dark:text-white">
              <span className="text-gray-500 dark:text-gray-400">⊝</span>
              <span>Billing cycle</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* Status Filter */}
            <button className="px-4 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors flex items-center gap-2 text-sm text-gray-900 dark:text-white">
              <span className="text-gray-500 dark:text-gray-400">⊝</span>
              <span>Status</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <span className="text-gray-600 dark:text-gray-400 text-sm whitespace-nowrap">
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 border-none rounded-lg px-3 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm appearance-none cursor-pointer pr-8"
              >
                <option value="default" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">Default</option>
                <option value="name" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">Name</option>
                <option value="price" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">Price</option>
                <option value="created" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">Created</option>
              </select>
              <ChevronDown className="w-4 h-4 -ml-7 pointer-events-none text-gray-600 dark:text-gray-400" />
            </div>
          </div>
        </div>

        {/* Total Count */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Total {filteredPlans.length} plans
        </p>

        {/* Plans Table */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-md">
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Billing cycle
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="w-12"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredPlans.map((plan) => (
                  <tr
                    key={plan.id}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-gray-200 dark:bg-gray-700 flex items-center justify-center font-bold text-sm text-gray-900 dark:text-white">
                          {plan.shortCode}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900 dark:text-white">{plan.name}</span>
                          {plan.featured && (
                            <span className="px-2 py-0.5 bg-green-500/20 text-green-600 dark:text-green-400 rounded text-xs font-medium">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                      {plan.billingCycle}
                    </td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">
                      ${plan.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{plan.created}</td>
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
                              ? "text-green-600 dark:text-green-400"
                              : "text-gray-600 dark:text-gray-400"
                          }`}
                        >
                          {plan.status}
                        </span>
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors">
                        <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredPlans.map((plan) => (
              <div
                key={plan.id}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 flex flex-col gap-4 hover:border-gray-300 dark:hover:border-gray-600 transition-colors shadow-md"
              >
                {/* Card Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-gray-200 dark:bg-gray-700 flex items-center justify-center font-bold text-sm text-gray-900 dark:text-white">
                      {plan.shortCode}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900 dark:text-white">{plan.name}</span>
                        {plan.featured && (
                          <span className="px-2 py-0.5 bg-green-500/20 text-green-600 dark:text-green-400 rounded text-xs font-medium">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{plan.billingCycle}</p>
                    </div>
                  </div>
                  <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors">
                    <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>

                {/* Card Body */}
                <div className="flex items-end justify-between border-t border-gray-200 dark:border-gray-700 pt-4 mt-auto">
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      ${plan.price.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
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
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Create Plan Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 max-w-md w-full shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Create New Plan</h2>
              <button
                onClick={handleCloseModal}
                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmitPlan} className="p-6 space-y-4">
              {/* Plan Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Plan Name *
                </label>
                <input
                  type="text"
                  required
                  value={newPlan.name}
                  onChange={(e) =>
                    setNewPlan({ ...newPlan, name: e.target.value })
                  }
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter plan name"
                />
              </div>

              {/* Short Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Short Code *
                </label>
                <input
                  type="text"
                  required
                  maxLength={3}
                  value={newPlan.shortCode}
                  onChange={(e) =>
                    setNewPlan({ ...newPlan, shortCode: e.target.value.toUpperCase() })
                  }
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., AP"
                />
              </div>

              {/* Billing Cycle */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Billing Cycle *
                </label>
                <select
                  value={newPlan.billingCycle}
                  onChange={(e) =>
                    setNewPlan({
                      ...newPlan,
                      billingCycle: e.target.value as "Monthly" | "Yearly" | "One time",
                    })
                  }
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Monthly" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">Monthly</option>
                  <option value="Yearly" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">Yearly</option>
                  <option value="One time" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">One time</option>
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Price *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-400">
                    $
                  </span>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={newPlan.price}
                    onChange={(e) =>
                      setNewPlan({ ...newPlan, price: e.target.value })
                    }
                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg pl-8 pr-4 py-2.5 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Status
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setNewPlan({
                      ...newPlan,
                      status: newPlan.status === "Active" ? "Inactive" : "Active",
                    })
                  }
                  className="flex items-center gap-2"
                >
                  <div
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      newPlan.status === "Active"
                        ? "bg-green-600"
                        : "bg-gray-600"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        newPlan.status === "Active"
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      newPlan.status === "Active"
                        ? "text-green-400"
                        : "text-gray-400"
                    }`}
                  >
                    {newPlan.status}
                  </span>
                </button>
              </div>

              {/* Featured */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={newPlan.featured}
                  onChange={(e) =>
                    setNewPlan({ ...newPlan, featured: e.target.checked })
                  }
                  className="w-4 h-4 bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-700 rounded text-blue-600 focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor="featured" className="text-sm text-gray-700 dark:text-gray-300">
                  Mark as featured
                </label>
              </div>

              {/* Modal Footer */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-lime-400 hover:bg-lime-500 text-gray-900 rounded-lg font-medium transition-colors"
                >
                  Create Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
