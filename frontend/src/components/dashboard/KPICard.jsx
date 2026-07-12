import { motion } from "framer-motion";
import { cn } from "../../utils/utils";

export default function KPICard({ title, value, change, changeType = "neutral", icon: Icon, color = "bg-primary/10 text-primary", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35 }}
      className="bg-white border border-neutral-border rounded-xl p-5 shadow-soft-sm hover:shadow-soft-md transition-all duration-300"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-neutral-textMuted uppercase tracking-wider">{title}</p>
          <p className="text-2xl font-bold font-headings text-neutral-textMain mt-1.5 tracking-tight">{value}</p>
          {change !== undefined && (
            <div className="flex items-center gap-1 mt-2">
              <span
                className={cn(
                  "text-xs font-semibold",
                  changeType === "up" && "text-success",
                  changeType === "down" && "text-danger",
                  changeType === "neutral" && "text-neutral-textMuted"
                )}
              >
                {changeType === "up" && "↑"}
                {changeType === "down" && "↓"}
                {change}
              </span>
              <span className="text-[11px] text-neutral-textMuted">vs last month</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", color)}>
            <Icon className="w-5 h-5" strokeWidth={1.8} />
          </div>
        )}
      </div>
    </motion.div>
  );
}
