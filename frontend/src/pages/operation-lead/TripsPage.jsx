import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import DataTable from "../../components/common/DataTable";
import ChartCard from "../../components/charts/ChartCard";
import SimpleBarChart from "../../components/charts/BarChart";
import DonutChart from "../../components/charts/PieChart";
import { TripStatusBadge } from "../../components/trips/TripComponents";
import { tripService } from "../../services/trip.service";
import { Navigation, CheckCircle, Clock, AlertCircle, Plus, Download } from "lucide-react";
import { cn } from "../../utils/utils";

const STATUS_COLORS = {
  DRAFT: "#8B5CF6",
  DISPATCHED: "#3B82F6",
  COMPLETED: "#22C55E",
  CANCELLED: "#EF4444",
};

const columns = [
  { key: "_id", label: "Trip ID", render: (val) => <span className="text-xs font-mono font-semibold">{(val || "").slice(-6).toUpperCase()}</span> },
  { key: "route", label: "Route", render: (_, row) => <span className="text-sm font-medium">{row.source || row.from} → {row.destination || row.to}</span> },
  { key: "driver", label: "Driver", render: (_, row) => row.driverId?.fullName || row.driver || "-" },
  { key: "vehicle", label: "Vehicle", render: (_, row) => row.vehicleId?.registrationNumber || row.vehicle || "-" },
  { key: "cargoWeight", label: "Cargo", render: (val) => val ? `${val} kg` : "-" },
  { key: "plannedDistance", label: "Distance", render: (val) => val ? `${val} km` : "-" },
  { key: "status", label: "Status", render: (val) => <TripStatusBadge status={val} /> },
];

export default function TripsPage() {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  const fetchTrips = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (filter !== "all") params.status = filter;
      const res = await tripService.getAll(params);
      setTrips(res.data.trips || []);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Failed to load trips");
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => { fetchTrips(); }, [fetchTrips]);

  const tripStats = useMemo(() => {
    const dispatched = trips.filter(t => t.status === "DISPATCHED").length;
    const completed = trips.filter(t => t.status === "COMPLETED").length;
    const cancelled = trips.filter(t => t.status === "CANCELLED").length;
    const draft = trips.filter(t => t.status === "DRAFT").length;
    const totalDistance = trips.reduce((sum, t) => sum + (t.plannedDistance || 0), 0);
    return { dispatched, completed, cancelled, pending: draft, totalDistance, delayed: 0 };
  }, [trips]);

  const statusDist = useMemo(() => [
    { label: "Draft", value: tripStats.pending, color: STATUS_COLORS.DRAFT },
    { label: "Dispatched", value: tripStats.dispatched, color: STATUS_COLORS.DISPATCHED },
    { label: "Completed", value: tripStats.completed, color: STATUS_COLORS.COMPLETED },
    { label: "Cancelled", value: tripStats.cancelled, color: STATUS_COLORS.CANCELLED },
  ], [tripStats]);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const activeTrend = useMemo(() => months.map(m => ({ label: m, value: 5 + Math.floor(Math.random() * 10) })), []);
  const monthlyDeliveries = useMemo(() => months.map(m => ({ label: m, value: 20 + Math.floor(Math.random() * 30) })), []);

  if (error) {
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <PageHeader title="Trip Dashboard" subtitle={error} />
        <div className="flex justify-center py-12">
          <button onClick={fetchTrips} className="px-4 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary-dark">Retry</button>
        </div>
      </motion.div>
    );
  }

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
          { label: "Dispatched", value: tripStats.dispatched, icon: Navigation },
          { label: "Completed", value: tripStats.completed, icon: CheckCircle },
          { label: "Draft", value: tripStats.pending, icon: Clock },
          { label: "Cancelled", value: tripStats.cancelled, icon: AlertCircle },
          { label: "Total", value: trips.length, icon: Clock },
          { label: "Total Distance", value: `${(tripStats.totalDistance).toFixed(0)} km` },
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
          <SimpleBarChart data={trips.slice(0, 10).map(t => ({ label: (t._id || "").slice(-4), value: t.plannedDistance || 0 }))} height={160} color="#8B5CF6" />
        </ChartCard>
      </div>

      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <div className="flex items-center gap-1 p-1 bg-white border border-neutral-border rounded-lg">
          {["all", "DRAFT", "DISPATCHED", "COMPLETED", "CANCELLED"].map(s => (
            <button key={s} onClick={() => setFilter(s)} className={cn("px-3 py-1.5 text-xs font-semibold rounded-md transition-all", filter === s ? "bg-primary text-white" : "text-neutral-textMuted hover:text-accent")}>
              {s === "all" ? "All" : s.replace(/_/g, " ")}
            </button>
          ))}
        </div>
      </div>

      <DataTable columns={columns} data={trips} loading={loading} searchPlaceholder="Search trips..." pageSize={8}
        onRowClick={(row) => navigate(`/dashboard/operations/trips/details/${row._id}`)}
      />
    </motion.div>
  );
}
