import {
    IconEyeDollar,
    IconShoppingBag,
    IconTemplate,
} from "@tabler/icons-react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { AnimatePresence, motion } from "framer-motion";
import {
    Bot,
    ChevronLeft,
    CreditCard,
    Home,
    LayoutGrid,
    MessageSquare,
    Mic,
    Plug,
    RefreshCw,
    Settings,
    User
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { auth, db } from "../../../firebase/firebase.config";

// Menu configuration with Lucide icons as fallback
const MENU_CONFIG = {
  main: [
    {
      label: "Home",
      icon: "/dashboard/Home.svg",
      fallbackIcon: Home,
      path: "/dashboard",
    },
    {
      label: "Categories",
      icon: "/dashboard/Category.svg", // Placeholder, will fallback
      fallbackIcon: LayoutGrid,
      path: "/dashboard/categories",
    },
    {
      label: "Settings",
      icon: "/dashboard/setting.svg",
      fallbackIcon: Settings,
      path: "/dashboard/settings",
    },
  ],
  tools: [
    {
      label: "Plans & Pricing",
      icon: "/dashboard/Cube.svg",
      fallbackIcon: MessageSquare,
      path: "/dashboard/plans",
    },
    {
      label: "Subscriptions",
      icon: "/dashboard/CreditCard.svg",
      fallbackIcon: CreditCard,
      path: "/dashboard/subscriptions",
    },
    {
      label: "Assistants",
      icon: "/dashboard/Bot.svg", // Placeholder
      fallbackIcon: Bot,
      path: "/dashboard/assistants",
    },
    {
      label: "Voices",
      icon: "/dashboard/Mic.svg", // Placeholder
      fallbackIcon: Mic,
      path: "/dashboard/voices",
    },
    {
      label: "Plugins",
      icon: "/dashboard/Plug.svg", // Placeholder
      fallbackIcon: Plug,
      path: "/dashboard/plugins",
    },
    {
      label: "Update",
      icon: "/dashboard/Refresh.svg", // Placeholder
      fallbackIcon: RefreshCw,
      path: "/dashboard/update",
    },
    {
      label: "Users",
      icon: "/dashboard/Users.svg",
      fallbackIcon: User,
      path: "/dashboard/all-users",
    },

    {
      label: "Templates",
      icon: "/dashboard/writer1.svg",
      fallbackIcon: IconTemplate,
      path: "/dashboard/templates",
    },
    {
      label: "Orders",
      icon: "/dashboard/Shopping-Cart.svg",
      fallbackIcon: IconShoppingBag,
      path: "/dashboard/all-orders",
    },
    {
      label: "Payouts",
      icon: "/dashboard/Bell.svg",
      fallbackIcon: IconEyeDollar,
      path: "/dashboard/payouts",
    },
  ],
};

const DEFAULT_USER_STATE = {
  name: "Guest",
  email: "",
  photoURL:
    "https://ui-avatars.com/api/?name=Guest&background=6366f1&color=fff",
  plan: "Free Plan",
  isOnline: false,
};

// Menu Item Component
const MenuItem = ({ item, collapsed, gradient, isActive }) => {
  const [imgError, setImgError] = useState(false);
  const FallbackIcon = item.fallbackIcon;

  return (
    <Link
      to={item.path}
      className={`relative flex items-center ${
        collapsed ? "justify-center px-2" : "gap-3 px-4"
      } py-3 rounded-xl cursor-pointer transition-all duration-300 group ${
        isActive
          ? "bg-white/15 border border-white/20"
          : "hover:bg-white/10 border border-transparent hover:border-white/10"
      }`}
    >
      <div className="relative flex items-center justify-center">
        <div
          className={`${
            collapsed ? "w-9 h-9" : "w-10 h-10"
          } flex items-center justify-center rounded-lg bg-gradient-to-br ${gradient} shadow-md ${
            isActive
              ? "shadow-lg scale-105"
              : "group-hover:shadow-lg group-hover:scale-105"
          } transition-all duration-300 border border-white/20`}
        >
          {!imgError ? (
            <img
              src={item.icon}
              alt={item.label}
              className="w-5 h-5 filter brightness-110"
              onError={() => setImgError(true)}
            />
          ) : (
            <FallbackIcon className="w-5 h-5 text-white" />
          )}
        </div>
      </div>

      <AnimatePresence>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className={`font-medium whitespace-nowrap ${
              isActive ? "text-white" : "text-gray-200 group-hover:text-white"
            } transition-colors duration-300`}
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Active indicator */}
      {isActive && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-violet-400 to-indigo-500 rounded-r-full" />
      )}
    </Link>
  );
};

// Menu Section Component
const MenuSection = ({ title, items, collapsed, gradient }) => {
  const location = useLocation();

  return (
    <div className="space-y-1">
      <AnimatePresence>
        {!collapsed && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="text-xs text-gray-400 mb-3 px-4 font-semibold tracking-widest uppercase"
          >
            {title}
          </motion.p>
        )}
      </AnimatePresence>
      <div className="space-y-1">
        {items.map((item, idx) => (
          <MenuItem
            key={idx}
            item={item}
            collapsed={collapsed}
            gradient={gradient}
            isActive={location.pathname === item.path}
          />
        ))}
      </div>
    </div>
  );
};

// User Profile Component
const UserProfile = ({ userData, loading, collapsed }) => (
  <div className="relative z-10 p-3 border-t border-white/10 backdrop-blur-sm">
    <div
      className={`flex items-center ${
        collapsed ? "justify-center" : "gap-3"
      } p-3 rounded-xl hover:bg-white/5 transition-all duration-300 cursor-pointer`}
    >
      {/* Image container with flex-shrink-0 to prevent compression */}
      <div className="relative flex-shrink-0 w-10 h-10">
        {loading ? (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 animate-pulse" />
        ) : (
          <>
            <img
              src={userData.photoURL}
              alt="avatar"
              className="w-full h-full rounded-full border-2 border-white/30 shadow-lg object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  userData.name
                )}&background=6366f1&color=fff`;
              }}
            />
            <div
              className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-[rgba(30,30,30,1)] ${
                userData.isOnline ? "bg-emerald-400" : "bg-gray-500"
              } shadow-sm`}
            />
          </>
        )}
      </div>

      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="flex-1 min-w-0 overflow-hidden"
          >
            {loading ? (
              <>
                <div className="h-4 bg-gray-700 rounded animate-pulse mb-2 w-24" />
                <div className="h-3 w-16 bg-gray-700 rounded animate-pulse" />
              </>
            ) : (
              <>
                <p
                  className="text-sm font-semibold text-white truncate"
                  title={userData.name}
                >
                  {userData.name}
                </p>
                <span className="text-[10px] text-gray-300 bg-gradient-to-r from-violet-500/20 to-indigo-500/20 border border-violet-500/30 px-2.5 py-0.5 rounded-full inline-block mt-1 font-medium">
                  {userData.plan}
                </span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </div>
);

interface SidebarProps {
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}

// Main Sidebar Component
const Sidebar = ({ mobileOpen = false, setMobileOpen }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [userData, setUserData] = useState(DEFAULT_USER_STATE);
  const [loading, setLoading] = useState(true);

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
            isOnline: true,
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
            isOnline: true,
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
          isOnline: true,
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

  return (
    <>
      {/* Mobile overlay drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-[100] flex md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setMobileOpen?.(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-72 bg-gradient-to-b from-[rgba(20,20,25,0.98)] to-[rgba(30,30,35,0.98)] backdrop-blur-2xl text-white h-full flex flex-col border-r border-white/10 shadow-2xl overflow-hidden"
            >
              {/* Header with close */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <Link to="/" className="flex items-center gap-2">
                  <img
                    src="/dark-nav-logo.png"
                    className="h-8 w-auto drop-shadow-lg"
                    alt="logo"
                  />
                </Link>
                <button
                  onClick={() => setMobileOpen?.(false)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10"
                  aria-label="Close sidebar"
                >
                  <ChevronLeft size={18} />
                </button>
              </div>
              {/* Menu sections */}
              <div className="flex-1 overflow-y-auto px-2 py-6 space-y-6">
                <MenuSection
                  title="Menu"
                  items={MENU_CONFIG.main}
                  collapsed={false}
                  gradient="from-violet-500 via-purple-500 to-indigo-600"
                />
                <MenuSection
                  title="Tools"
                  items={MENU_CONFIG.tools}
                  collapsed={false}
                  gradient="from-cyan-400 via-blue-500 to-indigo-600"
                />
              </div>
              <UserProfile
                userData={userData}
                loading={loading}
                collapsed={false}
              />
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 80 : 256 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="hidden md:flex bg-gradient-to-b from-[rgba(20,20,25,0.95)] to-[rgba(30,30,35,0.95)] backdrop-blur-2xl text-white h-screen flex-col sticky top-0 border-r border-white/10 shadow-2xl overflow-hidden z-40"
        style={{
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
        }}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-indigo-500/5 pointer-events-none" />

        {/* Subtle animated orbs */}
        <div className="absolute top-20 -left-20 w-40 h-40 bg-violet-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 -right-20 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <Link to="/" className={`flex items-center gap-2 ${collapsed ? "justify-center w-full" : ""}`}>
             {!collapsed && <img src="/dark-nav-logo.png" className="h-8 w-auto drop-shadow-lg" alt="logo" />}
             {collapsed && <img src="/logo-icon.png" className="h-8 w-auto drop-shadow-lg" alt="logo" />}
          </Link>
          {/* Collapse button for larger screens */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`hidden md:block p-2 rounded-lg bg-white/5 hover:bg-white/10 ${collapsed ? "absolute right-1/2 translate-x-1/2 top-20" : ""}`}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <motion.div
              animate={{ rotate: collapsed ? 0 : 180 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronLeft size={18} />
            </motion.div>
          </button>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-2 py-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          <MenuSection
            title="Menu"
            items={MENU_CONFIG.main}
            collapsed={collapsed}
            gradient="from-violet-500 via-purple-500 to-indigo-600"
          />
          <MenuSection
            title="Tools"
            items={MENU_CONFIG.tools}
            collapsed={collapsed}
            gradient="from-cyan-400 via-blue-500 to-indigo-600"
          />
        </div>

        {/* User Profile */}
        <UserProfile
          userData={userData}
          loading={loading}
          collapsed={collapsed}
        />
      </motion.aside>
    </>
  );
};

export default Sidebar;
