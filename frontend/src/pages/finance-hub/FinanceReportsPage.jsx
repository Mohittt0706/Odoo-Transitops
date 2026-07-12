import PageHeader from "../../components/layout/PageHeader";
import { motion } from "framer-motion";
import { FileText, Download } from "lucide-react";

const reports = [
  {
    title: "Profit & Loss Statement",
    description: "Complete P&L summary with revenue, costs, and net profit for the reporting period.",
    period: "Apr 2026 - Jun 2026",
  },
  {
    title: "Balance Sheet",
    description: "Assets, liabilities, and equity position of TransitOps as of the reporting date.",
    period: "Q1 FY 2026-27",
  },
  {
    title: "Cash Flow Report",
    description: "Operating, investing, and financing cash flows with net change analysis.",
    period: "Apr 2026 - Jun 2026",
  },
  {
    title: "Tax Summary",
    description: "GST collected, GST input credits, TDS deductions, and net tax liability.",
    period: "Q1 FY 2026-27",
  },
  {
    title: "Vendor Payments",
    description: "Detailed breakdown of all vendor payments, outstanding dues, and payment schedules.",
    period: "Jul 2026",
  },
  {
    title: "Budget vs Actual",
    description: "Comparison of planned budget against actual expenditure with variance analysis.",
    period: "Apr 2026 - Jun 2026",
  },
];

export default function FinanceReportsPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <PageHeader title="Reports" subtitle="Generate and download financial reports" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900">{report.title}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{report.period}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">{report.description}</p>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium w-full justify-center">
              <Download className="w-4 h-4" /> Generate Report
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
