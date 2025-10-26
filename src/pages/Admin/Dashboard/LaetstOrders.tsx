import React from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

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

export default function LatestOrders() {
  return (
    <div className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Latest orders
        </h2>
        <button className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition">
          View all
        </button>
      </div>

      {/* Table Header Row */}
      <div className="hidden md:grid md:grid-cols-6 px-4 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
        <span>Order</span>
        <span>Status</span>
        <span>Credits</span>
        <span>Total</span>
        <span>Created</span>
        <span className="text-right w-6"></span> {/* Blank label for menu */}
      </div>

      {/* Orders List */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {orders.map((order) => (
          <div
            key={order.id}
            className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 bg-white dark:bg-gray-800"
          >
            {/* Order Info */}
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {order.title}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {order.type}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Workspace:{" "}
                <span className="text-gray-900 dark:text-white">
                  {order.workspace}
                </span>
              </p>
            </div>

            {/* Status */}
            <div>
              <p className="text-sm text-gray-900 dark:text-white">
                {order.status}
              </p>
            </div>

            {/* Credits */}
            <div>
              <p className="text-sm text-gray-900 dark:text-white">
                {order.credits}
              </p>
            </div>

            {/* Total */}
            <div>
              <p className="text-sm text-gray-900 dark:text-white">
                {order.total}{" "}
                <span className="text-gray-500 dark:text-gray-400">
                  {order.billing}
                </span>
              </p>
            </div>

            {/* Created */}
            <div>
              <p className="text-sm text-gray-900 dark:text-white">
                {order.created}
              </p>
            </div>

            {/* Menu Icon */}
            <div className="flex items-center justify-end">
              <EllipsisVerticalIcon className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600 dark:hover:text-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
