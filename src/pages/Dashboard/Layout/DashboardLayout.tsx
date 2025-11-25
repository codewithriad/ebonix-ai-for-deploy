import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar";

const DashboardLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <section className="flex h-screen w-full">
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 bg-muted">
          <div className="max-w-7xl mx-auto w-full space-y-6">
            <Outlet />
          </div>
        </main>
      </div>
    </section>
  );
};

export default DashboardLayout;
