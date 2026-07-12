import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageHeader from "../../components/ui/PageHeader";
import DataTable from "../../components/ui/DataTable";
import ChartCard from "../../components/ui/ChartCard";
import SimpleBarChart from "../../components/ui/SimpleBarChart";
import DonutChart from "../../components/ui/DonutChart";
import { TripStatusBadge } from "../../components/trips/TripComponents";
import { trips, tripStats } from "../../data/tripData";
import { Route, Navigation, CheckCircle, Clock, Package, Gauge, Plus, Download, AlertCircle } from "lucide-react";
import { cn } from "../../lib/utils";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const monthlyDeliveries = months.map(m => ({ label: m, value: 30 + Math.floor(Math.random() * 45) }));
const activeTrend = months.map(m => ({ label: m, value: 8 + Math.floor(Math.random() * 12) }));

const statusDist = [
  { label: "In Transit", value: tripStats.inTransit, color: "#3B82F6" },
  { label: "Completed", value: tripStats.completed, color: "#22C55E" },
  { label: "Delayed", value: tripStats.delayed, color: "#F59E0B" },
  { label: "Cancelled", value: tripStats.cancelled, color: "#EF4444" },
  { label: "Pending", value: tripStats.pending, color: "#8B5CF6" },
];

const columns = [
  { key: "id", label: "Trip ID", width: "80px" },
  { key: "from", label: "From", render: (val, row) => <span className="text-sm font-medium">{val} → {row.to}</span> },
  { key: "driver", label: "Driver" },
  { key: "vehicle", label: "Vehicle" },
  { key: "cargo", label: "Cargo" },
  { key: "distance", label: "Distance" },
  { key: "eta", label: "ETA" },
  { key: "status", label: "Status", render: (val) => <TripStatusBadge status={val} /> },
];

export default function TripsPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const filtered = useMemo(() => filter === "all" ? trips : trips.filter(t => t.status === filter), [filter]);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <PageHeader title="Trip Dashboard" subtitle="Real-time trip monitoring and management"
        actions={
          <div className="flex items-center gap-2">
            <button className="btn-icon"><Download className="w-4 h-4" /></button>
            <button onClick={() => navigate("/dashboard/operations/trips/create")} className="btn btn-primary text-xs">
              <Plus className="w-3.5 h-3.5" /> Create Trip
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 mb-6">
        {[
          { label: "Active Trips", value: tripStats.inTransit, icon: Navigation, color: "primary" },
          { label: "Completed", value: tripStats.completed, icon: CheckCircle, color: "success" },
          { label: "Delayed", value: tripStats.delayed, icon: Clock, color: "warning" },
          { label: "Cancelled", value: tripStats.cancelled, icon: AlertCircle, color: "danger" },
          { label: "Today's Deliveries", value: tripStats.todayDeliveries, icon: Package, color: "primary" },
          { label: "Total Distance", value: `${(tripStats.totalDistance / 1000).toFixed(0)}k km`, icon: Gauge, color: "success" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="bg-white border border-neutral-border rounded-xl p-4 shadow-soft-sm"
          >
            <p className="text-[10px] font-semibold text-neutral-textMuted uppercase tracking-wider">{s.label}</p>
            <p className="text-xl font-bold font-headings text-neutral-textMain mt-1">{s.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCard title="Active Trips Trend" subtitle="Monthly active trip count"><SimpleBarChart data={activeTrend} height={160} color="#3B82F6" /></ChartCard>
        <ChartCard title="Monthly Deliveries" subtitle="Completed deliveries per month"><SimpleBarChart data={monthlyDeliveries} height={160} color="#22C55E" /></ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCard title="Trip Status Distribution"><DonutChart data={statusDist} size={130} thickness={16} /></ChartCard>
        <ChartCard title="Route Performance" subtitle="Distance covered per trip">
          <SimpleBarChart data={trips.map(t => ({ label: t.id.replace("TR-", ""), value: t.distanceVal }))} height={160} color="#8B5CF6" />
        </ChartCard>
      </div>

      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <div className="flex items-center gap-1 p-1 bg-white border border-neutral-border rounded-lg">
          {["all", "In Transit", "Completed", "Delayed", "Cancelled", "Pending"].map(s => (
            <button key={s} onClick={() => setFilter(s)} className={cn("px-3 py-1.5 text-xs font-semibold rounded-md transition-all", filter === s ? "bg-primary text-white" : "text-neutral-textMuted hover:text-accent")}>
              {s === "all" ? "All" : s}
            </button>
          ))}
        </div>
      </div>

      <DataTable columns={columns} data={filtered} searchPlaceholder="Search trips..." pageSize={8}
        onRowClick={(row) => navigate(`/dashboard/operations/trips/details/${row.id}`)}
        actions={
          <div className="flex items-center gap-2">
            <button onClick={() => navigate("/dashboard/operations/trips/completed")} className="btn btn-ghost text-xs">Completed</button>
            <button onClick={() => navigate("/dashboard/operations/trips/cancelled")} className="btn btn-ghost text-xs">Cancelled</button>
          </div>
        }
      />
    </motion.div>
  );
}
