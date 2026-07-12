import { useState } from "react";
import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import {
  BarChart3, Warehouse, Package, Users, Dock, AlertTriangle,
  Download, FileText, Printer, Send, Eye, Calendar, Clock,
} from "lucide-react";
import ExportAllModal from "./ExportAllModal";

const reportTypes = [
  { title: "Daily Delivery Report", desc: "Summary of all deliveries completed today", icon: Clock, color: "bg-primary/10 text-primary" },
  { title: "Weekly Performance Report", desc: "Weekly KPIs including on-time rates, delays, and volume", icon: BarChart3, color: "bg-emerald-50 text-emerald-600" },
  { title: "Monthly Summary Report", desc: "Comprehensive monthly delivery and warehouse analysis", icon: Calendar, color: "bg-blue-50 text-blue-600" },
  { title: "Warehouse Utilization Report", desc: "Capacity usage, dock efficiency, and storage metrics", icon: Warehouse, color: "bg-purple-50 text-purple-600" },
  { title: "Delivery Performance Report", desc: "On-time rates, delays, and driver performance analysis", icon: BarChart3, color: "bg-cyan-50 text-cyan-600" },
  { title: "Dock Utilization Report", desc: "Dock usage patterns, bottlenecks, and efficiency metrics", icon: Dock, color: "bg-amber-50 text-amber-600" },
  { title: "Delay Analysis Report", desc: "Root cause analysis of delayed deliveries with recommendations", icon: AlertTriangle, color: "bg-red-50 text-red-600" },
  { title: "POD Status Report", desc: "Proof of delivery completion status and pending items", icon: FileText, color: "bg-indigo-50 text-indigo-600" },
  { title: "Receiver Activity Report", desc: "Receiver-wise delivery history and verification status", icon: Users, color: "bg-teal-50 text-teal-600" },
  { title: "Inventory Status Report", desc: "Current stock levels, turnover rates, and reorder alerts", icon: Package, color: "bg-rose-50 text-rose-600" },
];

export default function DestinationReportsPage() {
  const [selectedReport, setSelectedReport] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [showExportAll, setShowExportAll] = useState(false);

  const handleGenerate = (title) => {
    setSelectedReport(title);
    setGenerating(true);
    setTimeout(() => setGenerating(false), 1500);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <PageHeader
        title="Reports"
        subtitle="Generate, preview, download, and schedule destination control reports"
        actions={
          <div className="flex items-center gap-2">
            <button onClick={() => setShowExportAll(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary-dark transition-colors shadow-soft-sm">
              <Download className="w-4 h-4" /> Export All
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neutral-border text-neutral-textMain text-sm font-bold rounded-lg hover:bg-accent-light transition-colors">
              <Printer className="w-4 h-4" /> Print
            </button>
          </div>
        }
      />

      {/* Quick Actions */}
      <div className="flex items-center gap-2 mb-5 flex-wrap">
        {[
          { label: "Generate Report", icon: FileText, color: "bg-primary/10 text-primary hover:bg-primary/20" },
          { label: "Preview", icon: Eye, color: "bg-blue-50 text-blue-600 hover:bg-blue-100" },
          { label: "Download PDF", icon: Download, color: "bg-red-50 text-red-600 hover:bg-red-100" },
          { label: "Export Excel", icon: FileText, color: "bg-emerald-50 text-emerald-600 hover:bg-emerald-100" },
          { label: "Print", icon: Printer, color: "bg-accent-light text-neutral-textMuted hover:bg-accent" },
          { label: "Email Report", icon: Send, color: "bg-purple-50 text-purple-600 hover:bg-purple-100" },
          { label: "Schedule Export", icon: Calendar, color: "bg-cyan-50 text-cyan-600 hover:bg-cyan-100" },
        ].map((action, i) => (
          <motion.button key={action.label} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.02 }}
            className={`inline-flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-lg border border-transparent transition-all ${action.color}`}>
            <action.icon className="w-3.5 h-3.5" strokeWidth={2} />
            {action.label}
          </motion.button>
        ))}
      </div>

      {/* Report Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
        {reportTypes.map((report, i) => (
          <motion.div key={report.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.3 }}
            className={`bg-white border rounded-xl p-5 shadow-soft-sm hover:shadow-soft-md transition-all duration-300 ${
              selectedReport === report.title ? 'border-primary ring-2 ring-primary/10' : 'border-neutral-border'
            }`}>
            <div className="flex items-start gap-3 mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${report.color}`}>
                <report.icon className="w-5 h-5" strokeWidth={1.8} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold font-headings text-neutral-textMain">{report.title}</h3>
                <p className="text-xs text-neutral-textMuted mt-1 leading-relaxed">{report.desc}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-neutral-border">
              <button onClick={() => handleGenerate(report.title)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold text-primary bg-primary-light rounded-lg hover:bg-primary/10 transition-colors">
                {generating && selectedReport === report.title ? (
                  <>Generating...</>
                ) : (
                  <><Download className="w-3.5 h-3.5" /> Generate</>
                )}
              </button>
              <button className="px-3 py-2 text-xs font-bold text-neutral-textMuted bg-accent-light rounded-lg hover:bg-accent transition-colors">
                <Eye className="w-3.5 h-3.5" />
              </button>
              <button className="px-3 py-2 text-xs font-bold text-neutral-textMuted bg-accent-light rounded-lg hover:bg-accent transition-colors">
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Generation Status */}
      {generating && selectedReport && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
            <div>
              <p className="text-sm font-bold text-emerald-700">Generating {selectedReport}...</p>
              <p className="text-xs text-emerald-600">Your report will be ready in a moment</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Scheduled Reports */}
      <div className="bg-white border border-neutral-border rounded-xl p-5 shadow-soft-sm">
        <h3 className="text-sm font-bold text-neutral-textMain mb-4">Scheduled Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "Daily Operations Report", schedule: "Every day at 08:00 PM", format: "PDF", recipients: "ops@transitops.com" },
            { title: "Weekly Warehouse Summary", schedule: "Every Monday at 09:00 AM", format: "Excel", recipients: "warehouse@transitops.com" },
            { title: "Monthly Executive Report", schedule: "1st of every month", format: "PDF", recipients: "exec@transitops.com" },
          ].map((sched, i) => (
            <motion.div key={sched.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              className="p-4 rounded-xl border border-neutral-border hover:shadow-soft-sm transition-all">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-primary" />
                <p className="text-sm font-bold text-neutral-textMain">{sched.title}</p>
              </div>
              <div className="space-y-1 text-xs text-neutral-textMuted">
                <p><Clock className="w-3 h-3 inline mr-1" />{sched.schedule}</p>
                <p><FileText className="w-3 h-3 inline mr-1" />Format: {sched.format}</p>
                <p><Send className="w-3 h-3 inline mr-1" />{sched.recipients}</p>
              </div>
              <div className="flex items-center gap-2 mt-3 pt-2 border-t border-neutral-border">
                <button className="text-xs font-bold text-primary hover:underline">Edit</button>
                <button className="text-xs font-bold text-danger hover:underline">Remove</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ExportAllModal open={showExportAll} onClose={() => setShowExportAll(false)} />
    </motion.div>
  );
}
