import { SidebarTrigger } from "../../components/ui/sidebar";

export function ChatHeader() {
  return (
    <header className="border-b bg-background backdrop-blur sticky top-0 z-50">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <SidebarTrigger />
        </div>
      </div>
    </header>
  );
}
