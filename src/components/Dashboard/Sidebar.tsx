// components/Sidebar.tsx
import {
  IconArrowBarLeft,
  IconArrowBarRight,
  IconDotsVertical,
} from "@tabler/icons-react";
import {
  Code,
  FileText,
  Image,
  MessageCircle,
  Mic,
  Sliders,
  Volume2,
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  menuItems: { icon: React.ReactNode; label: string }[];
}

const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  setCollapsed,
  menuItems,
}) => {
  const tools = [
    {
      name: "Chat",
      icon: <MessageCircle className="w-3 h-3" />,
      color: "bg-blue-500",
    },
    {
      name: "Writer",
      icon: <FileText className="w-3 h-3" />,
      color: "bg-orange-400",
    },
    { name: "Coder", icon: <Code className="w-3 h-3" />, color: "bg-rose-400" },
    {
      name: "Imagine",
      icon: <Image className="w-3 h-3" />,
      color: "bg-purple-400",
    },
    {
      name: "Transcriber",
      icon: <Mic className="w-3 h-3" />,
      color: "bg-teal-400",
    },
    {
      name: "Voiceover",
      icon: <Volume2 className="w-3 h-3" />,
      color: "bg-lime-400",
    }
  ];

  return (
    <div
      className={`${
        collapsed ? "w-20" : "w-64"
      } h-auto hidden md:block bg-grayBackground text-foreground transition-all duration-300 p-4 md:p-6 relative`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        {!collapsed && <h1 className="text-xl font-bold">Ebonix Ai</h1>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-400 ml-auto"
          aria-label="Toggle Sidebar"
        >
          {collapsed ? (
            <IconArrowBarRight size={20} className="text-para" />
          ) : (
            <IconArrowBarLeft size={20} className="text-para" />
          )}
        </button>
      </div>

      {/* Menu Items */}
      <ul className="space-y-4 text-base">
        {menuItems.map((item, idx) => (
          <li
            key={idx}
            className="flex items-center gap-3 hover:text-foreground cursor-pointer"
          >
            <span>{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
          </li>
        ))}
      </ul>

      {/* sidebar tools */}
      <div className="text-foreground py-6 mt-4">
        <h2 className="text-xl font-semibold">Tools</h2>
        <ul className="space-y-6 mt-8">
          {tools.map((tool, idx) => (
            <li key={idx} className="flex items-center gap-4 cursor-pointer">
              <div className={`p-2 rounded-full ${tool.color}`}>
                {tool.icon}
              </div>
              {!collapsed && <span>{tool.name}</span>}
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4">
        <div className="flex justify-between items-center gap-4 cursor-pointer">
          <div className="flex items-start gap-3">
            <img
              src="/user.png"
              alt="user"
              className={`object-cover rounded-full ${
                collapsed ? "w-5 h-5" : "w-10 h-10"
              }`}
            />
            {!collapsed && (
              <div className="text-sm">
                <h3 className="font-semibold text-base">Jayden Smith</h3>
                <p className="text-xs text-para">Free Plan</p>
              </div>
            )}
          </div>
          <IconDotsVertical className="text-para" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
