import { useState } from "react";
import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import DataTable from "../../components/common/DataTable";
import ChartCard from "../../components/charts/ChartCard";
import DonutChart from "../../components/charts/PieChart";
import { StatCard, FinanceStatusBadge, FilterBar } from "../../components/finance-hub/FinanceHubComponents";
import { financeInvoices } from "../../data/financeData";
import { IndianRupee, CheckCircle, Clock, AlertTriangle, Download, Mail, Plus } from "lucide-react";

const columns = [
  { key: "id", label: "Invoice ID", width: "100px" },
  { key: "client", label: "Client", render: (v) => <span className="font-semibold text-sm">{v}</span> },
  { key: "vehicle", label: "Vehicle", render: (v, r) => <div><p className="text-xs font-medium">{r.vehicleName}</p><p className="text-[10px] text-neutral-textMuted">{v}</p></div> },
  { key: "amount", label: "Amount", render: (v) => <span className="font-semibold">₹{v.toLocaleString()}</span> },
  { key: "tax", label: "Tax (18%)", render: (v) => <span className="text-xs">₹{v.toLocaleString()}</span> },
  { key: "total", label: "Total", render: (v) => <span className="font-bold text-primary">₹{v.toLocaleString()}</span> },
  { key: "paymentStatus", label: "Status", render: (v) => <FinanceStatusBadge status={v} /> },
  { key: "email", label: "Email", render: (v) => <span className={`text-[10px] font-semibold uppercase ${v === "sent" ? "text-success" : "text-warning"}`}>{v}</span> },
  { key: "dueDate", label: "Due Date" },
];

const filters = [
  { key: "all", label: "All" },
  { key: "Pending", label: "Pending" },
  { key: "Paid", label: "Paid" },
  { key: "Overdue", label: "Overdue" },
  { key: "Processing", label: "Processing" },
];

export default function InvoicesPage() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? financeInvoices : financeInvoices.filter((i) => i.paymentStatus === filter);

  const totalAmt = financeInvoices.reduce((s, i) => s + i.total, 0);
  const paidAmt = financeInvoices.filter((i) => i.paymentStatus === "Paid").reduce((s, i) => s + i.total, 0);
  const pendingAmt = financeInvoices.filter((i) => i.paymentStatus === "Pending").reduce((s, i) => s + i.total, 0);
  const overdueAmt = financeInvoices.filter((i) => i.paymentStatus === "Overdue").reduce((s, i) => s + i.total, 0);

  const distData = [
    { label: "Paid", value: financeInvoices.filter((i) => i.paymentStatus === "Paid").length, color: "#22C55E" },
    { label: "Pending", value: financeInvoices.filter((i) => i.paymentStatus === "Pending").length, color: "#F59E0B" },
    { label: "Overdue", value: financeInvoices.filter((i) => i.paymentStatus === "Overdue").length, color: "#EF4444" },
    { label: "Processing", value: financeInvoices.filter((i) => i.paymentStatus === "Processing").length, color: "#3B82F6" },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <PageHeader title="Invoices" subtitle="Manage client invoices and payments"
        actions={
          <div className="flex items-center gap-2">
            <button className="btn btn-secondary text-xs flex items-center gap-1.5"><Download className="w-3.5 h-3.5" /> Export</button>
            <button className="btn btn-primary text-xs flex items-center gap-1.5"><Plus className="w-3.5 h-3.5" /> Create Invoice</button>
          </div>
        }
      />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Total" value={`₹${(totalAmt / 100000).toFixed(1)}L`} icon={IndianRupee} color="primary" />
        <StatCard label="Paid" value={`₹${(paidAmt / 100000).toFixed(1)}L`} icon={CheckCircle} color="success" />
        <StatCard label="Pending" value={`₹${(pendingAmt / 100000).toFixed(1)}L`} icon={Clock} color="warning" />
        <StatCard label="Overdue" value={`₹${(overdueAmt / 100000).toFixed(1)}L`} icon={AlertTriangle} color="danger" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard title="Invoice Status Distribution" subtitle="By payment status">
          <DonutChart data={distData} size={130} thickness={16} />
        </ChartCard>
        <ChartCard title="Email Status" subtitle="Invoice delivery">
          <div className="flex items-center gap-6 justify-center py-6">
            <div className="text-center"><Mail className="w-6 h-6 text-success mx-auto mb-1" /><p className="text-lg font-bold">{financeInvoices.filter((i) => i.email === "sent").length}</p><p className="text-[11px] text-neutral-textMuted">Sent</p></div>
            <div className="text-center"><Mail className="w-6 h-6 text-warning mx-auto mb-1" /><p className="text-lg font-bold">{financeInvoices.filter((i) => i.email === "pending").length}</p><p className="text-[11px] text-neutral-textMuted">Pending</p></div>
          </div>
        </ChartCard>
        <ChartCard title="Quick Summary">
          <div className="space-y-3 py-2">
            <div className="flex justify-between text-sm"><span>Total Invoices</span><span className="font-bold">{financeInvoices.length}</span></div>
            <div className="flex justify-between text-sm"><span>Avg Invoice Value</span><span className="font-bold">₹{(totalAmt / financeInvoices.length / 1000).toFixed(0)}k</span></div>
            <div className="flex justify-between text-sm"><span>Collection Rate</span><span className="font-bold text-success">{((paidAmt / totalAmt) * 100).toFixed(1)}%</span></div>
            <div className="flex justify-between text-sm"><span>Overdue Rate</span><span className="font-bold text-danger">{((overdueAmt / totalAmt) * 100).toFixed(1)}%</span></div>
          </div>
        </ChartCard>
      </div>
      <FilterBar filters={filters} active={filter} onChange={setFilter} />
      <DataTable columns={columns} data={filtered} searchPlaceholder="Search invoices..." pageSize={10} />
    </motion.div>
  );
}
