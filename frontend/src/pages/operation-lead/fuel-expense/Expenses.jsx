import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageHeader from "../../../components/layout/PageHeader";
import DataTable from "../../../components/common/DataTable";
import ChartCard from "../../../components/charts/ChartCard";
import DonutChart from "../../../components/charts/PieChart";
import SimpleBarChart from "../../../components/charts/BarChart";
import AreaChart from "../../../components/charts/AreaChart";
import StatusBadge from "../../../components/common/Badge";
import { StatCard, FilterBar } from "../../../components/fuel-expense/FuelExpenseComponents";
import { expenses, monthlyFuelCost, expenseDistribution, monthlyOperationalCost, fuelStats } from "../../../data/fuelExpenseData";
import { DollarSign, Wrench, Receipt, ShieldCheck, Download } from "lucide-react";

const columns = [
  { key: "id", label: "Expense ID", width: "80px" },
  { key: "vehicle", label: "Vehicle", render: (v, r) => <div><p className="text-sm font-semibold">{r.vehicleName}</p><p className="text-[10px] text-neutral-textMuted">{v}</p></div> },
  { key: "category", label: "Category", render: (v) => <span className="px-2 py-0.5 text-[10px] font-bold bg-accent-light rounded-full">{v}</span> },
  { key: "amount", label: "Amount", render: (v) => <span className="font-semibold">₹{v.toLocaleString()}</span> },
  { key: "approvedBy", label: "Approved By" },
  { key: "date", label: "Date" },
  { key: "paymentStatus", label: "Payment Status", render: (v) => <StatusBadge status={v} /> },
  { key: "invoice", label: "Invoice", render: (v) => v ? <a href="#" className="text-primary text-[11px] font-semibold hover:underline">{v}</a> : "—" },
];

const filters = [
  { key: "all", label: "All" },
  { key: "Fuel", label: "Fuel" },
  { key: "Maintenance", label: "Maintenance" },
  { key: "Toll", label: "Toll" },
  { key: "Insurance", label: "Insurance" },
  { key: "Repair", label: "Repair" },
];

export default function Expenses() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? expenses : expenses.filter((e) => e.category === filter);

  const statCards = [
    { label: "Total Expenses", value: fuelStats.totalExpenses, icon: DollarSign, color: "primary" },
    { label: "Maintenance", value: fuelStats.maintenanceExpenses, icon: Wrench, color: "warning" },
    { label: "Toll Charges", value: fuelStats.tollCharges, icon: Receipt, color: "success" },
    { label: "Insurance Cost", value: fuelStats.insuranceCost, icon: ShieldCheck, color: "danger" },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <PageHeader
        title="Expenses"
        subtitle="Manage all fleet expenses"
        actions={
          <div className="flex items-center gap-2">
            <button className="btn btn-ghost text-xs flex items-center gap-1.5"><Download className="w-3.5 h-3.5" /> Export</button>
            <button className="btn btn-primary text-xs flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5" /> New Expense</button>
          </div>
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {statCards.map((s, i) => (
          <StatCard key={s.label} {...s} delay={i * 0.03} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCard title="Expense Distribution" subtitle="By category">
          <DonutChart data={expenseDistribution} size={130} thickness={16} />
        </ChartCard>
        <ChartCard title="Monthly Fuel Cost" subtitle="Last 7 months">
          <SimpleBarChart data={monthlyFuelCost} height={160} color="#F59E0B" />
        </ChartCard>
      </div>

      <div className="mb-4">
        <FilterBar filters={filters} active={filter} onChange={setFilter} />
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        searchPlaceholder="Search expenses..."
        pageSize={10}
        onRowClick={(row) => navigate(`/dashboard/operations/expenses/${row.id}`)}
      />
    </motion.div>
  );
}
