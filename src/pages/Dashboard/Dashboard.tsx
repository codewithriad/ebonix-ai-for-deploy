import { DollarSign, ShoppingCart, TrendingUp, Users } from "lucide-react";
import { NavLink } from "react-router-dom";
import CustomerSatisfactions from "./CustomerSatisfactions";
import LatestOrders from "./LatestOrders";
import KpiCard from "./shared/KpiCard";
import SalesChart from "./shared/SalesChart";
import TopCountries from "./shared/TopCountries";
import UsersCard from "./shared/UsersCard";

const Dashboard = () => {
  return (
    <>
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300">
            Dashboard
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Welcome back! Here's what's happening with your store today.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors shadow-sm shadow-violet-200 dark:shadow-none">
            Download Report
          </button>
        </div>
      </div>

      {/* 🔹 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <KpiCard
          title="Total Sales"
          value="$3,245"
          icon={<DollarSign size={20} />}
          trend="12%"
          trendDir="up"
          color="violet"
        />
        <KpiCard
          title="Orders"
          value="217"
          icon={<ShoppingCart size={20} />}
          trend="3%"
          trendDir="down"
          color="blue"
        />
        <KpiCard
          title="Visitors"
          value="1,200"
          icon={<Users size={20} />}
          trend="7%"
          trendDir="up"
          color="emerald"
        />
        <KpiCard
          title="Growth"
          value="8.5%"
          icon={<TrendingUp size={20} />}
          trend="1.5%"
          trendDir="up"
          color="amber"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart - Takes up 2 columns on large screens */}
        <div className="lg:col-span-2 w-full flex flex-col bg-white dark:bg-gray-900 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
          {/* header */}
          <div className="flex justify-between items-center gap-4 mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Sales Overview
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Compare your sales performance over time
              </p>
            </div>
            <select className="text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1.5 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500/20">
              <option>Last 30 Days</option>
              <option>Last 7 Days</option>
              <option>This Year</option>
            </select>
          </div>

          {/* chart */}
          <div className="w-full flex-1 min-h-[300px]">
            <SalesChart />
          </div>
        </div>

        {/* Right Column: Top Countries & Users */}
        <div className="flex flex-col gap-6">
          {/* top countries */}
          <div className="flex-1 bg-white dark:bg-gray-900 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 flex flex-col">
            <div className="flex justify-between items-center gap-4 mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Top Countries
              </h2>
              <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <EllipsisVerticalIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <TopCountries />
            </div>
          </div>

          {/* users card */}
          <div className="flex-1 bg-white dark:bg-gray-900 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                New Users
              </h2>
              <NavLink
                to="/dashboard/all-users"
                className="text-xs font-medium text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300"
              >
                View All
              </NavLink>
            </div>
            <div className="flex-1 overflow-y-auto">
              <UsersCard />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* latest orders - Takes up 2 columns on XL screens */}
        <div className="xl:col-span-2">
          <LatestOrders />
        </div>
        
        {/* customer satisfaction */}
        <div className="xl:col-span-1">
          <CustomerSatisfactions />
        </div>
      </div>
    </>
  );
};

// Helper for the ellipsis icon since it wasn't imported
function EllipsisVerticalIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12a.75.75 0 110-1.5.75.75 0 010 1.5zM12 17.25a.75.75 0 110-1.5.75.75 0 010 1.5z" />
    </svg>
  );
}

export default Dashboard;
