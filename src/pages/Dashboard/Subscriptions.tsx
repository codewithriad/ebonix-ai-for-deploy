import { MoreVertical } from "lucide-react";
import { NavLink } from "react-router-dom";

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
    created: "November 25",
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
];

const Subscriptions = () => {
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

  return (
    <section className="w-full h-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Subscriptions
        </h2>
        <NavLink
          to="/dashboard/subscriptions"
          className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition"
        >
          View all
        </NavLink>
      </div>

      {/* Table Header - Hidden on mobile */}
      <div className="hidden md:grid md:grid-cols-12 gap-4 px-4 py-3 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
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
      <div className="overflow-y-auto max-h-[400px]">
        {mockSubscriptions.map((subscription) => (
          <div
            key={subscription.id}
            className="px-4 py-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
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
        ))}
      </div>
    </section>
  );
};

export default Subscriptions;
