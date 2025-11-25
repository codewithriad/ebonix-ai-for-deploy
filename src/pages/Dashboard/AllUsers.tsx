import { db } from "@/firebase/firebase.config";
import { useTheme } from "@/pages/HomePage/ThemeProvider";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import {
    Calendar,
    CheckCircle,
    Download,
    Edit,
    Filter,
    Mail,
    MoreVertical,
    RefreshCw,
    Search,
    Shield,
    Trash2,
    UserCheck,
    UserX,
    XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  verified: boolean;
  createdAt: string;
}

export default function AllUsers() {
  const { theme } = useTheme();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "users"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const usersData: User[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          email: data.email,
          role: data.role,
          status: data.status,
          verified: data.verified,
          createdAt:
            data.createdAt?.toDate().toISOString() || new Date().toISOString(),
        };
      });
      setUsers(usersData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    const matchesStatus =
      filterStatus === "all" || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleBadgeStyle = (role: string) => {
    const styles = {
      admin: "bg-purple-500/20 text-purple-400 border border-purple-500/30",
      user: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
      moderator: "bg-orange-500/20 text-orange-400 border border-orange-500/30",
    };
    return styles[role as keyof typeof styles] || styles.user;
  };

  const getStatusBadgeStyle = (status: string) => {
    const styles = {
      active: "bg-green-500/20 text-green-400 border border-green-500/30",
      inactive: "bg-gray-500/20 text-gray-400 border border-gray-500/30",
      suspended: "bg-red-500/20 text-red-400 border border-red-500/30",
    };
    return styles[status as keyof typeof styles] || styles.active;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const stats = {
    total: users.length,
    active: users.filter((u) => u.status === "active").length,
    verified: users.filter((u) => u.verified).length,
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-50"
      }`}>
        <RefreshCw className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === "dark" 
        ? "bg-gray-900 text-white" 
        : "bg-gray-50 text-gray-900"
    }`}>
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              All Users
            </h1>
            <p className={`text-sm sm:text-base ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}>
              Manage and monitor all registered users
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className={`rounded-xl p-4 sm:p-6 transition-all duration-300 hover:scale-105 ${
              theme === "dark"
                ? "bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20"
                : "bg-white border border-blue-200 shadow-lg shadow-blue-100"
            }`}>
              <div className="flex items-center justify-between mb-2">
                <p className={`text-sm font-medium ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}>
                  Total Users
                </p>
                <UserCheck className="w-5 h-5 text-blue-500" />
              </div>
              <p className={`text-2xl sm:text-3xl font-bold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>
                {stats.total}
              </p>
            </div>

            <div className={`rounded-xl p-4 sm:p-6 transition-all duration-300 hover:scale-105 ${
              theme === "dark"
                ? "bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20"
                : "bg-white border border-green-200 shadow-lg shadow-green-100"
            }`}>
              <div className="flex items-center justify-between mb-2">
                <p className={`text-sm font-medium ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}>
                  Active Users
                </p>
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <p className={`text-2xl sm:text-3xl font-bold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>
                {stats.active}
              </p>
            </div>

            <div className={`rounded-xl p-4 sm:p-6 transition-all duration-300 hover:scale-105 sm:col-span-2 lg:col-span-1 ${
              theme === "dark"
                ? "bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20"
                : "bg-white border border-purple-200 shadow-lg shadow-purple-100"
            }`}>
              <div className="flex items-center justify-between mb-2">
                <p className={`text-sm font-medium ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}>
                  Verified Users
                </p>
                <Shield className="w-5 h-5 text-purple-500" />
              </div>
              <p className={`text-2xl sm:text-3xl font-bold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>
                {stats.verified}
              </p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className={`rounded-xl border p-4 mb-6 ${
            theme === "dark"
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200 shadow-md"
          }`}>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`} />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full border rounded-lg pl-10 pr-4 py-2.5 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    theme === "dark"
                      ? "bg-gray-900 border-gray-700 text-white placeholder-gray-400"
                      : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                />
              </div>

              {/* Filter Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-2.5 rounded-lg transition-all duration-300 flex items-center gap-2 justify-center whitespace-nowrap ${
                  theme === "dark"
                    ? "bg-gray-700 hover:bg-gray-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-900"
                }`}
              >
                <Filter className="w-5 h-5" />
                <span className="hidden sm:inline">Filters</span>
              </button>

              {/* Export Button */}
              <button className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 flex items-center gap-2 justify-center whitespace-nowrap hover:scale-105">
                <Download className="w-5 h-5" />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>

            {/* Filter Dropdowns */}
            {showFilters && (
              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 pt-4 border-t ${
                theme === "dark" ? "border-gray-700" : "border-gray-200"
              }`}>
                <div>
                  <label className={`block text-sm mb-2 font-medium ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}>
                    Role
                  </label>
                  <select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    className={`w-full border rounded-lg px-4 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      theme === "dark"
                        ? "bg-gray-900 border-gray-700 text-white"
                        : "bg-gray-50 border-gray-300 text-gray-900"
                    }`}
                  >
                    <option value="all">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="moderator">Moderator</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm mb-2 font-medium ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}>
                    Status
                  </label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className={`w-full border rounded-lg px-4 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      theme === "dark"
                        ? "bg-gray-900 border-gray-700 text-white"
                        : "bg-gray-50 border-gray-300 text-gray-900"
                    }`}
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Users Table */}
          <div className={`rounded-xl border overflow-hidden shadow-lg ${
            theme === "dark"
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}>
            {/* Desktop View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className={`border-b ${
                  theme === "dark"
                    ? "bg-gray-900 border-gray-700"
                    : "bg-gray-50 border-gray-200"
                }`}>
                  <tr>
                    <th className={`text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}>
                      User
                    </th>
                    <th className={`text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}>
                      Role
                    </th>
                    <th className={`text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}>
                      Status
                    </th>
                    <th className={`text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}>
                      Verified
                    </th>
                    <th className={`text-left px-6 py-4 text-xs font-semibold uppercase tracking-wider ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}>
                      Joined
                    </th>
                    <th className={`text-right px-6 py-4 text-xs font-semibold uppercase tracking-wider ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${
                  theme === "dark" ? "divide-gray-700" : "divide-gray-200"
                }`}>
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className={`transition-colors ${
                        theme === "dark" ? "hover:bg-gray-750" : "hover:bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-semibold text-white shadow-lg">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <p className={`font-medium truncate ${
                              theme === "dark" ? "text-white" : "text-gray-900"
                            }`}>
                              {user.name}
                            </p>
                            <p className={`text-sm flex items-center gap-1 truncate ${
                              theme === "dark" ? "text-gray-400" : "text-gray-600"
                            }`}>
                              <Mail className="w-3 h-3 flex-shrink-0" />
                              <span className="truncate">{user.email}</span>
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getRoleBadgeStyle(
                            user.role
                          )}`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusBadgeStyle(
                            user.status
                          )}`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {user.verified ? (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        ) : (
                          <XCircle className="w-5 h-5 text-gray-500" />
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <p className={`text-sm flex items-center gap-1 whitespace-nowrap ${
                          theme === "dark" ? "text-gray-400" : "text-gray-600"
                        }`}>
                          <Calendar className="w-4 h-4" />
                          {formatDate(user.createdAt)}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            className={`p-2 rounded-lg transition-colors ${
                              theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
                            }`}
                            title="Edit"
                          >
                            <Edit className="w-4 h-4 text-blue-500" />
                          </button>
                          <button
                            className={`p-2 rounded-lg transition-colors ${
                              theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
                            }`}
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                          <button
                            className={`p-2 rounded-lg transition-colors ${
                              theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
                            }`}
                            title="More"
                          >
                            <MoreVertical className={`w-4 h-4 ${
                              theme === "dark" ? "text-gray-400" : "text-gray-600"
                            }`} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Tablet View (md to lg) */}
            <div className="hidden md:block lg:hidden overflow-x-auto">
              <table className="w-full">
                <thead className={`border-b ${
                  theme === "dark"
                    ? "bg-gray-900 border-gray-700"
                    : "bg-gray-50 border-gray-200"
                }`}>
                  <tr>
                    <th className={`text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}>
                      User
                    </th>
                    <th className={`text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}>
                      Details
                    </th>
                    <th className={`text-right px-4 py-3 text-xs font-semibold uppercase tracking-wider ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${
                  theme === "dark" ? "divide-gray-700" : "divide-gray-200"
                }`}>
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className={`transition-colors ${
                        theme === "dark" ? "hover:bg-gray-750" : "hover:bg-gray-50"
                      }`}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-semibold text-white shadow-lg">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <p className={`font-medium truncate ${
                              theme === "dark" ? "text-white" : "text-gray-900"
                            }`}>
                              {user.name}
                            </p>
                            <p className={`text-sm truncate ${
                              theme === "dark" ? "text-gray-400" : "text-gray-600"
                            }`}>
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeStyle(
                              user.role
                            )}`}
                          >
                            {user.role}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeStyle(
                              user.status
                            )}`}
                          >
                            {user.status}
                          </span>
                          {user.verified && (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            className={`p-2 rounded-lg transition-colors ${
                              theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
                            }`}
                            title="Edit"
                          >
                            <Edit className="w-4 h-4 text-blue-500" />
                          </button>
                          <button
                            className={`p-2 rounded-lg transition-colors ${
                              theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
                            }`}
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile View */}
            <div className="md:hidden divide-y divide-gray-700">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className={`p-4 transition-colors ${
                    theme === "dark" ? "hover:bg-gray-750" : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-semibold text-lg text-white shadow-lg flex-shrink-0">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className={`font-medium truncate ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}>
                          {user.name}
                        </p>
                        <p className={`text-sm truncate ${
                          theme === "dark" ? "text-gray-400" : "text-gray-600"
                        }`}>
                          {user.email}
                        </p>
                      </div>
                    </div>
                    {user.verified && (
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 ml-2" />
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeStyle(
                        user.role
                      )}`}
                    >
                      {user.role}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeStyle(
                        user.status
                      )}`}
                    >
                      {user.status}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                      theme === "dark"
                        ? "bg-gray-700 text-gray-300"
                        : "bg-gray-200 text-gray-700"
                    }`}>
                      <Calendar className="w-3 h-3" />
                      {formatDate(user.createdAt)}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button className="flex-1 min-w-[120px] px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2">
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button className={`px-3 py-2 rounded-lg transition-colors ${
                      theme === "dark"
                        ? "bg-gray-700 hover:bg-gray-600 text-white"
                        : "bg-gray-200 hover:bg-gray-300 text-gray-900"
                    }`}>
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <UserX className={`w-12 h-12 mx-auto mb-3 ${
                  theme === "dark" ? "text-gray-600" : "text-gray-400"
                }`} />
                <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
                  No users found
                </p>
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className={`mt-4 text-center text-sm ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}>
            Showing {filteredUsers.length} of {users.length} users
          </div>
        </div>
      </div>
    </div>
  );
}
