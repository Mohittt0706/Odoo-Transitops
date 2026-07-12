import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/utils";
import {
  FileText,
  FileSpreadsheet,
  FileJson,
  Download,
  Send,
  Calendar,
  Printer,
  X,
} from "lucide-react";

const formats = [
  { id: "pdf", label: "PDF", icon: FileText, desc: "Portable document format", color: "text-danger bg-danger-light" },
  { id: "excel", label: "Excel", icon: FileSpreadsheet, desc: "Spreadsheet format (.xlsx)", color: "text-success bg-success-light" },
  { id: "csv", label: "CSV", icon: FileText, desc: "Comma separated values", color: "text-primary bg-primary-light" },
  { id: "json", label: "JSON", icon: FileJson, desc: "JSON data format", color: "text-purple-600 bg-purple-50" },
];

export default function ExportModal({ isOpen, onClose, onExport }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="relative bg-white border border-neutral-border rounded-2xl shadow-soft-xl w-full max-w-lg mx-4 overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-border">
              <h3 className="text-base font-extrabold text-neutral-textMain">Export Report</h3>
              <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-accent-light text-neutral-textMuted transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-neutral-textMuted">Choose export format and options</p>
              <div className="grid grid-cols-2 gap-3">
                {formats.map((fmt) => (
                  <button
                    key={fmt.id}
                    onClick={() => onExport?.(fmt.id)}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl border border-neutral-border hover:border-primary hover:shadow-soft-sm transition-all group"
                  >
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", fmt.color)}>
                      <fmt.icon className="w-5 h-5" strokeWidth={1.8} />
                    </div>
                    <span className="text-sm font-bold text-neutral-textMain">{fmt.label}</span>
                    <span className="text-[10px] text-neutral-textMuted text-center">{fmt.desc}</span>
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3 pt-2">
                <button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary-dark transition-colors">
                  <Download className="w-4 h-4" /> Download
                </button>
                <button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-neutral-border text-neutral-textMain text-sm font-bold rounded-lg hover:bg-accent-light transition-colors">
                  <Send className="w-4 h-4" /> Email
                </button>
                <button className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-neutral-border text-neutral-textMain text-sm font-bold rounded-lg hover:bg-accent-light transition-colors">
                  <Printer className="w-4 h-4" /> Print
                </button>
              </div>
              <div className="flex items-center gap-2 pt-2 border-t border-neutral-border">
                <Calendar className="w-4 h-4 text-neutral-textMuted" />
                <span className="text-xs text-neutral-textMuted">Schedule recurring export</span>
                <button className="ml-auto text-xs font-bold text-primary hover:underline">Set Schedule</button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
