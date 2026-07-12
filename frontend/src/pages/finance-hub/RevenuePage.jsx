import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import ChartCard from "../../components/charts/ChartCard";
import SimpleBarChart from "../../components/charts/BarChart";
import AreaChart from "../../components/charts/AreaChart";
import DonutChart from "../../components/charts/PieChart";
import { StatCard } from "../../components/finance-hub/FinanceHubComponents";
import { financeRevenue, revenueStats } from "../../data/financeData";
import { IndianRupee, TrendingUp, Calendar, BarChart3, DollarSign, TrendingDown } from "lucide-react";

export default function RevenuePage() {
  const total = financeRevenue.reduce((s, r) => s + r.amount, 0);
  const monthly = revenueStats.monthly;
  const byVehicle = revenueStats.byVehicle;
  const growth = revenueStats.growth;

  const distData = [
    { label: "Transport", value: 45, color: "#2563EB" },
    { label: "Logistics", value: 25, color: "#22C55E" },
    { label: "Warehousing", value: 18, color: "#F59E0B" },
    { label: "Express", value: 12, color: "#8B5CF6" },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <PageHeader title="Revenue" subtitle="Revenue tracking and analytics" />
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        <StatCard label="Total Revenue" value={`₹${(total / 100000).toFixed(1)}L`} icon={IndianRupee} color="success" />
        <StatCard label="Monthly" value={`₹${(monthly[monthly.length - 1].value / 1000).toFixed(0)}k`} icon={Calendar} color="primary" />
        <StatCard label="Quarterly" value={`₹${(monthly.slice(-3).reduce((s, m) => s + m.value, 0) / 1000).toFixed(0)}k`} icon={BarChart3} color="purple" />
        <StatCard label="Growth" value={`${growth[growth.length - 1]}%`} icon={TrendingUp} color="success" />
        <StatCard label="Avg/Vehicle" value={`₹${(total / byVehicle.length / 1000).toFixed(0)}k`} icon={DollarSign} color="warning" />
        <StatCard label="Highest Month" value={monthly.reduce((a, b) => a.value > b.value ? a : b).label} icon={TrendingUp} color="success" />
        <StatCard label="Lowest Month" value={monthly.reduce((a, b) => a.value < b.value ? a : b).label} icon={TrendingDown} color="danger" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Revenue Trend" subtitle="Monthly revenue"><AreaChart data={monthly} color="green" /></ChartCard>
        <ChartCard title="Revenue Distribution" subtitle="By service type"><DonutChart data={distData} size={130} thickness={16} /></ChartCard>
      </div>
      <ChartCard title="Top Revenue Vehicles">
        <div className="space-y-2">
          {byVehicle.sort((a, b) => b.revenue - a.revenue).slice(0, 8).map((v, i) => (
            <div key={v.plate} className="flex items-center gap-3">
              <span className="text-[11px] font-bold text-neutral-textMuted w-5">{i + 1}</span>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between text-xs"><span className="font-semibold truncate">{v.name}</span><span className="font-bold">₹{(v.revenue / 1000).toFixed(0)}k</span></div>
                <div className="w-full h-1.5 bg-neutral-border rounded-full mt-1 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(v.revenue / byVehicle[0].revenue) * 100}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </ChartCard>
    </motion.div>
  );
}
