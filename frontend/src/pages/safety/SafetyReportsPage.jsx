import PageHeader from "../../components/ui/PageHeader"
import { motion } from "framer-motion"
import { cn } from "../../lib/utils"
import { Shield, BookOpen, ClipboardCheck, Car, UserCheck, AlertTriangle } from "lucide-react"

const reports = [
  {
    title: "Incident Summary",
    description: "Complete overview of all safety incidents with severity analysis and resolution status",
    lastGenerated: "2026-07-10",
    icon: AlertTriangle,
    color: "text-red-600",
    bg: "bg-red-50",
  },
  {
    title: "Compliance Report",
    description: "Detailed compliance status for all drivers including insurance, fitness and pollution certificates",
    lastGenerated: "2026-07-09",
    icon: Shield,
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    title: "Training Completion",
    description: "Driver training progress and course completion statistics",
    lastGenerated: "2026-07-08",
    icon: BookOpen,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    title: "Inspection Audit",
    description: "Vehicle inspection history and audit trail for all fleet vehicles",
    lastGenerated: "2026-07-07",
    icon: ClipboardCheck,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    title: "Driver Safety Rating",
    description: "Individual driver safety scores and ranking across the fleet",
    lastGenerated: "2026-07-06",
    icon: UserCheck,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    title: "License Status Report",
    description: "License validity tracking with expiry alerts and renewal requirements",
    lastGenerated: "2026-07-05",
    icon: Car,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
]

export default function SafetyReportsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <PageHeader title="Reports" subtitle="Generate and download safety reports" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <motion.div
            key={report.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-200"
          >
            <div className="flex items-start gap-4">
              <div className={cn("p-3 rounded-lg", report.bg)}>
                <report.icon className={cn("w-6 h-6", report.color)} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{report.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{report.description}</p>
                <p className="text-xs text-gray-400 mt-2">
                  Last generated: {report.lastGenerated}
                </p>
              </div>
            </div>
            <button className="mt-4 w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm">
              Generate Report
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
