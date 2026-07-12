import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import ChartCard from "../../components/charts/ChartCard";
import SimpleBarChart from "../../components/charts/BarChart";
import DonutChart from "../../components/charts/PieChart";
import AreaChart from "../../components/charts/AreaChart";
import { StatCard } from "../../components/finance-hub/FinanceHubComponents";
import { fuelStatsData } from "../../data/financeData";
import { Fuel, Droplets, Calculator, Gauge, TrendingUp, TrendingDown, BarChart3 } from "lucide-react";

export default function FuelCostPage() {
  const { monthlyCost, consumption, vehicleRanking, avgCostPerKm, fuelEfficiency } = fuelStatsData;
  const sorted = [...vehicleRanking].sort((a, b) => b.cost - a.cost);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <PageHeader title="Fuel Cost" subtitle="Fuel expense analytics and trends" />
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        <StatCard label="Monthly Fuel Cost" value={`₹${(monthlyCost.reduce((s, m) => s + m.value, 0) / 12 / 1000).toFixed(0)}k`} icon={Fuel} color="warning" />
        <StatCard label="Total Consumption" value={`${(consumption.reduce((s, m) => s + m.value, 0)).toLocaleString()} L`} icon={Droplets} color="primary" />
        <StatCard label="Avg Cost/km" value={`₹${avgCostPerKm}`} icon={Calculator} color="danger" />
        <StatCard label="Avg Efficiency" value={`${fuelEfficiency} km/L`} icon={Gauge} color="success" />
        <StatCard label="Highest Vehicle" value={sorted[0]?.plate} icon={TrendingUp} color="danger" />
        <StatCard label="Lowest Vehicle" value={sorted[sorted.length - 1]?.plate} icon={TrendingDown} color="success" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Monthly Fuel Cost" subtitle="Last 12 months"><SimpleBarChart data={monthlyCost} height={140} color="#F59E0B" /></ChartCard>
        <ChartCard title="Fuel Consumption" subtitle="Litres consumed"><AreaChart data={consumption} color="orange" /></ChartCard>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Vehicle Fuel Ranking" subtitle="Highest to lowest">
          <div className="space-y-2">
            {sorted.slice(0, 8).map((v, i) => (
              <div key={v.plate} className="flex items-center gap-3">
                <span className="text-[11px] font-bold text-neutral-textMuted w-5">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between text-xs"><span className="font-semibold truncate">{v.name}</span><span className="font-bold">₹{(v.cost / 1000).toFixed(0)}k</span></div>
                  <div className="w-full h-1.5 bg-neutral-border rounded-full mt-1 overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: `${(v.cost / sorted[0].cost) * 100}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
        <ChartCard title="Fuel Efficiency" subtitle="km/L by vehicle">
          <SimpleBarChart data={vehicleRanking.slice(0, 8).map((v) => ({ label: v.plate.slice(-4), value: parseFloat(v.efficiency) * 10 }))} height={140} color="#22C55E" />
        </ChartCard>
      </div>
    </motion.div>
  );
}
