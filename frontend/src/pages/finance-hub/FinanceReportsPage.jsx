import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import { StatCard } from "../../components/finance-hub/FinanceHubComponents";
import { FileText, Download, BarChart3, TrendingUp, Clock, Filter, Search } from "lucide-react";

const reports = [
  { title: "Profit & Loss Statement", desc: "Complete P&L summary with revenue, costs, and net profit for Q1 FY 2026-27.", period: "Apr 2026 - Jun 2026", icon: BarChart3, color: "#2563EB" },
  { title: "Balance Sheet", desc: "Assets, liabilities, and equity position of TransitOps as of the reporting date.", period: "Q1 FY 2026-27", icon: FileText, color: "#7C3AED" },
  { title: "Cash Flow Report", desc: "Operating, investing, and financing cash flows with net change analysis.", period: "Apr 2026 - Jun 2026", icon: TrendingUp, color: "#22C55E" },
  { title: "Tax Summary", desc: "GST collected, GST input credits, TDS deductions, and net tax liability.", period: "Q1 FY 2026-27", icon: FileText, color: "#F59E0B" },
  { title: "Vendor Payments", desc: "Detailed breakdown of all vendor payments, outstanding dues, and payment schedules.", period: "Jul 2026", icon: Clock, color: "#EF4444" },
  { title: "Budget vs Actual", desc: "Comparison of planned budget against actual expenditure with variance analysis.", period: "Apr 2026 - Jun 2026", icon: BarChart3, color: "#14B8A6" },
  { title: "Fuel Expense Report", desc: "Comprehensive fuel consumption, cost per km, and efficiency analysis by vehicle.", period: "Jul 2026", icon: FileText, color: "#F97316" },
  { title: "Maintenance Report", desc: "Vehicle-wise maintenance history, costs, and scheduled service forecast.", period: "Jul 2026", icon: FileText, color: "#6366F1" },
  { title: "Revenue Analysis", desc: "Revenue breakdown by client, vehicle, and service type with growth trends.", period: "Q1 FY 2026-27", icon: TrendingUp, color: "#84CC16" },
  { title: "Invoice Aging Report", desc: "Invoice aging analysis with overdue categorization and recovery status.", period: "Jul 2026", icon: Clock, color: "#EC4899" },
  { title: "Cost Optimization", desc: "Cost-saving opportunities identified through operational efficiency analysis.", period: "Q1 FY 2026-27", icon: Filter, color: "#06B6D4" },
  { title: "Compliance Report", desc: "Regulatory compliance status including permits, insurance, and tax filings.", period: "H1 FY 2026-27", icon: Search, color: "#A1A1AA" },
];

export default function FinanceReportsPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <PageHeader title="Reports" subtitle="Generate and download financial reports" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatCard label="Total Reports" value="12" icon={FileText} color="primary" />
        <StatCard label="Available" value="12" icon={BarChart3} color="success" />
        <StatCard label="Q1 Reports" value="5" icon={TrendingUp} color="warning" />
        <StatCard label="Monthly Reports" value="4" icon={Clock} color="purple" />
        <StatCard label="Annual Reports" value="3" icon={FileText} color="cyan" />
        <StatCard label="Custom Reports" value="2" icon={Filter} color="danger" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {reports.map((r, i) => (
          <motion.div key={r.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="bg-white dark:bg-neutral-black border border-neutral-border rounded-xl p-5 hover:shadow-md hover:border-primary transition-all duration-200"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${r.color}15` }}>
                <r.icon className="w-5 h-5" style={{ color: r.color }} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-neutral-textMain">{r.title}</h3>
                <p className="text-[10px] text-neutral-textMuted mt-px">{r.period}</p>
              </div>
            </div>
            <p className="text-xs text-neutral-textMuted leading-relaxed mb-4 line-clamp-2">{r.desc}</p>
            <button className="w-full flex items-center justify-center gap-1.5 px-3 py-2 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary-dark transition-colors">
              <Download className="w-3.5 h-3.5" /> Generate Report
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
