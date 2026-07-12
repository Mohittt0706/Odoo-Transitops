import { useState, useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import { NotificationCard, FilterPanel, StatCard, EmptyState, LoadingSkeleton } from "../../components/notifications/NotificationComponents";
import { notificationService } from "../../services";
import { cn } from "../../utils/utils";
import { FileText, Search, ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";

const subFilters = [
  { key: "all", label: "All" },
  { key: "License Expiring", label: "Expiring" },
  { key: "License Expired", label: "Expired" },
  { key: "Insurance Expiry", label: "Insurance" },
  { key: "Permit Expiry", label: "Permit" },
  { key: "Registration Due", label: "Registration" },
];

export default function LicenseAlerts() {
  const [search, setSearch] = useState("");
  const [subFilter, setSubFilter] = useState("all");
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
      const res = await notificationService.getAll({ category: 'license' });
      if (!isMounted.current) return;
      const { notifications: data } = res.data;
      setNotifications((data || []).map(n => ({ ...n, id: n._id, description: n.message || n.title, read: n.isRead, date: n.createdAt, category: 'license' })));
    } catch (err) {
      if (isMounted.current) setError(err.response?.data?.message || err.message || 'Failed to fetch license alerts');
    } finally {
      if (isMounted.current) setLoading(false);
    }
  };

  useEffect(() => { fetchNotifications(); }, []);

  const filtered = useMemo(() => {
    let result = [...notifications];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((n) => n.title.toLowerCase().includes(q) || n.driver?.toLowerCase().includes(q));
    }
    if (subFilter !== "all") result = result.filter((n) => n.subcategory === subFilter);
    return result.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [search, subFilter, notifications]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const expired = notifications.filter((n) => n.subcategory === "License Expired").length;
  const expiringSoon = notifications.filter((n) => n.subcategory === "License Expiring").length;
  const insuranceDue = notifications.filter((n) => n.subcategory === "Insurance Expiry").length;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <PageHeader title="License Alerts" subtitle={`${notifications.length} license notifications`}
        badge={`${expired} Expired`}
      />
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <StatCard label="Total License Alerts" value={notifications.length} icon={FileText} color="purple" />
        <StatCard label="Expired" value={expired} icon={FileText} color="danger" />
        <StatCard label="Expiring Soon" value={expiringSoon} icon={FileText} color="warning" />
        <StatCard label="Insurance Due" value={insuranceDue} icon={FileText} color="primary" />
      </div>
      {loading ? (
        <LoadingSkeleton />
      ) : error ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-16 px-4">
          <div className="w-16 h-16 bg-danger/10 rounded-2xl flex items-center justify-center mb-4">
            <AlertCircle className="w-7 h-7 text-danger" strokeWidth={1.5} />
          </div>
          <h3 className="text-base font-bold text-neutral-textMain mb-1">Failed to load license alerts</h3>
          <p className="text-sm text-neutral-textMuted max-w-xs text-center mb-4">{error}</p>
          <button onClick={fetchNotifications} className="px-4 py-2 text-xs font-semibold text-white bg-primary rounded-lg hover:bg-primary/80 transition-all">Retry</button>
        </motion.div>
      ) : (<>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-textMuted" />
          <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search license alerts..." className="w-full h-9 pl-9 pr-4 text-sm bg-neutral-light border border-neutral-border rounded-lg outline-none focus:border-primary transition-all" />
        </div>
      </div>
      <FilterPanel filters={subFilters} active={subFilter} onChange={(k) => { setSubFilter(k); setPage(1); }} />
      {paginated.length === 0 ? (
        <EmptyState icon={FileText} title="No license alerts" description="All licenses and permits are up to date." />
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
      </>)}
    </motion.div>
  );
}
