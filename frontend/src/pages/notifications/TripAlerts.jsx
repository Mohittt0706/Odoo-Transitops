import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import { NotificationCard, FilterPanel, StatCard, EmptyState } from "../../components/notifications/NotificationComponents";
import { tripAlerts } from "../../data/notificationData";
import { cn } from "../../utils/utils";
import { Route, Search, ChevronLeft, ChevronRight } from "lucide-react";

const subFilters = [
  { key: "all", label: "All" },
  { key: "Trip Assigned", label: "Assigned" },
  { key: "Trip Started", label: "Started" },
  { key: "Trip Delayed", label: "Delayed" },
  { key: "Route Changed", label: "Route Changed" },
  { key: "ETA Updated", label: "ETA Updated" },
  { key: "Delivery Completed", label: "Completed" },
];

const priFilters = [
  { key: "all", label: "All Priority" },
  { key: "critical", label: "Critical" },
  { key: "high", label: "High" },
];

export default function TripAlerts() {
  const [search, setSearch] = useState("");
  const [subFilter, setSubFilter] = useState("all");
  const [priFilter, setPriFilter] = useState("all");
  const [page, setPage] = useState(1);
  const pageSize = 8;

  const filtered = useMemo(() => {
    let result = [...tripAlerts];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((n) => n.title.toLowerCase().includes(q) || n.driver?.toLowerCase().includes(q));
    }
    if (subFilter !== "all") result = result.filter((n) => n.subcategory === subFilter);
    if (priFilter !== "all") result = result.filter((n) => n.priority === priFilter);
    return result.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [search, subFilter, priFilter]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const activeTrips = tripAlerts.filter((n) => n.subcategory === "Trip Started" || n.subcategory === "Trip Assigned").length;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <PageHeader title="Trip Alerts" subtitle={`${tripAlerts.length} trip notifications`}
        badge={`${tripAlerts.filter((n) => !n.read).length} New`}
      />
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <StatCard label="Total Trip Alerts" value={tripAlerts.length} icon={Route} color="primary" />
        <StatCard label="Active Trips" value={activeTrips} icon={Route} color="success" />
        <StatCard label="Delayed" value={tripAlerts.filter((n) => n.subcategory === "Trip Delayed").length} icon={Route} color="danger" />
        <StatCard label="Completed" value={tripAlerts.filter((n) => n.subcategory === "Delivery Completed").length} icon={Route} color="cyan" />
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-textMuted" />
          <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search trip alerts..." className="w-full h-9 pl-9 pr-4 text-sm bg-neutral-light border border-neutral-border rounded-lg outline-none focus:border-primary transition-all" />
        </div>
      </div>
      <div className="flex items-center justify-between gap-3">
        <FilterPanel filters={subFilters} active={subFilter} onChange={(k) => { setSubFilter(k); setPage(1); }} />
        <FilterPanel filters={priFilters} active={priFilter} onChange={(k) => { setPriFilter(k); setPage(1); }} compact />
      </div>
      {paginated.length === 0 ? (
        <EmptyState icon={Route} title="No trip alerts" description="No trip notifications match your filters." />
      ) : (
        <div className="space-y-2">
          {paginated.map((n, i) => (
            <NotificationCard key={n.id} notification={n} delay={i * 0.025} />
          ))}
        </div>
      )}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-neutral-textMuted">Page {page} of {totalPages}</p>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}
              className="p-1.5 rounded-lg hover:bg-accent-light text-neutral-textMuted disabled:opacity-30 disabled:cursor-not-allowed">
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let p; const tp = totalPages;
              if (tp <= 5) p = i + 1;
              else if (page <= 3) p = i + 1;
              else if (page >= tp - 2) p = tp - 4 + i;
              else p = page - 2 + i;
              return <button key={p} onClick={() => setPage(p)}
                className={cn("w-8 h-8 rounded-lg text-xs font-semibold transition-all", page === p ? "bg-primary text-white" : "text-neutral-textMuted hover:bg-accent-light")}>{p}</button>;
            })}
            <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}
              className="p-1.5 rounded-lg hover:bg-accent-light text-neutral-textMuted disabled:opacity-30 disabled:cursor-not-allowed">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}
