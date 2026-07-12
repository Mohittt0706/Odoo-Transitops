import { useState, useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import { NotificationCard, FilterPanel, StatCard, EmptyState, LoadingSkeleton } from "../../components/notifications/NotificationComponents";
import { notificationService } from "../../services";
import { cn } from "../../utils/utils";
import { Wrench, Search, ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";

const subFilters = [
  { key: "all", label: "All" },
  { key: "Service Due", label: "Service Due" },
  { key: "Vehicle Inspection", label: "Inspection" },
  { key: "Oil Change", label: "Oil Change" },
  { key: "Brake Service", label: "Brakes" },
  { key: "Tyre Replacement", label: "Tyres" },
  { key: "Battery Replacement", label: "Battery" },
];

const priFilters = [
  { key: "all", label: "All Priority" },
  { key: "critical", label: "Critical" },
  { key: "high", label: "High" },
  { key: "medium", label: "Medium" },
];

export default function MaintenanceAlerts() {
  const [search, setSearch] = useState("");
  const [subFilter, setSubFilter] = useState("all");
  const [priFilter, setPriFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pageSize = 8;
  const isMounted = useRef(true);

  useEffect(() => {
    return () => { isMounted.current = false; };
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await notificationService.getAll({ category: 'maintenance' });
      if (!isMounted.current) return;
      const { notifications: data } = res.data;
      setNotifications((data || []).map(n => ({ ...n, id: n._id, description: n.message || n.title, read: n.isRead, date: n.createdAt, category: 'maintenance' })));
    } catch (err) {
      if (isMounted.current) setError(err.response?.data?.message || err.message || 'Failed to fetch maintenance alerts');
    } finally {
      if (isMounted.current) setLoading(false);
    }
  };

  useEffect(() => { fetchNotifications(); }, []);

  const filtered = useMemo(() => {
    let result = [...notifications];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((n) => n.title.toLowerCase().includes(q) || n.vehicle?.toLowerCase().includes(q));
    }
    if (subFilter !== "all") result = result.filter((n) => n.subcategory === subFilter);
    if (priFilter !== "all") result = result.filter((n) => n.priority === priFilter);
    return result.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [search, subFilter, priFilter, notifications]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const critical = notifications.filter((n) => n.priority === "critical").length;
  const pending = notifications.filter((n) => !n.read).length;
  const serviceDue = notifications.filter((n) => n.subcategory === "Service Due").length;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <PageHeader title="Maintenance Alerts" subtitle={`${notifications.length} maintenance notifications`}
        badge={`${pending} Unread`}
      />
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <StatCard label="Total Maintenance" value={notifications.length} icon={Wrench} color="warning" />
        <StatCard label="Critical" value={critical} icon={Wrench} color="danger" />
        <StatCard label="Unread" value={pending} icon={Wrench} color="purple" />
        <StatCard label="Service Due" value={serviceDue} icon={Wrench} color="primary" />
      </div>
      {loading ? (
        <LoadingSkeleton />
      ) : error ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-16 px-4">
          <div className="w-16 h-16 bg-danger/10 rounded-2xl flex items-center justify-center mb-4">
            <AlertCircle className="w-7 h-7 text-danger" strokeWidth={1.5} />
          </div>
          <h3 className="text-base font-bold text-neutral-textMain mb-1">Failed to load maintenance alerts</h3>
          <p className="text-sm text-neutral-textMuted max-w-xs text-center mb-4">{error}</p>
          <button onClick={fetchNotifications} className="px-4 py-2 text-xs font-semibold text-white bg-primary rounded-lg hover:bg-primary/80 transition-all">Retry</button>
        </motion.div>
      ) : (<>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-textMuted" />
          <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search maintenance alerts..." className="w-full h-9 pl-9 pr-4 text-sm bg-neutral-light border border-neutral-border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
        </div>
      </div>
      <div className="flex items-center justify-between gap-3">
        <FilterPanel filters={subFilters} active={subFilter} onChange={(k) => { setSubFilter(k); setPage(1); }} />
        <FilterPanel filters={priFilters} active={priFilter} onChange={(k) => { setPriFilter(k); setPage(1); }} compact />
      </div>
      {paginated.length === 0 ? (
        <EmptyState icon={Wrench} title="No maintenance alerts" description="All maintenance alerts have been cleared." />
      ) : (
        <div className="space-y-2">
          {paginated.map((n, i) => (
            <NotificationCard key={n.id} notification={n} delay={i * 0.025} />
          ))}
        </div>
      )}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-neutral-textMuted">Showing {(page - 1) * pageSize + 1}-{Math.min(page * pageSize, filtered.length)} of {filtered.length}</p>
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
      </>)}
    </motion.div>
  );
}
