import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import StatCard from "../../components/reports/StatCard";
import ChartCard from "../../components/charts/ChartCard";
import SimpleBarChart from "../../components/charts/BarChart";
import AreaChart from "../../components/charts/AreaChart";
import DonutChart from "../../components/charts/PieChart";
import TrendIndicator from "../../components/reports/TrendIndicator";
import { IndianRupee, TrendingUp, TrendingDown, DollarSign, PieChart, BarChart3, Wallet, Target } from "lucide-react";
import { monthlyRevenue, quarterlyRevenue, annualRevenue, revenueDistribution, driverPerformance, vehiclePerformance, monthlyExpenses } from "../../data/reportData";

export default function RevenueAnalytics() {
  const totalRevenue = monthlyRevenue.reduce((s, d) => s + d.value, 0);
  const totalProfit = monthlyRevenue.reduce((s, d) => s + d.profit, 0);
  const totalTrips = monthlyRevenue.reduce((s, d) => s + d.trips, 0);
  const avgRevenuePerTrip = Math.round(totalRevenue / totalTrips);
  const avgRevenuePerVehicle = Math.round(totalRevenue / vehiclePerformance.length);
  const profitMargin = Math.round((totalProfit / totalRevenue) * 100);
  const lastMonthRevenue = monthlyRevenue[monthlyRevenue.length - 1].value;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageHeader
        title="Revenue Analytics"
        subtitle="Revenue insights, profit analysis, and financial forecasting"
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-3 mb-5">
        <StatCard title="Monthly Revenue" value={`₹${(lastMonthRevenue / 1000).toFixed(0)}K`} icon={IndianRupee} change="+8.3%" changeType="up" sparklineData={monthlyRevenue.map(d => Math.round(d.value / 1000))} color="bg-emerald-50 text-emerald-600" delay={0} />
        <StatCard title="Quarterly Revenue" value={`₹${(quarterlyRevenue[quarterlyRevenue.length - 1].value / 1000).toFixed(0)}K`} icon={BarChart3} change="+6.5%" changeType="up" sparklineData={quarterlyRevenue.map(d => Math.round(d.value / 1000))} color="bg-blue-50 text-blue-600" delay={0.02} />
        <StatCard title="Annual Revenue" value={`₹${(annualRevenue[annualRevenue.length - 1].value / 10000000).toFixed(1)}Cr`} icon={TrendingUp} change="+10.8%" changeType="up" sparklineData={annualRevenue.map(d => Math.round(d.value / 100000))} color="bg-primary/10 text-primary" delay={0.04} />
        <StatCard title="Revenue / Trip" value={`₹${avgRevenuePerTrip.toLocaleString()}`} icon={Target} change="+3.2%" changeType="up" sparklineData={[1250, 1280, 1300, 1320, 1340, 1350, avgRevenuePerTrip]} color="bg-purple-50 text-purple-600" delay={0.06} />
        <StatCard title="Revenue / Vehicle" value={`₹${avgRevenuePerVehicle.toLocaleString()}`} icon={DollarSign} change="+5.1%" changeType="up" sparklineData={[180, 185, 190, 195, 198, 200, Math.round(avgRevenuePerVehicle / 1000)]} color="bg-cyan-50 text-cyan-600" delay={0.08} />
        <StatCard title="Net Profit" value={`₹${(totalProfit / 100000).toFixed(1)}L`} icon={Wallet} change="+12.4%" changeType="up" sparklineData={monthlyRevenue.map(d => Math.round(d.profit / 1000))} color="bg-emerald-50 text-emerald-600" delay={0.1} />
        <StatCard title="Gross Profit" value={`₹${((totalRevenue - monthlyExpenses[monthlyExpenses.length - 1].value) / 1000).toFixed(0)}K`} icon={TrendingUp} change="+6.8%" changeType="up" sparklineData={[120, 125, 130, 135, 140, 142, 148]} color="bg-green-50 text-green-600" delay={0.12} />
        <StatCard title="Profit Margin" value={`${profitMargin}%`} icon={PieChart} change="+2.3%" changeType="up" sparklineData={[28, 29, 30, 30, 31, 31, profitMargin]} color="bg-indigo-50 text-indigo-600" delay={0.14} />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
        <ChartCard title="Revenue Growth" subtitle="Monthly revenue trend" delay={0.2}
          actions={<TrendIndicator value="+12.4% YoY" type="up" />}
        >
          <AreaChart data={monthlyRevenue.map(d => ({ label: d.label, value: Math.round(d.value / 1000) }))} color="#059669" height={180} />
        </ChartCard>

        <ChartCard title="Monthly Income" subtitle="Last 12 months" delay={0.25}
          actions={<TrendIndicator value="₹49.8L avg" type="up" />}
        >
          <SimpleBarChart data={monthlyRevenue.map(d => ({ label: d.label, value: Math.round(d.value / 1000) }))} color="#1E3A5F" height={180} />
        </ChartCard>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
        <ChartCard title="Profit Margin" subtitle="Monthly profit vs revenue" delay={0.3}
          actions={<TrendIndicator value={`${profitMargin}% avg`} type="up" />}
        >
          <AreaChart data={monthlyRevenue.map(d => ({ label: d.label, value: Math.round((d.profit / d.value) * 100) }))} color="#7C3AED" height={180} />
        </ChartCard>

        <ChartCard title="Revenue Distribution" subtitle="By service category" delay={0.35}>
          <DonutChart data={revenueDistribution} size={140} thickness={16} />
        </ChartCard>
      </div>

      {/* Revenue Forecast */}
      <ChartCard title="Revenue Forecast" subtitle="Projected revenue for next 3 months" delay={0.4}
        actions={<TrendIndicator value="+8.5% projected" type="up" />}
      >
        <div className="grid grid-cols-3 gap-4">
          {[
            { month: "August 2026", projected: 628000, low: 585000, high: 655000 },
            { month: "September 2026", projected: 645000, low: 600000, high: 675000 },
            { month: "October 2026", projected: 668000, low: 620000, high: 700000 },
          ].map((forecast, i) => (
            <motion.div
              key={forecast.month}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 + i * 0.05 }}
              className="p-4 rounded-xl border border-neutral-border bg-neutral-light/50"
            >
              <p className="text-xs font-bold text-neutral-textMuted mb-2">{forecast.month}</p>
              <p className="text-xl font-extrabold text-neutral-textMain tabular-nums">₹{forecast.projected.toLocaleString()}</p>
              <div className="flex items-center justify-between mt-2 text-[10px] text-neutral-textMuted">
                <span>Low: ₹{forecast.low.toLocaleString()}</span>
                <span>High: ₹{forecast.high.toLocaleString()}</span>
              </div>
              <div className="mt-2 w-full h-1.5 bg-neutral-light rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "70%" }}
                  transition={{ delay: 0.5 + i * 0.05, duration: 0.6 }}
                  className="h-full rounded-full bg-primary"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </ChartCard>
    </motion.div>
  );
}

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
