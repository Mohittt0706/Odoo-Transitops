import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageHeader from "../../../components/layout/PageHeader";
import DataTable from "../../../components/common/DataTable";
import { FuelStatusBadge } from "../../../components/fuel-expense/FuelExpenseComponents";
import { fuelService } from "../../../services/fuel.service";
import { Flame, FileDown, Fuel, DollarSign } from "lucide-react";

const columns = [
  { key: "_id", label: "Fuel Log ID", render: (val) => <span className="text-xs font-mono">{(val || "").slice(-6).toUpperCase()}</span> },
  { key: "vehicle", label: "Vehicle", render: (_, r) => <div><p className="text-sm font-semibold">{r.vehicleId?.vehicleName || "-"}</p><p className="text-[10px] text-neutral-textMuted">{r.vehicleId?.registrationNumber || ""}</p></div> },
  { key: "fuelStation", label: "Fuel Station" },
  { key: "fuelType", label: "Type", render: (v) => v || "-" },
  { key: "liters", label: "Qty (L)", render: (v) => `${v || 0} L` },
  { key: "cost", label: "Total Cost", render: (v) => `₹${(v || 0).toLocaleString()}` },
  { key: "date", label: "Date", render: (v) => v ? new Date(v).toLocaleDateString() : "-" },
  { key: "status", label: "Status", render: (v) => <FuelStatusBadge status={v || ""} /> },
];

export default function FuelLogs() {
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (filter !== "all") params.status = filter;
      const res = await fuelService.getAll(params);
      setLogs(res.data.fuelLogs || []);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Failed to load fuel logs");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchLogs(); }, [fetchLogs]);

  const totalCost = logs.reduce((s, l) => s + (l.cost || 0), 0);
  const totalLiters = logs.reduce((s, l) => s + (l.liters || 0), 0);

  if (error) {
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <PageHeader title="Fuel Logs" subtitle={error} />
        <div className="flex justify-center py-12"><button onClick={fetchLogs} className="btn btn-primary text-xs">Retry</button></div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <PageHeader title="Fuel Logs" subtitle="Track and manage fleet fuel consumption"
        actions={
          <div className="flex items-center gap-2">
            <button className="btn-icon"><FileDown className="w-4 h-4" /></button>
            <button onClick={() => navigate("/dashboard/operations/fuel/add")} className="btn btn-primary text-xs flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5" /> Add Fuel Log
            </button>
          </div>
        }
      />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total Fuel Cost", value: `₹${(totalCost / 1000).toFixed(1)}k`, icon: DollarSign },
          { label: "Total Liters", value: `${totalLiters.toFixed(0)} L`, icon: Fuel },
          { label: "Total Logs", value: logs.length, icon: Fuel },
          { label: "Avg Cost/L", value: totalLiters > 0 ? `₹${(totalCost / totalLiters).toFixed(2)}` : "—", icon: DollarSign },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="bg-white border border-neutral-border rounded-xl p-4 shadow-soft-sm">
            <p className="text-[10px] font-semibold text-neutral-textMuted uppercase tracking-wider">{s.label}</p>
            <p className="text-lg font-bold font-headings text-neutral-textMain mt-1">{s.value}</p>
          </motion.div>
        ))}
      </div>
      <DataTable columns={columns} data={logs} loading={loading} searchPlaceholder="Search fuel logs..." pageSize={8} />
    </motion.div>
  );
}
