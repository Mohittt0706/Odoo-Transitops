import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import { NotificationCard, FilterPanel, PriorityBadge, CategoryBadge, EmptyState } from "../../components/notifications/NotificationComponents";
import { allNotifications, notificationStats } from "../../data/notificationData";
import { cn } from "../../utils/utils";
import { Search, Bell, CheckCheck, Archive, Trash2, Pin, Filter, ArrowUpDown, ChevronLeft, ChevronRight, Download, CheckCircle } from "lucide-react";

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
  const [notifVersion, setNotifVersion] = useState(0);
  const pageSize = 10;

  const filtered = useMemo(() => {
    let result = [...allNotifications]; // eslint-disable-line

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
  }, [search, catFilter, priFilter, statusFilter, sortBy, sortDir, notifVersion]);

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

  const handleMarkRead = (id) => {
    const n = allNotifications.find((x) => x.id === id);
    if (n) n.read = true;
  };

  const handleMarkAllRead = () => {
    allNotifications.forEach((n) => { n.read = true; });
    setSelected(new Set());
  };

  const handleArchive = (id) => {
    const n = allNotifications.find((x) => x.id === id);
    if (n) n.archived = true;
  };

  const handleDelete = (id) => {
    const idx = allNotifications.findIndex((x) => x.id === id);
    if (idx !== -1) allNotifications.splice(idx, 1);
  };

  const handlePin = (id) => {
    const n = allNotifications.find((x) => x.id === id);
    if (n) n.pinned = !n.pinned;
  };

  const handleBulkArchive = () => {
    selected.forEach((id) => {
      const n = allNotifications.find((x) => x.id === id);
      if (n) n.archived = true;
    });
    setSelected(new Set());
  };

  const handleBulkDelete = () => {
    selected.forEach((id) => {
      const idx = allNotifications.findIndex((x) => x.id === id);
      if (idx !== -1) allNotifications.splice(idx, 1);
    });
    setSelected(new Set());
  };

  const handleDemoAction = (id, action) => {
    const n = allNotifications.find((x) => x.id === id);
    if (!n || !n.demoRequestId) return;
    const requests = JSON.parse(localStorage.getItem("demo_requests") || "[]");
    const req = requests.find((r) => r.id === n.demoRequestId);
    if (!req) return;
    if (action === "view") {
      alert(`Demo Request Details:\n\nName: ${req.fullName}\nCompany: ${req.company}\nEmail: ${req.email}\nPhone: ${req.phone}\nDate: ${req.demoDate}\nTime: ${req.demoTime}\nMessage: ${req.message || "N/A"}`);
    } else if (action === "accept") {
      n.demoStatus = "Accepted";
      req.status = "Accepted";
      localStorage.setItem("demo_requests", JSON.stringify(requests));
    } else if (action === "reject") {
      n.demoStatus = "Rejected";
      req.status = "Rejected";
      localStorage.setItem("demo_requests", JSON.stringify(requests));
    } else if (action === "schedule") {
      const newDate = prompt("Enter scheduled date (YYYY-MM-DD):", req.demoDate);
      if (newDate) {
        req.demoDate = newDate;
        req.status = "Scheduled";
        n.demoStatus = "Scheduled";
        n.description += ` Scheduled for ${newDate}.`;
        localStorage.setItem("demo_requests", JSON.stringify(requests));
      }
    }
    setNotifVersion((v) => v + 1);
  };

  const handleBulkMarkRead = () => {
    selected.forEach((id) => {
      const n = allNotifications.find((x) => x.id === id);
      if (n) n.read = true;
    });
    setSelected(new Set());
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
              onDemoAction={handleDemoAction}
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
    </motion.div>
  );
}
