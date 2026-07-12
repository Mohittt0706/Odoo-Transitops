import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import StatCard from "../../components/reports/StatCard";
import ChartCard from "../../components/charts/ChartCard";
import SimpleBarChart from "../../components/charts/BarChart";
import AreaChart from "../../components/charts/AreaChart";
import DonutChart from "../../components/charts/PieChart";
import TrendIndicator from "../../components/reports/TrendIndicator";
import { Truck, TrendingUp, TrendingDown, Route, Wrench, Clock, DollarSign, Gauge, ArrowUp, ArrowDown } from "lucide-react";
import { vehiclePerformance, fleetGrowthData, vehicleStatusData, vehicleHealthData, fleetUtilization, monthlyExpenses } from "../../data/reportData";

export default function FleetAnalytics() {
  const totalDistance = vehiclePerformance.reduce((s, v) => s + v.distance, 0);
  const avgUtilization = Math.round(vehiclePerformance.reduce((s, v) => s + v.usage, 0) / vehiclePerformance.length);
  const avgMaintScore = Math.round(vehiclePerformance.reduce((s, v) => s + v.maintenanceScore, 0) / vehiclePerformance.length);
  const totalMaintCost = monthlyExpenses.reduce((s, d) => s + d.maintenance, 0);
  const totalServiceCost = monthlyExpenses.reduce((s, d) => s + d.maintenance + d.other, 0);
  const avgDowntime = 0;

  const sortedByUsage = [...vehiclePerformance].sort((a, b) => b.usage - a.usage);
  const topVehicles = sortedByUsage.slice(0, 5);
  const bottomVehicles = sortedByUsage.slice(-5).reverse();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageHeader
        title="Fleet Analytics"
        subtitle="Comprehensive fleet performance metrics and vehicle insights"
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-5">
        <StatCard title="Fleet Size" value="" icon={Truck} change="" changeType="up" sparklineData={[]} color="bg-primary/10 text-primary" delay={0} />
        <StatCard title="Vehicle Utilization" value={`${avgUtilization}%`} icon={Gauge} change="" changeType="up" sparklineData={[]} color="bg-emerald-50 text-emerald-600" delay={0.02} />
        <StatCard title="Avg Distance (km)" value={`${(totalDistance / vehiclePerformance.length / 100).toFixed(1)}K`} icon={Route} change="" changeType="up" sparklineData={[]} color="bg-blue-50 text-blue-600" delay={0.04} />
        <StatCard title="Availability" value="" icon={Clock} change="" changeType="up" sparklineData={[]} color="bg-cyan-50 text-cyan-600" delay={0.06} />
        <StatCard title="Maintenance Score" value={`${avgMaintScore}%`} icon={Wrench} change="" changeType="up" sparklineData={[]} color="bg-amber-50 text-amber-600" delay={0.08} />
        <StatCard title="Downtime (avg hrs)" value={`${avgDowntime}h`} icon={TrendingDown} change="" changeType="down" sparklineData={[]} color="bg-rose-50 text-rose-600" delay={0.1} />
        <StatCard title="Service Cost (YTD)" value={`₹${(totalServiceCost / 1000).toFixed(0)}K`} icon={DollarSign} change="" changeType="up" sparklineData={[]} color="bg-purple-50 text-purple-600" delay={0.12} />
        <StatCard title="Maintenance Cost" value={`₹${(totalMaintCost / 1000).toFixed(0)}K`} icon={Wrench} change="" changeType="up" sparklineData={[]} color="bg-orange-50 text-orange-600" delay={0.14} />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">
        <ChartCard title="Vehicle Usage" subtitle="Utilization by vehicle" delay={0.2}
          actions={<TrendIndicator value="" type="up" />}
        >
          <SimpleBarChart data={vehiclePerformance.slice(0, 8).map(v => ({ label: v.name.split(' ')[1], value: v.usage }))} color="#1E3A5F" height={160} />
        </ChartCard>

        <ChartCard title="Fleet Growth" subtitle="" delay={0.25}
          actions={<TrendIndicator value="" type="up" />}
        >
          <SimpleBarChart data={fleetGrowthData} color="#059669" height={160} />
        </ChartCard>

        <ChartCard title="Vehicle Health" subtitle="Current fleet condition" delay={0.3}>
          <DonutChart data={vehicleHealthData} size={130} thickness={15} />
        </ChartCard>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
        <ChartCard title="Fleet Utilization Trend" subtitle="Monthly utilization %" delay={0.35}
          actions={<TrendIndicator value="" type="up" />}
        >
          <AreaChart data={fleetUtilization} color="#1E3A5F" height={180} />
        </ChartCard>

        <ChartCard title="Vehicle Status" subtitle="Current fleet breakdown" delay={0.4}>
          <DonutChart data={vehicleStatusData} size={140} thickness={16} />
        </ChartCard>
      </div>

      {/* Top / Bottom Vehicles */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
        <ChartCard title="Top Performing Vehicles" subtitle="By utilization rate" delay={0.45}>
          <div className="space-y-2.5">
            {topVehicles.map((v, i) => (
              <div key={v.id} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-success-light text-success text-[10px] font-bold flex items-center justify-center">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-sm font-bold text-neutral-textMain truncate">{v.name}</span>
                    <span className="text-xs font-bold text-success">{v.usage}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-neutral-light rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${v.usage}%` }}
                      transition={{ delay: 0.5 + i * 0.05, duration: 0.6 }}
                      className="h-full rounded-full bg-success"
                    />
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-neutral-textMain">{v.distance.toLocaleString()} km</p>
                  <p className="text-[10px] text-neutral-textMuted">{v.type}</p>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Bottom Performing Vehicles" subtitle="Needs attention" delay={0.5}>
          <div className="space-y-2.5">
            {bottomVehicles.map((v, i) => (
              <div key={v.id} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-danger-light text-danger text-[10px] font-bold flex items-center justify-center">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-sm font-bold text-neutral-textMain truncate">{v.name}</span>
                    <span className="text-xs font-bold text-danger">{v.usage}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-neutral-light rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${v.usage}%` }}
                      transition={{ delay: 0.5 + i * 0.05, duration: 0.6 }}
                      className="h-full rounded-full bg-danger"
                    />
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-neutral-textMain">{v.distance.toLocaleString()} km</p>
                  <p className="text-[10px] text-neutral-textMuted">{v.status}</p>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>
    </motion.div>
  );
}

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
