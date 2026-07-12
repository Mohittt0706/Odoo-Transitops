import { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/utils";
import { useAuth } from "../../context/AuthContext";
import {
  Search,
  Bell,
  ChevronLeft,
  ChevronRight,
  Menu,
  Moon,
  Sun,
  User,
  LogOut,
  Settings,
  ChevronDown,
  X,
} from "lucide-react";

function getBreadcrumbs(pathname) {
  const parts = pathname.split("/").filter(Boolean);
  const crumbs = [];
  let path = "";

  parts.forEach((part, i) => {
    path += `/${part}`;
    const label = part
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    crumbs.push({ label, path, isLast: i === parts.length - 1 });
  });

  return crumbs;
}

export default function DashboardHeader({ sidebarCollapsed, onToggleSidebar, onMobileMenu }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const crumbs = getBreadcrumbs(location.pathname);

  const demoRequests = useMemo(() => {
    try { return JSON.parse(localStorage.getItem("demo_requests") || "[]"); }
    catch { return []; }
  }, [notificationsOpen]);

  const notifications = [
    ...demoRequests.filter(r => r.status === "Pending").map(r => ({
      id: `demo-${r.id}`,
      title: `Demo Request: ${r.company}`,
      time: new Date(r.createdAt).toLocaleDateString(),
      unread: true,
    })),
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-neutral-border">
      <div className="flex items-center justify-between h-14 px-4 sm:px-5">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMobileMenu}
            className="lg:hidden p-1.5 rounded-lg hover:bg-neutral-light text-neutral-textMuted"
          >
            <Menu className="w-[18px] h-[18px]" />
          </button>
          <button
            onClick={onToggleSidebar}
            className="hidden lg:flex p-1.5 rounded-lg hover:bg-neutral-light text-neutral-textMuted transition-colors"
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>

          {/* Breadcrumbs */}
          <nav className="hidden sm:flex items-center gap-1 text-[13px]">
            {crumbs.map((crumb, i) => (
              <span key={crumb.path} className="flex items-center gap-1">
                {i > 0 && <span className="text-neutral-border text-xs">/</span>}
                {crumb.isLast ? (
                  <span className="font-semibold text-neutral-textMain">{crumb.label}</span>
                ) : (
                  <button
                    onClick={() => navigate(crumb.path)}
                    className="text-neutral-textMuted hover:text-primary transition-colors"
                  >
                    {crumb.label}
                  </button>
                )}
              </span>
            ))}
          </nav>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-1.5 rounded-lg hover:bg-neutral-light text-neutral-textMuted transition-colors"
            >
              <Search className="w-[17px] h-[17px]" />
            </button>
            <AnimatePresence>
              {searchOpen && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 280 }}
                  exit={{ opacity: 0, width: 0 }}
                  className="absolute right-0 top-full mt-2 bg-white border border-neutral-border rounded-xl shadow-soft-lg overflow-hidden"
                >
                  <div className="flex items-center px-3 border-b border-neutral-border">
                    <Search className="w-4 h-4 text-neutral-textMuted flex-shrink-0" />
                    <input
                      autoFocus
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search anything..."
                      className="flex-1 h-11 text-sm bg-transparent outline-none px-2"
                    />
                    <button onClick={() => setSearchOpen(false)} className="p-1 hover:bg-accent-light rounded">
                      <X className="w-3.5 h-3.5 text-neutral-textMuted" />
                    </button>
                  </div>
                  <div className="p-3">
                    <p className="text-[10px] font-semibold text-neutral-textMuted uppercase tracking-wider mb-2">Quick Actions</p>
                    <div className="space-y-1">
                      {["Register Vehicle", "Create Trip", "View Reports"].map((action) => (
                        <button
                          key={action}
                          className="w-full text-left px-3 py-2 text-sm text-neutral-textMuted hover:bg-accent-light rounded-lg transition-colors"
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="p-1.5 rounded-lg hover:bg-neutral-light text-neutral-textMuted transition-colors relative"
            >
              <Bell className="w-[17px] h-[17px]" />
              {unreadCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-3.5 h-3.5 bg-danger text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            <AnimatePresence>
              {notificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute right-0 top-full mt-2 w-80 bg-white border border-neutral-border rounded-xl shadow-soft-lg overflow-hidden"
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-border">
                    <span className="text-sm font-bold font-headings text-neutral-textMain">Notifications</span>
                    <span className="badge badge-danger">{unreadCount}</span>
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className={cn(
                          "px-4 py-3 border-b border-neutral-border/50 hover:bg-accent-light/50 transition-colors cursor-pointer",
                          n.unread && "bg-primary/[0.02]"
                        )}
                      >
                        <p className="text-sm text-neutral-textMain leading-snug">{n.title}</p>
                        <p className="text-[11px] text-neutral-textMuted mt-1">{n.time}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-1.5 rounded-lg hover:bg-neutral-light text-neutral-textMuted transition-colors"
          >
            {darkMode ? <Sun className="w-[17px] h-[17px]" /> : <Moon className="w-[17px] h-[17px]" />}
          </button>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-neutral-light transition-colors"
            >
              <div className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center ring-2 ring-primary/10">
                <User className="w-3.5 h-3.5 text-primary" />
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-[12px] font-semibold text-neutral-textMain leading-tight">John Admin</div>
                <div className="text-[10px] text-neutral-textMuted">Admin</div>
              </div>
              <ChevronDown className="w-3 h-3 text-neutral-textMuted hidden sm:block" />
            </button>
            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-white border border-neutral-border rounded-xl shadow-soft-lg overflow-hidden py-1"
                >
                  <button className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-neutral-textMuted hover:bg-accent-light transition-colors">
                    <User className="w-4 h-4" /> Profile
                  </button>
                  <button className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-neutral-textMuted hover:bg-accent-light transition-colors">
                    <Settings className="w-4 h-4" /> Settings
                  </button>
                  <div className="border-t border-neutral-border my-1" />
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-danger hover:bg-danger-light transition-colors"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
