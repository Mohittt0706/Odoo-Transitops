import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export default function PageHeader({ title, subtitle, actions, badge }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-neutral-border"
    >
      <div className="flex items-start gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-neutral-textMain leading-tight">
              {title}
            </h1>
            {badge && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary-light text-primary border border-blue-200/50">
                {badge}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-[13px] text-neutral-textMuted mt-0.5 leading-relaxed">{subtitle}</p>
          )}
        </div>
      </div>
      {actions && (
        <div className="flex items-center gap-2 flex-wrap flex-shrink-0">{actions}</div>
      )}
    </motion.div>
  );
}
