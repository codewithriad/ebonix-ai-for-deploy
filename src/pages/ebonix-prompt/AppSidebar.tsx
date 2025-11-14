// import { ProjectModal } from "@/components/modals/ProjectModal";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
// import {
//   MicrophoneIcon,
//   MusicalNoteIcon,
//   PencilSquareIcon,
//   PhotoIcon,
//   SpeakerWaveIcon,
//   Squares2X2Icon,
//   VideoCameraIcon,
// } from "@heroicons/react/24/outline";
import { ProjectModal } from "@/components/modals/ProjectModal";
import { Book, FileBox, FolderPlus, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import ebonixLogoDark from "/dark-nav-logo.png";
import ChatBubbleLeftRightIcon from "/dashboard/chat.svg";
import Coder from "/dashboard/coder.svg";
import Flag from "/dashboard/flag.svg";
import Headphone from "/dashboard/headphone.svg";
import Imagine from "/dashboard/imagine.svg";
import Music from "/dashboard/music.svg";
import Video from "/dashboard/play.svg";
import Voice from "/dashboard/voice.svg";
import Writer from "/dashboard/writer1.svg";
import ebonixLogoLight from "/light-nav-logo.png";

interface ChatHistory {
  id: string;
  title: string;
  timestamp: Date;
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
  const [open, setOpen] = React.useState(true);
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const [theme, setTheme] = useState<"light" | "dark">("light");

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

  const formatChatTitle = (title: string) => {
    return title.length > 30 ? title.substring(0, 30) + "..." : title;
  };

  return (
    <Sidebar
      className={`bg-gray-200 dark:bg-gray-950 ${collapsed ? "w-14" : "w-64"}`}
      collapsible="icon"
    >
      <SidebarHeader className="p-4 border-b">
        {!collapsed && (
          <div className="flex items-center justify-between">
            <img
              src={theme === "dark" ? ebonixLogoDark : ebonixLogoLight}
              alt="EbonixAI"
              className="h-8 w-auto"
            />
            <ThemeToggle />
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        {/* New Chat Section */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* + new chat */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    to="/app"
                    className={({ isActive }) =>
                      `flex items-center gap-2 p-2 rounded-md transition-colors ${
                        isActive
                          ? "bg-accent text-accent-foreground"
                          : "hover:bg-accent/50"
                      }`
                    }
                  >
                    <Plus className="h-4 w-4" />
                    {!collapsed && <span>New Chat</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* 📚 Library */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    to="/app/library"
                    className={({ isActive }) =>
                      `flex items-center gap-2 p-2 rounded-md transition-colors ${
                        isActive
                          ? "bg-accent text-accent-foreground"
                          : "hover:bg-accent/50"
                      }`
                    }
                  >
                    <Book className="h-4 w-4" />
                    {!collapsed && <span>Library</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* 📂 Projects */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <div
                    onClick={() => setOpen(true)}
                    className="flex items-center gap-2 p-2 rounded-md transition-colors"
                  >
                    <FolderPlus className="h-4 w-4" />
                    {!collapsed && (
                      <SidebarMenuItem>
                        <ProjectModalTrigger collapsed={collapsed} />
                      </SidebarMenuItem>
                    )}
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Modals */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    to="/app/modals"
                    className={({ isActive }) =>
                      `flex items-center gap-2 p-2 rounded-md transition-colors ${
                        isActive
                          ? "bg-accent text-accent-foreground"
                          : "hover:bg-accent/50"
                      }`
                    }
                  >
                    <FileBox className="h-4 w-4" />
                    {!collapsed && <span>Modals</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* apps and tools */}
        <SidebarGroup>
          {/* Tools */}
          <div className="mt-6 px-4 text-gray-400 text-xs uppercase">Tools</div>
          <ul className="mt-2 space-y-1">
            {[
              {
                name: "Chat",
                icon: ChatBubbleLeftRightIcon,
                link: "/app/chat",
              },
              {
                name: "Writer",
                icon: Writer,
                link: "/app/writer",
              },
              {
                name: "Coder",
                icon: Coder,
                link: "/app/coder",
              },
              {
                name: "Imagine",
                icon: Imagine,
                link: "/app/imagine",
              },
              {
                name: "Video",
                icon: Video,
                link: "/app/video",
              },
              {
                name: "Transcriber",
                icon: Headphone,
                link: "/app/transcriber",
              },

              {
                name: "Voiceover",
                icon: Voice,
                link: "/app/voiceover",
              },
              {
                name: "Voice Isolator",
                icon: Music,
                link: "/app/voice-isolator",
              },
              {
                name: "Classifier",
                icon: Flag,
                link: "/app/classifier",
              },
            ].map((app) => (
              <SidebarMenuItem
                key={app.name}
                className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-800 rounded-md cursor-pointer"
              >
                <SidebarMenuButton asChild>
                  <NavLink
                    to={app.link}
                    className={({ isActive }) =>
                      `flex items-center gap-2 p-2 rounded-md transition-colors ${
                        isActive
                          ? "bg-accent text-accent-foreground"
                          : "hover:bg-accent/50"
                      }`
                    }
                  >
                    <img
                      src={app.icon}
                      alt={app.name}
                      className="h-5 w-5 object-contain text-gray-300"
                    />
                    {!collapsed && (
                      <span className="text-lg text-slate-200">{app.name}</span>
                    )}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </ul>
        </SidebarGroup>

        {/* User Profile Section (Bottom) */}
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <div className="flex items-center gap-3 p-2 rounded-md hover:bg-accent/50 transition-colors">
              {/* Avatar */}
              <img
                src="https://ui-avatars.com/api/?name=John+Doe&background=random"
                alt="User Avatar"
                className="h-10 w-10 rounded-full border"
              />

              {/* Info */}
              {!collapsed && (
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-sm font-medium truncate">John Doe</span>
                  <span className="text-xs text-muted-foreground">
                    Free Plan
                  </span>
                </div>
              )}

              {/* Upgrade button */}
              {!collapsed && (
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-auto whitespace-nowrap"
                >
                  Upgrade
                </Button>
              )}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
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
