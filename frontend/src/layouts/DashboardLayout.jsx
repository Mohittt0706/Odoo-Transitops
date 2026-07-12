import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import DashboardHeader from "../components/layout/Topbar";

export default function DashboardLayout({ role }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-neutral-light">
      <Sidebar
        role={role}
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader
          sidebarCollapsed={collapsed}
          onToggleSidebar={() => setCollapsed(!collapsed)}
          onMobileMenu={() => setMobileOpen(true)}
        />
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
