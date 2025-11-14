import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const menu = {
  Menu: [
    { label: "Home", icon: "/dashboard/Home.svg" },
    { label: "Settings", icon: "/dashboard/setting.svg" },
  ],
  tools: [
    { label: "Chat", icon: "/dashboard/chat.svg" },
    { label: "Writer", icon: "/dashboard/writer1.svg" },
    { label: "Coder", icon: "/dashboard/coder.svg" },
    { label: "Imagine", icon: "/dashboard/Paintbrush.svg" },
    { label: "Transcriber", icon: "/dashboard/Copy-2.svg" },
    { label: "Voiceover", icon: "/dashboard/voice.svg" },
  ],
};

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <motion.aside
      initial={{ x: -200 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", damping: 20 }}
      className={`${collapsed ? "w-16" : "w-64"}
        bg-[rgba(30,30,30,0.7)] backdrop-blur-xl text-white h-screen flex flex-col 
        transition-all duration-300 sticky top-0 border-r border-white/5 shadow-2xl
        overflow-hidden`}
      style={{
        background: 'rgba(30, 30, 30, 0.7)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      {/* Glass overlay for extra depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10 pointer-events-none" />

      {/* Top - Logo and Toggle */}
      <div className="relative z-10 flex items-center justify-between p-4 border-b border-white/10 backdrop-blur-sm">
        {!collapsed && (
          <Link to={"/"}>
            <img
              src="/dark-nav-logo.png"
              className="h-8 w-auto drop-shadow-lg"
              alt="main-logo"
            />
          </Link>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-white/10 transition-all duration-200 
                     backdrop-blur-sm border border-white/5 hover:border-white/20
                     shadow-lg hover:shadow-xl"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Menu Items */}
      <div className="relative z-10 flex-1 overflow-y-auto px-3 py-6 space-y-8">
        {/* Main Menu */}
        <div>
          {!collapsed && (
            <p className="text-sm text-gray-300 mb-4 px-3 font-medium tracking-wider uppercase opacity-70">
              Menu
            </p>
          )}
          <div className="space-y-2">
            {menu.Menu.map((item, idx) => (
              <div
                key={idx}
                className={`flex items-center ${collapsed ? 'justify-center px-1' : 'gap-4 px-3'} py-3 rounded-xl 
                           hover:bg-white/10 cursor-pointer transition-all duration-300
                           backdrop-blur-sm border border-transparent hover:border-white/10
                           group`}
              >
                {/* Floating Gradient Icon */}
                <div className="relative">
                  <div className={`${collapsed ? "w-8 h-8" : "w-10 h-10"} flex items-center justify-center rounded-xl 
                                  bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600
                                  shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40
                                  hover:scale-110 transition-all duration-300
                                  border border-white/10 hover:border-white/20
                                  group-hover:rotate-6`}>
                    <img src={item.icon} alt={item.label} className="w-5 h-5 filter brightness-110" />
                  </div>
                  {/* Floating glow effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-400 to-purple-600 
                                  opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
                </div>
                {!collapsed && (
                  <span className="font-medium text-gray-100 group-hover:text-white transition-colors duration-300">
                    {item.label}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tools */}
        <div>
          {!collapsed && (
            <p className="text-sm text-gray-300 mb-4 px-3 font-medium tracking-wider uppercase opacity-70">
              Tools
            </p>
          )}
          <div className="space-y-2">
            {menu.tools.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 px-3 py-3 rounded-xl 
                           hover:bg-white/10 cursor-pointer transition-all duration-300
                           backdrop-blur-sm border border-transparent hover:border-white/10
                           group"
              >
                {/* Floating Gradient Icon */}
                <div className="relative">
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl 
                                  bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600
                                  shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40
                                  hover:scale-110 transition-all duration-300
                                  border border-white/10 hover:border-white/20
                                  group-hover:rotate-3">
                    <img src={item.icon} alt={item.label} className="w-5 h-5 filter brightness-110" />
                  </div>
                  {/* Floating glow effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 
                                  opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
                </div>
                {!collapsed && (
                  <span className="font-medium text-gray-100 group-hover:text-white transition-colors duration-300">
                    {item.label}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom - Profile */}
      <div className="relative z-10 p-4 border-t border-white/10 mt-auto backdrop-blur-sm">
        <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 
                        transition-all duration-300 border border-white/5 hover:border-white/10">
          <div className="relative">
            <img
              src="https://i.pravatar.cc/40"
              alt="avatar"
              className="w-10 h-10 rounded-full border-2 border-white/20 shadow-lg"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full 
                            border-2 border-gray-800 shadow-sm"></div>
          </div>
          {!collapsed && (
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">Jayden Smith</p>
              <p className="text-xs text-gray-300 bg-white/10 px-2 py-1 rounded-full inline-block mt-1">
                Free Plan
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;