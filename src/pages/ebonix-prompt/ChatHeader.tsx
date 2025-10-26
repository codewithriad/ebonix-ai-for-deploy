import { Link } from "react-router-dom";
import { SidebarTrigger } from "../../components/ui/sidebar";

export function ChatHeader() {
  return (
    <header className="border-b bg-background backdrop-blur sticky top-0 z-50">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <SidebarTrigger />
          <Link to={'/'}>
            {/* Dark mode logo */}
            <img
              src="/dark-nav-logo.png"
              className="h-12 w-auto hidden dark:block"
              alt="Dark Logo"
            />

            {/* Light mode logo */}
            <img
              src="/light-nav-logo.png"
              className="h-12 w-auto block dark:hidden"
              alt="Light Logo"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}