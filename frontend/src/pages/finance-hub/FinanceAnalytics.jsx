import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import ChartCard from "../../components/charts/ChartCard";
import SimpleBarChart from "../../components/charts/BarChart";
import AreaChart from "../../components/charts/AreaChart";
import DonutChart from "../../components/charts/PieChart";
import { StatCard, FilterBar } from "../../components/finance-hub/FinanceHubComponents";
import { monthlyRevenue, monthlyExpenses, expenseDist, roiData, vehicles } from "../../data/financeData";
import { TrendingUp, TrendingDown, IndianRupee, Fuel, Wrench, DollarSign, BarChart3, Target, PieChart, LineChart } from "lucide-react";
import { useState } from "react";

const costPerKm = [];
const profitabilityByClient = [];
const budgetUtilization = [];

const monthlyProfit = monthlyRevenue.map((r, i) => ({ label: r.label, value: r.value - monthlyExpenses[i].value }));

export default function FinanceAnalytics() {
  const [chartFilter, setChartFilter] = useState("revenue");

  const filters = [
    { key: "revenue", label: "Revenue vs Expenses" },
    { key: "profit", label: "Net Profit" },
    { key: "margin", label: "Profit Margin" },
  ];

  const totalRevenue = monthlyRevenue.reduce((s, m) => s + m.value, 0);
  const totalExpenses = monthlyExpenses.reduce((s, m) => s + m.value, 0);
  const netProfit = totalRevenue - totalExpenses;
  const margin = ((netProfit / totalRevenue) * 100).toFixed(1);

  const activeData = chartFilter === "revenue"
    ? monthlyRevenue.map((m, i) => ({ label: m.label, value1: m.value, value2: monthlyExpenses[i].value }))
    : chartFilter === "profit"
    ? monthlyProfit
    : monthlyProfit.map((m) => ({ label: m.label, value: totalRevenue > 0 ? ((m.value / (monthlyRevenue.find((r) => r.label === m.label)?.value || 1)) * 100).toFixed(0) : 0 }));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <PageHeader title="Analytics" subtitle="Financial analytics and insights" />
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        <StatCard label="Total Revenue" value={`₹${(totalRevenue / 100000).toFixed(1)}L`} icon={IndianRupee} color="success" />
        <StatCard label="Total Expenses" value={`₹${(totalExpenses / 100000).toFixed(1)}L`} icon={TrendingDown} color="danger" />
        <StatCard label="Net Profit" value={`₹${(netProfit / 100000).toFixed(1)}L`} icon={Target} color="purple" />
        <StatCard label="Profit Margin" value={`${margin}%`} icon={BarChart3} color="primary" />
        <StatCard label="Avg Revenue" value={`₹${((totalRevenue / monthlyRevenue.length) / 1000).toFixed(0)}k`} icon={TrendingUp} color="warning" />
        <StatCard label="Avg Expenses" value={`₹${((totalExpenses / monthlyExpenses.length) / 1000).toFixed(0)}k`} icon={TrendingDown} color="danger" />
        <StatCard label="Best Month" value={monthlyProfit.reduce((a, b) => a.value > b.value ? a : b).label} icon={LineChart} color="success" />
        <StatCard label="Worst Month" value={monthlyProfit.reduce((a, b) => a.value < b.value ? a : b).label} icon={PieChart} color="danger" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Revenue vs Expenses" subtitle="Monthly comparison">
          <FilterBar filters={filters} active={chartFilter} onChange={setChartFilter} compact />
          <div className="mt-4">
            {chartFilter === "revenue" ? (
              <div className="flex items-end gap-2 h-40">
                {activeData.map((m, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex gap-0.5">
                      <div className="flex-1 rounded-t-sm" style={{ height: `${(m.value1 / Math.max(...monthlyRevenue.map(r => r.value)) * 120)}px`, backgroundColor: "#2563EB", opacity: 0.8 }} />
                      <div className="flex-1 rounded-t-sm" style={{ height: `${(m.value2 / Math.max(...monthlyRevenue.map(r => r.value)) * 120)}px`, backgroundColor: "#EF4444", opacity: 0.8 }} />
                    </div>
                    <span className="text-[9px] text-neutral-textMuted font-medium">{m.label}</span>
                  </div>
                ))}
              </div>
            ) : (
              <SimpleBarChart data={activeData} height={160} color={chartFilter === "profit" ? "#22C55E" : "#8B5CF6"} />
            )}
          </div>
          {chartFilter === "revenue" && (
            <div className="flex items-center gap-4 mt-3 text-[11px]">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-blue-500" /> Revenue</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-red-500" /> Expenses</span>
            </div>
          )}
        </ChartCard>
        <ChartCard title="Cost per KM Analysis" subtitle="By vehicle">
          <SimpleBarChart data={costPerKm} height={160} color="#F59E0B" />
        </ChartCard>
        <ChartCard title="Profitability by Client" subtitle="Revenue contribution">
          <SimpleBarChart data={profitabilityByClient} height={160} color="#7C3AED" />
        </ChartCard>
        <ChartCard title="Budget Utilization (%)" subtitle="Monthly budget vs actual">
          <SimpleBarChart data={budgetUtilization} height={160} color="#3B82F6" />
        </ChartCard>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Revenue Trend" subtitle="Monthly growth trajectory">
          <AreaChart data={monthlyRevenue} color="green" />
        </ChartCard>
        <ChartCard title="Expense Category Distribution" subtitle="Breakdown by type">
          <DonutChart data={expenseDist} size={140} thickness={18} />
        </ChartCard>
      </div>
    </motion.div>
  );
}
