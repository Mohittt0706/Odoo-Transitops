import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import ChartCard from "../../components/charts/ChartCard";
import SimpleBarChart from "../../components/charts/BarChart";
import DonutChart from "../../components/charts/PieChart";
import { StatCard } from "../../components/finance-hub/FinanceHubComponents";
import { maintStatsData } from "../../data/financeData";
import { Wrench, Calculator, Clock, CheckCircle, TrendingUp, TrendingDown, Cog } from "lucide-react";

export default function MaintenanceCostPage() {
  const { monthlyCost, breakdown, vehicleRanking } = maintStatsData;
  const total = monthlyCost.reduce((s, m) => s + m.value, 0);
  const avg = total / monthlyCost.length;
  const sorted = [...vehicleRanking].sort((a, b) => b.cost - a.cost);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <PageHeader title="Maintenance Cost" subtitle="Vehicle maintenance expense tracking" />
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        <StatCard label="Total Cost" value={`₹${(total / 1000).toFixed(0)}k`} icon={Wrench} color="warning" />
        <StatCard label="Monthly Avg" value={`₹${(avg / 1000).toFixed(0)}k`} icon={Calculator} color="primary" />
        <StatCard label="Repair Cost" value={`₹${(total * 0.4 / 1000).toFixed(0)}k`} icon={Cog} color="danger" />
        <StatCard label="Service Cost" value={`₹${(total * 0.3 / 1000).toFixed(0)}k`} icon={Clock} color="info" />
        <StatCard label="Parts Cost" value={`₹${(total * 0.2 / 1000).toFixed(0)}k`} icon={CheckCircle} color="purple" />
        <StatCard label="Highest Vehicle" value={sorted[0]?.plate} icon={TrendingUp} color="danger" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Monthly Maintenance Cost" subtitle="Last 12 months"><SimpleBarChart data={monthlyCost} height={140} color="#F59E0B" /></ChartCard>
        <ChartCard title="Cost Breakdown" subtitle="By category"><DonutChart data={breakdown} size={130} thickness={16} /></ChartCard>
      </div>
      <ChartCard title="Vehicle Maintenance Ranking" subtitle="Highest maintenance cost">
        <div className="space-y-2">
          {sorted.slice(0, 10).map((v, i) => (
            <div key={v.plate} className="flex items-center gap-3">
              <span className="text-[11px] font-bold text-neutral-textMuted w-5">{i + 1}</span>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between text-xs"><span className="font-semibold truncate">{v.name}</span><span className="font-bold">₹{(v.cost / 1000).toFixed(0)}k ({v.count} visits)</span></div>
                <div className="w-full h-1.5 bg-neutral-border rounded-full mt-1 overflow-hidden">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: `${(v.cost / sorted[0].cost) * 100}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </ChartCard>
    </motion.div>
  );
}
