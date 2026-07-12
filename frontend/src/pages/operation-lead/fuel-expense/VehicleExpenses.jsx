import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageHeader from "../../../components/layout/PageHeader";
import ChartCard from "../../../components/charts/ChartCard";
import SimpleBarChart from "../../../components/charts/BarChart";
import DonutChart from "../../../components/charts/PieChart";
import { StatCard, VehicleExpenseCard, FilterBar } from "../../../components/fuel-expense/FuelExpenseComponents";
import { vehicles, expenses, fuelLogs, expenseDistribution, fuelStats } from "../../../data/fuelExpenseData";
import { TrendingUp, BarChart3, DollarSign, Target } from "lucide-react";

export default function VehicleExpenses() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");

  const vehicleExpenseData = useMemo(() => {
    return vehicles.map((v) => {
      const vExpenses = expenses.filter((e) => e.vehicle === v.plate);
      const vFuel = fuelLogs.filter((f) => f.vehicle === v.plate);
      const totalExpense = vExpenses.reduce((sum, e) => sum + e.amount, 0);
      const fuelCost = vFuel.reduce((sum, f) => sum + f.totalCost, 0);
      const maintenanceCost = vExpenses.filter((e) => e.category === "Maintenance" || e.category === "Repair").reduce((sum, e) => sum + e.amount, 0);
      const insurance = vExpenses.filter((e) => e.category === "Insurance").reduce((sum, e) => sum + e.amount, 0);
      const tollCharges = vExpenses.filter((e) => e.category === "Toll").reduce((sum, e) => sum + e.amount, 0);
      const otherExpenses = totalExpense - fuelCost - maintenanceCost - insurance - tollCharges;
      const monthlyExpense = Math.round(totalExpense / 2);
      const profitability = Math.round(Math.random() * 40 + 60);
      const roi = Math.round(Math.random() * 25 + 10);

      return { ...v, monthlyExpense, fuelCost, maintenanceCost, insurance, tollCharges, otherExpenses, totalExpense, profitability, roi };
    });
  }, []);

  const filtered = filter === "all" ? vehicleExpenseData : vehicleExpenseData.filter((v) => v.status === filter);

  const analytics = [
    { label: "Highest Expense Vehicle", value: vehicleExpenseData.reduce((a, b) => a.totalExpense > b.totalExpense ? a : b).plate, icon: TrendingUp, color: "danger" },
    { label: "Avg Cost Per Month", value: `₹${Math.round(vehicleExpenseData.reduce((s, v) => s + v.monthlyExpense, 0) / vehicleExpenseData.length).toLocaleString()}`, icon: DollarSign, color: "primary" },
    { label: "Avg Fuel Efficiency", value: fuelStats.avgFuelEconomy, icon: Target, color: "success" },
    { label: "Total ROI", value: `${Math.round(vehicleExpenseData.reduce((s, v) => s + v.roi, 0) / vehicleExpenseData.length)}%`, icon: BarChart3, color: "warning" },
  ];

  const monthlyExpenseChart = vehicleExpenseData.slice(0, 7).map((v) => ({ label: v.plate.slice(-4), value: v.monthlyExpense }));

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <PageHeader title="Vehicle Expenses" subtitle="Expense breakdown by vehicle" />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {analytics.map((s, i) => (
          <StatCard key={s.label} {...s} delay={i * 0.03} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCard title="Monthly Expense by Vehicle" subtitle="Top 7 vehicles">
          <SimpleBarChart data={monthlyExpenseChart} height={160} color="#8B5CF6" />
        </ChartCard>
        <ChartCard title="Expense Distribution" subtitle="All categories">
          <DonutChart data={expenseDistribution} size={130} thickness={16} />
        </ChartCard>
      </div>

      <div className="mb-4">
        <FilterBar
          filters={[{ key: "all", label: "All" }, { key: "Active", label: "Active" }, { key: "Inactive", label: "Inactive" }]}
          active={filter}
          onChange={setFilter}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((v, i) => (
          <VehicleExpenseCard
            key={v.plate}
            vehicle={v}
            delay={i * 0.03}
            onClick={() => navigate(`/dashboard/operations/expenses?vehicle=${v.plate}`)}
          />
        ))}
      </div>
    </motion.div>
  );
}
