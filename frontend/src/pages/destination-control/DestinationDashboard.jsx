import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import ChartCard from "../../components/charts/ChartCard";
import SimpleBarChart from "../../components/charts/BarChart";
import AreaChart from "../../components/charts/AreaChart";
import DonutChart from "../../components/charts/PieChart";
import TrendIndicator from "../../components/reports/TrendIndicator";
import StatCard from "../../components/reports/StatCard";
import {
  Truck, CheckCircle, Clock, AlertTriangle, Warehouse, PackageCheck,
  XCircle, Upload, Download, Users, Gauge, Hourglass,
} from "lucide-react";
import {
  dailyDeliveries, dockUtilizationHistory, warehouseCapacityHistory,
  delayAnalysis, storageDistribution, dockData, incomingDeliveries,
  completedDeliveries, warehouseSections, podRecords,
} from "../../data/destinationData";
import { useNavigate } from "react-router-dom";

export default function DestinationDashboard() {
  const navigate = useNavigate();
  const activeDocks = dockData.filter(d => d.status === 'Occupied').length;
  const totalCapacity = warehouseSections.reduce((s, sec) => s + sec.capacity, 0);
  const totalUsed = warehouseSections.reduce((s, sec) => s + sec.used, 0);
  const warehousePct = Math.round((totalUsed / totalCapacity) * 100);
  const avgUnloading = Math.round(completedDeliveries.reduce((s, d) => {
    const m = parseInt(d.unloadingTime);
    return s + (isNaN(m) ? 60 : m);
  }, 0) / completedDeliveries.length);
  const completedToday = completedDeliveries.filter(d => d.completionTime.startsWith(new Date().toISOString().split('T')[0])).length;

  const kpiCards = [
    { title: "Incoming Trucks", value: incomingDeliveries.length, icon: Truck, change: "+3", type: "up", spark: [28, 32, 35, 30, 38, 36, incomingDeliveries.length], color: "bg-primary/10 text-primary", delay: 0 },
    { title: "Completed Today", value: completedToday || 12, icon: CheckCircle, change: "+18%", type: "up", spark: [8, 10, 7, 12, 9, 11, 12], color: "bg-emerald-50 text-emerald-600", delay: 0.02 },
    { title: "Pending Deliveries", value: incomingDeliveries.filter(d => d.status === 'Arrived' || d.status === 'Docked').length, icon: Clock, change: "-2", type: "down", spark: [12, 10, 8, 9, 7, 6, 5], color: "bg-amber-50 text-amber-600", delay: 0.04 },
    { title: "Delayed Deliveries", value: incomingDeliveries.filter(d => d.status === 'Delayed').length + completedDeliveries.filter(d => d.status === 'Rejected').length, icon: AlertTriangle, change: "-5%", type: "down", spark: [8, 7, 6, 5, 4, 4, 3], color: "bg-red-50 text-red-600", delay: 0.06 },
    { title: "Dock Utilization", value: Math.round(dockData.reduce((s, d) => s + d.utilization, 0) / dockData.length) + "%", icon: Gauge, change: "+4%", type: "up", spark: [68, 72, 70, 74, 73, 76, 75], color: "bg-blue-50 text-blue-600", delay: 0.08 },
    { title: "Warehouse Capacity", value: warehousePct + "%", icon: Warehouse, change: "+2%", type: "up", spark: [78, 79, 80, 81, 82, 83, warehousePct], color: "bg-purple-50 text-purple-600", delay: 0.1 },
    { title: "Active Docks", value: activeDocks + "/" + dockData.length, icon: Truck, change: "+3", type: "up", spark: [12, 14, 15, 13, 16, 17, activeDocks], color: "bg-cyan-50 text-cyan-600", delay: 0.12 },
    { title: "Avg Unloading Time", value: avgUnloading + " min", icon: Hourglass, change: "-8 min", type: "down", spark: [95, 88, 82, 78, 75, 72, avgUnloading], color: "bg-orange-50 text-orange-600", delay: 0.14 },
    { title: "Pending POD", value: podRecords.filter(r => r.status === 'Pending' || r.status === 'Awaiting Photo').length, icon: Upload, change: "-3", type: "down", spark: [18, 16, 14, 12, 11, 10, 8], color: "bg-indigo-50 text-indigo-600", delay: 0.16 },
    { title: "Confirmed Today", value: completedDeliveries.filter(d => d.status === 'Confirmed').length || 8, icon: PackageCheck, change: "+15%", type: "up", spark: [5, 6, 7, 8, 7, 9, 8], color: "bg-emerald-50 text-emerald-600", delay: 0.18 },
    { title: "Rejected Today", value: completedDeliveries.filter(d => d.status === 'Rejected').length || 1, icon: XCircle, change: "-1", type: "down", spark: [3, 2, 2, 1, 1, 1, 0], color: "bg-red-50 text-red-600", delay: 0.2 },
    { title: "Warehouse Load", value: Math.round((totalUsed / totalCapacity) * 100) + "%", icon: Users, change: "+2%", type: "up", spark: [72, 74, 76, 78, 79, 80, 82], color: "bg-teal-50 text-teal-600", delay: 0.22 },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <PageHeader
        title="Arrival Hub"
        subtitle="Monitor deliveries, dock operations, and warehouse performance"
        actions={
          <div className="flex items-center gap-2">
            <button onClick={() => navigate("/dashboard/destination/incoming")} className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary-dark transition-colors shadow-soft-sm">
              <Truck className="w-4 h-4" /> View Incoming
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neutral-border text-neutral-textMain text-sm font-bold rounded-lg hover:bg-accent-light transition-colors">
              <Download className="w-4 h-4" /> Export
            </button>
          </div>
        }
      />

      {/* 12 KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 mb-5">
        {kpiCards.map((kpi) => (
          <StatCard key={kpi.title} title={kpi.title} value={kpi.value} icon={kpi.icon}
            change={kpi.change} changeType={kpi.type} sparklineData={kpi.spark}
            color={kpi.color} delay={kpi.delay} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex items-center gap-2 mb-5 flex-wrap">
        {[
          { label: "Confirm Delivery", icon: PackageCheck, color: "bg-emerald-50 text-emerald-600 hover:bg-emerald-100", path: "/dashboard/destination/incoming" },
          { label: "Reject Delivery", icon: XCircle, color: "bg-red-50 text-red-600 hover:bg-red-100", path: "/dashboard/destination/incoming" },
          { label: "Assign Dock", icon: Truck, color: "bg-blue-50 text-blue-600 hover:bg-blue-100", path: "/dashboard/destination/warehouse" },
          { label: "Upload POD", icon: Upload, color: "bg-primary/10 text-primary hover:bg-primary/20", path: "/dashboard/destination/proof-of-delivery" },
          { label: "Generate Report", icon: Download, color: "bg-purple-50 text-purple-600 hover:bg-purple-100", path: "/dashboard/destination/reports" },
          { label: "Print Slip", icon: Clock, color: "bg-amber-50 text-amber-600 hover:bg-amber-100" },
          { label: "Email Receiver", icon: Users, color: "bg-cyan-50 text-cyan-600 hover:bg-cyan-100" },
          { label: "Export CSV", icon: Download, color: "bg-indigo-50 text-indigo-600 hover:bg-indigo-100" },
        ].map((action, i) => (
          <motion.button key={action.label} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + i * 0.02 }}
            onClick={() => action.path && navigate(action.path)}
            className={`inline-flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-lg border border-transparent transition-all ${action.color}`}>
            <action.icon className="w-3.5 h-3.5" strokeWidth={2} />
            {action.label}
          </motion.button>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">
        <ChartCard title="Daily Deliveries" subtitle="Incoming vs completed per day" delay={0.3}
          actions={<TrendIndicator value="+12.5% vs LW" type="up" />}>
          <div className="flex items-end gap-1.5" style={{ height: 160 }}>
            {dailyDeliveries.map((d, i) => {
              const max = Math.max(...dailyDeliveries.flatMap(d => [d.incoming, d.completed]));
              const hIncoming = (d.incoming / max) * 136;
              const hCompleted = (d.completed / max) * 136;
              return (
                <div key={d.label} className="flex-1 flex flex-col items-center gap-0.5 group">
                  <div className="relative flex-1 flex items-end w-full gap-0.5">
                    <motion.div initial={{ height: 0 }} animate={{ height: hIncoming }}
                      transition={{ delay: 0.35 + i * 0.03, duration: 0.4 }}
                      className="flex-1 rounded-t-sm bg-primary/60 group-hover:bg-primary transition-colors cursor-pointer" />
                    <motion.div initial={{ height: 0 }} animate={{ height: hCompleted }}
                      transition={{ delay: 0.4 + i * 0.03, duration: 0.4 }}
                      className="flex-1 rounded-t-sm bg-emerald-500/60 group-hover:bg-emerald-500 transition-colors cursor-pointer" />
                  </div>
                  <span className="text-[8px] text-neutral-textMuted font-medium">{d.label}</span>
                </div>
              );
            })}
          </div>
        </ChartCard>

        <ChartCard title="Dock Utilization" subtitle="Average dock usage this week" delay={0.35}
          actions={<TrendIndicator value="72% avg" type="up" />}>
          <SimpleBarChart data={dockUtilizationHistory} color="#7C3AED" height={160} />
        </ChartCard>

        <ChartCard title="Delay Analysis" subtitle="Root cause breakdown" delay={0.4}>
          <DonutChart data={delayAnalysis.map(d => ({ label: d.cause, value: d.value, color: pickColor(d.cause) }))} size={130} thickness={15} />
        </ChartCard>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
        <ChartCard title="Warehouse Capacity Trend" subtitle="Monthly utilization %" delay={0.45}
          actions={<TrendIndicator value="+5.2%" type="up" />}>
          <AreaChart data={warehouseCapacityHistory} color="#1E3A5F" height={180} />
        </ChartCard>

        <ChartCard title="Storage Distribution" subtitle="By warehouse section" delay={0.5}>
          <DonutChart data={storageDistribution} size={140} thickness={16} />
        </ChartCard>
      </div>

      {/* Recent Incoming */}
      <ChartCard title="Recently Arrived" subtitle="Latest incoming deliveries" delay={0.55}
        actions={
          <button onClick={() => navigate("/dashboard/destination/incoming")} className="text-xs font-bold text-primary hover:underline">
            View All
          </button>
        }>
        <div className="space-y-2">
          {incomingDeliveries.slice(0, 5).map((d, i) => (
            <motion.div key={d.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.6 + i * 0.04 }}
              className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-accent-light transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${statusDot(d.status)}`} />
                <span className="text-xs font-mono font-bold text-primary">{d.id}</span>
                <span className="text-sm font-bold text-neutral-textMain">{d.truck}</span>
                <span className="text-xs text-neutral-textMuted">{d.driver}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-neutral-textMuted">{d.dock}</span>
                <span className="text-xs font-semibold text-neutral-textMain">{d.eta}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusBadgeClass(d.status)}`}>{d.status}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </ChartCard>
    </motion.div>
  );
}

function pickColor(label) {
  const colors = ['#1E3A5F', '#DC2626', '#D97706', '#059669', '#7C3AED', '#06B6D4', '#F43F5E', '#14B8A6'];
  return colors[label.length % colors.length];
}
function statusDot(s) {
  const map = { 'In Transit': 'bg-primary', 'Arrived': 'bg-emerald-500', 'Docked': 'bg-blue-500', 'Unloading': 'bg-amber-500', 'Delayed': 'bg-red-500' };
  return map[s] || 'bg-neutral-textMuted';
}
function statusBadgeClass(s) {
  const map = { 'In Transit': 'bg-primary-light text-primary', 'Arrived': 'bg-emerald-50 text-emerald-600', 'Docked': 'bg-blue-50 text-blue-600', 'Unloading': 'bg-amber-50 text-amber-600', 'Delayed': 'bg-red-50 text-red-600' };
  return map[s] || 'bg-accent-light text-neutral-textMuted';
}
