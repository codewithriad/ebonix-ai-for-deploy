import { ProjectModal } from "@/components/modals/ProjectModal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { auth, db } from "@/firebase/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import {
  ChevronUp,
  CreditCard,
  LogOut,
  Settings,
  Sparkles,
  User,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { NavLink } from "./NavLink";
import { ThemeToggle } from "./ThemeToggle";
import ebonixLogoDark from "/dark-nav-logo.png";
import ebonixLogoLight from "/light-nav-logo.png";

interface ChatHistory {
  id: string;
  title: string;
  timestamp: Date;
}

interface UserInfo {
  name: string;
  email: string;
  plan: string;
  avatar: string;
}

interface AppSidebarProps {
  onNewChat: () => void;
  chatHistory: ChatHistory[];
  onSelectChat: (chatId: string) => void;
  onDeleteChat: (chatId: string) => void;
  currentChatId?: string;
}

export function AppSidebar({
  onNewChat,
  chatHistory,
  onSelectChat,
  onDeleteChat,
  currentChatId,
}: AppSidebarProps) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data from Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Get user document from Firestore
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserInfo({
              name: userData.name || user.displayName || "User",
              email: user.email || "No email",
              plan: userData.plan || "Free Plan",
              avatar:
                userData.photoURL ||
                user.photoURL ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  userData.name || user.displayName || "User"
                )}&background=random`,
            });
          } else {
            // If no Firestore document, use Firebase Auth data
            setUserInfo({
              name: user.displayName || "User",
              email: user.email || "No email",
              plan: "Free Plan",
              avatar:
                user.photoURL ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user.displayName || "User"
                )}&background=random`,
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          // Fallback to auth data
          setUserInfo({
            name: user.displayName || "User",
            email: user.email || "No email",
            plan: "Free Plan",
            avatar:
              user.photoURL ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                user.displayName || "User"
              )}&background=random`,
          });
        }
      } else {
        setUserInfo(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const updateTheme = () => {
      setTheme(
        document.documentElement.classList.contains("dark") ? "dark" : "light"
      );
    };

    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const menuItems = [
    {
      name: "Home",
      icon: "/dashboard/app.svg",
      link: "/app",
    },
    {
      name: "Explore",
      icon: "/dashboard/search1.svg",
      link: "/app/explore",
    },
    {
      name: "Modals",
      icon: "/dashboard/modal.svg",
      link: "/app/modals",
    },
    {
      name: "Library",
      icon: "/dashboard/library.svg",
      link: "/app/library",
    },
    { name: "Chat", icon: "/dashboard/chat.svg", link: "/app/chat" },
    {
      name: "Image Generator",
      icon: "/dashboard/imagine.svg",
      link: "/app/imagine",
    },
    {
      name: "Video Generator",
      icon: "/dashboard/play.svg",
      link: "/app/video",
    },
    {
      name: "Settings",
      icon: "/dashboard/setting.svg",
      link: "/app/settings",
    },
  ];

  const handleLogout = async () => {
    try {
      await auth.signOut();
      // Redirect to login page or handle logout
      window.location.href = "/login";
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Sidebar
      className="bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800"
      collapsible="icon"
    >
      {/* Header */}
      <SidebarHeader className="h-16 px-4 flex items-center border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between w-full gap-3">
          {!collapsed && (
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <NavLink to="/">
                <img
                  src={theme === "dark" ? ebonixLogoDark : ebonixLogoLight}
                  alt="EbonixAI"
                  className="h-7 w-auto flex-shrink-0"
                />
              </NavLink>
            </div>
          )}
          <div className="flex items-center gap-2">
            {!collapsed && <ThemeToggle />}
            <SidebarTrigger className="h-8 w-8 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors" />
          </div>
        </div>
      </SidebarHeader>

      {/* Navigation */}
      <nav
        className={`flex-1 overflow-y-auto ${
          collapsed ? "p-2 space-y-2" : "p-4 space-y-2"
        }`}
      >
        {menuItems.map((item) => {
          const isActive = location.pathname === item.link;

          return (
            <NavLink
              key={item.link}
              to={item.link}
              className={`
                group relative flex items-center gap-3 px-4 py-3.5 rounded-xl
                transition-all duration-300 ease-out overflow-hidden
                ${collapsed ? "justify-center px-2" : ""}
                ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white shadow-lg shadow-blue-500/50 dark:shadow-blue-600/40 scale-[1.02]"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-950/30 dark:hover:to-indigo-950/30 hover:text-blue-700 dark:hover:text-blue-400 hover:shadow-md hover:shadow-blue-100/50 dark:hover:shadow-blue-900/20 hover:scale-[1.02] active:scale-[0.98]"
                }
              `}
            >
              {/* Animated gradient background overlay on hover */}
              <span
                className={`
                absolute inset-0 opacity-0 transition-opacity duration-300
                bg-gradient-to-r from-blue-400/10 via-indigo-400/10 to-blue-400/10
                ${!isActive && "group-hover:opacity-100"}
              `}
              />

              {/* Shimmer effect on hover */}
              <span
                className={`
                absolute inset-0 -translate-x-full group-hover:translate-x-full
                transition-transform duration-1000 ease-out
                bg-gradient-to-r from-transparent via-white/20 to-transparent
                ${!isActive && "group-hover:block"}
              `}
                style={{ width: "50%" }}
              />

              {/* Icon */}
              <div
                className={`
                relative z-10 flex-shrink-0 transition-all duration-300
                ${
                  isActive
                    ? "drop-shadow-sm"
                    : "group-hover:scale-110 group-hover:rotate-3"
                }
              `}
              >
                <img
                  src={item.icon}
                  alt={`${item.name} icon`}
                  className={`
                    w-5 h-5 object-contain transition-all duration-300
                    ${
                      isActive
                        ? "brightness-0 invert"
                        : "opacity-75 group-hover:opacity-100"
                    }
                  `}
                />
              </div>

              {/* Label */}
              {!collapsed && (
                <span
                  className={`
                  relative z-10 text-[15px] font-medium truncate transition-all duration-300
                  ${isActive ? "font-semibold" : "group-hover:font-semibold"}
                `}
                >
                  {item.name}
                </span>
              )}

              {/* Active indicator dot (visible when collapsed) */}
              {collapsed && isActive && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
              )}

              {/* Glow effect for active state */}
              {isActive && (
                <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 to-indigo-400/20 blur-sm" />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <SidebarFooter className="p-3 border-t border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
        {loading ? (
          <div className="flex items-center justify-center py-6">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-600 border-t-transparent"></div>
          </div>
        ) : userInfo ? (
          <div className="space-y-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={`w-full h-auto p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all ${
                    collapsed ? "justify-center" : "justify-start"
                  }`}
                >
                  <div className="flex items-center gap-3 w-full min-w-0">
                    <div className="relative flex-shrink-0">
                      <img
                        src={userInfo.avatar}
                        alt={userInfo.name}
                        className="h-9 w-9 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-700"
                      />
                      <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                    </div>

                    {!collapsed && (
                      <div className="flex flex-col items-start flex-1 min-w-0">
                        <span className="text-[15px] font-semibold text-gray-900 dark:text-gray-100 truncate w-full text-left">
                          {userInfo.name}
                        </span>
                        <span className="text-[13px] text-gray-500 dark:text-gray-400 truncate w-full text-left">
                          {userInfo.email}
                        </span>
                      </div>
                    )}

                    {!collapsed && (
                      <ChevronUp className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    )}
                  </div>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                side="top"
                align="end"
                className="w-64 mb-2 shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <DropdownMenuLabel className="p-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={userInfo.avatar}
                      alt={userInfo.name}
                      className="h-12 w-12 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-700"
                    />
                    <div className="flex flex-col min-w-0 flex-1">
                      <p className="text-[15px] font-semibold text-gray-900 dark:text-gray-100 truncate">
                        {userInfo.name}
                      </p>
                      <p className="text-[13px] text-gray-500 dark:text-gray-400 truncate">
                        {userInfo.email}
                      </p>
                      <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border border-blue-200 dark:border-blue-800 rounded-full">
                        <Sparkles className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                        <span className="text-xs font-medium text-blue-700 dark:text-blue-400">
                          {userInfo.plan}
                        </span>
                      </div>
                    </div>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem className="cursor-pointer py-2.5 px-3 focus:bg-gray-100 dark:focus:bg-gray-800">
                  <User className="mr-3 h-4 w-4 text-gray-500" />
                  <span className="text-[14px]">Profile</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="cursor-pointer py-2.5 px-3 focus:bg-gray-100 dark:focus:bg-gray-800">
                  <CreditCard className="mr-3 h-4 w-4 text-gray-500" />
                  <span className="text-[14px]">Billing & Plans</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="cursor-pointer py-2.5 px-3 focus:bg-gray-100 dark:focus:bg-gray-800">
                  <Settings className="mr-3 h-4 w-4 text-gray-500" />
                  <span className="text-[14px]">Settings</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  className="cursor-pointer py-2.5 px-3 text-red-600 dark:text-red-400 focus:bg-red-50 dark:focus:bg-red-950/20 focus:text-red-700 dark:focus:text-red-300"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  <span className="text-[14px] font-medium">Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {!collapsed && (
              <Button
                variant="default"
                size="sm"
                className="w-full h-10 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-sm hover:shadow-md transition-all duration-200 font-medium text-[14px]"
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Upgrade to Pro
              </Button>
            )}
          </div>
        ) : (
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 py-4">
            Not signed in
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}

function ProjectModalTrigger({ collapsed }: { collapsed?: boolean }) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <SidebarMenuButton asChild>
        <div
          className={`flex items-center gap-2 p-2 rounded-md transition-colors hover:bg-accent/50 cursor-pointer`}
          onClick={() => setOpen(true)}
        >
          {!collapsed && <span className="-ml-2">Projects</span>}
        </div>
      </SidebarMenuButton>

      {/* The Project Modal */}
      <ProjectModal open={open} setOpen={setOpen} />
    </>
  );
}
