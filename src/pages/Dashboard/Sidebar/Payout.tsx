import {
    ArrowLeft,
    Building2,
    Calendar,
    ChevronRight,
    CreditCard,
    DollarSign,
    Edit,
    Mail,
    MapPin,
    MoreVertical,
    User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PayoutHistoryItem {
  id: number;
  amount: string;
  date: string;
  status: "Completed" | "Pending" | "Failed";
  method: string;
}

const payoutHistory: PayoutHistoryItem[] = [
  {
    id: 1,
    amount: "$150.00",
    date: "Jan 11, 2025",
    status: "Completed",
    method: "Bank Transfer",
  },
  {
    id: 2,
    amount: "$150.00",
    date: "Jan 12, 2025",
    status: "Completed",
    method: "PayPal",
  },
  {
    id: 3,
    amount: "$150.00",
    date: "Jan 13, 2025",
    status: "Pending",
    method: "Bank Transfer",
  },
  {
    id: 4,
    amount: "$150.00",
    date: "Jan 14, 2025",
    status: "Completed",
    method: "PayPal",
  },
];

const getStatusColor = (status: PayoutHistoryItem["status"]) => {
  switch (status) {
    case "Completed":
      return "bg-green-500/20 text-green-400 border-green-500/30";
    case "Pending":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    case "Failed":
      return "bg-red-500/20 text-red-400 border-red-500/30";
    default:
      return "bg-gray-500/20 text-gray-400 border-gray-500/30";
  }
};

export default function Payout() {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="hover:text-gray-800 dark:hover:text-white transition-colors"
        >
          Dashboard
        </button>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-800 dark:text-white font-medium">
          Payout & Billing
        </span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
          Payout & Billing
        </h1>
        <button
          onClick={() => navigate("/dashboard")}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-white font-medium rounded-lg transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* Billing Information */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Billing Information
          </h2>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <Edit className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <User className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Account Holder
              </p>
              <p className="font-medium text-gray-800 dark:text-white">
                John Doe
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Mail className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
              <p className="font-medium text-gray-800 dark:text-white">
                johndoe@example.com
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Country
              </p>
              <p className="font-medium text-gray-800 dark:text-white">
                United States
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Billing Address
              </p>
              <p className="font-medium text-gray-800 dark:text-white">
                221B Baker Street, NY
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payout Methods */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Payout Methods
        </h2>

        <div className="space-y-3">
          {/* Bank Transfer */}
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center shadow-md">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-800 dark:text-white">
                  Bank Transfer
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  **** 3940 · Chase Bank
                </p>
              </div>
            </div>
            <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-white rounded-lg transition-colors text-sm font-medium">
              Manage
            </button>
          </div>

          {/* PayPal */}
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center shadow-md">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-800 dark:text-white">
                  PayPal
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  johndoe@paypal.com
                </p>
              </div>
            </div>
            <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-white rounded-lg transition-colors text-sm font-medium">
              Manage
            </button>
          </div>
        </div>
      </div>

      {/* Payout History */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Payout History
          </h2>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Payout
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Method
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Amount
                </th>
                <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {payoutHistory.map((payout) => (
                <tr
                  key={payout.id}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-200"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center shadow-md">
                        <DollarSign className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-medium text-gray-800 dark:text-white">
                        Payout #{payout.id}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {payout.method}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      {payout.date}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusColor(
                        payout.status
                      )}`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${
                          payout.status === "Completed"
                            ? "bg-green-400"
                            : payout.status === "Pending"
                            ? "bg-yellow-400"
                            : "bg-red-400"
                        }`}
                      />
                      {payout.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-gray-800 dark:text-white">
                      {payout.amount}
                    </span>
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
          {payoutHistory.map((payout) => (
            <div
              key={payout.id}
              className="p-4 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-green-600 flex items-center justify-center shadow-md">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">
                      Payout #{payout.id}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {payout.method}
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
                    Date:
                  </span>
                  <span className="text-gray-800 dark:text-white flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {payout.date}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">
                    Amount:
                  </span>
                  <span className="font-semibold text-gray-800 dark:text-white">
                    {payout.amount}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusColor(
                    payout.status
                  )}`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      payout.status === "Completed"
                        ? "bg-green-400"
                        : payout.status === "Pending"
                        ? "bg-yellow-400"
                        : "bg-red-400"
                    }`}
                  />
                  {payout.status}
                </span>
              </div>
            </div>
          ))}
        </div>
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
