import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/utils";
import { AlertTriangle, X } from "lucide-react";

export default function ConfirmationModal({ open, onClose, onConfirm, title, message, confirmLabel = "Confirm", cancelLabel = "Cancel", variant = "primary", loading = false }) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm" onClick={onClose}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="bg-white rounded-xl border border-neutral-border shadow-soft-lg max-w-sm w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 pt-5 pb-2">
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center",
                variant === "danger" ? "bg-danger/10 text-danger" : "bg-primary/10 text-primary"
              )}>
                <AlertTriangle className="w-5 h-5" />
              </div>
              <button onClick={onClose} className="p-1 rounded-lg text-neutral-textMuted hover:bg-accent-light transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="px-5 pb-5">
              <h3 className="text-base font-bold text-neutral-textMain mb-1">{title}</h3>
              <p className="text-sm text-neutral-textMuted leading-relaxed">{message}</p>
            </div>
            <div className="flex items-center justify-end gap-2 px-5 py-4 bg-accent-light/50 border-t border-neutral-border/50">
              <button onClick={onClose} disabled={loading}
                className="px-4 py-2 text-xs font-semibold text-neutral-textMuted bg-white border border-neutral-border rounded-lg hover:bg-accent-light transition-all disabled:opacity-50">
                {cancelLabel}
              </button>
              <button onClick={onConfirm} disabled={loading}
                className={cn(
                  "px-4 py-2 text-xs font-semibold text-white rounded-lg transition-all disabled:opacity-50 flex items-center gap-1.5",
                  variant === "danger" ? "bg-danger hover:bg-red-600" : "bg-primary hover:bg-primary-hover"
                )}
              >
                {loading && <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
