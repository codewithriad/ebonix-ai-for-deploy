import { Button } from "@/components/ui/button";
import { useTheme } from "@/pages/HomePage/ThemeProvider";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShadow, setIsShadow] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsShadow(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          <div className="flex flex-col space-y-3">
            <NavLinks />
            <Link to="/login">
              <Button className="bg-background text-foreground border border-para rounded-md font-medium px-6 hover:text-white text-base">
                Login
              </Button>
            </Link>
          </div>
          <Link to="/signup">
            <Button className="gradient-bg font-medium">Get Started</Button>
          </Link>
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
      {/* <a href="/dashboard" className={linkClass}>
        Dashboard
      </a> */}
      <a href="#" className={linkClass}>
        Product
      </a>
      <a href="#" className={linkClass}>
        Customers
      </a>
      <a href="#pricing" className={linkClass}>
        Pricing
      </a>
      <a href="#" className={linkClass}>
        Learn
      </a>
    </>
  );
};

export default Navbar;
