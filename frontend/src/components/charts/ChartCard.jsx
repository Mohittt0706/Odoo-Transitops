import { motion } from "framer-motion";
import { cn } from "../../utils/utils";

export default function ChartCard({ title, subtitle, children, className = "", delay = 0, actions, footer }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3, ease: "easeOut" }}
      className={cn(
        "bg-white border border-neutral-border rounded-lg shadow-soft-sm overflow-hidden",
        className
      )}
    >
      {/* Card Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-neutral-border/60">
        <div>
          <h3 className="text-[13px] font-bold text-neutral-textMain leading-tight">{title}</h3>
          {subtitle && (
            <p className="text-[11px] text-neutral-textMuted mt-0.5">{subtitle}</p>
          )}
        </div>
        {actions && (
          <div className="flex items-center gap-1.5">{actions}</div>
        )}
      </div>

      {/* Card Body */}
      <div className="px-4 py-4">{children}</div>

      {/* Optional Footer */}
      {footer && (
        <div className="px-4 py-2.5 border-t border-neutral-border/60 bg-neutral-light/50">
          {footer}
        </div>
      )}
    </motion.div>
  );
}
