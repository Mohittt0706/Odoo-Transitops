<<<<<<< HEAD
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "../../utils/utils";

export default function Modal({ open, onClose, title, size = "md", children }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose?.(); };
    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

=======
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function Modal({ open, onClose, title, subtitle, children, size = "md", className = "" }) {
>>>>>>> 90419a56f07a1c3e5e8232fb608c5213f033379b
  const sizes = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
<<<<<<< HEAD
    full: "max-w-[95vw]",
=======
>>>>>>> 90419a56f07a1c3e5e8232fb608c5213f033379b
  };

  return (
    <AnimatePresence>
      {open && (
<<<<<<< HEAD
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            ref={overlayRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => { if (e.target === overlayRef.current) onClose?.(); }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "relative w-full bg-white rounded-2xl shadow-2xl border border-neutral-border z-10 max-h-[90vh] flex flex-col",
              sizes[size]
            )}
          >
            {title && (
              <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-border flex-shrink-0">
                <h2 className="text-base font-extrabold text-neutral-textMain font-headings">{title}</h2>
                <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-accent-light text-neutral-textMuted transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            <div className="overflow-y-auto flex-1 p-6">{children}</div>
=======
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-12 sm:pt-24 bg-black/30 backdrop-blur-sm overflow-y-auto" onClick={onClose}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className={`bg-white rounded-xl border border-neutral-border shadow-soft-lg w-full ${sizes[size]} overflow-hidden ${className}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between px-6 pt-5 pb-3 border-b border-neutral-border/60">
              <div>
                <h2 className="text-base font-bold text-neutral-textMain">{title}</h2>
                {subtitle && <p className="text-xs text-neutral-textMuted mt-0.5">{subtitle}</p>}
              </div>
              <button onClick={onClose} className="p-1.5 rounded-lg text-neutral-textMuted hover:bg-accent-light transition-colors -mr-1 -mt-1">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="px-6 py-4">{children}</div>
>>>>>>> 90419a56f07a1c3e5e8232fb608c5213f033379b
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
