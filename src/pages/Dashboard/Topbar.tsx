import useDarkMode from "@/hooks/useDarkMode";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import {
  Bell,
  ChevronDown,
  CreditCard,
  Globe,
  HelpCircle,
  LogOut,
  Menu,
  Moon,
  Search,
  Settings,
  ShoppingBag,
  Sun,
  User,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/firebase.config";

const DEFAULT_USER_STATE = {
  name: "Guest",
  email: "",
  photoURL:
    "https://ui-avatars.com/api/?name=Guest&background=6366f1&color=fff",
  plan: "Free Plan",
};

const Topbar = ({ onMenuClick }: { onMenuClick?: () => void }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userData, setUserData] = useState(DEFAULT_USER_STATE);
  const [loading, setLoading] = useState(true);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { enabled, toggle } = useDarkMode();

  // Fetch user data from Firebase
  useEffect(() => {
    const fetchUserData = async (user) => {
      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserData({
            name: data.displayName || data.name || user.displayName || "User",
            email: data.email || user.email,
            photoURL:
              data.photoURL ||
              user.photoURL ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                user.displayName || "User"
              )}&background=6366f1&color=fff`,
            plan: data.plan || data.subscription || "Free Plan",
          });
        } else {
          setUserData({
            name: user.displayName || "User",
            email: user.email,
            photoURL:
              user.photoURL ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                user.displayName || "User"
              )}&background=6366f1&color=fff`,
            plan: "Free Plan",
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserData({
          name: user.displayName || "User",
          email: user.email,
          photoURL:
            user.photoURL ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              user.displayName || "User"
            )}&background=6366f1&color=fff`,
          plan: "Free Plan",
        });
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData(user);
      } else {
        setUserData(DEFAULT_USER_STATE);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setNotificationOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () =>
      document.removeEventListener("click", handleClickOutside, true);
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Mock notifications
  const notifications = [
    { id: 1, title: "New message received", time: "5m ago", unread: true },
    {
      id: 2,
      title: "Your subscription expires soon",
      time: "1h ago",
      unread: true,
    },
    { id: 3, title: "New feature available", time: "2h ago", unread: false },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="w-full h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-50 shadow-sm">
      {/* Left: Search Bar */}
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 -ml-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
        >
          <Menu size={20} />
        </button>

        <div className="relative w-full">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
            size={18}
          />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border border-transparent focus:border-violet-500 dark:focus:border-violet-400 rounded-lg text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 outline-none transition-all duration-200"
            onFocus={() => setSearchOpen(true)}
            onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
          />
        </div>
      </div>

      {/* Right: Action Icons */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Language Selector */}
        <button className="hidden sm:flex items-center gap-2 px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200">
          <Globe size={18} />
          <span className="text-sm font-medium hidden lg:block">EN</span>
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggle}
          className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
          aria-label="Toggle dark mode"
        >
          {enabled ? (
            <Sun className="text-yellow-500" size={20} />
          ) : (
            <Moon className="text-gray-600" size={20} />
          )}
        </button>

        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setNotificationOpen(!notificationOpen);
            }}
            className="relative p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            )}
          </button>

          {/* Notification Dropdown */}
          {notificationOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 shadow-xl rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Notifications
                </h3>
                {unreadCount > 0 && (
                  <span className="text-xs bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 px-2 py-1 rounded-full font-medium">
                    {unreadCount} new
                  </span>
                )}
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors ${
                      notif.unread
                        ? "bg-violet-50/50 dark:bg-violet-900/10"
                        : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${
                          notif.unread ? "bg-violet-500" : "bg-gray-300"
                        }`}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {notif.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {notif.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 text-center">
                <button className="text-sm text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 font-medium">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Help */}
        <button className="hidden lg:flex p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200">
          <HelpCircle size={20} />
        </button>

        {/* Divider */}
        <div className="hidden sm:block w-px h-6 bg-gray-300 dark:bg-gray-700" />

        {/* User Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setDropdownOpen(!dropdownOpen);
            }}
            className="flex items-center gap-2 sm:gap-3 p-1 sm:px-3 sm:py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
          >
            {loading ? (
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 animate-pulse" />
            ) : (
              <img
                src={userData.photoURL}
                className="w-9 h-9 rounded-full object-cover border-2 border-violet-500/30"
                alt="avatar"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    userData.name
                  )}&background=6366f1&color=fff`;
                }}
              />
            )}
            <div className="hidden sm:flex flex-col items-start">
              <span className="text-sm font-semibold text-gray-900 dark:text-white truncate max-w-32">
                {loading ? "Loading..." : userData.name}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {userData.plan}
              </span>
            </div>
            <ChevronDown
              size={16}
              className={`hidden sm:block text-gray-400 transition-transform duration-200 ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 shadow-xl rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* User Info */}
              <div className="px-4 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-900/20 dark:to-indigo-900/20">
                <div className="flex items-center gap-3">
                  <img
                    src={userData.photoURL}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-gray-700"
                    alt="avatar"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        userData.name
                      )}&background=6366f1&color=fff`;
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-white truncate">
                      {userData.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                      {userData.email}
                    </p>
                    <span className="inline-block mt-1 text-xs bg-violet-500 text-white px-2 py-0.5 rounded-full">
                      {userData.plan}
                    </span>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                <button
                  onClick={() => navigate("/dashboard/profile")}
                  className="w-full px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 text-gray-700 dark:text-gray-200 transition-colors"
                >
                  <User size={18} className="text-gray-500" />
                  <span className="text-sm font-medium">My Profile</span>
                </button>
                <button
                  onClick={() => navigate("/dashboard/settings")}
                  className="w-full px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 text-gray-700 dark:text-gray-200 transition-colors"
                >
                  <Settings size={18} className="text-gray-500" />
                  <span className="text-sm font-medium">Settings</span>
                </button>
                <button
                  onClick={() => navigate("/dashboard/payouts")}
                  className="w-full px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 text-gray-700 dark:text-gray-200 transition-colors"
                >
                  <CreditCard size={18} className="text-gray-500" />
                  <span className="text-sm font-medium">Billing</span>
                </button>
                <button
                  onClick={() => navigate("/dashboard/all-orders")}
                  className="w-full px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-3 text-gray-700 dark:text-gray-200 transition-colors"
                >
                  <ShoppingBag size={18} className="text-gray-500" />
                  <span className="text-sm font-medium">My Orders</span>
                </button>
              </div>

              {/* Logout */}
              <div className="border-t border-gray-200 dark:border-gray-700 py-2">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2.5 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3 text-red-600 dark:text-red-400 transition-colors"
                >
                  <LogOut size={18} />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
