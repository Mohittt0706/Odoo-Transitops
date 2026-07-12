import { motion } from "framer-motion";
import { cn } from "../../utils/utils";

export function StatCard({ label, value, icon: Icon, color = "primary", delay = 0, trend, children }) {
  const c = { primary: "bg-primary/10 text-primary", success: "bg-success/10 text-success", warning: "bg-warning/10 text-warning", danger: "bg-danger/10 text-danger", purple: "bg-purple-50 text-purple-600", cyan: "bg-cyan-50 text-cyan-600" };
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.35 }}
      className="bg-white border border-neutral-border rounded-xl p-4 shadow-soft-sm hover:shadow-soft-md transition-all"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0">
          <p className="text-[9px] font-semibold text-neutral-textMuted uppercase tracking-wider">{label}</p>
          <p className="text-xl font-bold font-headings text-neutral-textMain mt-0.5">{value}</p>
          {trend !== undefined && (
            <p className={cn("text-[11px] font-semibold mt-0.5", trend >= 0 ? "text-success" : "text-danger")}>
              {trend >= 0 ? "↑" : "↓"} {Math.abs(trend)}% vs last month
            </p>
          )}
        </div>
        {Icon && <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0", c[color])}><Icon className="w-[18px] h-[18px]" strokeWidth={1.8} /></div>}
      </div>
      {children}
    </motion.div>
  );
}

export function FinanceStatusBadge({ status }) {
  const map = { Pending: "badge-warning", Approved: "badge-info", Rejected: "badge-danger", Paid: "badge-success", Unpaid: "badge-warning", Overdue: "badge-danger", Processing: "badge-info", Cancelled: "badge-muted", Refunded: "bg-purple-50 text-purple-600 border-purple-200/50", Completed: "badge-success" };
  return <span className={cn("badge", map[status] || "badge-muted")}>{status}</span>;
}

export function FilterBar({ filters, active, onChange }) {
  return (
    <div className="flex items-center gap-1 p-1 bg-white border border-neutral-border rounded-lg flex-wrap">
      {filters.map((f) => (
        <button key={f.key} onClick={() => onChange(f.key)}
          className={cn("px-2.5 py-1.5 text-[11px] font-semibold rounded-md transition-all whitespace-nowrap", active === f.key ? "bg-primary text-white" : "text-neutral-textMuted hover:text-accent")}>
          {f.label}
        </button>
      ))}
    </div>
  );
}

export function MiniSparkline({ data = [], color = "#2563EB" }) {
  const max = Math.max(...data, 1);
  const w = 80, h = 28;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - (v / max) * h}`).join(" ");
  return (
    <svg width={w} height={h} className="flex-shrink-0">
      <polyline fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" points={points} />
    </svg>
  );
}
