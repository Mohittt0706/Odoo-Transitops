import { motion } from "framer-motion";
import PageHeader from "../../components/ui/PageHeader";
import {
  BarChart3,
  Warehouse,
  Package,
  Users,
  Dock,
  AlertTriangle,
  Download,
  FileText,
} from "lucide-react";

const reports = [
  {
    title: "Delivery Performance",
    description: "On-time rates, delays, and delivery efficiency metrics across all routes.",
    lastGenerated: "2026-07-11",
    icon: BarChart3,
    color: "bg-primary/10 text-primary",
  },
  {
    title: "Warehouse Utilization",
    description: "Space usage, capacity trends, and facility performance analysis.",
    lastGenerated: "2026-07-10",
    icon: Warehouse,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Inventory Status",
    description: "Stock levels, turnover rates, and reorder alerts across all locations.",
    lastGenerated: "2026-07-12",
    icon: Package,
    color: "bg-purple-50 text-purple-600",
  },
  {
    title: "Client Summary",
    description: "Receiver performance, delivery satisfaction, and pending obligations.",
    lastGenerated: "2026-07-09",
    icon: Users,
    color: "bg-amber-50 text-amber-600",
  },
  {
    title: "Dock Efficiency",
    description: "Dock utilization, turnaround times, and bottleneck analysis.",
    lastGenerated: "2026-07-08",
    icon: Dock,
    color: "bg-rose-50 text-rose-600",
  },
  {
    title: "Late Deliveries",
    description: "Root cause analysis of delayed shipments and recommended actions.",
    lastGenerated: "2026-07-07",
    icon: AlertTriangle,
    color: "bg-cyan-50 text-cyan-600",
  },
];

export default function DestinationReportsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageHeader
        title="Reports"
        subtitle="Generate and download destination control reports"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((report, i) => (
          <motion.div
            key={report.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.3 }}
            className="bg-white border border-neutral-border rounded-xl p-5 shadow-soft-sm hover:shadow-soft-md transition-all duration-300"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${report.color}`}>
                <report.icon className="w-5 h-5" strokeWidth={1.8} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold font-headings text-neutral-textMain">{report.title}</h3>
                <p className="text-xs text-neutral-textMuted mt-1 leading-relaxed">{report.description}</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-neutral-border">
              <div className="flex items-center gap-1.5 text-xs text-neutral-textMuted">
                <FileText className="w-3.5 h-3.5" />
                Last: {report.lastGenerated}
              </div>
              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-primary bg-primary-light rounded-lg hover:bg-primary/10 transition-colors">
                <Download className="w-3.5 h-3.5" /> Generate
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
