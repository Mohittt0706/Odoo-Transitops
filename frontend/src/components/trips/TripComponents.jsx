import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { Check, AlertCircle, Clock, X, Truck, User, MapPin, Flag, Fuel, FileText, Circle } from "lucide-react";

export function ProgressBar({ value, size = "md", showLabel = true }) {
  const h = size === "sm" ? "h-1.5" : "h-2.5";
  const color = value >= 90 ? "bg-success" : value >= 50 ? "bg-primary" : value >= 25 ? "bg-warning" : "bg-danger";
  return (
    <div className="flex items-center gap-2">
      <div className={cn("flex-1 bg-neutral-border rounded-full overflow-hidden", h)}>
        <motion.div initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 0.8, ease: "easeOut" }} className={cn(h, "rounded-full transition-all", color)} />
      </div>
      {showLabel && <span className="text-[11px] font-bold text-neutral-textMuted min-w-[2.5rem] text-right">{value}%</span>}
    </div>
  );
}

const statusIconMap = { Completed: Check, "In Transit": Truck, Delayed: Clock, Cancelled: X, Pending: FileText };
const statusColorMap = { Completed: "text-success bg-success-light border-success/20", "In Transit": "text-primary bg-primary-light border-primary/20", Delayed: "text-warning bg-warning-light border-warning/20", Cancelled: "text-danger bg-danger-light border-danger/20", Pending: "text-purple-600 bg-purple-50 border-purple-200/50" };

export function TripStatusBadge({ status }) {
  const Icon = statusIconMap[status] || Circle;
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full border", statusColorMap[status] || "bg-accent-light text-neutral-textMuted border-slate-200/50")}>
      <Icon className="w-3 h-3" /> {status}
    </span>
  );
}

export function TripCard({ trip, onClick }) {
  return (
    <motion.div whileHover={{ y: -2 }} className="bg-white border border-neutral-border rounded-xl p-4 shadow-soft-sm hover:shadow-soft-md transition-all cursor-pointer" onClick={onClick}>
      <div className="flex items-start justify-between mb-2">
        <div><p className="text-xs font-bold text-neutral-textMuted">{trip.id}</p><p className="text-sm font-bold font-headings text-neutral-textMain mt-0.5">{trip.from} → {trip.to}</p></div>
        <TripStatusBadge status={trip.status} />
      </div>
      <div className="flex items-center gap-3 text-[11px] text-neutral-textMuted"><Truck className="w-3 h-3" /> {trip.driver} | {trip.vehicle}</div>
      <div className="flex items-center justify-between mt-2.5 pt-2.5 border-t border-neutral-border text-[11px]">
        <span className="text-neutral-textMuted">{trip.cargo}</span>
        <span className="font-semibold text-neutral-textMain">{trip.distance}</span>
      </div>
    </motion.div>
  );
}

export function Timeline({ events }) {
  const icons = { FileText, Truck, User, MapPin, Flag, Fuel };
  return (
    <div className="relative pl-8 space-y-0">
      <div className="absolute left-[15px] top-2 bottom-0 w-0.5 bg-neutral-border" />
      {events.map((ev, i) => {
        const Icon = icons[ev.icon] || Circle;
        return (
          <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} className="relative pb-6 last:pb-0">
            <div className="absolute -left-[23px] top-0.5 w-[18px] h-[18px] rounded-full bg-white border-2 border-primary flex items-center justify-center">
              <Icon className="w-2.5 h-2.5 text-primary" />
            </div>
            <p className="text-[10px] font-semibold text-neutral-textMuted">{ev.time}</p>
            <p className="text-sm font-semibold text-neutral-textMain mt-0.5">{ev.title}</p>
            <p className="text-xs text-neutral-textMuted">{ev.desc}</p>
          </motion.div>
        );
      })}
    </div>
  );
}

export function RouteCard({ from, to, distance }) {
  return (
    <div className="flex items-center gap-3 p-4 bg-accent-light rounded-xl">
      <div className="flex flex-col items-center gap-0.5">
        <div className="w-3 h-3 rounded-full bg-primary border-2 border-white" />
        <div className="w-0.5 h-8 bg-neutral-border" />
        <div className="w-3 h-3 rounded-full bg-success border-2 border-white" />
      </div>
      <div className="flex-1 min-w-0">
        <div><p className="text-sm font-semibold text-neutral-textMain">{from}</p><p className="text-[10px] text-neutral-textMuted">Origin</p></div>
        <p className="text-xs font-medium text-neutral-textMuted my-1.5">{distance}</p>
        <div><p className="text-sm font-semibold text-neutral-textMain">{to}</p><p className="text-[10px] text-neutral-textMuted">Destination</p></div>
      </div>
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
