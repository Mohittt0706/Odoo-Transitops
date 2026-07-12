import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import StatusBadge from "../../components/common/Badge";
import { FileText, Download, Upload, CheckCircle, AlertTriangle, Shield, Car, BookOpen, Map, Eye } from "lucide-react";

const documents = [];

export default function DocumentsPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <PageHeader title="Documents" subtitle="Manage driving and vehicle documents" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {documents.map((doc, i) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.35 }}
            className="bg-white border border-neutral-border rounded-xl p-4 shadow-soft-sm hover:shadow-soft-md transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${doc.color}`}>
                <doc.icon className="w-5 h-5" strokeWidth={1.8} />
              </div>
              <StatusBadge status={doc.status} variant={doc.status === "Valid" ? "success" : "warning"} />
            </div>
            <h3 className="text-sm font-bold font-headings text-neutral-textMain">{doc.name}</h3>
            <p className="text-[11px] text-neutral-textMuted mt-0.5">{doc.number}</p>
            <p className="text-[11px] text-neutral-textMuted">{doc.type}</p>
            <div className="flex items-center gap-1.5 mt-2">
              {doc.status === "Expiring Soon" ? <AlertTriangle className="w-3 h-3 text-warning" /> : <CheckCircle className="w-3 h-3 text-success" />}
              <span className="text-[11px] text-neutral-textMuted">Expires: {doc.expiry}</span>
            </div>
            <div className="flex gap-2 mt-3">
              <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-[11px] font-semibold text-primary bg-primary-light rounded-lg hover:bg-primary/10 transition-colors">
                <Download className="w-3 h-3" /> Download
              </button>
              <button className="flex items-center justify-center gap-1 px-3 py-2 text-[11px] font-semibold text-neutral-textMuted bg-accent-light rounded-lg hover:bg-neutral-border/50 transition-colors">
                <Eye className="w-3 h-3" />
              </button>
              <button className="flex items-center justify-center gap-1 px-3 py-2 text-[11px] font-semibold text-neutral-textMuted bg-accent-light rounded-lg hover:bg-neutral-border/50 transition-colors">
                <Upload className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
