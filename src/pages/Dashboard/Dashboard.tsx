import { DollarSign, ShoppingCart, TrendingUp, Users } from "lucide-react";
import CustomerSatisfactions from "./CustomerSatisfactions";
import LatestOrders from "./LaetstOrders";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import KpiCard from "./shared/KpiCard";
import SalesChart from "./shared/SalesChart";
import TopCountries from "./shared/TopCountries";
import UsersCard from "./shared/UsersCard";

const Dashboard = () => {
  return (
    <section className="flex h-screen w-full">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-4 bg-muted space-y-6">
          {/* Left: Hide title on mobile on main contain */}
          <div className="text-lg font-semibold text-gray-800 dark:text-white hidden md:block">
            Dashboard
          </div>
          {/* 🔹 KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard
              title="Total Sales"
              value="$3,245"
              icon={<DollarSign />}
              trend="12%"
              trendDir="up"
            />
            <KpiCard
              title="Orders"
              value="217"
              icon={<ShoppingCart />}
              trend="3%"
              trendDir="down"
            />
            <KpiCard
              title="Visitors"
              value="1,200"
              icon={<Users />}
              trend="7%"
              trendDir="up"
            />
            <KpiCard
              title="Growth"
              value="8.5%"
              icon={<TrendingUp />}
              trend="1.5%"
              trendDir="up"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* left of chart */}
            <div className="w-full flex flex-col bg-white dark:bg-gray-900 p-4 rounded-xl shadow">
              {/* header */}
              <div className="flex justify-between items-center gap-4 mb-3">
                <h2 className="text-lg font-semibold">Sales Overview</h2>
                <p className="text-sm text-gray-500">Last 30 Days</p>
              </div>

              {/* chart */}
              <div className="w-full">
                <SalesChart />
              </div>
            </div>

            {/* 🔹 Right Half: 2 Stacked Cards (equal height) */}
            <div className="flex flex-col md:flex-row gap-4 h-full">
              {/* top countries */}
              <div className="flex-1 bg-white dark:bg-gray-900 p-4 rounded-xl shadow flex flex-col">
                <div className="flex justify-between items-center gap-4 mb-3">
                  <h2 className="text-lg font-semibold">Top Countries</h2>
                  <p className="text-sm text-gray-500">Last 30 Days</p>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <TopCountries />
                </div>
              </div>

              {/* users card */}
              <div className="flex-1 bg-white dark:bg-gray-900 p-4 rounded-xl shadow flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                    Users
                  </h2>
                  <a
                    href="/all-users"
                    className="text-sm text-indigo-500 hover:underline"
                  >
                    View All
                  </a>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <UsersCard />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {/* latest orders */}
            <LatestOrders />
            {/* customer satisfaction */}
            <CustomerSatisfactions />
          </div>
        </main>
      </div>
    </section>
  );
};

export default Dashboard;
