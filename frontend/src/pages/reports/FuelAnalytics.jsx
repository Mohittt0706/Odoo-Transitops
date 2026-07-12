import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import StatCard from "../../components/reports/StatCard";
import ChartCard from "../../components/charts/ChartCard";
import SimpleBarChart from "../../components/charts/BarChart";
import AreaChart from "../../components/charts/AreaChart";
import TrendIndicator from "../../components/reports/TrendIndicator";
import { Fuel, DollarSign, Gauge, TrendingUp, TrendingDown, Zap } from "lucide-react";
import { fuelData, fuelConsumption, monthlyExpenses, vehiclePerformance } from "../../data/reportData";

export default function FuelAnalytics() {
  const totalFuelCost = fuelData.reduce((s, f) => s + f.fuelCost, 0);
  const totalConsumption = fuelData.reduce((s, f) => s + f.consumption, 0);
  const avgEfficiency = (fuelData.reduce((s, f) => s + f.efficiency, 0) / fuelData.length).toFixed(1);
  const avgMileage = Math.round(fuelData.reduce((s, f) => s + f.mileage, 0) / fuelData.length);
  const totalFuelExpense = monthlyExpenses.reduce((s, d) => s + d.fuel, 0);
  const wasteEstimate = Math.round(totalConsumption * 0.08);

  const sortedByEfficiency = [...fuelData].sort((a, b) => b.efficiency - a.efficiency);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageHeader
        title="Fuel Analytics"
        subtitle="Fuel consumption trends, cost analysis, and efficiency metrics"
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-5">
        <StatCard title="Total Fuel Cost" value={`₹${(totalFuelCost / 1000).toFixed(0)}K`} icon={DollarSign} change="" changeType="up" sparklineData={[]} color="bg-rose-50 text-rose-600" delay={0} />
        <StatCard title="Total Consumption" value={`${(totalConsumption / 1000).toFixed(1)}K L`} icon={Fuel} change="" changeType="up" sparklineData={[]} color="bg-amber-50 text-amber-600" delay={0.02} />
        <StatCard title="Avg Fuel Efficiency" value={`${avgEfficiency} km/L`} icon={Gauge} change="" changeType="up" sparklineData={[]} color="bg-emerald-50 text-emerald-600" delay={0.04} />
        <StatCard title="Average Mileage" value={`${avgMileage.toLocaleString()} km`} icon={Route} change="" changeType="up" sparklineData={[]} color="bg-blue-50 text-blue-600" delay={0.06} />
        <StatCard title="Fuel Expense (YTD)" value={`₹${(totalFuelExpense / 1000).toFixed(0)}K`} icon={TrendingUp} change="" changeType="up" sparklineData={[]} color="bg-purple-50 text-purple-600" delay={0.08} />
        <StatCard title="Waste Estimate" value={`${wasteEstimate.toLocaleString()} L`} icon={Zap} change="" changeType="down" sparklineData={[]} color="bg-orange-50 text-orange-600" delay={0.1} />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">
        <ChartCard title="Fuel Consumption Trend" subtitle="Monthly fuel usage (L)" delay={0.2}
          actions={<TrendIndicator value="" type="up" />}
        >
          <AreaChart data={fuelConsumption.map(d => ({ label: d.label, value: Math.round(d.value / 100) }))} color="#D97706" height={160} />
        </ChartCard>

        <ChartCard title="Fuel Cost Trend" subtitle="" delay={0.25}
          actions={<TrendIndicator value="" type="up" />}
        >
          <AreaChart data={monthlyExpenses.map(d => ({ label: d.label, value: Math.round(d.fuel / 1000) }))} color="#DC2626" height={160} />
        </ChartCard>

        <ChartCard title="Fuel Efficiency" subtitle="km/L by vehicle" delay={0.3}
          actions={<TrendIndicator value="" type="up" />}
        >
          <SimpleBarChart data={sortedByEfficiency.map(f => ({ label: f.vehicle.split(' ')[1], value: Math.round(f.efficiency * 10) }))} color="#059669" height={160} />
        </ChartCard>
      </div>

      {/* Fuel Per Vehicle Table */}
      <ChartCard title="Fuel Per Vehicle" subtitle="Detailed fuel consumption analysis" delay={0.35}
        actions={
          <div className="flex items-center gap-2">
            <TrendIndicator value="" type="up" />
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-border">
                <th className="text-left px-3 py-2.5 text-[10px] font-bold uppercase tracking-wider text-neutral-textMuted">Vehicle</th>
                <th className="text-right px-3 py-2.5 text-[10px] font-bold uppercase tracking-wider text-neutral-textMuted">Fuel Cost</th>
                <th className="text-right px-3 py-2.5 text-[10px] font-bold uppercase tracking-wider text-neutral-textMuted">Consumption (L)</th>
                <th className="text-right px-3 py-2.5 text-[10px] font-bold uppercase tracking-wider text-neutral-textMuted">Efficiency</th>
                <th className="text-right px-3 py-2.5 text-[10px] font-bold uppercase tracking-wider text-neutral-textMuted">Mileage (km)</th>
                <th className="text-right px-3 py-2.5 text-[10px] font-bold uppercase tracking-wider text-neutral-textMuted">Cost/km</th>
              </tr>
            </thead>
            <tbody>
              {sortedByEfficiency.map((f, i) => (
                <motion.tr
                  key={f.vehicle}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 + i * 0.03 }}
                  className="border-b border-neutral-border/50 hover:bg-accent-light transition-colors"
                >
                  <td className="px-3 py-3 font-bold text-neutral-textMain">{f.vehicle}</td>
                  <td className="px-3 py-3 text-right font-semibold text-neutral-textMain tabular-nums">₹{f.fuelCost.toLocaleString()}</td>
                  <td className="px-3 py-3 text-right font-semibold text-neutral-textMain tabular-nums">{f.consumption.toLocaleString()}</td>
                  <td className="px-3 py-3 text-right">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      f.efficiency >= 6.5 ? 'bg-success-light text-success' : 
                      f.efficiency >= 5.5 ? 'bg-warning-light text-warning' : 
                      'bg-danger-light text-danger'
                    }`}>
                      {f.efficiency} km/L
                    </span>
                  </td>
                  <td className="px-3 py-3 text-right font-semibold text-neutral-textMain tabular-nums">{f.mileage.toLocaleString()}</td>
                  <td className="px-3 py-3 text-right font-semibold text-neutral-textMain tabular-nums">₹{(f.fuelCost / f.mileage).toFixed(2)}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </motion.div>
  );
}

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
