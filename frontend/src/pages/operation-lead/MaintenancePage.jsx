import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import DataTable from "../../components/common/DataTable";
import StatusBadge from "../../components/common/Badge";
import ChartCard from "../../components/charts/ChartCard";
import SimpleBarChart from "../../components/charts/BarChart";
import DonutChart from "../../components/charts/PieChart";
import AreaChart from "../../components/charts/AreaChart";
import LineChart from "../../components/charts/LineChart";
import { MaintStatusBadge, PriorityBadge } from "../../components/maintenance/MaintenanceComponents";
import { maintenance, maintStats } from "../../data/maintenanceData";
import { Wrench, Clock, CheckCircle, AlertCircle, DollarSign, Truck, Timer, CalendarPlus, Plus, Download } from "lucide-react";
import { cn } from "../../utils/utils";

const months = [];
const monthlyCost = [];
const maintTrend = [];
const completionRate = [];

const categoryDist = [];

const columns = [
  { key: "id", label: "ID", width: "75px" },
  { key: "vehicle", label: "Vehicle", render: (v, r) => <div><p className="text-sm font-semibold">{v}</p><p className="text-[10px] text-neutral-textMuted">{r.plate}</p></div> },
  { key: "issue", label: "Issue" },
  { key: "priority", label: "Priority", render: (v) => <PriorityBadge priority={v} /> },
  { key: "mechanic", label: "Mechanic" },
  { key: "estimatedCost", label: "Est. Cost" },
  { key: "date", label: "Date" },
  { key: "status", label: "Status", render: (v) => <MaintStatusBadge status={v} /> },
];

export default function MaintenancePage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const filtered = useMemo(() => filter === "all" ? maintenance : maintenance.filter(j => j.status === filter), [filter]);

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
          { label: "Total Jobs", value: maintStats.total, icon: Wrench }, { label: "Pending", value: maintStats.pending, icon: Clock },
          { label: "In Progress", value: maintStats.inProgress, icon: AlertCircle }, { label: "Completed", value: maintStats.completed, icon: CheckCircle },
          { label: "Total Cost", value: `₹${(maintStats.totalCost/1000).toFixed(0)}k`, icon: DollarSign },
          { label: "Under Service", value: maintStats.underService, icon: Truck },
          { label: "Avg Time", value: maintStats.avgTime, icon: Timer },
          { label: "Upcoming", value: maintStats.upcoming, icon: CalendarPlus },
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
        <ChartCard title="Maintenance Categories"><DonutChart data={categoryDist} size={130} thickness={16} /></ChartCard>
        <ChartCard title="Service Completion Rate"><AreaChart data={completionRate} color="green" /></ChartCard>
      </div>
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <div className="flex items-center gap-1 p-1 bg-white border border-neutral-border rounded-lg">
          {["all", "Scheduled", "In Progress", "Waiting Parts", "Completed", "Cancelled"].map(s => (
            <button key={s} onClick={() => setFilter(s)} className={cn("px-2.5 py-1.5 text-[11px] font-semibold rounded-md transition-all", filter === s ? "bg-primary text-white" : "text-neutral-textMuted hover:text-accent")}>
              {s === "all" ? "All" : s}
            </button>
          ))}
        </div>
      </div>
      <DataTable columns={columns} data={filtered} searchPlaceholder="Search maintenance..." pageSize={8}
        onRowClick={(row) => navigate(`/dashboard/operations/maintenance/${row.id}`)}
        actions={<button onClick={() => navigate("/dashboard/operations/maintenance/history")} className="btn btn-ghost text-xs">History</button>}
      />
    </motion.div>
  );
}
