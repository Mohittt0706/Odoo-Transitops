import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import StatCard from "../../components/reports/StatCard";
import ChartCard from "../../components/charts/ChartCard";
import SimpleBarChart from "../../components/charts/BarChart";
import AreaChart from "../../components/charts/AreaChart";
import TrendIndicator from "../../components/reports/TrendIndicator";
import { IndianRupee, TrendingUp, TrendingDown, DollarSign, PieChart, Target, Wallet, ArrowUp, ArrowDown } from "lucide-react";
import { roiData, monthlyRevenue, monthlyExpenses } from "../../data/reportData";

export default function VehicleROI() {
  const totalPurchaseCost = roiData.reduce((s, v) => s + v.purchaseCost, 0);
  const totalOperationalCost = roiData.reduce((s, v) => s + v.totalOperationalCost, 0);
  const totalRevenue = roiData.reduce((s, v) => s + v.revenue, 0);
  const totalNetProfit = roiData.reduce((s, v) => s + v.netProfit, 0);
  const avgROI = Math.round(roiData.reduce((s, v) => s + v.roi, 0) / roiData.length);
  const totalLifetimeValue = roiData.reduce((s, v) => s + v.lifetimeValue, 0);

  const sortedByROI = [...roiData].sort((a, b) => b.roi - a.roi);
  const topROI = sortedByROI.slice(0, 5);
  const lowestROI = sortedByROI.slice(-5).reverse();

  const netProfitMonthly = monthlyRevenue.map((d, i) => ({
    label: d.label,
    value: d.value - (monthlyExpenses[i]?.value || 0),
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageHeader
        title="Vehicle ROI"
        subtitle="Return on investment analysis and vehicle profitability tracking"
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-5">
        <StatCard title="Total Purchase Cost" value={`₹${(totalPurchaseCost / 100000).toFixed(1)}L`} icon={Wallet} change="" changeType="up" sparklineData={[]} color="bg-primary/10 text-primary" delay={0} />
        <StatCard title="Operational Cost" value={`₹${(totalOperationalCost / 100000).toFixed(1)}L`} icon={DollarSign} change="" changeType="up" sparklineData={[]} color="bg-amber-50 text-amber-600" delay={0.02} />
        <StatCard title="Total Revenue" value={`₹${(totalRevenue / 100000).toFixed(1)}L`} icon={IndianRupee} change="" changeType="up" sparklineData={[]} color="bg-emerald-50 text-emerald-600" delay={0.04} />
        <StatCard title="Net Profit" value={`₹${(totalNetProfit / 100000).toFixed(1)}L`} icon={TrendingUp} change="" changeType="up" sparklineData={[]} color="bg-cyan-50 text-cyan-600" delay={0.06} />
        <StatCard title="Avg ROI" value={`${avgROI}%`} icon={Target} change="" changeType="up" sparklineData={[]} color="bg-purple-50 text-purple-600" delay={0.08} />
        <StatCard title="Lifetime Value" value={`₹${(totalLifetimeValue / 10000000).toFixed(1)}Cr`} icon={PieChart} change="" changeType="up" sparklineData={[]} color="bg-blue-50 text-blue-600" delay={0.1} />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
        <ChartCard title="ROI Comparison" subtitle="ROI % by vehicle" delay={0.2}
          actions={<TrendIndicator value="" type="up" />}
        >
          <SimpleBarChart data={sortedByROI.map(v => ({ label: v.name.split(' ')[1], value: v.roi }))} color="#7C3AED" height={180} />
        </ChartCard>

        <ChartCard title="Vehicle Profitability" subtitle="Net profit by vehicle" delay={0.25}
          actions={<TrendIndicator value="" type="up" />}
        >
          <SimpleBarChart data={sortedByROI.map(v => ({ label: v.name.split(' ')[1], value: Math.round(v.netProfit / 1000) }))} color="#059669" height={180} />
        </ChartCard>
      </div>

      {/* Charts Row 2 */}
      <ChartCard title="Lifetime Revenue" subtitle="Monthly net profit trend" delay={0.3}
          actions={<TrendIndicator value="" type="up" />}
      >
        <AreaChart data={netProfitMonthly.map(d => ({ label: d.label, value: Math.round(d.value / 1000) }))} color="#059669" height={200} />
      </ChartCard>

      {/* Top / Bottom ROI */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5">
        <ChartCard title="Top ROI Vehicles" subtitle="Highest return on investment" delay={0.35}>
          <div className="space-y-2.5">
            {topROI.map((v, i) => (
              <div key={v.id} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-success-light text-success text-[10px] font-bold flex items-center justify-center">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-sm font-bold text-neutral-textMain truncate">{v.name}</span>
                    <span className="text-xs font-bold text-success">+{v.roi}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-neutral-light rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(v.roi, 100)}%` }}
                      transition={{ delay: 0.4 + i * 0.05, duration: 0.6 }}
                      className="h-full rounded-full bg-success"
                    />
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-neutral-textMain">₹{v.revenue.toLocaleString()}</p>
                  <p className="text-[10px] text-neutral-textMuted">Profit: ₹{v.netProfit.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Lowest ROI Vehicles" subtitle="Needs optimization" delay={0.4}>
          <div className="space-y-2.5">
            {lowestROI.map((v, i) => (
              <div key={v.id} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-danger-light text-danger text-[10px] font-bold flex items-center justify-center">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-sm font-bold text-neutral-textMain truncate">{v.name}</span>
                    <span className="text-xs font-bold text-danger">{v.roi}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-neutral-light rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.max(v.roi, 5)}%` }}
                      transition={{ delay: 0.4 + i * 0.05, duration: 0.6 }}
                      className="h-full rounded-full bg-danger"
                    />
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-neutral-textMain">₹{v.revenue.toLocaleString()}</p>
                  <p className="text-[10px] text-neutral-textMuted">Cost: ₹{v.totalOperationalCost.toLocaleString()}</p>
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
