import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { Circle, Star, User, FileText, Download, Upload } from "lucide-react";

export function DriverAvatar({ name, size = "md", className }) {
  const initials = name.split(" ").map(n => n[0]).join("");
  const sizes = { sm: "w-7 h-7 text-[10px]", md: "w-9 h-9 text-xs", lg: "w-14 h-14 text-base", xl: "w-20 h-20 text-xl" };
  return (
    <div className={cn("rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center flex-shrink-0", sizes[size], className)}>
      {initials}
    </div>
  );
}

export function SafetyBadge({ score, size = "sm" }) {
  const color = score >= 90 ? "text-success bg-success-light" : score >= 75 ? "text-warning bg-warning-light" : "text-danger bg-danger-light";
  return (
    <span className={cn("inline-flex items-center gap-1 font-bold rounded-full", size === "sm" ? "text-[10px] px-2 py-0.5" : "text-xs px-2.5 py-1", color)}>
      <Circle className={size === "sm" ? "w-1.5 h-1.5" : "w-2 h-2"} fill="currentColor" />
      {score}{size !== "sm" && "% Safety"}
    </span>
  );
}

export function LicenseBadge({ status }) {
  const variants = { Valid: "badge-success", "Expiring Soon": "badge-warning", Expired: "badge-danger" };
  return <span className={cn("badge", variants[status] || "badge-muted")}>{status}</span>;
}

export function DriverStatsCard({ icon: Icon, label, value, sub, color = "primary" }) {
  const colors = { primary: "bg-primary-light text-primary", success: "bg-success-light text-success", warning: "bg-warning-light text-warning", danger: "bg-danger-light text-danger" };
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-neutral-border rounded-xl p-4 shadow-soft-sm hover:shadow-soft-md transition-all">
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold text-neutral-textMuted uppercase tracking-wider">{label}</p>
          <p className="text-xl font-bold font-headings text-neutral-textMain mt-1">{value}</p>
          {sub && <p className="text-[10px] text-neutral-textMuted mt-0.5">{sub}</p>}
        </div>
        {Icon && <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0", colors[color])}><Icon className="w-4.5 h-4.5" strokeWidth={1.8} /></div>}
      </div>
    </motion.div>
  );
}

export function LoadingSkeleton({ rows = 5 }) {
  return (
    <div className="space-y-3 animate-pulse">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-3 bg-white border border-neutral-border rounded-lg">
          <div className="w-9 h-9 bg-neutral-border rounded-full" />
          <div className="flex-1 space-y-1.5">
            <div className="h-3 bg-neutral-border rounded w-1/3" />
            <div className="h-2.5 bg-neutral-border rounded w-1/4" />
          </div>
          <div className="h-5 bg-neutral-border rounded w-16" />
        </div>
      ))}
    </div>
  );
}

export function ConfirmationModal({ open, title, message, confirmLabel, onConfirm, onCancel, variant = "danger" }) {
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

export function DriverCard({ driver, onClick }) {
  return (
    <motion.div whileHover={{ y: -2 }} className="bg-white border border-neutral-border rounded-xl p-4 shadow-soft-sm hover:shadow-soft-md transition-all cursor-pointer" onClick={onClick}>
      <div className="flex items-center gap-3">
        <DriverAvatar name={driver.name} size="lg" />
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold font-headings text-neutral-textMain truncate">{driver.name}</h4>
          <p className="text-[11px] text-neutral-textMuted">{driver.experience} | {driver.licenseNo}</p>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <SafetyBadge score={driver.safetyScore} />
            <LicenseBadge status={driver.licenseStatus} />
            <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded", driver.availability === "Available" ? "text-success bg-success-light" : "text-warning bg-warning-light")}>{driver.availability}</span>
          </div>
        </div>
        <div className="flex items-center gap-0.5">
          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
          <span className="text-sm font-bold text-neutral-textMain">{driver.rating}</span>
        </div>
      </div>
    </motion.div>
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
