import { motion } from "framer-motion";
import { cn } from "../../utils/utils";

export default function FormSection({ title, description, icon, children, className = "", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={cn("bg-white border border-neutral-border rounded-xl shadow-soft-sm overflow-hidden", className)}
    >
      {(title || description) && (
        <div className="flex items-start gap-3 px-6 pt-5 pb-4 border-b border-neutral-border/50">
          {icon && (
            <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
              <icon className="w-4.5 h-4.5" strokeWidth={2} />
            </div>
          )}
          <div className="min-w-0">
            {title && <h3 className="text-sm font-bold font-headings text-neutral-textMain">{title}</h3>}
            {description && <p className="text-xs text-neutral-textMuted mt-0.5 leading-relaxed">{description}</p>}
          </div>
        </div>
      )}
      <div className="px-6 py-5">{children}</div>
    </motion.div>
  );
}
