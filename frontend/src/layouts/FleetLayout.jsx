import { NavLink, Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "../../utils/utils";
import {
  LayoutGrid,
  List,
  Plus,
  FileText,
  BarChart3,
  Clock,
  Columns3,
  Settings,
  Truck,
} from "lucide-react";

const fleetNav = [
  { label: "Overview", path: "/dashboard/operations/fleet", icon: LayoutGrid, end: true },
  { label: "All Vehicles", path: "/dashboard/operations/fleet/all", icon: List },
  { label: "Register", path: "/dashboard/operations/fleet/register", icon: Plus },
  { label: "Documents", path: "/dashboard/operations/fleet/documents", icon: FileText },
  { label: "Analytics", path: "/dashboard/operations/fleet/analytics", icon: BarChart3 },
  { label: "History", path: "/dashboard/operations/fleet/history", icon: Clock },
  { label: "Fleet Status", path: "/dashboard/operations/fleet/status", icon: Columns3 },
  { label: "Settings", path: "/dashboard/operations/fleet/settings", icon: Settings },
];

export default function FleetLayout() {
  const location = useLocation();

  const isActive = (path, end) => {
    if (end) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Fleet Sub-Navigation */}
      <div className="bg-white border-b border-neutral-border mb-6 -mx-6 -mt-6 px-6">
        <div className="flex items-center gap-1 overflow-x-auto py-1 -mb-px">
          <div className="flex items-center gap-2 mr-4 py-3">
            <Truck className="w-4 h-4 text-primary" strokeWidth={2} />
            <span className="text-sm font-bold font-headings text-neutral-textMain whitespace-nowrap">Fleet Management</span>
          </div>
          {fleetNav.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path, item.end);
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-3 text-xs font-semibold border-b-2 transition-all duration-200 whitespace-nowrap",
                  active
                    ? "border-primary text-primary"
                    : "border-transparent text-neutral-textMuted hover:text-accent hover:border-neutral-border"
                )}
              >
                <Icon className="w-3.5 h-3.5" strokeWidth={active ? 2.2 : 1.8} />
                {item.label}
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Page Content */}
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="flex-1"
      >
        <Outlet />
      </motion.div>
    </div>
  );
}
