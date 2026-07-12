import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import { NotificationCard, FilterPanel, EmptyState, LoadingSkeleton } from "../../components/notifications/NotificationComponents";
import { notificationService } from "../../services";
import { cn } from "../../utils/utils";
import { Search, Bell, CheckCheck, Archive, Trash2, ArrowUpDown, ChevronLeft, ChevronRight, Download, CheckCircle, AlertCircle } from "lucide-react";

const categoryFilters = [
  { key: "all", label: "All" },
  { key: "maintenance", label: "Maintenance" },
  { key: "trip", label: "Trips" },
  { key: "license", label: "Licenses" },
  { key: "financial", label: "Financial" },
  { key: "general", label: "General" },
];

const priorityFilters = [
  { key: "all", label: "All Priority" },
  { key: "critical", label: "Critical" },
  { key: "high", label: "High" },
  { key: "medium", label: "Medium" },
  { key: "low", label: "Low" },
];

export default function AllNotifications() {
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [priFilter, setPriFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState(new Set());
  const [sortBy, setSortBy] = useState("date");
  const [sortDir, setSortDir] = useState("desc");
  const [page, setPage] = useState(1);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pageSize = 10;

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await notificationService.getAll();
      const { notifications: data } = res.data;
      setNotifications((data || []).map(n => ({ ...n, id: n._id, description: n.message || n.title, read: n.isRead, date: n.createdAt })));
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch notifications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchNotifications(); }, []);

  const notificationStats = useMemo(() => ({
    total: notifications.length,
    unread: notifications.filter(n => !n.read).length,
    critical: notifications.filter(n => n.priority === 'critical').length,
    trip: notifications.filter(n => n.category === 'trip').length,
    maintenance: notifications.filter(n => n.category === 'maintenance').length,
    financial: notifications.filter(n => n.category === 'financial').length,
    license: notifications.filter(n => n.category === 'license').length,
    archived: notifications.filter(n => n.archived).length,
  }), [notifications]);

  const filtered = useMemo(() => {
    let result = [...notifications];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter((n) =>
        n.title.toLowerCase().includes(q) ||
        n.description.toLowerCase().includes(q) ||
        n.vehicle?.toLowerCase().includes(q) ||
        n.driver?.toLowerCase().includes(q)
      );
    }
    if (catFilter !== "all") result = result.filter((n) => n.category === catFilter);
    if (priFilter !== "all") result = result.filter((n) => n.priority === priFilter);
    if (statusFilter === "read") result = result.filter((n) => n.read);
    if (statusFilter === "unread") result = result.filter((n) => !n.read);
    if (statusFilter === "archived") result = result.filter((n) => n.archived);

    result.sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      if (sortBy === "date") return sortDir === "desc" ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date);
      if (sortBy === "priority") {
        const order = { critical: 0, high: 1, medium: 2, low: 3 };
        return sortDir === "asc" ? order[a.priority] - order[b.priority] : order[b.priority] - order[a.priority];
      }
      return 0;
    });

    return result;
  }, [search, catFilter, priFilter, statusFilter, sortBy, sortDir]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const toggleSort = (key) => {
    if (sortBy === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortBy(key); setSortDir("desc"); }
    setPage(1);
  };

  const handleSelectAll = () => {
    if (selected.size === paginated.length) setSelected(new Set());
    else setSelected(new Set(paginated.map((n) => n.id)));
  };

  const handleSelect = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleMarkRead = async (id) => {
    try {
      await notificationService.markAsRead(id);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    } catch (err) {
      console.error('Failed to mark as read', err);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      const unread = notifications.filter(n => !n.read);
      await Promise.all(unread.map(n => notificationService.markAsRead(n.id)));
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setSelected(new Set());
    } catch (err) {
      console.error('Failed to mark all as read', err);
    }
  };

  const handleArchive = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, archived: true } : n));
  };

  const handleDelete = async (id) => {
    try {
      await notificationService.remove(id);
      setNotifications(prev => prev.filter(n => n.id !== id));
    } catch (err) {
      console.error('Failed to delete notification', err);
    }
  };

  const handlePin = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, pinned: !n.pinned } : n));
  };

  const handleBulkArchive = () => {
    setNotifications(prev => prev.map(n => selected.has(n.id) ? { ...n, archived: true } : n));
    setSelected(new Set());
  };

  const handleBulkDelete = async () => {
    try {
      await Promise.all([...selected].map(id => notificationService.remove(id)));
      setNotifications(prev => prev.filter(n => !selected.has(n.id)));
      setSelected(new Set());
    } catch (err) {
      console.error('Failed to bulk delete', err);
    }
  };

  const handleBulkMarkRead = async () => {
    try {
      await Promise.all([...selected].map(id => notificationService.markAsRead(id)));
      setNotifications(prev => prev.map(n => selected.has(n.id) ? { ...n, read: true } : n));
      setSelected(new Set());
    } catch (err) {
      console.error('Failed to bulk mark as read', err);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <PageHeader title="All Notifications" subtitle={`${notificationStats.total} total notifications, ${notificationStats.unread} unread`}
        badge={`${notificationStats.unread} New`}
        actions={
          <div className="flex items-center gap-2">
            <button onClick={handleMarkAllRead} className="btn btn-secondary text-xs flex items-center gap-1.5">
              <CheckCheck className="w-3.5 h-3.5" /> Mark All Read
            </button>
            <button className="btn btn-primary text-xs flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5" /> Export
            </button>
          </div>
        }
      />

      {loading ? (
        <LoadingSkeleton />
      ) : error ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-16 px-4">
          <div className="w-16 h-16 bg-danger/10 rounded-2xl flex items-center justify-center mb-4">
            <AlertCircle className="w-7 h-7 text-danger" strokeWidth={1.5} />
          </div>
          <h3 className="text-base font-bold text-neutral-textMain mb-1">Failed to load notifications</h3>
          <p className="text-sm text-neutral-textMuted max-w-xs text-center mb-4">{error}</p>
          <button onClick={fetchNotifications} className="px-4 py-2 text-xs font-semibold text-white bg-primary rounded-lg hover:bg-primary/80 transition-all">Retry</button>
        </motion.div>
      ) : (<>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-textMuted" />
            <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search notifications..." className="w-full h-9 pl-9 pr-4 text-sm bg-neutral-light border border-neutral-border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
          </div>
          <div className="flex items-center gap-2">
            <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
              className="h-9 px-3 text-xs font-semibold bg-neutral-light border border-neutral-border rounded-lg outline-none focus:border-primary transition-all text-neutral-textMain">
              <option value="all">All Status</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
              <option value="archived">Archived</option>
            </select>
            <button onClick={() => toggleSort("date")} className={cn("h-9 px-3 text-xs font-semibold rounded-lg border transition-all flex items-center gap-1.5", sortBy === "date" ? "border-primary text-primary bg-primary/5" : "border-neutral-border text-neutral-textMuted bg-accent-light hover:text-accent")}>
              <ArrowUpDown className="w-3.5 h-3.5" /> Date
            </button>
            <button onClick={() => toggleSort("priority")} className={cn("h-9 px-3 text-xs font-semibold rounded-lg border transition-all flex items-center gap-1.5", sortBy === "priority" ? "border-primary text-primary bg-primary/5" : "border-neutral-border text-neutral-textMuted bg-accent-light hover:text-accent")}>
              <ArrowUpDown className="w-3.5 h-3.5" /> Priority
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <FilterPanel filters={categoryFilters} active={catFilter} onChange={(k) => { setCatFilter(k); setPage(1); }} />
          <FilterPanel filters={priorityFilters} active={priFilter} onChange={(k) => { setPriFilter(k); setPage(1); }} compact />
        </div>

        {selected.size > 0 && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary/5 border border-primary/20 rounded-xl"
          >
            <CheckCircle className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">{selected.size} selected</span>
            <div className="flex items-center gap-1 ml-auto">
              <button onClick={handleBulkMarkRead} className="px-3 py-1.5 text-[10px] font-bold bg-white border border-neutral-border rounded-lg hover:bg-accent-light transition-all flex items-center gap-1">
                <CheckCheck className="w-3 h-3" /> Mark Read
              </button>
              <button onClick={handleBulkArchive} className="px-3 py-1.5 text-[10px] font-bold bg-white border border-neutral-border rounded-lg hover:bg-warning/10 transition-all flex items-center gap-1">
                <Archive className="w-3 h-3" /> Archive
              </button>
              <button onClick={handleBulkDelete} className="px-3 py-1.5 text-[10px] font-bold bg-white border border-danger/20 text-danger rounded-lg hover:bg-danger/10 transition-all flex items-center gap-1">
                <Trash2 className="w-3 h-3" /> Delete
              </button>
            </div>
          </motion.div>
        )}

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <button onClick={handleSelectAll}
              className={cn("w-4 h-4 rounded border-2 flex items-center justify-center transition-all", selected.size === paginated.length && paginated.length > 0 ? "bg-primary border-primary" : "border-neutral-border hover:border-primary")}
            >
              {selected.size === paginated.length && paginated.length > 0 && <CheckCircle className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
            </button>
            <span className="text-xs text-neutral-textMuted font-medium">Select All</span>
          </label>
          <span className="text-[11px] text-neutral-textMuted">{filtered.length} notifications</span>
        </div>

        {paginated.length === 0 ? (
          <EmptyState icon={Bell} title="No notifications found" description="Try adjusting your filters or search terms." />
        ) : (
          <div className="space-y-2">
            {paginated.map((n, i) => (
              <NotificationCard key={n.id} notification={n} selected={selected.has(n.id)}
                onToggleSelect={handleSelect} onMarkRead={handleMarkRead} onArchive={handleArchive} onDelete={handleDelete} onPin={handlePin}
                delay={i * 0.02}
              />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-2">
            <p className="text-xs text-neutral-textMuted">Page {page} of {totalPages}</p>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}
                className="p-1.5 rounded-lg hover:bg-accent-light text-neutral-textMuted disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let p; const tp = totalPages;
                if (tp <= 5) p = i + 1;
                else if (page <= 3) p = i + 1;
                else if (page >= tp - 2) p = tp - 4 + i;
                else p = page - 2 + i;
                return (
                  <button key={p} onClick={() => setPage(p)}
                    className={cn("w-8 h-8 rounded-lg text-xs font-semibold transition-all", page === p ? "bg-primary text-white" : "text-neutral-textMuted hover:bg-accent-light")}>
                    {p}
                  </button>
                );
              })}
              <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}
                className="p-1.5 rounded-lg hover:bg-accent-light text-neutral-textMuted disabled:opacity-30 disabled:cursor-not-allowed transition-all">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </>)}
    </motion.div>
  );
}
