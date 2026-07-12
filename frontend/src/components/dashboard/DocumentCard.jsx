import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { FileText, Download, Trash2, Replace } from "lucide-react";

export default function DocumentCard({ document, index = 0 }) {
  const isExpired = document.status === "Expired";
  const isExpiringSoon = document.status === "Expiring Soon";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className={cn(
        "bg-white border rounded-xl p-5 shadow-soft-sm transition-all duration-300",
        isExpired ? "border-danger/30" : isExpiringSoon ? "border-warning/30" : "border-neutral-border"
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center",
          isExpired ? "bg-danger-light" : isExpiringSoon ? "bg-warning-light" : "bg-primary-light"
        )}>
          <FileText className={cn(
            "w-5 h-5",
            isExpired ? "text-danger" : isExpiringSoon ? "text-warning" : "text-primary"
          )} strokeWidth={1.8} />
        </div>
        <span className={cn(
          "text-[10px] font-bold px-2 py-0.5 rounded-full",
          isExpired ? "bg-danger-light text-danger" : isExpiringSoon ? "bg-warning-light text-warning" : "bg-success-light text-success"
        )}>
          {document.status}
        </span>
      </div>

      <h4 className="text-sm font-semibold text-neutral-textMain">{document.name}</h4>
      {document.expiry && (
        <p className="text-[11px] text-neutral-textMuted mt-1">
          Expires: {new Date(document.expiry).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
        </p>
      )}

      <div className="flex items-center gap-2 mt-4">
        <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-primary bg-primary-light rounded-lg hover:bg-primary/15 transition-colors">
          <Download className="w-3.5 h-3.5" /> Download
        </button>
        <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-neutral-textMuted bg-accent-light rounded-lg hover:bg-neutral-border transition-colors">
          <Replace className="w-3.5 h-3.5" /> Replace
        </button>
        <button className="p-2 text-neutral-textMuted hover:text-danger hover:bg-danger-light rounded-lg transition-colors">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}
