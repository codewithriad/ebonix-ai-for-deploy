import useDarkMode from "@/hooks/useDarkMode";
import {
  Bell,
  Bookmark,
  Moon,
  Search,
  Settings,
  ShoppingCart,
  Expand,
  LogOut,
  User,
  Sun,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

const Topbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { enabled, toggle } = useDarkMode();

  // Close dropdown if clicked outside — using capture phase for reliability
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true); // capture: true
    return () =>
      document.removeEventListener("click", handleClickOutside, true);
  }, []);

  return (
    <header className="w-full h-14 bg-white dark:bg-gray-900 flex items-center justify-end px-4 sm:px-6 shadow-sm relative z-[99]">
      {/* Right: Icons container (scrollable on small screens) */}
      <div className="flex items-center gap-3 md:gap-6 overflow-x-auto scrollbar-hide">
        <button className="text-gray-600 hover:text-black transition">
          <Search size={18} />
        </button>

        <button className="text-gray-600 hover:text-black transition">
          <img
            src="https://flagcdn.com/us.svg"
            alt="language"
            className="w-5 h-5 rounded-sm object-cover"
          />
        </button>

        <div className="flex justify-end items-center gap-4 p-4 bg-white dark:bg-gray-900">
          <button
            onClick={toggle}
            className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {enabled ? (
              <Sun className="text-yellow-400" />
            ) : (
              <Moon className="text-gray-600" />
            )}
          </button>
        </div>

        <div className="relative">
          <button className="text-gray-600 hover:text-black transition">
            <ShoppingCart size={18} />
          </button>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
            4
          </span>
        </div>

        <div className="relative">
          <button className="text-gray-600 hover:text-black transition">
            <img src="dashboard/Bell.svg" alt="notification" className="w-6 h-6" />
          </button>
          <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
            4
          </span>
        </div>

        <button className="text-gray-600 hover:text-black transition">
          <Bookmark size={18} />
        </button>

        {/* Avatar */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setDropdownOpen((prev) => !prev);
            }}
            className="focus:outline-none"
          >
            <img
              src="https://i.pravatar.cc/32"
              className="w-8 h-8 rounded-full cursor-pointer"
              alt="avatar"
            />
          </button>

          {/* dropdown menu */}
          {dropdownOpen && (
            <div className="fixed right-0 mt-2 min-w-[12rem] bg-white dark:bg-gray-900 shadow-lg rounded-md z-50">
              <ul className="text-sm text-gray-700 dark:text-white">
                <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2 cursor-pointer">
                  <User size={16} /> Profile
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2 cursor-pointer">
                  <Settings size={16} /> Settings
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2 cursor-pointer text-red-500">
                  <LogOut size={16} /> Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
