import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass, Users, UserPlus, UserCheck, FileText, BarChart3,
  Award, Clock, Settings, ChevronLeft, ChevronRight, Search,
  Bell, HelpCircle, ChevronDown, Menu, X
} from 'lucide-react';

const driverNavItems = [
  { path: '/drivers/overview', label: 'Driver Overview', icon: BarChart3 },
  { path: '/drivers/all', label: 'All Drivers', icon: Users },
  { path: '/drivers/register', label: 'Register Driver', icon: UserPlus },
  { path: '/drivers/profile/DRV-1001', label: 'Driver Profile', icon: UserCheck },
  { path: '/drivers/documents', label: 'Driver Documents', icon: FileText },
  { path: '/drivers/performance', label: 'Performance', icon: Award },
  { path: '/drivers/licenses', label: 'License Management', icon: Clock },
  { path: '/drivers/history', label: 'Driver History', icon: Clock },
  { path: '/drivers/settings', label: 'Settings', icon: Settings },
];

export default function DriverLayout() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path) => {
    if (path.includes('/drivers/profile/')) return location.pathname.startsWith('/drivers/profile');
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const currentPage = driverNavItems.find((item) => isActive(item.path));

  return (
    <div className="flex h-screen bg-neutral-light overflow-hidden">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative z-50 h-screen bg-white border-r border-slate-100 flex flex-col
          transition-all duration-300 ease-in-out
          ${collapsed ? 'w-[72px]' : 'w-64'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Brand Header */}
        <div className={`flex items-center border-b border-slate-100 p-4 ${collapsed ? 'justify-center' : 'gap-2.5'}`}>
          <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 shrink-0">
            <Compass className="h-5 w-5" />
          </div>
          {!collapsed && (
            <span className="text-lg font-black tracking-tight text-slate-900 whitespace-nowrap">
              Transit<span className="text-blue-600">Ops</span>
            </span>
          )}
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-1 flex-1 overflow-y-auto p-3">
          {!collapsed && (
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-2">
              DRIVER MANAGEMENT
            </p>
          )}
          {driverNavItems.map((item) => {
            const active = isActive(item.path);
            const Icon = item.icon;
            return (
              <Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)} className="relative group">
                <div
                  className={`
                    flex items-center gap-3 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200
                    ${collapsed ? 'justify-center px-2 py-3' : 'px-3.5 py-2.5'}
                    ${active
                      ? 'text-blue-600 bg-blue-50/70'
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50/50'
                    }
                  `}
                >
                  <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-105 ${active ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                  {active && (
                    <motion.div
                      layoutId="driver-nav-indicator"
                      className="absolute right-2 w-1.5 h-1.5 rounded-full bg-blue-600"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Collapse Toggle */}
        <div className="border-t border-slate-100 p-3 hidden lg:block">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-50 text-[10px] font-bold transition-all cursor-pointer"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>

        {/* Back to Home */}
        <div className="border-t border-slate-100 p-3">
          <Link
            to="/"
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-900 hover:bg-slate-50/50 transition-all ${collapsed ? 'justify-center' : ''}`}
          >
            <ChevronLeft className="w-4 h-4 shrink-0" />
            {!collapsed && <span>Back to Home</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 border-b border-slate-100 bg-white/80 backdrop-blur-md flex items-center justify-between px-6 lg:px-8 text-slate-800 sticky top-0 z-30 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all cursor-pointer"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Console</span>
              <span className="text-slate-300">/</span>
              <h2 className="text-xs font-bold text-slate-800 tracking-wide uppercase">
                {currentPage?.label || 'Driver Management'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search drivers, licenses..."
                className="w-64 bg-slate-50 border border-slate-200/80 hover:border-slate-300 focus:border-blue-500 focus:bg-white rounded-xl pl-10 pr-4 py-2 text-xs text-slate-800 outline-none transition-all"
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="relative p-2 text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all cursor-pointer">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 flex h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white" />
              </button>
              <button className="p-2 text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all cursor-pointer">
                <HelpCircle className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center gap-3 border-l border-slate-100 pl-4">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-blue-500/20">
                JD
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-xs font-bold text-slate-900 leading-tight">John Doe</p>
                <p className="text-[10px] text-slate-400 font-medium leading-none mt-0.5">Operations Lead</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
