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
      window.location.href = "/login";
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Sidebar
      className="bg-[#1a1e230f] dark:bg-gray-900 border-r-2 border-gray-100 dark:border-gray-800"
      collapsible="icon"
    >
      {/* Header */}
      <SidebarHeader className="h-16 px-4 flex items-center bg-background">
        <div className="flex items-center justify-between w-full gap-3">
          {!collapsed && (
            <div className="flex items-center gap-3 flex-1">
              <NavLink to="/">
                <img
                  src={ebonixLogoLight}
                  alt="EbonixAI"
                  className="h-10 w-auto flex-shrink-0 block dark:hidden"
                />
                <img
                  src={ebonixLogoDark}
                  alt="EbonixAI"
                  className="h-10 w-auto flex-shrink-0 hidden dark:block"
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
          collapsed ? "p-2 space-y-1.5" : "p-3 space-y-1.5 bg-background"
        }`}
      >
        {menuItems.map((item) => {
          const isActive = location.pathname === item.link;

          return (
            <NavLink
              key={item.link}
              to={item.link}
              className={`
                group relative flex items-center gap-3 px-3 py-2.5 rounded-xl
                transition-all duration-200 ease-out overflow-hidden
                ${collapsed ? "justify-center px-2" : ""}
                ${
                  isActive
                    ? "bg-gradient-to-r from-lime-400 to-cyan-400 dark:from-primary dark:to-accent text-gray-900 dark:text-gray-900 shadow-lg shadow-lime-400/30 dark:shadow-primary/30"
                    : "text-lime-600 hover:bg-gradient-to-r hover:from-lime-400/10 hover:to-cyan-400/10 dark:hover:from-primary/10 dark:hover:to-accent/10 hover:text-gray-900 dark:hover:text-gray-100"
                }
              `}
            >
              {/* Icon */}
              <div
                className={`
                relative z-10 flex-shrink-0 transition-transform duration-200
                ${isActive ? "" : "group-hover:scale-110"}
              `}
              >
                <img
                  src={item.icon}
                  alt={`${item.name} icon`}
                  className={`
                    w-5 h-5 object-contain transition-all duration-200
                    ${
                      isActive
                        ? "brightness-0"
                        : "opacity-70 group-hover:opacity-100"
                    }
                  `}
                />
              </div>

              {/* Label */}
              {!collapsed && (
                <span
                  className={`
                  relative z-10 text-sm font-medium truncate transition-all duration-200
                  ${isActive ? "font-bold" : "group-hover:font-semibold"}
                `}
                >
                  {item.name}
                </span>
              )}

              {/* Active indicator (visible when collapsed) */}
              {collapsed && isActive && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-gray-900 dark:bg-white rounded-full" />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <SidebarFooter className="p-3 bg-background border-t-2 border-gray-100 dark:border-gray-800">
        {loading ? (
          <div className="flex items-center justify-center py-6">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-lime-500 dark:border-primary border-t-transparent"></div>
          </div>
        ) : userInfo ? (
          <div className="space-y-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={`w-full h-auto p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all ${
                    collapsed ? "justify-center" : "justify-start"
                  }`}
                >
                  <div className="flex items-center gap-3 w-full min-w-0">
                    <div className="relative flex-shrink-0">
                      <img
                        src={userInfo.avatar}
                        alt={userInfo.name}
                        className="h-9 w-9 rounded-full object-cover ring-2 ring-lime-400 dark:ring-primary"
                      />
                      <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                    </div>

                    {!collapsed && (
                      <div className="flex flex-col items-start flex-1 min-w-0">
                        <span className="text-sm font-bold text-gray-900 dark:text-gray-100 truncate w-full text-left">
                          {userInfo.name}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 truncate w-full text-left">
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
                className="w-64 mb-2 shadow-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800"
              >
                <DropdownMenuLabel className="p-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={userInfo.avatar}
                      alt={userInfo.name}
                      className="h-12 w-12 rounded-full object-cover ring-2 ring-lime-400 dark:ring-primary"
                    />
                    <div className="flex flex-col min-w-0 flex-1">
                      <p className="text-sm font-bold text-gray-900 dark:text-gray-100 truncate">
                        {userInfo.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {userInfo.email}
                      </p>
                      <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-lime-400/20 to-cyan-400/20 dark:from-primary/20 dark:to-accent/20 border-2 border-lime-400/50 dark:border-primary/50 rounded-full">
                        <Sparkles className="h-3 w-3 text-lime-600 dark:text-primary" />
                        <span className="text-xs font-bold text-lime-700 dark:text-primary">
                          {userInfo.plan}
                        </span>
                      </div>
                    </div>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem className="cursor-pointer py-2.5 px-3 focus:bg-gray-100 dark:focus:bg-gray-700 rounded-lg mx-1">
                  <User className="mr-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm font-medium">Profile</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="cursor-pointer py-2.5 px-3 focus:bg-gray-100 dark:focus:bg-gray-700 rounded-lg mx-1">
                  <CreditCard className="mr-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm font-medium">Billing & Plans</span>
                </DropdownMenuItem>

                <DropdownMenuItem className="cursor-pointer py-2.5 px-3 focus:bg-gray-100 dark:focus:bg-gray-700 rounded-lg mx-1">
                  <Settings className="mr-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm font-medium">Settings</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  className="cursor-pointer py-2.5 px-3 text-red-600 dark:text-red-400 focus:bg-red-50 dark:focus:bg-red-950/30 rounded-lg mx-1"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  <span className="text-sm font-bold">Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {!collapsed && (
              <Button
                variant="default"
                size="sm"
                className="w-full h-10 bg-gradient-to-r from-lime-400 to-cyan-400 hover:from-lime-500 hover:to-cyan-500 dark:from-primary dark:to-accent dark:hover:from-primary/90 dark:hover:to-accent/90 text-gray-900 dark:text-gray-900 shadow-lg shadow-lime-400/30 dark:shadow-primary/30 hover:shadow-xl hover:shadow-lime-400/40 dark:hover:shadow-primary/40 transition-all duration-200 font-bold text-sm border-2 border-lime-500/50 dark:border-primary/50"
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

      <ProjectModal open={open} setOpen={setOpen} />
    </>
  );
}
