import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";

interface Order {
  id: number;
  title: string;
  type: string;
  workspace: string;
  status: string;
  credits: string;
  total: string;
  billing: string;
  created: string;
}

const orders: Order[] = [
  {
    id: 1,
    title: "Spark",
    type: "Monthly",
    workspace: "Personal",
    status: "Draft",
    credits: "1,500",
    total: "$19.00",
    billing: "per month",
    created: "July 12",
  },
  {
    id: 2,
    title: "Spark",
    type: "Monthly",
    workspace: "Personal",
    status: "Draft",
    credits: "1,500",
    total: "$19.00",
    billing: "per month",
    created: "July 12",
  },
  {
    id: 3,
    title: "Spark",
    type: "Monthly",
    workspace: "Personal",
    status: "Completed",
    credits: "1,500",
    total: "$19.00",
    billing: "per month",
    created: "May 17",
  },
  {
    id: 4,
    title: "Spark",
    type: "Monthly",
    workspace: "Personal",
    status: "Draft",
    credits: "1,500",
    total: "$19.00",
    billing: "per month",
    created: "February 21",
  },
  {
    id: 5,
    title: "Quanta",
    type: "Add-on credit",
    workspace: "Personal",
    status: "Pending",
    credits: "12,000",
    total: "$99.00",
    billing: "one-time",
    created: "February 4",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20";
    case "Pending":
      return "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200 dark:border-amber-500/20";
    case "Draft":
      return "bg-gray-100 text-gray-700 dark:bg-gray-500/10 dark:text-gray-400 border-gray-200 dark:border-gray-500/20";
    default:
      return "bg-gray-100 text-gray-700 dark:bg-gray-500/10 dark:text-gray-400 border-gray-200 dark:border-gray-500/20";
  }
};

export default function LatestOrders() {
  return (
    <div className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Latest orders
        </h2>
        <NavLink to="/dashboard/all-orders">
          <button className="text-xs font-medium bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            View all
          </button>
        </NavLink>
      </div>

      {/* Table Header Row */}
      <div className="hidden md:grid md:grid-cols-6 px-5 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
        <span>Order</span>
        <span>Status</span>
        <span>Credits</span>
        <span>Total</span>
        <span>Created</span>
        <span className="text-right w-6"></span> {/* Blank label for menu */}
      </div>

      {/* Orders List */}
      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        {orders.map((order) => (
          <div
            key={order.id}
            className="grid grid-cols-1 md:grid-cols-6 gap-4 p-5 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          >
            {/* Order Info */}
            <div className="flex flex-col justify-center">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {order.title}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {order.type}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Workspace:{" "}
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  {order.workspace}
                </span>
              </p>
            </div>

            {/* Status */}
            <div className="flex items-center">
              <span
                className={`text-xs px-2.5 py-1 rounded-full border font-medium ${getStatusColor(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </div>

            {/* Credits */}
            <div className="flex items-center">
              <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                {order.credits}
              </p>
            </div>

            {/* Total */}
            <div className="flex items-center">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {order.total}{" "}
                <span className="text-xs font-normal text-gray-500 dark:text-gray-400 ml-1">
                  {order.billing}
                </span>
              </p>
            </div>

            {/* Created */}
            <div className="flex items-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {order.created}
              </p>
            </div>

            {/* Menu Icon */}
            <div className="flex items-center justify-end">
              <button className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                <EllipsisVerticalIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
