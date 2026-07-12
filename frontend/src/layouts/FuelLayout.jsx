import { NavLink, Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "../utils/utils";
import { Fuel, Plus, DollarSign, Truck, Flame } from "lucide-react";

const nav = [
  { label: "Fuel Logs", path: "/dashboard/operations/fuel", icon: Flame, end: true },
  { label: "Add Fuel Log", path: "/dashboard/operations/fuel/add", icon: Plus },
  { label: "Expenses", path: "/dashboard/operations/expenses", icon: DollarSign, end: true },
  { label: "Vehicle Expenses", path: "/dashboard/operations/vehicle-expenses", icon: Truck, end: true },
];

export default function FuelLayout() {
  const location = useLocation();
  const isActive = (path, end) => end ? location.pathname === path : location.pathname.startsWith(path);

  return (
    <div className="flex flex-col h-full">
      <div className="bg-white border-b border-neutral-border mb-6 -mx-6 -mt-6 px-6">
        <div className="flex items-center gap-1 overflow-x-auto py-1 -mb-px">
          <div className="flex items-center gap-2 mr-4 py-3">
            <Fuel className="w-4 h-4 text-primary" strokeWidth={2} />
            <span className="text-sm font-bold font-headings text-neutral-textMain whitespace-nowrap">Fuel &amp; Expense</span>
          </div>
          {nav.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path, item.end);
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-3 text-xs font-semibold border-b-2 transition-all duration-200 whitespace-nowrap",
                  active ? "border-primary text-primary" : "border-transparent text-neutral-textMuted hover:text-accent hover:border-neutral-border"
                )}
              >
                <Icon className="w-3.5 h-3.5" strokeWidth={active ? 2.2 : 1.8} />
                {item.label}
              </NavLink>
            );
          })}
        </div>
      </div>
      <motion.div key={location.pathname} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="flex-1">
        <Outlet />
      </motion.div>
    </div>
  );
}
