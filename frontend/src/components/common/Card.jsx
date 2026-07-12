import { motion } from "framer-motion";
import { cn } from "../../utils/utils";

export default function FormCard({ children, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        "bg-white rounded-2xl border border-neutral-border p-8 shadow-soft-lg w-full max-w-[420px]",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
