import { useState } from "react";
import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import DataTable from "../../components/common/DataTable";
import ChartCard from "../../components/charts/ChartCard";
import DonutChart from "../../components/charts/PieChart";
import SimpleBarChart from "../../components/charts/BarChart";
import { StatCard, FinanceStatusBadge, FilterBar } from "../../components/finance-hub/FinanceHubComponents";
import { financeExpenses, expenseDist, monthlyExpenses } from "../../data/financeData";
import { IndianRupee, Clock, CheckCircle, Calendar, Download } from "lucide-react";

const columns = [
  { key: "id", label: "Expense ID", width: "85px" },
  { key: "vehicle", label: "Vehicle", render: (v, r) => <div><p className="text-sm font-semibold">{r.vehicleName}</p><p className="text-[10px] text-neutral-textMuted">{v}</p></div> },
  { key: "category", label: "Category", render: (v) => <span className="px-2 py-0.5 text-[10px] font-bold bg-accent-light rounded-full">{v}</span> },
  { key: "department", label: "Department", render: (v) => <span className="text-xs">{v}</span> },
  { key: "amount", label: "Amount", render: (v) => <span className="font-semibold">₹{v.toLocaleString()}</span> },
  { key: "approvedBy", label: "Approved By" },
  { key: "paymentStatus", label: "Status", render: (v) => <FinanceStatusBadge status={v} /> },
  { key: "date", label: "Date" },
  { key: "invoice", label: "Invoice", render: (v) => v || "—" },
];

const filters = [
  { key: "all", label: "All" },
  ...["Fuel", "Maintenance", "Toll", "Insurance", "Repair", "Parking"].map((k) => ({ key: k, label: k })),
];

export default function ExpensesPage() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? financeExpenses : financeExpenses.filter((e) => e.category === filter);
  const total = financeExpenses.reduce((s, e) => s + e.amount, 0);
  const approved = financeExpenses.filter((e) => e.paymentStatus === "Approved" || e.paymentStatus === "Paid");

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <PageHeader title="Expenses" subtitle="Manage all fleet expenses"
        actions={<button className="btn btn-primary text-xs flex items-center gap-1.5"><Download className="w-3.5 h-3.5" /> Export</button>}
      />
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <StatCard label="Total Expenses" value={`₹${total.toLocaleString()}`} icon={IndianRupee} color="danger" />
        <StatCard label="Approved" value={approved.length} icon={CheckCircle} color="success" />
        <StatCard label="Pending" value={financeExpenses.filter((e) => e.paymentStatus === "Pending").length} icon={Clock} color="warning" />
        <StatCard label="This Month" value={financeExpenses.filter((e) => e.date.startsWith("2026-07")).length} icon={Calendar} color="primary" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Expense Distribution" subtitle="By category">
          <DonutChart data={expenseDist} size={130} thickness={16} />
        </ChartCard>
        <ChartCard title="Monthly Expenses" subtitle="Last 12 months">
          <SimpleBarChart data={monthlyExpenses} height={140} color="#EF4444" />
        </ChartCard>
      </div>
      <FilterBar filters={filters} active={filter} onChange={setFilter} />
      <DataTable columns={columns} data={filtered} searchPlaceholder="Search expenses..." pageSize={10} />
    </motion.div>
  );
}
