import { Button } from "@/components/ui/button";
import { auth } from "../../firebase/firebase.config"; // Adjust path to your firebase config
// Import the auth hook
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/pages/HomePage/ThemeProvider";
import { signOut } from "firebase/auth";
import { LogOut, Moon, Settings, Sun, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShadow, setIsShadow] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, userData, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsShadow(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserMenuOpen && !event.target.closest(".user-menu-container")) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isUserMenuOpen]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const getUserInitials = () => {
    if (userData?.name) {
      return userData.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return user?.email?.[0]?.toUpperCase() || "U";
  };

  return (
    <nav
      className={`sticky top-0 left-0 w-full bg-background py-6 md:py-8 z-50 transition-all ${
        isShadow ? "shadow-lg" : ""
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          {theme === "light" ? (
            <img src="/light-nav-logo.png" alt="Ebonix" className="h-10" />
          ) : (
            <img src="/dark-nav-logo.png" alt="Ebonix" className="h-10" />
          )}
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex justify-center items-center space-x-12">
          <NavLinks />
          <div className="flex items-center space-x-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-foreground" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
            <button className="text-foreground">EN</button>

            {!loading && (
              <>
                {user ? (
                  <div className="relative user-menu-container">
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
                    >
                      {userData?.photoURL || userData?.profileImage ? (
                        <img
                          src={userData.photoURL || userData.profileImage}
                          alt={userData.name || "User"}
                          className="h-10 w-10 rounded-full object-cover border-2 border-para"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold border-2 border-para">
                          {getUserInitials()}
                        </div>
                      )}
                      <span className="text-foreground font-medium">
                        {userData?.name || user.email?.split("@")[0]}
                      </span>
                    </button>

                    {/* User Dropdown Menu */}
                    {isUserMenuOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-background border border-para rounded-lg shadow-xl py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="px-4 py-3 border-b border-para">
                          <p className="text-sm font-medium text-foreground">
                            {userData?.name || "User"}
                          </p>
                          <p className="text-xs text-para truncate">
                            {user.email}
                          </p>
                        </div>
                        <Link
                          to="/dashboard"
                          className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-para/10 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <User className="h-4 w-4 mr-3" />
                          Dashboard
                        </Link>
                        <Link
                          to="/settings"
                          className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-para/10 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Settings className="h-4 w-4 mr-3" />
                          Settings
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                        >
                          <LogOut className="h-4 w-4 mr-3" />
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <Link to="/login">
                      <Button className="bg-background text-foreground border border-para rounded-md font-medium px-6 hover:text-white text-base">
                        Login
                      </Button>
                    </Link>
                    <Link to="/signup">
                      <Button className="gradient-bg font-medium px-6">
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-foreground" />
            ) : (
              <Moon className="h-5 w-5 text-foreground" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
          <button
            className="flex items-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Open menu</span>
            <div className="space-y-2">
              <span
                className={`block w-8 h-0.5 bg-foreground transition-all duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-2.5" : ""
                }`}
              ></span>
              <span
                className={`block w-8 h-0.5 bg-foreground transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`block w-8 h-0.5 bg-foreground transition-all duration-300 ${
                  isMenuOpen ? "-rotate-45" : ""
                }`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden absolute w-full bg-background border-t border-ebonix-gray-medium transition-all duration-300 ${
          isMenuOpen
            ? "max-h-96 py-6 opacity-100"
            : "max-h-0 overflow-hidden opacity-0"
        }`}
      >
        <div className="container-custom flex flex-col space-y-6">
          {!loading && user && (
            <div className="flex items-center space-x-3 pb-4 border-b border-para">
              {userData?.photoURL || userData?.profileImage ? (
                <img
                  src={userData.photoURL || userData.profileImage}
                  alt={userData.name || "User"}
                  className="h-12 w-12 rounded-full object-cover border-2 border-para"
                />
              ) : (
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold border-2 border-para">
                  {getUserInitials()}
                </div>
              )}
              <div>
                <p className="text-foreground font-medium">
                  {userData?.name || user.email?.split("@")[0]}
                </p>
                <p className="text-xs text-para truncate">{user.email}</p>
              </div>
            </div>
          )}

          <div className="flex flex-col space-y-3">
            <NavLinks />
            {!loading && (
              <>
                {user ? (
                  <>
                    <Link
                      to="/settings"
                      className="text-foreground hover:text-ebonix-purple-light transition-colors"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-red-500 hover:text-red-600 transition-colors text-left"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <Button className="bg-background text-foreground border border-para rounded-md font-medium px-6 hover:text-white text-base w-full">
                        Login
                      </Button>
                    </Link>
                    <Link to="/signup">
                      <Button className="gradient-bg font-medium w-full">
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLinks = () => {
  const { theme } = useTheme();
  const linkClass =
    theme === "dark"
      ? "text-ebonix-white hover:text-ebonix-purple-light transition-colors"
      : "text-ebonix-black hover:text-ebonix-purple transition-colors";

  return (
    <>
      <NavLink to="/dashboard" className={linkClass}>
        Dashboard
      </NavLink>
      <NavLink to="#" className={linkClass}>
        Product
      </NavLink>
      <NavLink to="#" className={linkClass}>
        Customers
      </NavLink>
      <NavLink to="#pricing" className={linkClass}>
        Pricing
      </NavLink>
      <NavLink to="#" className={linkClass}>
        Learn
      </NavLink>
    </>
  );
};

export default Navbar;
