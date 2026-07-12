import { motion } from "framer-motion";
import { cn } from "../../utils/utils";
import { CheckCircle, Clock, XCircle, AlertTriangle, Navigation, Play, Pause, Flag } from "lucide-react";

export function TripStatusBadge({ status }) {
  const m = {
    "In Transit": { icon: Navigation, c: "badge-info" },
    Completed: { icon: CheckCircle, c: "badge-success" },
    Pending: { icon: Clock, c: "badge-warning" },
    Delayed: { icon: AlertTriangle, c: "badge-danger" },
    Cancelled: { icon: XCircle, c: "badge-muted" },
    Assigned: { icon: Play, c: "badge-info" },
    Started: { icon: Play, c: "badge-info" },
    Paused: { icon: Pause, c: "badge-warning" },
    Emergency: { icon: AlertTriangle, c: "badge-danger" },
  };
  const s = m[status] || { icon: Clock, c: "badge-muted" };
  const Icon = s.icon;
  return <span className={cn("badge gap-1.5", s.c)}><Icon className="w-2.5 h-2.5" />{status}</span>;
}

export function QuickActionButton({ label, icon: Icon, color, onClick }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-2 p-4 rounded-xl border border-neutral-border hover:shadow-soft-md transition-all duration-200 group">
      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform", color)}>
        <Icon className="w-5 h-5" strokeWidth={1.8} />
      </div>
      <span className="text-xs font-semibold text-neutral-textMain">{label}</span>
    </button>
  );
}

export function ProgressBar({ value, size = "md", color = "primary" }) {
  const h = size === "sm" ? "h-1.5" : "h-2";
  const c = { primary: "bg-primary", success: "bg-success", warning: "bg-warning", danger: "bg-danger" };
  return (
    <div className="flex items-center gap-2">
      <div className={cn("flex-1 bg-neutral-border rounded-full overflow-hidden", h)}>
        <motion.div initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 0.8, ease: "easeOut" }} className={cn(h, "rounded-full", c[color])} />
      </div>
      <span className="text-[11px] font-bold text-neutral-textMuted">{value}%</span>
    </div>
  );
}

export function Toast({ show, type = "success", message, onClose }) {
  if (!show) return null;
  const c = { success: "bg-success-light text-success border-success/30", error: "bg-danger-light text-danger border-danger/30", info: "bg-primary-light text-primary border-primary/30" };
  return (
    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
      className={cn("fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg border shadow-soft-lg text-sm font-semibold", c[type])}>
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 opacity-60 hover:opacity-100 text-current">&times;</button>
    </motion.div>
  );
}

export function ConfirmationModal({ open, title, message, confirmLabel, onConfirm, onCancel, variant = "primary" }) {
  if (!open) return null;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={onCancel}>
      <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-white rounded-xl shadow-soft-lg p-6 max-w-sm w-full" onClick={e => e.stopPropagation()}>
        <h3 className="text-base font-bold font-headings text-neutral-textMain">{title}</h3>
        <p className="text-sm text-neutral-textMuted mt-2">{message}</p>
        <div className="flex items-center justify-end gap-2 mt-6">
          <button onClick={onCancel} className="btn btn-secondary text-xs px-4 py-2">Cancel</button>
          <button onClick={onConfirm} className={cn("btn text-xs px-4 py-2", variant === "danger" ? "btn-danger" : "btn-primary")}>{confirmLabel}</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function EmptyState({ icon: Icon = Navigation, title = "No data", description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-14 h-14 bg-accent-light rounded-xl flex items-center justify-center mb-3">
        <Icon className="w-6 h-6 text-neutral-textMuted" strokeWidth={1.5} />
      </div>
      <p className="text-sm font-semibold text-neutral-textMain">{title}</p>
      {description && <p className="text-xs text-neutral-textMuted mt-1 mb-4">{description}</p>}
      {action}
    </div>
  );
}

export function Timeline({ stages }) {
  return (
    <div className="relative pl-6 space-y-0">
      <div className="absolute left-[7px] top-2 bottom-0 w-0.5 bg-neutral-border" />
      {stages.map((s, i) => (
        <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="relative pb-5 last:pb-0">
          <div className="absolute -left-[19px] top-0.5 w-[14px] h-[14px] rounded-full bg-white border-2 border-primary flex items-center justify-center text-[7px]">•</div>
          <p className="text-[10px] font-semibold text-neutral-textMuted">{s.date}</p>
          <p className="text-sm font-semibold text-neutral-textMain">{s.title}</p>
          <p className="text-xs text-neutral-textMuted">{s.description}</p>
        </motion.div>
      ))}
    </div>
  );
}

export function MetricCard({ label, value, icon: Icon, color = "primary", delay = 0 }) {
  const c = { primary: "bg-primary/10 text-primary", success: "bg-success/10 text-success", warning: "bg-warning/10 text-warning", danger: "bg-danger/10 text-danger", info: "bg-blue-50 text-blue-600", purple: "bg-purple-50 text-purple-600" };
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.35 }}
      className="bg-white border border-neutral-border rounded-xl p-4 shadow-soft-sm hover:shadow-soft-md transition-all"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-[9px] font-semibold text-neutral-textMuted uppercase tracking-wider">{label}</p>
          <p className="text-lg font-bold font-headings text-neutral-textMain mt-1">{value}</p>
        </div>
        {Icon && <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0", c[color])}><Icon className="w-[18px] h-[18px]" strokeWidth={1.8} /></div>}
      </div>
    </motion.div>
  );
}
