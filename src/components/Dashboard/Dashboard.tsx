// pages/dashboard.tsx
import {
  IconCarouselHorizontal,
  IconHome,
  IconSettings,
  IconTopologyStar3,
} from "@tabler/icons-react";
import { useState } from "react";
import Sidebar from "./Sidebar";
import PromptPanel from "../Shared/PromptPannel";

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { icon: <IconHome size={20} />, label: "Home" },
    { icon: <IconSettings size={20} />, label: "Settings" },
  ];

  const sidebarMenu = [
    { icon: "💬", label: "Chat" },
    { icon: "✍️", label: "Writer" },
    { icon: "👨‍💻", label: "Coder" },
    { icon: "🎨", label: "Imagine" },
    { icon: "🏠", label: "Home" },
    { icon: "📚", label: "Library" },
    { icon: "🎙️", label: "Voiceover" },
  ];

  return (
    <div className="bg-background w-full md:max-w-7xl text-foreground border-[1rem] border-grayBackground rounded-xl mx-auto mt-10 relative">
      <div className="flex flex-col md:flex-row w-full z-10">
        {/* Sidebar within dashboard */}

        {/* Sidebar content */}

        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          menuItems={menuItems}
        />

        {/* Main dashboard content */}
        <div className="p-4 md:p-6 md:mx-8 lg:mx-auto flex flex-col justify-center items-center min-h-[70vh]">
          <PromptPanel />
        </div>
      </div>

      {/* bottom of tools card */}
      <div className="absolute bottom-12 right-0 rotate-[30deg] w-12 h-12 bg-[#e8f9ee] border-t border-l border-r-4 border-b-4 border-[#00A6FB] rounded-xl flex justify-center items-center z-20">
        <IconCarouselHorizontal stroke={2} className="text-[#00A6FB] w-8 h-8" />
      </div>

      {/* to-left corner icon */}
      <div className="absolute top-0 md:-top-8 left-0 md:-left-8 rotate-12 w-12 h-12 bg-[#e8f9ee] border-t border-l border-r-4 border-b-4 border-green-400 rounded-xl flex justify-center items-center z-20">
        <IconTopologyStar3 stroke={2} className="text-green-400 w-8 h-8" />
      </div>
    </div>
  );
};

export default Dashboard;
