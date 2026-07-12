import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import ChartCard from "../../components/charts/ChartCard";
import DonutChart from "../../components/charts/PieChart";
import SimpleBarChart from "../../components/charts/BarChart";
import AreaChart from "../../components/charts/AreaChart";
import { StatCard } from "../../components/notifications/NotificationComponents";
import { allNotifications, notificationStats, monthlyTrend } from "../../data/notificationData";
import { Bell, BellRing, AlertTriangle, Wrench, Route, DollarSign, FileText, Archive, TrendingUp, TrendingDown, BarChart3, Download, CheckCheck } from "lucide-react";

const catDist = [
  { label: "Maintenance", value: allNotifications.filter((n) => n.category === "maintenance").length, color: "#F59E0B" },
  { label: "Trip", value: allNotifications.filter((n) => n.category === "trip").length, color: "#2563EB" },
  { label: "License", value: allNotifications.filter((n) => n.category === "license").length, color: "#8B5CF6" },
  { label: "Financial", value: allNotifications.filter((n) => n.category === "financial").length, color: "#22C55E" },
  { label: "General", value: allNotifications.filter((n) => n.category === "general").length, color: "#A1A1AA" },
];

const readVsUnread = [
  { label: "Read", value: allNotifications.filter((n) => n.read).length, color: "#22C55E" },
  { label: "Unread", value: allNotifications.filter((n) => !n.read).length, color: "#3B82F6" },
];

const priorityDist = [
  { label: "Critical", value: allNotifications.filter((n) => n.priority === "critical").length, color: "#EF4444" },
  { label: "High", value: allNotifications.filter((n) => n.priority === "high").length, color: "#F97316" },
  { label: "Medium", value: allNotifications.filter((n) => n.priority === "medium").length, color: "#F59E0B" },
  { label: "Low", value: allNotifications.filter((n) => n.priority === "low").length, color: "#A1A1AA" },
];

export default function AlertDashboard() {
  const stats = [
    { label: "Total Notifications", value: notificationStats.total, icon: Bell, color: "primary", trend: 12 },
    { label: "Unread", value: notificationStats.unread, icon: BellRing, color: "purple", trend: 8 },
    { label: "Critical Alerts", value: notificationStats.critical, icon: AlertTriangle, color: "danger", trend: 15 },
    { label: "Trip Alerts", value: notificationStats.trip, icon: Route, color: "cyan", trend: -3 },
    { label: "Maintenance", value: notificationStats.maintenance, icon: Wrench, color: "warning", trend: 5 },
    { label: "Financial", value: notificationStats.financial, icon: DollarSign, color: "success", trend: -2 },
    { label: "License", value: notificationStats.license, icon: FileText, color: "purple", trend: 10 },
    { label: "Archived", value: notificationStats.archived, icon: Archive, color: "slate", trend: 0 },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <PageHeader title="Alerts Overview" subtitle="Notification analytics and KPI dashboard"
        actions={
          <button className="btn btn-secondary text-xs flex items-center gap-1.5">
            <Download className="w-3.5 h-3.5" /> Export Report
          </button>
        }
      />
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {stats.map((s, i) => <StatCard key={s.label} {...s} delay={i * 0.025} />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Notifications by Category" subtitle="Distribution across categories">
          <DonutChart data={catDist} size={140} thickness={18} />
        </ChartCard>
        <ChartCard title="Monthly Notification Trend" subtitle="Last 7 months">
          <AreaChart data={monthlyTrend} color="blue" />
        </ChartCard>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard title="Read vs Unread" subtitle="Current status">
          <DonutChart data={readVsUnread} size={120} thickness={14} />
        </ChartCard>
        <ChartCard title="Alert Distribution" subtitle="By priority level">
          <SimpleBarChart data={priorityDist} height={140} color="#EF4444" />
        </ChartCard>
        <ChartCard title="Category Breakdown" subtitle="Alert counts">
          <SimpleBarChart data={catDist} height={140} color="#2563EB" />
        </ChartCard>
      </div>
    </motion.div>
  );
}
