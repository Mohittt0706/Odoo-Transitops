import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import KPICard from "../../components/dashboard/KPICard";
import ChartCard from "../../components/charts/ChartCard";
import DonutChart from "../../components/charts/PieChart";
import SimpleBarChart from "../../components/charts/BarChart";
import AreaChart from "../../components/charts/AreaChart";
import { TrendingUp, IndianRupee, Fuel, Truck, BarChart3, Download, CheckCircle, FileText, TrendingDown } from "lucide-react";

const expenseBreakdown = [
  { label: "Fuel",        value: 35, color: "#1E3A5F" },
  { label: "Maintenance", value: 25, color: "#0369A1" },
  { label: "Insurance",   value: 18, color: "#059669" },
  { label: "Salaries",    value: 15, color: "#D97706" },
  { label: "Other",       value:  7, color: "#94A3B8" },
];

const revenueGrowth = [
  { label: "Jan", value: 98 },
  { label: "Feb", value: 105 },
  { label: "Mar", value: 112 },
  { label: "Apr", value: 108 },
  { label: "May", value: 120 },
  { label: "Jun", value: 124 },
];

const roiData = [
  { label: "Volvo FH16",     value: 32 },
  { label: "Scania R450",    value: 28 },
  { label: "Tata Prima",     value: 26 },
  { label: "BharatBenz",     value: 24 },
  { label: "M Blazo",        value: 22 },
  { label: "Isuzu FVR",      value:  8 },
];

const recentTransactions = [
  { desc: "Diesel — KL07AU4521",    amount: "₹4,200", type: "debit",  date: "Today, 9:15 AM" },
  { desc: "Trip Invoice #TRP-0084", amount: "₹28,500", type: "credit", date: "Today, 8:00 AM" },
  { desc: "Tyre Replacement",       amount: "₹6,800", type: "debit",  date: "Yesterday" },
  { desc: "Trip Invoice #TRP-0083", amount: "₹21,200", type: "credit", date: "Yesterday" },
  { desc: "Insurance Premium",      amount: "₹12,400", type: "debit", date: "Jul 10" },
];

export default function FinanceDashboard() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <PageHeader
        title="Finance Command"
        subtitle="Financial overview and profitability metrics"
        badge="Q2 2026"
        actions={
          <>
            <button className="btn btn-secondary text-[12px] py-1.5 px-3 gap-1.5">
              <Download className="w-3.5 h-3.5" /> Export CSV
            </button>
            <button className="btn btn-primary text-[12px] py-1.5 px-3 gap-1.5">
              <FileText className="w-3.5 h-3.5" /> Generate Report
            </button>
          </>
        }
      />

      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-5">
        <KPICard title="Total Revenue"  value="₹72.4L" change="12%" changeType="up"      icon={IndianRupee} color="bg-primary/10 text-primary"       delay={0}    />
        <KPICard title="Net Profit"     value="₹18.6L" change="8%"  changeType="up"      icon={TrendingUp}  color="bg-success/10 text-success"         delay={0.05} />
        <KPICard title="Total Expenses" value="₹53.8L" change="5%"  changeType="down"    icon={BarChart3}   color="bg-danger/10 text-danger"           delay={0.1}  />
        <KPICard title="Fuel Cost"      value="₹12.4L" change="3%"  changeType="down"    icon={Fuel}        color="bg-warning/10 text-warning"         delay={0.15} />
        <KPICard title="Vehicle ROI"    value="24.8%"  change="2%"  changeType="up"      icon={Truck}       color="bg-purple-100 text-purple-600"      delay={0.2}  />
        <KPICard title="Monthly Spend"  value="₹8.9L"  change="0%"  changeType="neutral" icon={TrendingDown} color="bg-neutral-muted text-neutral-textMuted" delay={0.25} />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-5">
        <ChartCard title="Expense Breakdown" subtitle="By category this quarter" delay={0.3}>
          <DonutChart data={expenseBreakdown} />
        </ChartCard>
        <ChartCard title="Revenue Growth" subtitle="Monthly revenue in ₹L" delay={0.35}>
          <AreaChart data={revenueGrowth} color="#1E3A5F" />
        </ChartCard>
        <ChartCard title="Vehicle ROI" subtitle="Return % by fleet unit" delay={0.4}>
          <SimpleBarChart data={roiData} color="#7C3AED" />
        </ChartCard>
      </div>

      {/* Recent Transactions */}
      <ChartCard
        title="Recent Transactions"
        subtitle="Latest financial activity"
        delay={0.45}
        actions={
          <button className="text-[11px] text-primary font-semibold hover:underline">View All</button>
        }
      >
        <div className="divide-y divide-neutral-border/50 -mx-4 -mb-4">
          {recentTransactions.map((tx, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.05 }}
              className="flex items-center justify-between px-4 py-2.5 hover:bg-neutral-light/60 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${tx.type === "credit" ? "bg-success-light" : "bg-danger-light"}`}>
                  {tx.type === "credit"
                    ? <TrendingUp className="w-3.5 h-3.5 text-success" />
                    : <TrendingDown className="w-3.5 h-3.5 text-danger" />}
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-neutral-textMain leading-tight">{tx.desc}</p>
                  <p className="text-[10px] text-neutral-textMuted">{tx.date}</p>
                </div>
              </div>
              <span className={`text-[13px] font-bold tabular-nums ${tx.type === "credit" ? "text-success" : "text-danger"}`}>
                {tx.type === "credit" ? "+" : "-"}{tx.amount}
              </span>
            </motion.div>
          ))}
        </div>
      </ChartCard>
    </motion.div>
  );
}
