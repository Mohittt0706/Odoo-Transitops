import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import { StatCard } from "../../components/finance-hub/FinanceHubComponents";
import { FileText, Download, BarChart3, TrendingUp, Clock, Filter, Search } from "lucide-react";

const reports = [];

export default function FinanceReportsPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <PageHeader title="Reports" subtitle="Generate and download financial reports" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatCard label="Total Reports" value="0" icon={FileText} color="primary" />
        <StatCard label="Available" value="0" icon={BarChart3} color="success" />
        <StatCard label="Q1 Reports" value="0" icon={TrendingUp} color="warning" />
        <StatCard label="Monthly Reports" value="0" icon={Clock} color="purple" />
        <StatCard label="Annual Reports" value="0" icon={FileText} color="cyan" />
        <StatCard label="Custom Reports" value="0" icon={Filter} color="danger" />
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
