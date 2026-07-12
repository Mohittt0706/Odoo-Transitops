import PageHeader from "../../components/layout/PageHeader"
import { motion } from "framer-motion"
import { cn } from "../../utils/utils"
import { Shield, BookOpen, ClipboardCheck, Car, UserCheck, AlertTriangle } from "lucide-react"

const reports = []

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
