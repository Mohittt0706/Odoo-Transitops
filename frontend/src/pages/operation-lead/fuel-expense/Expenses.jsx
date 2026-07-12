import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageHeader from "../../../components/layout/PageHeader";
import DataTable from "../../../components/common/DataTable";
import StatusBadge from "../../../components/common/Badge";
import { expenseService } from "../../../services/expense.service";
import { DollarSign, Download, Plus } from "lucide-react";

const columns = [
  { key: "_id", label: "Expense ID", render: (val) => <span className="text-xs font-mono">{(val || "").slice(-6).toUpperCase()}</span> },
  { key: "vehicle", label: "Vehicle", render: (_, r) => <div><p className="text-sm font-semibold">{r.vehicleId?.vehicleName || "-"}</p><p className="text-[10px] text-neutral-textMuted">{r.vehicleId?.registrationNumber || ""}</p></div> },
  { key: "type", label: "Category", render: (v) => <span className="px-2 py-0.5 text-[10px] font-bold bg-accent-light rounded-full">{v || "-"}</span> },
  { key: "amount", label: "Amount", render: (v) => <span className="font-semibold">₹{(v || 0).toLocaleString()}</span> },
  { key: "description", label: "Description" },
  { key: "date", label: "Date", render: (v) => v ? new Date(v).toLocaleDateString() : "-" },
  { key: "status", label: "Status", render: (v) => <StatusBadge status={v || "Pending"} /> },
];

export default function Expenses() {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExpenses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await expenseService.getAll();
      setExpenses(res.data.expenses || []);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Failed to load expenses");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchExpenses(); }, [fetchExpenses]);

  const totalAmount = expenses.reduce((s, e) => s + (e.amount || 0), 0);

  if (error) {
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <PageHeader title="Expenses" subtitle={error} />
        <div className="flex justify-center py-12"><button onClick={fetchExpenses} className="btn btn-primary text-xs">Retry</button></div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <PageHeader title="Expenses" subtitle="Track all operational expenses"
        actions={
          <div className="flex items-center gap-2">
            <button className="btn-icon"><Download className="w-4 h-4" /></button>
            <button onClick={() => navigate("/dashboard/operations/expenses/add")} className="btn btn-primary text-xs flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5" /> Add Expense
            </button>
          </div>
        }
      />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total Expenses", value: `₹${(totalAmount / 1000).toFixed(1)}k`, icon: DollarSign },
          { label: "Total Records", value: expenses.length, icon: DollarSign },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="bg-white border border-neutral-border rounded-xl p-4 shadow-soft-sm">
            <p className="text-[10px] font-semibold text-neutral-textMuted uppercase tracking-wider">{s.label}</p>
            <p className="text-lg font-bold font-headings text-neutral-textMain mt-1">{s.value}</p>
          </motion.div>
        ))}
      </div>
      <DataTable columns={columns} data={expenses} loading={loading} searchPlaceholder="Search expenses..." pageSize={8} />
    </motion.div>
  );
}
