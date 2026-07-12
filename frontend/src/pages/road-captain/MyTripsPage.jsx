import { useState } from "react";
import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import DataTable from "../../components/common/DataTable";
import { TripStatusBadge, MetricCard } from "../../components/road-captain/RoadCaptainComponents";
import { rcTrips } from "../../data/roadCaptainData";
import { Truck, Route, CheckCircle, Clock } from "lucide-react";

const columns = [
  { key: "id", label: "Trip ID", width: "80px" },
  { key: "from", label: "Source" },
  { key: "to", label: "Destination" },
  { key: "vehicle", label: "Vehicle", render: (v, r) => <div><p className="text-sm font-semibold">{r.vehicleName}</p><p className="text-[10px] text-neutral-textMuted">{v}</p></div> },
  { key: "cargo", label: "Cargo" },
  { key: "distance", label: "Distance" },
  { key: "departure", label: "Departure" },
  { key: "eta", label: "ETA" },
  { key: "priority", label: "Priority", render: (v) => <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${v === "Critical" ? "bg-danger-light text-danger" : v === "High" ? "bg-warning-light text-warning" : "bg-accent-light text-neutral-textMuted"}`}>{v}</span> },
  { key: "status", label: "Status", render: (v) => <TripStatusBadge status={v} /> },
];

export default function MyTripsPage() {
  const [filter, setFilter] = useState("all");
  const active = rcTrips.filter((t) => t.status === "In Transit" || t.status === "Pending");
  const filtered = filter === "all" ? rcTrips : filter === "active" ? active : rcTrips.filter((t) => t.status === filter);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <PageHeader title="My Trips" subtitle="Active and upcoming trips" />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <MetricCard label="Active Trips" value={active.length} icon={Truck} color="success" />
        <MetricCard label="Today's Distance" value="148 km" icon={Route} color="primary" />
        <MetricCard label="On-Time Rate" value="95%" icon={CheckCircle} color="warning" />
        <MetricCard label="Next Trip" value="2h 15m" icon={Clock} color="info" />
      </div>

      <div className="flex items-center gap-1 p-1 bg-white border border-neutral-border rounded-lg flex-wrap">
        {[{ key: "all", label: "All" }, { key: "active", label: "Active" }, { key: "In Transit", label: "In Transit" }, { key: "Pending", label: "Pending" }, { key: "Delayed", label: "Delayed" }].map((f) => (
          <button key={f.key} onClick={() => setFilter(f.key)}
            className={`px-2.5 py-1.5 text-[11px] font-semibold rounded-md transition-all ${filter === f.key ? "bg-primary text-white" : "text-neutral-textMuted hover:text-accent"}`}>
            {f.label}
          </button>
        ))}
      </div>

      <DataTable columns={columns} data={filtered} searchPlaceholder="Search trips by ID, route, or cargo..." pageSize={8} />
    </motion.div>
  );
}
