import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/utils";
import { useAuth } from "../../context/AuthContext";
import { roleConfigs } from "./roleConfigs";
import { LogOut, Truck, X } from "lucide-react";

export default function Sidebar({ role, collapsed, mobileOpen, onMobileClose }) {
  const location = useLocation();
  const { logout } = useAuth();
  const config = roleConfigs[role];

  if (!config) return null;

  const isActive = (path) => {
    if (path === `/dashboard/${role}`) {
      return location.pathname === `/dashboard/${role}`;
    }
    return location.pathname.startsWith(path);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={cn("flex items-center gap-3 px-4 py-4 border-b border-neutral-border", collapsed && "justify-center px-2")}>
        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-white flex-shrink-0", config.color)}>
          <Truck className="w-4 h-4" strokeWidth={2.5} />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <div className="text-sm font-bold text-neutral-textMain tracking-tight truncate">
              Transit<span className="text-accent">Ops</span>
            </div>
            <div className="text-[10px] text-neutral-textMuted font-medium truncate">{config.subtitle}</div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2.5">
        <div className="space-y-0.5">
          {config.items.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onMobileClose}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-150 group relative",
                  active
                    ? "bg-primary-light text-primary font-semibold"
                    : "text-neutral-textMuted hover:bg-neutral-light hover:text-neutral-textMain",
                  collapsed && "justify-center px-2"
                )}
              >
                {active && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[22px] bg-primary rounded-r-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon className={cn("w-[17px] h-[17px] flex-shrink-0", active ? "text-primary" : "text-neutral-textMuted group-hover:text-neutral-textMain")} strokeWidth={active ? 2.2 : 1.8} />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Bottom */}
      <div className="border-t border-neutral-border p-2">
        <button
          onClick={logout}
          className={cn(
            "flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium text-neutral-textMuted hover:bg-danger-light hover:text-danger transition-all duration-150 w-full",
            collapsed && "justify-center px-2"
          )}
        >
          <LogOut className="w-[17px] h-[17px] flex-shrink-0" strokeWidth={1.8} />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 256 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="hidden lg:flex flex-col bg-white border-r border-neutral-border h-screen sticky top-0 z-30 flex-shrink-0 overflow-hidden"
      >
        {sidebarContent}
      </motion.aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onMobileClose}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 bottom-0 w-[280px] bg-white border-r border-neutral-border z-50 lg:hidden"
            >
              <button
                onClick={onMobileClose}
                className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-accent-light text-neutral-textMuted"
              >
                <X className="w-4 h-4" />
              </button>
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
