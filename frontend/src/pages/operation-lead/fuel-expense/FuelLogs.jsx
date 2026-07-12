import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageHeader from "../../../components/layout/PageHeader";
import DataTable from "../../../components/common/DataTable";
import ChartCard from "../../../components/charts/ChartCard";
import SimpleBarChart from "../../../components/charts/BarChart";
import DonutChart from "../../../components/charts/PieChart";
import AreaChart from "../../../components/charts/AreaChart";
import LineChart from "../../../components/charts/LineChart";
import { FuelStatusBadge, StatCard } from "../../../components/fuel-expense/FuelExpenseComponents";
import { fuelLogs, monthlyFuelCost, fuelConsumptionTrend, monthlyOperationalCost, expenseDistribution, fuelStats } from "../../../data/fuelExpenseData";
import { Flame, Fuel, DollarSign, Gauge, Route, TrendingUp, Droplets, Car } from "lucide-react";

const columns = [
  { key: "id", label: "Fuel Log ID", width: "85px" },
  { key: "vehicle", label: "Vehicle", render: (v, r) => <div><p className="text-sm font-semibold">{r.vehicleName}</p><p className="text-[10px] text-neutral-textMuted">{v}</p></div> },
  { key: "driver", label: "Driver" },
  { key: "fuelStation", label: "Fuel Station" },
  { key: "fuelType", label: "Type" },
  { key: "quantity", label: "Qty (L)", render: (v) => `${v} L` },
  { key: "costPerLiter", label: "Cost/L", render: (v) => `₹${v}` },
  { key: "totalCost", label: "Total Cost", render: (v) => `₹${v.toLocaleString()}` },
  { key: "mileage", label: "Fuel Econ.", render: (v) => `${v} km/L` },
  { key: "date", label: "Date" },
  { key: "status", label: "Status", render: (v) => <FuelStatusBadge status={v} /> },
];

const statCards = [
  { label: "Total Fuel Cost", value: fuelStats.totalFuelCost, icon: DollarSign, color: "primary" },
  { label: "Monthly Consumption", value: fuelStats.monthlyConsumption, icon: Droplets, color: "warning" },
  { label: "Avg Fuel Economy", value: fuelStats.avgFuelEconomy, icon: Gauge, color: "success" },
  { label: "Total Distance", value: fuelStats.totalDistance, icon: Route, color: "info" },
];

export default function FuelLogs() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? fuelLogs : fuelLogs.filter((l) => l.status === filter);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <PageHeader
        title="Fuel Logs"
        subtitle="Track and manage fleet fuel consumption"
        actions={
          <button onClick={() => navigate("/dashboard/operations/fuel/add")} className="btn btn-primary text-xs flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5" /> Add Fuel Log
          </button>
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {statCards.map((s, i) => (
          <StatCard key={s.label} {...s} delay={i * 0.03} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCard title="Monthly Fuel Cost" subtitle="Last 7 months">
          <SimpleBarChart data={monthlyFuelCost} height={160} color="#2563EB" />
        </ChartCard>
        <ChartCard title="Fuel Consumption Trend" subtitle="Litres consumed">
          <LineChart data={fuelConsumptionTrend} color="orange" />
        </ChartCard>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCard title="Expense Categories" subtitle="Distribution">
          <DonutChart data={expenseDistribution} size={130} thickness={16} />
        </ChartCard>
        <ChartCard title="Monthly Operational Cost" subtitle="Total expenses">
          <AreaChart data={monthlyOperationalCost} color="blue" />
        </ChartCard>
      </div>

      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {["all", "Approved", "Pending", "Rejected"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-2.5 py-1.5 text-[11px] font-semibold rounded-md transition-all ${filter === s ? "bg-primary text-white" : "text-neutral-textMuted hover:text-accent"}`}
          >
            {s === "all" ? "All" : s}
          </button>
        ))}
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        searchPlaceholder="Search fuel logs..."
        pageSize={10}
      />
    </motion.div>
  );
}
