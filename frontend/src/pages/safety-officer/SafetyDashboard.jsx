import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import KPICard from "../../components/dashboard/KPICard";
import ChartCard from "../../components/charts/ChartCard";
import SimpleBarChart from "../../components/charts/BarChart";
import AreaChart from "../../components/charts/AreaChart";
import { dashboardService } from "../../services/dashboard.service";
import { cn } from "../../utils/utils";
import { AlertTriangle, Shield, FileText, Calendar, UserX, TrendingUp, CheckCircle, Clock, Loader2, Inbox } from "lucide-react";

const complianceTrend = [];

const incidentTrend = [];

const recentAlerts = [];

const severityConfig = {
  warning: { cls: "bg-warning-light text-warning border-amber-200/60",   icon: AlertTriangle, dot: "#D97706" },
  danger:  { cls: "bg-danger-light text-danger border-red-200/60",        icon: AlertTriangle, dot: "#DC2626" },
  success: { cls: "bg-success-light text-success border-emerald-200/60",  icon: CheckCircle,   dot: "#059669" },
};

export default function SafetyDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetchData = () => {
    setLoading(true);
    setError(null);
    dashboardService.getDashboard()
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load safety data");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-danger mx-auto mb-3" />
          <p className="text-sm text-neutral-textMuted">{error}</p>
          <button onClick={fetchData} className="btn btn-primary mt-4">Retry</button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Inbox className="w-12 h-12 text-neutral-textMuted mx-auto mb-3" />
          <p className="text-sm text-neutral-textMuted">No data available</p>
        </div>
      </div>
    );
  }

  const drivers = data.drivers || [];
  const incidents = data.incidents || [];
  const licenses = data.licenses || [];

  const driversAtRisk   = drivers.filter((d) => d.status === "At Risk").length;
  const licenseExpiring = licenses.filter((l) => l.status === "Expiring Soon").length;

  const driverSafetyScores = drivers.map((d) => ({
    label: d.name.split(" ")[0],
    value: d.compliance,
  }));

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
