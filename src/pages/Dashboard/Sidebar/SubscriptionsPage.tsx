import { MoreVertical } from "lucide-react";
import { useState } from "react";

interface Subscription {
  id: string;
  name: string;
  workspace: string;
  status: "Active" | "Canceled" | "Pending";
  plan: string;
  billing: string;
  price: string;
  created: string;
}

const mockSubscriptions: Subscription[] = [
  {
    id: "1",
    name: "Welcome Pass",
    workspace: "Personal",
    status: "Canceled",
    plan: "Welcome Pass",
    billing: "Monthly",
    price: "-",
    created: "November 25",
  },
  {
    id: "2",
    name: "Welcome Pass",
    workspace: "Personal",
    status: "Canceled",
    plan: "Welcome Pass",
    billing: "Monthly",
    price: "-",
    created: "November 25",
  },
  {
    id: "3",
    name: "Welcome Pass",
    workspace: "Personal",
    status: "Canceled",
    plan: "Welcome Pass",
    billing: "Monthly",
    price: "-",
    created: "November 25",
  },
  {
    id: "4",
    name: "Welcome Pass",
    workspace: "Personal",
    status: "Canceled",
    plan: "Welcome Pass",
    billing: "Monthly",
    price: "-",
    created: "November 24",
  },
  {
    id: "5",
    name: "Welcome Pass",
    workspace: "Personal",
    status: "Active",
    plan: "Welcome Pass",
    billing: "Monthly",
    price: "$29",
    created: "November 25",
  },
  {
    id: "6",
    name: "Pro Plan",
    workspace: "Business",
    status: "Active",
    plan: "Pro Plan",
    billing: "Yearly",
    price: "$299",
    created: "November 24",
  },
  {
    id: "7",
    name: "Starter Plan",
    workspace: "Personal",
    status: "Pending",
    plan: "Starter Plan",
    billing: "Monthly",
    price: "$9",
    created: "November 24",
  },
  {
    id: "8",
    name: "Enterprise Plan",
    workspace: "Corporate",
    status: "Active",
    plan: "Enterprise Plan",
    billing: "Yearly",
    price: "$999",
    created: "November 23",
  },
  {
    id: "9",
    name: "Welcome Pass",
    workspace: "Personal",
    status: "Canceled",
    plan: "Welcome Pass",
    billing: "Monthly",
    price: "-",
    created: "November 24",
  },
];

const SubscriptionsPage = () => {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [planFilter, setPlanFilter] = useState<string>("all");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400";
      case "Canceled":
        return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400";
      case "Pending":
        return "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400";
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300";
    }
  };

  const filteredSubscriptions = mockSubscriptions.filter((sub) => {
    const matchesStatus = statusFilter === "all" || sub.status === statusFilter;
    const matchesPlan = planFilter === "all" || sub.plan === planFilter;
    return matchesStatus && matchesPlan;
  });

  const uniquePlans = Array.from(new Set(mockSubscriptions.map((s) => s.plan)));

  const handleExport = () => {
    // Convert subscriptions to CSV format
    const headers = ["ID", "Name", "Workspace", "Status", "Plan", "Billing", "Price", "Created"];
    const csvRows = [headers.join(",")];

    filteredSubscriptions.forEach((sub) => {
      const row = [
        sub.id,
        `"${sub.name}"`,
        `"${sub.workspace}"`,
        sub.status,
        `"${sub.plan}"`,
        sub.billing,
        sub.price,
        `"${sub.created}"`,
      ];
      csvRows.push(row.join(","));
    });

    const csvContent = csvRows.join("\n");
    
    // Create a Blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    link.setAttribute("href", url);
    link.setAttribute("download", `subscriptions_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Subscriptions
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage and monitor all subscription plans
          </p>
        </div>
        <button 
          onClick={handleExport}
          className="px-4 py-2 text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors shadow-sm"
        >
          Export
        </button>
      </div>

      {/* Filters and Count */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-sm bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
              >
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Canceled">Canceled</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            {/* Plan Filter */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Plan
              </label>
              <select
                value={planFilter}
                onChange={(e) => setPlanFilter(e.target.value)}
                className="text-sm bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
              >
                <option value="all">All Plans</option>
                {uniquePlans.map((plan) => (
                  <option key={plan} value={plan}>
                    {plan}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Count */}
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Total <span className="font-semibold text-gray-900 dark:text-white">{filteredSubscriptions.length}</span> subscriptions
          </div>
        </div>
      </div>

      {/* Subscriptions Table/List */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        {/* Table Header - Hidden on mobile */}
        <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-4 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
          <div className="col-span-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Subscription
          </div>
          <div className="col-span-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Plan
          </div>
          <div className="col-span-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Price
          </div>
          <div className="col-span-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Created
          </div>
          <div className="col-span-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Status
          </div>
          <div className="col-span-1"></div>
        </div>

        {/* Subscriptions List */}
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredSubscriptions.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                No subscriptions found
              </p>
            </div>
          ) : (
            filteredSubscriptions.map((subscription) => (
              <div
                key={subscription.id}
                className="px-4 sm:px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
              >
                {/* Mobile Layout */}
                <div className="md:hidden space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-10 h-10 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
                          <span className="text-sm font-semibold text-violet-700 dark:text-violet-400">
                            WP
                          </span>
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                            {subscription.name}
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Workspace: {subscription.workspace}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            subscription.status
                          )}`}
                        >
                          {subscription.status}
                        </span>
                        <span className="text-xs text-gray-600 dark:text-gray-300">
                          {subscription.plan} • {subscription.billing}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {subscription.price}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {subscription.created}
                        </span>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 ml-2">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:grid md:grid-cols-12 gap-4 items-center">
                  <div className="col-span-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-semibold text-violet-700 dark:text-violet-400">
                        WP
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-medium text-gray-900 dark:text-white text-sm truncate">
                        {subscription.name}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        Workspace: {subscription.workspace}
                      </p>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-900 dark:text-white">
                      {subscription.plan}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {subscription.billing}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {subscription.price}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {subscription.created}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        subscription.status
                      )}`}
                    >
                      {subscription.status}
                    </span>
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionsPage;
