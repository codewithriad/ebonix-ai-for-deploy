import { useMemo, useState } from "react";

// Dummy data
type Order = {
  id: number;
  title: string;
  sub: string;
  status: string;
  credits: number;
  total: string;
  created: string;
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
  },
  {
    id: 2,
    title: "Spark",
    sub: "Monthly",
    status: "Draft",
    credits: 1500,
    total: "$19.00 per month",
    created: "July 12",
  },
  {
    id: 3,
    title: "Quanta",
    sub: "Add-on credit",
    status: "Pending",
    credits: 12000,
    total: "$99.00 one-time",
    created: "February 4",
  },
  {
    id: 4,
    title: "Spark",
    sub: "Monthly",
    status: "Completed",
    credits: 1500,
    total: "$19.00 per month",
    created: "May 17",
  },
  {
    id: 5,
    title: "Spark",
    sub: "Monthly",
    status: "Draft",
    credits: 1500,
    total: "$19.00 per month",
    created: "February 21",
  },
  {
    id: 6,
    title: "Spark",
    sub: "Monthly",
    status: "Completed",
    credits: 1500,
    total: "$19.00 per month",
    created: "Oct 24, 2024",
  },
  {
    id: 7,
    title: "Spark",
    sub: "Monthly",
    status: "Failed",
    credits: 1500,
    total: "RUB 19.00 per month",
    created: "Oct 23, 2024",
  },
  {
    id: 8,
    title: "Nova",
    sub: "Annual",
    status: "Completed",
    credits: 5000,
    total: "$199.00 per year",
    created: "March 3",
  },
  {
    id: 9,
    title: "Blaze",
    sub: "Monthly",
    status: "Pending",
    credits: 2000,
    total: "$29.00 per month",
    created: "April 12",
  },
  {
    id: 10,
    title: "Helix",
    sub: "Add-on credit",
    status: "Completed",
    credits: 3000,
    total: "$25.00 one-time",
    created: "January 8",
  },
  {
    id: 11,
    title: "Spark",
    sub: "Monthly",
    status: "Draft",
    credits: 1500,
    total: "$19.00 per month",
    created: "August 15",
  },
  {
    id: 12,
    title: "Credit purchase",
    sub: "Add-on credit",
    status: "Completed",
    credits: 800,
    total: "$8.00 one-time",
    created: "September 9",
  },
];

export default function AllOrders() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sort, setSort] = useState("Default");

  const filtered = useMemo(() => {
    let data = [...orders];

    if (search) {
      data = data.filter((o) =>
        o.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (statusFilter !== "All") {
      data = data.filter((o) => o.status === statusFilter);
    }

    if (sort === "Date") {
      data = data.sort((a, b) => a.id - b.id);
    }

    return data;
  }, [search, statusFilter, sort]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-6">Orders</h1>

        {/* Top controls */}
        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search orders..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-gray-800 border border-gray-700 px-3 py-2 rounded-lg w-full md:w-64 focus:outline-none"
            />

            <select
              className="bg-gray-800 border border-gray-700 px-3 py-2 rounded-lg"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All</option>
              <option>Completed</option>
              <option>Pending</option>
              <option>Draft</option>
              <option>Failed</option>
            </select>
          </div>

          <select
            className="bg-gray-800 border border-gray-700 px-3 py-2 rounded-lg w-full md:w-auto"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option>Default</option>
            <option>Date</option>
          </select>
        </div>

        {/* Orders list */}
        <div className="mt-6 space-y-4">
          {filtered.map((o) => (
            <div
              key={o.id}
              className="bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-gray-600 transition-all"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{o.title}</p>
                  <p className="text-gray-400 text-sm">{o.sub}</p>
                  <p className="text-gray-400 text-xs mt-1">
                    Workspace: Personal
                  </p>
                </div>

                <button className="text-gray-400 hover:text-white">⋮</button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4 text-sm">
                <p>
                  <span className="text-gray-400">Status:</span> {o.status}
                </p>
                <p>
                  <span className="text-gray-400">Credits:</span> {o.credits}
                </p>
                <p>
                  <span className="text-gray-400">Total:</span> {o.total}
                </p>
                <p>
                  <span className="text-gray-400">Created:</span> {o.created}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
