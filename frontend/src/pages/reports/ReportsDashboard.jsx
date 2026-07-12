import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import StatCard from "../../components/reports/StatCard";
import ChartCard from "../../components/charts/ChartCard";
import SimpleBarChart from "../../components/charts/BarChart";
import AreaChart from "../../components/charts/AreaChart";
import DonutChart from "../../components/charts/PieChart";
import TrendIndicator from "../../components/reports/TrendIndicator";
import {
  Truck,
  IndianRupee,
  TrendingUp,
  TrendingDown,
  Wallet,
  Route,
  CheckCircle2,
  ShieldCheck,
  BarChart3,
  Fuel,
  Wrench,
  Users,
  Download,
  ArrowRight,
  Building2,
  PieChart,
} from "lucide-react";
import {
  monthlyRevenue,
  monthlyExpenses,
  fleetUtilization,
  vehicleStatusData,
  revenueDistribution,
  fuelConsumption,
  maintenanceTrend,
  driverPerformance,
  vehiclePerformance,
} from "../../data/reportData";
import { useNavigate } from "react-router-dom";

export default function ReportsDashboard() {
  const navigate = useNavigate();
  const totalRevenue = monthlyRevenue.reduce((s, d) => s + d.value, 0);
  const totalExpenses = monthlyExpenses.reduce((s, d) => s + d.value, 0);
  const totalProfit = monthlyRevenue.reduce((s, d) => s + d.profit, 0);
  const activeVehicles = vehiclePerformance.filter(v => v.status === "Active").length;
  const avgSafety = Math.round(driverPerformance.reduce((s, d) => s + d.score, 0) / driverPerformance.length);

  const quickNav = [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageHeader
        title="Reports & Analytics"
        subtitle="Executive dashboard with comprehensive fleet insights and performance metrics"
        actions={
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary-dark transition-colors shadow-soft-sm">
              <Download className="w-4 h-4" /> Export Report
            </button>
          </div>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-3 mb-5">
        <StatCard title="Total Fleet" value="0" icon={Truck} change="0%" changeType="up" sparklineData={[]} color="bg-primary/10 text-primary" delay={0} />
        <StatCard title="Active Vehicles" value={activeVehicles} icon={Building2} change="0%" changeType="up" sparklineData={[]} color="bg-emerald-50 text-emerald-600" delay={0.02} />
        <StatCard title="Total Revenue" value={`₹${(totalRevenue / 100000).toFixed(1)}L`} icon={IndianRupee} change="0%" changeType="up" sparklineData={monthlyRevenue.map(d => Math.round(d.value / 10000))} color="bg-blue-50 text-blue-600" delay={0.04} />
        <StatCard title="Monthly Profit" value={`₹${(monthlyRevenue[monthlyRevenue.length - 1].profit / 1000).toFixed(0)}K`} icon={TrendingUp} change="0%" changeType="up" sparklineData={monthlyRevenue.map(d => Math.round(d.profit / 1000))} color="bg-emerald-50 text-emerald-600" delay={0.06} />
        <StatCard title="Monthly Expenses" value={`₹${(monthlyExpenses[monthlyExpenses.length - 1].value / 1000).toFixed(0)}K`} icon={Wallet} change="0%" changeType="up" sparklineData={monthlyExpenses.map(d => Math.round(d.value / 1000))} color="bg-amber-50 text-amber-600" delay={0.08} />
        <StatCard title="Active Trips" value="0" icon={Route} change="0" changeType="up" sparklineData={[]} color="bg-purple-50 text-purple-600" delay={0.1} />
        <StatCard title="Completed Trips" value="0" icon={CheckCircle2} change="0%" changeType="up" sparklineData={[]} color="bg-cyan-50 text-cyan-600" delay={0.12} />
        <StatCard title="Safety Score" value={`${avgSafety}%`} icon={ShieldCheck} change="0%" changeType="up" sparklineData={[]} color="bg-green-50 text-green-600" delay={0.14} />
      </div>

      {/* Quick Navigation */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-3">
          <BarChart3 className="w-4 h-4 text-primary" />
          <span className="text-xs font-bold text-neutral-textMuted uppercase tracking-wider">Quick Access</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickNav.map((item, i) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.03, duration: 0.3 }}
              onClick={() => navigate(item.path)}
              className="flex items-center gap-3 p-3 bg-white border border-neutral-border rounded-xl hover:shadow-soft-md transition-all group text-left"
            >
              <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110", item.color)}>
                <item.icon className="w-[18px] h-[18px]" strokeWidth={1.8} />
              </div>
              <span className="text-sm font-bold text-neutral-textMain">{item.label}</span>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-textMuted ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">
        <ChartCard title="Monthly Revenue" subtitle="Last 12 months" delay={0.2}
          actions={<TrendIndicator value="0%" type="up" />}
        >
          <SimpleBarChart data={monthlyRevenue.map(d => ({ label: d.label, value: Math.round(d.value / 1000) }))} color="#1E3A5F" height={160} />
        </ChartCard>

        <ChartCard title="Fleet Utilization" subtitle="Monthly utilization %" delay={0.25}
          actions={<TrendIndicator value="0%" type="up" />}
        >
          <SimpleBarChart data={fleetUtilization} color="#059669" height={160} />
        </ChartCard>

        <ChartCard title="Fuel Consumption" subtitle="Monthly fuel usage (L)" delay={0.3}
          actions={<TrendIndicator value="0%" type="up" />}
        >
          <SimpleBarChart data={fuelConsumption.map(d => ({ label: d.label, value: Math.round(d.value / 100) }))} color="#D97706" height={160} />
        </ChartCard>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
        <ChartCard title="Expense Trend" subtitle="Monthly operational costs" delay={0.35}
          actions={<TrendIndicator value="0%" type="up" />}
        >
          <AreaChart data={monthlyExpenses.map(d => ({ label: d.label, value: Math.round(d.value / 1000) }))} color="#DC2626" height={180} />
        </ChartCard>

        <ChartCard title="Maintenance Trend" subtitle="Monthly maintenance costs" delay={0.4}
          actions={<TrendIndicator value="0%" type="up" />}
        >
          <AreaChart data={maintenanceTrend.map(d => ({ label: d.label, value: Math.round(d.value / 1000) }))} color="#D97706" height={180} />
        </ChartCard>
      </div>

      {/* Charts Row 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
        <ChartCard title="Vehicle Status" subtitle="Current fleet breakdown" delay={0.45}>
          <DonutChart data={vehicleStatusData} size={140} thickness={16} />
        </ChartCard>

        <ChartCard title="Revenue Distribution" subtitle="By service category" delay={0.5}>
          <DonutChart data={revenueDistribution} size={140} thickness={16} />
        </ChartCard>
      </div>

      {/* Top Drivers */}
      <ChartCard title="Top Performing Drivers" subtitle="By safety score & revenue" delay={0.55}
        actions={
          <button onClick={() => navigate("/dashboard/operations/drivers")} className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
            View All <ArrowRight className="w-3 h-3" />
          </button>
        }
      >
        <div className="space-y-2">
          {driverPerformance.slice(0, 6).map((d, i) => (
            <div key={d.name} className="flex items-center gap-3 py-1.5">
              <span className="w-6 h-6 rounded-lg bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center">{i + 1}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold text-neutral-textMain">{d.name}</span>
                  <span className="text-xs font-bold text-success">{d.score}%</span>
                </div>
                <div className="w-full h-1.5 bg-neutral-light rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${d.score}%` }}
                    transition={{ delay: 0.6 + i * 0.05, duration: 0.6, ease: "easeOut" }}
                    className="h-full rounded-full bg-primary"
                  />
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-neutral-textMain">₹{d.revenue.toLocaleString()}</p>
                <p className="text-[10px] text-neutral-textMuted">{d.trips} trips</p>
              </div>
            </div>
          ))}
        </div>
      </ChartCard>
    </motion.div>
  );
}

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
