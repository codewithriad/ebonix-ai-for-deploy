
import { IconArrowNarrowLeft } from '@tabler/icons-react';
import { Backpack, MoreVertical, Search } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const statusList = ['Draft', 'Pending', 'Failed', 'Processing', 'Completed'];
const planList = [
    'Internal (Monthly/Yearly)',
    'One-time',
    'Quanta (One-time)',
    'Welcome Pass (Monthly/Yearly)',
    'Apex (Monthly/Yearly)',
    'Flow (Monthly/Yearly)',
    'Spark (Monthly/Yearly)',
    'Free',
];
const billingCycles = ['Monthly', 'Yearly', 'Lifetime', 'Add-on credit'];

interface Order {
    name: string;
    type: string;
    workspace: string;
    status: string;
    credits: string;
    total: string;
    totalType: string;
    created: string;
}

const mockOrders: Order[] = new Array(13).fill(null).map((_, i) => ({
    name: i > 10 ? 'Demo Plan' : i > 9 ? 'Quanta' : i > 7 ? 'Blitz' : 'Spark',
    type: i === 12 ? 'Monthly' : i > 10 ? 'Monthly' : i > 7 ? 'Add-on credit' : 'Monthly',
    workspace: i === 12 ? 'Acme, Inc.' : 'Personal',
    status: statusList[i % statusList.length],
    credits: i === 12 ? '100K' : i > 7 ? '29,900' : '1,500',
    total: i > 7 ? 'RUB 298.00' : '$19.00',
    totalType: i > 7 ? 'one-time' : 'per month',
    created: ['July 12', 'May 17', 'Feb 21', 'Feb 4', 'Oct 23', 'Jul 18, 2024', 'Apr 10, 2024'][i % 7],
}));

const AllOrders = () => {
    const [sortBy, setSortBy] = useState('Date');
    const [statusFilter, setStatusFilter] = useState('');
    const [planFilter, setPlanFilter] = useState('');
    const [billingFilter, setBillingFilter] = useState('');

    const filteredOrders = mockOrders.filter((order) => {
        const matchesStatus = statusFilter ? order.status === statusFilter : true;
        const matchesPlan = planFilter ? order.name.includes(planFilter) : true;
        const matchesBilling = billingFilter
            ? order.type.toLowerCase().includes(billingFilter.toLowerCase())
            : true;
        return matchesStatus && matchesPlan && matchesBilling;
    });

    return (
        <div className="p-6 bg-white dark:bg-black min-h-screen text-black dark:text-white">
            <div className='flex justify-between items-center mb-4 w-full lg:max-w-screen-2xl mx-auto'>
                <h1 className="text-2xl font-bold mb-6">Orders</h1>
                <Link to="/dashboard">
                    <button className="flex items-center gap-1 text-black hover:text-green-500 dark:text-white dark:hover:text-green-500 transition-all duration-300">
                        <span className="pr-0 group-hover:pr-2 transition-all duration-300">
                            <IconArrowNarrowLeft />
                        </span>
                        Back to Dashboard
                    </button>
                </Link>

            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3 mb-6 w-full lg:max-w-screen-2xl mx-auto">
                {/* Search input */}
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 w-full md:w-auto">
                    <Search className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent outline-none text-sm w-full text-black dark:text-white"
                    />
                </div>

                {/* Status */}
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 bg-gray-100 dark:bg-gray-800 text-sm rounded-full text-black dark:text-white"
                >
                    <option value="">Status</option>
                    {statusList.map((status) => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select>

                {/* Plan */}
                <select
                    value={planFilter}
                    onChange={(e) => setPlanFilter(e.target.value)}
                    className="px-3 py-2 bg-gray-100 dark:bg-gray-800 text-sm rounded-full text-black dark:text-white"
                >
                    <option value="">Plan</option>
                    {planList.map((plan) => (
                        <option key={plan} value={plan.split(' ')[0]}>{plan}</option>
                    ))}
                </select>

                {/* Billing Cycle */}
                <select
                    value={billingFilter}
                    onChange={(e) => setBillingFilter(e.target.value)}
                    className="px-3 py-2 bg-gray-100 dark:bg-gray-800 text-sm rounded-full text-black dark:text-white"
                >
                    <option value="">Billing cycle</option>
                    {billingCycles.map((cycle) => (
                        <option key={cycle} value={cycle}>{cycle}</option>
                    ))}
                </select>

                {/* Export Button */}
                <div className="ml-auto">
                    <button className="px-4 py-2 bg-gray-800 dark:bg-gray-100 text-white dark:text-black rounded-md text-sm">
                        Export
                    </button>
                </div>

                {/* Sort Dropdown */}
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 bg-gray-100 dark:bg-gray-800 text-sm rounded text-black dark:text-white"
                >
                    <option value="Date">Date</option>
                    <option value="Status">Status</option>
                    <option value="Credits">Credits</option>
                </select>
            </div>

            {/* Orders List */}
            <div className="w-full lg:max-w-6xl mx-auto space-y-3">
                {filteredOrders.map((order, idx) => (
                    <div
                        key={idx}
                        className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 flex justify-between items-center bg-white dark:bg-gray-900 shadow-sm"
                    >
                        <div>
                            <div className="font-semibold text-base">{order.name}</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">{order.type}</div>
                            <div className="text-xs text-gray-600 dark:text-gray-500">
                                Workspace: <span className="font-medium">{order.workspace}</span>
                            </div>
                        </div>

                        <div className="text-sm font-medium">{order.status}</div>
                        <div className="text-sm">{order.credits}</div>

                        <div className="text-sm font-medium">
                            {order.total}
                            <div className="text-xs text-gray-500 dark:text-gray-400">{order.totalType}</div>
                        </div>

                        <div className="text-sm text-gray-500 dark:text-gray-400">{order.created}</div>
                        <MoreVertical className="w-4 h-4 text-gray-500 dark:text-gray-400 cursor-pointer" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllOrders;
