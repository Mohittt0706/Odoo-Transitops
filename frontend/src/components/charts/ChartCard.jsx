import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export default function ChartCard({ title, subtitle, children, className = "", delay = 0, actions }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35 }}
      className={cn("bg-white border border-neutral-border rounded-xl shadow-soft-sm overflow-hidden", className)}
    >
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <div>
          <h3 className="text-sm font-bold font-headings text-neutral-textMain">{title}</h3>
          {subtitle && <p className="text-[11px] text-neutral-textMuted mt-0.5">{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      <div className="px-5 pb-5">{children}</div>
    </motion.div>
  );
}
