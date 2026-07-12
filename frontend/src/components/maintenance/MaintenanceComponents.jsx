import { motion } from "framer-motion";
import { cn } from "../../utils/utils";
import { AlertCircle, Clock, CheckCircle, XCircle, Wrench, Package, Search } from "lucide-react";

export function PriorityBadge({ priority }) {
  const c = { Critical: "text-danger bg-danger-light border-danger/30", High: "text-warning bg-warning-light border-warning/30", Medium: "text-primary bg-primary-light border-primary/30", Low: "text-neutral-textMuted bg-accent-light border-slate-200/50" };
  return <span className={cn("inline-flex items-center text-[10px] font-bold px-2.5 py-1 rounded-full border", c[priority] || c.Low)}>{priority}</span>;
}

const iconMap = { Scheduled: Clock, "In Progress": Wrench, Completed: CheckCircle, Cancelled: XCircle, "Waiting Parts": Package };
const colorMap = { Scheduled: "badge-warning", "In Progress": "badge-info", Completed: "badge-success", Cancelled: "badge-danger", "Waiting Parts": "badge-warning" };
export function MaintStatusBadge({ status }) {
  const Icon = iconMap[status] || AlertCircle;
  return <span className={cn("badge gap-1.5", colorMap[status] || "badge-muted")}><Icon className="w-2.5 h-2.5" />{status}</span>;
}

export function ProgressBar({ value, size = "md" }) {
  const h = size === "sm" ? "h-1.5" : "h-2";
  const color = value >= 90 ? "bg-success" : value >= 50 ? "bg-primary" : value >= 25 ? "bg-warning" : "bg-danger";
  return (
    <div className="flex items-center gap-2">
      <div className={cn("flex-1 bg-neutral-border rounded-full overflow-hidden", h)}>
        <motion.div initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 0.8, ease: "easeOut" }} className={cn(h, "rounded-full", color)} />
      </div>
      <span className="text-[11px] font-bold text-neutral-textMuted">{value}%</span>
    </div>
  );
}

export function Timeline({ stages }) {
  const stageIcons = { Created: "○", Inspected: "◎", "Parts Ordered": "◉", "In Progress": "●", Completed: "✅", Approved: "✓", Cancelled: "✕" };
  return (
    <div className="relative pl-6 space-y-0">
      <div className="absolute left-[7px] top-2 bottom-0 w-0.5 bg-neutral-border" />
      {stages.map((s, i) => (
        <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="relative pb-5 last:pb-0">
          <div className="absolute -left-[19px] top-0.5 w-[14px] h-[14px] rounded-full bg-white border-2 border-primary flex items-center justify-center text-[7px]">{stageIcons[s.stage] || "•"}</div>
          <p className="text-[10px] font-semibold text-neutral-textMuted">{s.date}</p>
          <p className="text-sm font-semibold text-neutral-textMain">{s.stage}</p>
          <p className="text-xs text-neutral-textMuted">{s.person} — {s.notes}</p>
        </motion.div>
      ))}
    </div>
  );
}

export function Toast({ show, type = "success", message, onClose }) {
  if (!show) return null;
  const colors = { success: "bg-success-light text-success border-success/30", error: "bg-danger-light text-danger border-danger/30" };
  return (
    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className={cn("fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg border shadow-soft-lg text-sm font-semibold", colors[type])}>
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 opacity-60 hover:opacity-100">&times;</button>
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
