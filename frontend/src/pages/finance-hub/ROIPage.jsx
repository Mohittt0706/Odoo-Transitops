import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import ChartCard from "../../components/charts/ChartCard";
import SimpleBarChart from "../../components/charts/BarChart";
import { StatCard } from "../../components/finance-hub/FinanceHubComponents";
import { roiData, vehicles } from "../../data/financeData";
import { TrendingUp, Trophy, AlertTriangle, BarChart3, DollarSign, Target, Award } from "lucide-react";

export default function ROIPage() {
  const sorted = [...roiData].sort((a, b) => b.roi - a.roi);
  const avgRoi = Math.round(roiData.reduce((s, v) => s + v.roi, 0) / roiData.length);
  const totalProfit = roiData.reduce((s, v) => s + v.profit, 0);
  const totalInvestment = roiData.reduce((s, v) => s + v.purchaseCost, 0);

  const roiChart = sorted.map((v) => ({ label: v.name.split(" ").slice(-1)[0], value: v.roi }));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <PageHeader title="Vehicle ROI" subtitle="Return on investment analysis" />
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        <StatCard label="Avg ROI" value={`${avgRoi}%`} icon={TrendingUp} color="success" />
        <StatCard label="Total Investment" value={`₹${(totalInvestment / 100000).toFixed(0)}L`} icon={DollarSign} color="primary" />
        <StatCard label="Net Profit" value={`₹${(totalProfit / 100000).toFixed(1)}L`} icon={Target} color="purple" />
        <StatCard label="Top Vehicle" value={sorted[0].name.split(" ")[0]} icon={Trophy} color="warning" />
        <StatCard label="Highest ROI" value={`${sorted[0].roi}%`} icon={Award} color="success" />
        <StatCard label="Lowest ROI" value={`${sorted[sorted.length - 1].roi}%`} icon={AlertTriangle} color="danger" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="ROI Comparison" subtitle="By vehicle"><SimpleBarChart data={roiChart} height={160} color="#7C3AED" /></ChartCard>
        <ChartCard title="Vehicle Profitability">
          <div className="space-y-2">
            {sorted.map((v, i) => (
              <div key={v.plate} className="flex items-center gap-3">
                <span className="text-[11px] font-bold text-neutral-textMuted w-5">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold truncate">{v.name}</span>
                    <div className="flex gap-3">
                      <span className="text-success font-bold">+₹{(v.profit / 1000).toFixed(0)}k</span>
                      <span className="text-primary font-bold">{v.roi}%</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1 h-1.5 bg-neutral-border rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(v.revenue / sorted[0].revenue) * 100}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>
      <ChartCard title="ROI Breakdown Table" delay={0.3}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-border">
                {["#", "Vehicle", "Purchase Cost", "Revenue", "Expenses", "Net Profit", "ROI %"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-neutral-textMuted">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((v, i) => (
                <tr key={v.plate} className="border-b border-neutral-border/50">
                  <td className="px-4 py-3 text-neutral-textMuted text-xs">{i + 1}</td>
                  <td className="px-4 py-3 font-semibold">{v.name}<br /><span className="text-[10px] text-neutral-textMuted">{v.plate}</span></td>
                  <td className="px-4 py-3">₹{(v.purchaseCost / 1000).toFixed(0)}k</td>
                  <td className="px-4 py-3">₹{(v.revenue / 1000).toFixed(0)}k</td>
                  <td className="px-4 py-3">₹{(v.cost / 1000).toFixed(0)}k</td>
                  <td className="px-4 py-3 font-semibold text-success">₹{(v.profit / 1000).toFixed(0)}k</td>
                  <td className="px-4 py-3"><span className="font-bold text-primary">{v.roi}%</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </motion.div>
  );
}
