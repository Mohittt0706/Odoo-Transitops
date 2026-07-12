import { motion } from "framer-motion";
import PageHeader from "../../components/ui/PageHeader";
import StatusBadge from "../../components/ui/StatusBadge";
import {
  FileText,
  Download,
  Upload,
  CheckCircle,
  AlertTriangle,
  Shield,
  Car,
  BookOpen,
  Map,
} from "lucide-react";

const documents = [
  {
    id: 1,
    name: "Driving License",
    number: "MH-2018-2244",
    type: "Heavy Vehicle",
    expiry: "2026-09-10",
    status: "Expiring Soon",
    icon: FileText,
    color: "bg-primary/10 text-primary",
  },
  {
    id: 2,
    name: "Vehicle Insurance",
    number: "INS-MH-2026-4455",
    type: "Comprehensive",
    expiry: "2027-03-12",
    status: "Valid",
    icon: Shield,
    color: "bg-success-light text-success",
  },
  {
    id: 3,
    name: "Fitness Certificate",
    number: "FC-MH-2026-1122",
    type: "Annual Fitness",
    expiry: "2027-01-15",
    status: "Valid",
    icon: CheckCircle,
    color: "bg-success-light text-success",
  },
  {
    id: 4,
    name: "PUC Certificate",
    number: "PUC-MH-2026-3344",
    type: "Pollution Under Control",
    expiry: "2026-12-20",
    status: "Valid",
    icon: Car,
    color: "bg-success-light text-success",
  },
  {
    id: 5,
    name: "RC Book",
    number: "RC-MH-12-RT-2244",
    type: "Registration",
    expiry: "2028-01-20",
    status: "Valid",
    icon: BookOpen,
    color: "bg-success-light text-success",
  },
  {
    id: 6,
    name: "Route Permit",
    number: "RP-MH-PUNE-2026",
    type: "Interstate Permit",
    expiry: "2026-12-31",
    status: "Valid",
    icon: Map,
    color: "bg-success-light text-success",
  },
];

export default function DocumentsPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader
        title="Documents"
        subtitle="Manage your driving and vehicle documents"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((doc, i) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.35 }}
            className="bg-white border border-neutral-border rounded-xl p-5 shadow-soft-sm hover:shadow-soft-md transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${doc.color}`}>
                <doc.icon className="w-6 h-6" strokeWidth={1.8} />
              </div>
              <StatusBadge
                status={doc.status}
                variant={doc.status === "Valid" ? "success" : "warning"}
              />
            </div>
            <h3 className="text-base font-bold font-headings text-neutral-textMain">
              {doc.name}
            </h3>
            <p className="text-xs text-neutral-textMuted mt-1">{doc.number}</p>
            <p className="text-xs text-neutral-textMuted mt-0.5">{doc.type}</p>
            <div className="flex items-center gap-1.5 mt-3">
              {doc.status === "Expiring Soon" ? (
                <AlertTriangle className="w-3.5 h-3.5 text-warning" />
              ) : (
                <CheckCircle className="w-3.5 h-3.5 text-success" />
              )}
              <span className="text-xs text-neutral-textMuted">
                Expires: {doc.expiry}
              </span>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-primary bg-primary-light rounded-lg hover:bg-primary/10 transition-colors">
                <Download className="w-3.5 h-3.5" />
                Download
              </button>
              <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-neutral-textMuted bg-accent-light rounded-lg hover:bg-neutral-border/50 transition-colors">
                <Upload className="w-3.5 h-3.5" />
                Upload
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
