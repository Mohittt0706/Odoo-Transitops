import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import DataTable from "../../components/common/DataTable";
import ChartCard from "../../components/charts/ChartCard";
import SimpleBarChart from "../../components/charts/BarChart";
import DonutChart from "../../components/charts/PieChart";
import AreaChart from "../../components/charts/AreaChart";
import LineChart from "../../components/charts/LineChart";
import { MaintStatusBadge, PriorityBadge } from "../../components/maintenance/MaintenanceComponents";
import { maintenanceService } from "../../services/maintenance.service";
import { Wrench, Clock, CheckCircle, AlertCircle, DollarSign, Truck, Timer, CalendarPlus, Plus, Download } from "lucide-react";
import { cn } from "../../utils/utils";

const STATUS_COLORS = {
  OPEN: "#8B5CF6",
  IN_PROGRESS: "#3B82F6",
  COMPLETED: "#22C55E",
};

const columns = [
  { key: "_id", label: "ID", render: (val) => <span className="text-xs font-mono font-semibold">{(val || "").slice(-6).toUpperCase()}</span> },
  { key: "vehicle", label: "Vehicle", render: (_, r) => <div><p className="text-sm font-semibold">{r.vehicleId?.vehicleName || r.vehicle || "-"}</p><p className="text-[10px] text-neutral-textMuted">{r.vehicleId?.registrationNumber || ""}</p></div> },
  { key: "issue", label: "Issue" },
  { key: "priority", label: "Priority", render: (v) => <PriorityBadge priority={v || "Medium"} /> },
  { key: "cost", label: "Cost", render: (v) => v ? `₹${v.toLocaleString()}` : "-" },
  { key: "maintenanceDate", label: "Date", render: (v) => v ? new Date(v).toLocaleDateString() : "-" },
  { key: "status", label: "Status", render: (v) => <MaintStatusBadge status={v} /> },
];

export default function MaintenancePage() {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  const fetchRecords = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (filter !== "all") params.status = filter;
      const res = await maintenanceService.getAll(params);
      setRecords(res.data.records || []);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Failed to load maintenance records");
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => { fetchRecords(); }, [fetchRecords]);

  const stats = useMemo(() => {
    const pending = records.filter(r => r.status === "OPEN").length;
    const inProgress = records.filter(r => r.status === "IN_PROGRESS").length;
    const completed = records.filter(r => r.status === "COMPLETED").length;
    const totalCost = records.reduce((s, r) => s + (r.cost || 0), 0);
    return { total: records.length, pending, inProgress, completed, totalCost };
  }, [records]);

  const months = ["Jan","Feb","Mar","Apr","May","Jun"];
  const monthlyCost = useMemo(() => months.map(m => ({ label: m, value: 25000 + Math.floor(Math.random() * 60000) })), []);
  const maintTrend = useMemo(() => months.map(m => ({ label: m, value: 3 + Math.floor(Math.random() * 6) })), []);
  const completionRate = useMemo(() => months.map(m => ({ label: m, value: 60 + Math.floor(Math.random() * 35) })), []);

  const categoryDist = useMemo(() => [
    { label: "Open", value: records.filter(r => r.status === "OPEN").length, color: "#8B5CF6" },
    { label: "In Progress", value: records.filter(r => r.status === "IN_PROGRESS").length, color: "#3B82F6" },
    { label: "Completed", value: records.filter(r => r.status === "COMPLETED").length, color: "#22C55E" },
  ], [records]);

  if (error) {
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <PageHeader title="Maintenance Dashboard" subtitle={error} />
        <div className="flex justify-center py-12">
          <button onClick={fetchRecords} className="px-4 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary-dark">Retry</button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <PageHeader title="Maintenance Dashboard" subtitle="Vehicle service and repair management"
        actions={
          <div className="flex items-center gap-2">
            <button className="btn-icon"><Download className="w-4 h-4" /></button>
            <button onClick={() => navigate("/dashboard/operations/maintenance/create")} className="btn btn-primary text-xs"><Plus className="w-3.5 h-3.5" /> New Request</button>
          </div>
        }
      />
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-6">
        {[
          { label: "Total Jobs", value: stats.total, icon: Wrench }, { label: "Pending", value: stats.pending, icon: Clock },
          { label: "In Progress", value: stats.inProgress, icon: AlertCircle }, { label: "Completed", value: stats.completed, icon: CheckCircle },
          { label: "Total Cost", value: `₹${(stats.totalCost/1000).toFixed(0)}k`, icon: DollarSign },
          { label: "Under Service", value: stats.inProgress, icon: Truck },
          { label: "Avg Time", value: `${Math.floor(Math.random() * 3 + 2)}d`, icon: Timer },
          { label: "Upcoming", value: records.filter(r => r.status === "OPEN").length, icon: CalendarPlus },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} className="bg-white border border-neutral-border rounded-xl p-3 shadow-soft-sm">
            <s.icon className="w-3.5 h-3.5 text-primary mb-1" />
            <p className="text-[10px] font-semibold text-neutral-textMuted uppercase tracking-wider">{s.label}</p>
            <p className="text-sm font-bold font-headings text-neutral-textMain mt-0.5">{s.value}</p>
          </motion.div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCard title="Monthly Maintenance Cost"><SimpleBarChart data={monthlyCost} height={160} color="#2563EB" /></ChartCard>
        <ChartCard title="Maintenance Trend"><LineChart data={maintTrend} color="blue" /></ChartCard>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCard title="Maintenance Status"><DonutChart data={categoryDist} size={130} thickness={16} /></ChartCard>
        <ChartCard title="Service Completion Rate"><AreaChart data={completionRate} color="green" /></ChartCard>
      </div>
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <div className="flex items-center gap-1 p-1 bg-white border border-neutral-border rounded-lg">
          {["all", "OPEN", "IN_PROGRESS", "COMPLETED"].map(s => (
            <button key={s} onClick={() => setFilter(s)} className={cn("px-3 py-1.5 text-xs font-semibold rounded-md transition-all", filter === s ? "bg-primary text-white" : "text-neutral-textMuted hover:text-accent")}>
              {s === "all" ? "All" : s.replace(/_/g, " ")}
            </button>
          ))}
        </div>
      </div>
      <DataTable columns={columns} data={records} loading={loading} searchPlaceholder="Search maintenance..." pageSize={8}
        onRowClick={(row) => navigate(`/dashboard/operations/maintenance/details/${row._id}`)}
      />
    </motion.div>
  );
}
