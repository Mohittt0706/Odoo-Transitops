import { motion } from "framer-motion";
import { cn } from "../../utils/utils";
import { Bell, BellRing, CheckCircle, Clock, AlertTriangle, Info, AlertOctagon, ArrowUp, ArrowDown, Minus, Pin, Archive, Trash2, Eye, EyeOff, Search, X } from "lucide-react";

const priorityConfig = {
  critical: { icon: AlertOctagon, color: "text-danger", bg: "bg-danger/10", border: "border-danger/30", label: "Critical" },
  high: { icon: AlertTriangle, color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200", label: "High" },
  medium: { icon: Clock, color: "text-warning", bg: "bg-warning/10", border: "border-warning/30", label: "Medium" },
  low: { icon: Info, color: "text-neutral-textMuted", bg: "bg-accent-light", border: "border-neutral-border", label: "Low" },
};

const categoryColor = {
  maintenance: { bg: "bg-amber-100", text: "text-amber-700", dot: "bg-amber-500" },
  trip: { bg: "bg-blue-100", text: "text-blue-700", dot: "bg-blue-500" },
  license: { bg: "bg-purple-100", text: "text-purple-700", dot: "bg-purple-500" },
  financial: { bg: "bg-emerald-100", text: "text-emerald-700", dot: "bg-emerald-500" },
  general: { bg: "bg-slate-100", text: "text-slate-600", dot: "bg-slate-400" },
};

export function StatCard({ label, value, icon: Icon, color = "primary", trend, delay = 0 }) {
  const colorMap = {
    primary: "bg-primary/10 text-primary",
    success: "bg-success/10 text-success",
    danger: "bg-danger/10 text-danger",
    warning: "bg-warning/10 text-warning",
    purple: "bg-purple-100 text-purple-600",
    cyan: "bg-cyan-100 text-cyan-600",
  };
  const trendIcon = trend > 0 ? ArrowUp : trend < 0 ? ArrowDown : Minus;
  const trendColor = trend > 0 ? "text-success" : trend < 0 ? "text-danger" : "text-neutral-textMuted";

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}
      className="bg-white border border-neutral-border rounded-xl p-4 hover:shadow-md hover:border-primary/20 transition-all duration-200"
    >
      <div className="flex items-center justify-between mb-3">
        <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center", colorMap[color])}>
          <Icon className="w-4.5 h-4.5" strokeWidth={2} />
        </div>
        {trend !== undefined && (
          <div className={cn("flex items-center gap-0.5 text-[11px] font-bold", trendColor)}>
            <trendIcon className="w-3 h-3" />
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <p className="text-lg font-extrabold text-neutral-textMain">{value}</p>
      <p className="text-[11px] text-neutral-textMuted font-medium mt-0.5">{label}</p>
    </motion.div>
  );
}

export function PriorityBadge({ priority }) {
  const cfg = priorityConfig[priority] || priorityConfig.low;
  const Icon = cfg.icon;
  return (
    <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border", cfg.color, cfg.bg, cfg.border)}>
      <Icon className="w-2.5 h-2.5" />
      {cfg.label}
    </span>
  );
}

export function CategoryBadge({ category }) {
  const cfg = categoryColor[category] || categoryColor.general;
  return (
    <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold", cfg.bg, cfg.text)}>
      {category.charAt(0).toUpperCase() + category.slice(1)}
    </span>
  );
}

export function FilterPanel({ filters, active, onChange, compact }) {
  return (
    <div className={cn("flex items-center gap-1 overflow-x-auto pb-1", compact ? "flex-wrap" : "flex-nowrap")}>
      {filters.map((f) => (
        <button key={f.key} onClick={() => onChange(f.key)}
          className={cn(
            "whitespace-nowrap px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all",
            active === f.key ? "bg-primary text-white shadow-sm" : "bg-accent-light text-neutral-textMuted hover:text-accent"
          )}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}

export function NotificationCard({ notification, selected, onToggleSelect, onMarkRead, onArchive, onDelete, onPin, onDemoAction, delay = 0 }) {
  const catCfg = categoryColor[notification.category] || categoryColor.general;

  return (
    <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay }}
      className={cn(
        "flex items-start gap-3 p-4 rounded-xl border transition-all duration-200 group",
        selected ? "border-primary/40 bg-primary/[0.02]" : "border-neutral-border",
        !notification.read ? "bg-blue-50/40 border-blue-100" : "bg-white",
        "hover:border-primary/30 hover:shadow-sm"
      )}
    >
      <div className="flex items-center gap-2 pt-0.5">
        <button onClick={() => onToggleSelect?.(notification.id)}
          className={cn(
            "w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-all",
            selected ? "bg-primary border-primary" : "border-neutral-border hover:border-primary"
          )}
        >
          {selected && <CheckCircle className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
        </button>
        {!notification.read && <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className={cn("text-sm truncate max-w-[280px]", notification.read ? "font-medium" : "font-bold")}>{notification.title}</h4>
              <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", catCfg.dot)} />
              <CategoryBadge category={notification.category} />
              <PriorityBadge priority={notification.priority} />
              {notification.demoStatus && (
                <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold border", notification.demoStatus === "Pending" ? "bg-amber-50 text-amber-600 border-amber-200" : notification.demoStatus === "Accepted" ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-red-50 text-red-600 border-red-200")}>
                  {notification.demoStatus}
                </span>
              )}
            </div>
            <p className="text-xs text-neutral-textMuted mt-1 line-clamp-1">{notification.description}</p>
            <div className="flex items-center gap-3 mt-2 text-[10px] text-neutral-textMuted">
              <span>{notification.driver ? `Driver: ${notification.driver}` : notification.sender}</span>
              {notification.vehicle && <span>| {notification.vehicle}</span>}
              {notification.trip && <span>| Trip: {notification.trip}</span>}
              <span>| {new Date(notification.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</span>
            </div>
            {notification.demoStatus === "Pending" && (
              <div className="flex items-center gap-2 mt-3">
                <button onClick={() => onDemoAction?.(notification.id, "view")}
                  className="px-3 py-1.5 text-[10px] font-bold rounded-lg border border-primary/20 text-primary hover:bg-primary/5 transition-all">
                  View
                </button>
                <button onClick={() => onDemoAction?.(notification.id, "accept")}
                  className="px-3 py-1.5 text-[10px] font-bold rounded-lg border border-emerald-200 text-emerald-600 hover:bg-emerald-50 transition-all">
                  Accept
                </button>
                <button onClick={() => onDemoAction?.(notification.id, "reject")}
                  className="px-3 py-1.5 text-[10px] font-bold rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-all">
                  Reject
                </button>
                <button onClick={() => onDemoAction?.(notification.id, "schedule")}
                  className="px-3 py-1.5 text-[10px] font-bold rounded-lg border border-purple-200 text-purple-600 hover:bg-purple-50 transition-all">
                  Schedule
                </button>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
            {!notification.read && (
              <button onClick={() => onMarkRead?.(notification.id)} title="Mark as read"
                className="p-1.5 rounded-lg text-neutral-textMuted hover:bg-accent-light hover:text-primary transition-all">
                <Eye className="w-3.5 h-3.5" />
              </button>
            )}
            <button onClick={() => onPin?.(notification.id)} title={notification.pinned ? "Unpin" : "Pin"}
              className={cn("p-1.5 rounded-lg transition-all", notification.pinned ? "text-primary bg-primary/10" : "text-neutral-textMuted hover:bg-accent-light")}>
              <Pin className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => onArchive?.(notification.id)} title="Archive"
              className="p-1.5 rounded-lg text-neutral-textMuted hover:bg-accent-light hover:text-warning transition-all">
              <Archive className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => onDelete?.(notification.id)} title="Delete"
              className="p-1.5 rounded-lg text-neutral-textMuted hover:bg-danger-light hover:text-danger transition-all">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function SettingsCard({ title, description, icon: Icon, color = "primary", children }) {
  const colorMap = {
    primary: "bg-primary/10 text-primary",
    success: "bg-success/10 text-success",
    danger: "bg-danger/10 text-danger",
    warning: "bg-warning/10 text-warning",
    purple: "bg-purple-100 text-purple-600",
    cyan: "bg-cyan-100 text-cyan-600",
    slate: "bg-slate-100 text-slate-600",
  };
  return (
    <div className="bg-white border border-neutral-border rounded-xl p-5 hover:shadow-sm transition-all">
      <div className="flex items-start gap-3 mb-4">
        <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center shrink-0", colorMap[color])}>
          <Icon className="w-4.5 h-4.5" strokeWidth={2} />
        </div>
        <div>
          <h4 className="text-sm font-bold text-neutral-textMain">{title}</h4>
          {description && <p className="text-[11px] text-neutral-textMuted mt-0.5">{description}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}

export function ToggleSwitch({ checked, onChange, label }) {
  return (
    <label className="flex items-center justify-between py-2.5 border-b border-neutral-border/50 last:border-0 cursor-pointer group">
      <span className="text-xs font-medium text-neutral-textMain group-hover:text-primary transition-colors">{label}</span>
      <button
        onClick={(e) => { e.preventDefault(); onChange?.(!checked); }}
        className={cn(
          "relative w-10 h-5 rounded-full transition-all duration-200",
          checked ? "bg-primary" : "bg-neutral-border"
        )}
      >
        <span className={cn(
          "absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200",
          checked && "translate-x-4.5"
        )} />
      </button>
    </label>
  );
}

export function EmptyState({ icon: Icon, title, description }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-16 h-16 bg-accent-light rounded-2xl flex items-center justify-center mb-4">
        <Icon className="w-7 h-7 text-neutral-textMuted" strokeWidth={1.5} />
      </div>
      <h3 className="text-base font-bold text-neutral-textMain mb-1">{title}</h3>
      <p className="text-sm text-neutral-textMuted max-w-xs text-center">{description}</p>
    </div>
  );
}

export function LoadingSkeleton() {
  return (
    <div className="space-y-3 animate-pulse">
      {[].map((i) => (
        <div key={i} className="flex items-start gap-3 p-4 bg-white border border-neutral-border rounded-xl">
          <div className="w-4 h-4 rounded bg-neutral-border" />
          <div className="flex-1 space-y-2">
            <div className="flex gap-2">
              <div className="h-4 bg-neutral-border rounded w-48" />
              <div className="h-4 bg-neutral-border rounded w-16" />
              <div className="h-4 bg-neutral-border rounded w-12" />
            </div>
            <div className="h-3 bg-neutral-border rounded w-full max-w-md" />
            <div className="h-3 bg-neutral-border rounded w-64" />
          </div>
          <div className="flex gap-1">
            <div className="w-7 h-7 bg-neutral-border rounded-lg" />
            <div className="w-7 h-7 bg-neutral-border rounded-lg" />
            <div className="w-7 h-7 bg-neutral-border rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ConfirmationModal({ open, title, message, confirmLabel = "Confirm", cancelLabel = "Cancel", onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm" onClick={onCancel}>
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl border border-neutral-border shadow-soft-lg p-6 max-w-sm w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-base font-bold text-neutral-textMain mb-2">{title}</h3>
        <p className="text-sm text-neutral-textMuted mb-5">{message}</p>
        <div className="flex items-center justify-end gap-2">
          <button onClick={onCancel} className="px-4 py-2 text-xs font-semibold text-neutral-textMuted bg-accent-light rounded-lg hover:bg-neutral-border transition-all">{cancelLabel}</button>
          <button onClick={onConfirm} className="px-4 py-2 text-xs font-semibold text-white bg-danger rounded-lg hover:bg-danger/80 transition-all">{confirmLabel}</button>
        </div>
      </motion.div>
    </div>
  );
}

