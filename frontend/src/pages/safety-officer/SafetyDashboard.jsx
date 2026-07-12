import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import KPICard from "../../components/dashboard/KPICard";
import ChartCard from "../../components/charts/ChartCard";
import SimpleBarChart from "../../components/charts/BarChart";
import AreaChart from "../../components/charts/AreaChart";
import { drivers, incidents, licenses } from "../../data/mockData";
import { cn } from "../../utils/utils";
import { AlertTriangle, Shield, FileText, Calendar, UserX, TrendingUp, CheckCircle, Clock } from "lucide-react";

const complianceTrend = [
  { label: "Jan", value: 88 },
  { label: "Feb", value: 90 },
  { label: "Mar", value: 91 },
  { label: "Apr", value: 93 },
  { label: "May", value: 92 },
  { label: "Jun", value: 94 },
];

const incidentTrend = [
  { label: "Jan", value: 3 },
  { label: "Feb", value: 2 },
  { label: "Mar", value: 4 },
  { label: "Apr", value: 1 },
  { label: "May", value: 3 },
  { label: "Jun", value: 2 },
];

const driverSafetyScores = drivers.map((d) => ({
  label: d.name.split(" ")[0],
  value: d.compliance,
}));

const recentAlerts = [
  { msg: "Driver Rajesh Kumar — License expires in 12 days", severity: "warning", time: "2h ago" },
  { msg: "Vehicle KL-07-AU-4521 — Brake inspection overdue", severity: "danger",  time: "5h ago" },
  { msg: "Trip #TRP-0088 — Deviation from approved route",  severity: "warning", time: "Yesterday" },
  { msg: "Driver Suresh Nair — Passed safety re-certification", severity: "success", time: "Yesterday" },
];

const severityConfig = {
  warning: { cls: "bg-warning-light text-warning border-amber-200/60",   icon: AlertTriangle, dot: "#D97706" },
  danger:  { cls: "bg-danger-light text-danger border-red-200/60",        icon: AlertTriangle, dot: "#DC2626" },
  success: { cls: "bg-success-light text-success border-emerald-200/60",  icon: CheckCircle,   dot: "#059669" },
};

export default function SafetyDashboard() {
  const driversAtRisk   = drivers.filter((d) => d.status === "At Risk").length;
  const licenseExpiring = licenses.filter((l) => l.status === "Expiring Soon").length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <PageHeader
        title="Safety Command"
        subtitle="Monitor driver compliance, incidents, and inspections"
        badge="Jun 2026"
      />

      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <KPICard title="Drivers At Risk"   value={driversAtRisk}      icon={AlertTriangle} changeType="down" change="+1 this month" color="bg-danger/10 text-danger"     delay={0}    />
        <KPICard title="License Expiry"    value={licenseExpiring}    icon={FileText}      changeType="down" change="Within 30 days" color="bg-warning/10 text-warning"   delay={0.05} />
        <KPICard title="Compliance Score"  value="94%"                icon={Shield}        changeType="up"   change="+2% vs last"  color="bg-success/10 text-success"     delay={0.1}  />
        <KPICard title="Incidents MTD"     value={incidents.length}   icon={AlertTriangle} changeType="up"   change="-2 vs last"   color="bg-primary/10 text-primary"     delay={0.15} />
        <KPICard title="Safety Rating"     value="A+"                 icon={TrendingUp}    changeType="up"   change="Maintained"   color="bg-emerald-50 text-emerald-600" delay={0.2}  />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <ChartCard title="Compliance Trend" subtitle="Monthly driver compliance %" delay={0.25}>
          <AreaChart data={complianceTrend} color="#059669" />
        </ChartCard>
        <ChartCard title="Incident Trend" subtitle="Monthly incident count" delay={0.3}>
          <SimpleBarChart data={incidentTrend} color="#DC2626" />
        </ChartCard>
      </div>

      <ChartCard title="Driver Safety Scores" subtitle="Compliance % by driver" delay={0.35}>
        <SimpleBarChart data={driverSafetyScores} color="#1E3A5F" />
      </ChartCard>

      {/* Recent Alerts */}
      <ChartCard
        title="Safety Alerts"
        subtitle="Recent compliance and safety events"
        delay={0.4}
        actions={<button className="text-[11px] text-primary font-semibold hover:underline">View All</button>}
      >
        <div className="space-y-2">
          {recentAlerts.map((alert, i) => {
            const cfg = severityConfig[alert.severity];
            const AlertIcon = cfg.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 + i * 0.05 }}
                className={`flex items-start gap-2.5 p-3 rounded-lg border text-[12px] ${cfg.cls}`}
              >
                <AlertIcon className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" strokeWidth={2} />
                <span className="flex-1 leading-snug font-medium">{alert.msg}</span>
                <span className="text-[10px] opacity-70 flex-shrink-0 flex items-center gap-1">
                  <Clock className="w-3 h-3" />{alert.time}
                </span>
              </motion.div>
            );
          })}
        </div>
      </ChartCard>
    </motion.div>
  );
}
