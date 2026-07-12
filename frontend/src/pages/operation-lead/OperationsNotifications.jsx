import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import { notifications } from "../../data/mockData";
import {
  Bell,
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  Info,
} from "lucide-react";
import { useState } from "react";

const typeConfig = {
  warning: { icon: AlertTriangle, color: "text-amber-500", bg: "bg-amber-50" },
  danger: { icon: AlertCircle, color: "text-red-500", bg: "bg-red-50" },
  success: { icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-50" },
  info: { icon: Info, color: "text-blue-500", bg: "bg-blue-50" },
};

const tabs = ["All", "Unread", "Alerts", "System"];

export default function OperationsNotifications() {
  const [activeTab, setActiveTab] = useState("All");

  const filtered = notifications.filter((n) => {
    if (activeTab === "Unread") return !n.read;
    if (activeTab === "Alerts") return n.type === "warning" || n.type === "danger";
    if (activeTab === "System") return n.type === "info" || n.type === "success";
    return true;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageHeader
        title="Notifications"
        subtitle="Stay updated on fleet activities and alerts"
      />

      <div className="bg-white border border-neutral-border rounded-xl shadow-soft-sm overflow-hidden">
        <div className="flex items-center gap-1 px-5 pt-4 pb-2 border-b border-neutral-border">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                activeTab === tab
                  ? "bg-primary text-white"
                  : "text-neutral-textMuted hover:bg-accent-light"
              }`}
            >
              {tab}
              {tab === "Unread" && (
                <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-bold bg-white/20 rounded-full">
                  {notifications.filter((n) => !n.read).length}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="divide-y divide-neutral-border">
          {filtered.map((n, i) => {
            const config = typeConfig[n.type] || typeConfig.info;
            const Icon = config.icon;
            return (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className={`flex items-start gap-4 px-5 py-4 hover:bg-slate-50/80 transition-colors ${
                  !n.read ? "bg-primary/[0.02]" : ""
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${config.bg}`}>
                  <Icon className={`w-4.5 h-4.5 ${config.color}`} strokeWidth={1.8} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm leading-relaxed ${!n.read ? "font-semibold text-neutral-textMain" : "text-neutral-textMain"}`}>
                    {n.title}
                  </p>
                  <p className="text-xs text-neutral-textMuted mt-1">{n.time}</p>
                </div>
                {!n.read && (
                  <div className="w-2.5 h-2.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                )}
              </motion.div>
            );
          })}
          {filtered.length === 0 && (
            <div className="px-5 py-12 text-center">
              <Bell className="w-10 h-10 text-neutral-textMuted mx-auto mb-3" strokeWidth={1.5} />
              <p className="text-sm font-medium text-neutral-textMuted">No notifications to show</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
