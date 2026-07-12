import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import { NotificationCard, FilterPanel, StatCard, EmptyState } from "../../components/notifications/NotificationComponents";
import { financialAlerts } from "../../data/notificationData";
import { cn } from "../../utils/utils";
import { DollarSign, Search, ChevronLeft, ChevronRight } from "lucide-react";

const subFilters = [
  { key: "all", label: "All" },
  { key: "Expense Approved", label: "Approved" },
  { key: "Expense Rejected", label: "Rejected" },
  { key: "Invoice Generated", label: "Generated" },
  { key: "Invoice Paid", label: "Paid" },
  { key: "Invoice Overdue", label: "Overdue" },
  { key: "Budget Exceeded", label: "Budget" },
];

export default function FinancialAlerts() {
  const [search, setSearch] = useState("");
  const [subFilter, setSubFilter] = useState("all");
  const [page, setPage] = useState(1);
  const pageSize = 8;

  const filtered = useMemo(() => {
    let result = [...financialAlerts];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((n) => n.title.toLowerCase().includes(q) || n.vehicle?.toLowerCase().includes(q));
    }
    if (subFilter !== "all") result = result.filter((n) => n.subcategory === subFilter);
    return result.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [search, subFilter]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const overdue = financialAlerts.filter((n) => n.subcategory === "Invoice Overdue").length;
  const budgetExceeded = financialAlerts.filter((n) => n.subcategory === "Budget Exceeded").length;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <PageHeader title="Financial Alerts" subtitle={`${financialAlerts.length} financial notifications`}
        badge={`${overdue} Overdue`}
      />
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        <StatCard label="Total Financial Alerts" value={financialAlerts.length} icon={DollarSign} color="success" />
        <StatCard label="Invoice Overdue" value={overdue} icon={DollarSign} color="danger" />
        <StatCard label="Budget Exceeded" value={budgetExceeded} icon={DollarSign} color="warning" />
        <StatCard label="Expense Approved" value={financialAlerts.filter((n) => n.subcategory === "Expense Approved").length} icon={DollarSign} color="primary" />
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-textMuted" />
          <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search financial alerts..." className="w-full h-9 pl-9 pr-4 text-sm bg-neutral-light border border-neutral-border rounded-lg outline-none focus:border-primary transition-all" />
        </div>
      </div>
      <FilterPanel filters={subFilters} active={subFilter} onChange={(k) => { setSubFilter(k); setPage(1); }} />
      {paginated.length === 0 ? (
        <EmptyState icon={DollarSign} title="No financial alerts" description="All financial notifications are up to date." />
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
