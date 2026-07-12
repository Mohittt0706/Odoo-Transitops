import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import ChartCard from "../../components/charts/ChartCard";
import DonutChart from "../../components/charts/PieChart";
import SimpleBarChart from "../../components/charts/BarChart";
import AreaChart from "../../components/charts/AreaChart";
import { StatCard } from "../../components/finance-hub/FinanceHubComponents";
import { monthlyRevenue, monthlyExpenses, expenseDist } from "../../data/financeData";
import { TrendingUp, IndianRupee, Fuel, Truck, BarChart3, Download, CheckCircle, TrendingDown, DollarSign, Receipt, Wallet, Shield } from "lucide-react";

const roiData = [
  { label: "Volvo FH16", value: 32 }, { label: "Scania R450", value: 28 },
  { label: "Tata Prima", value: 26 }, { label: "BharatBenz", value: 24 },
  { label: "M Blazo", value: 22 }, { label: "Isuzu FVR", value: 8 },
];

const recentTxns = [
  { desc: "Diesel — KL07AU4521", amount: "₹4,200", type: "debit", date: "Today, 9:15 AM" },
  { desc: "Trip Invoice #TRP-0084", amount: "₹28,500", type: "credit", date: "Today, 8:00 AM" },
  { desc: "Tyre Replacement", amount: "₹6,800", type: "debit", date: "Yesterday" },
  { desc: "Trip Invoice #TRP-0083", amount: "₹21,200", type: "credit", date: "Yesterday" },
  { desc: "Insurance Premium", amount: "₹12,400", type: "debit", date: "Jul 10" },
];

export default function FinanceDashboard() {
  const stats = [
    { label: "Total Revenue", value: "₹42,85,000", icon: TrendingUp, color: "success", trend: 12 },
    { label: "Total Expenses", value: "₹28,92,500", icon: IndianRupee, color: "danger", trend: -5 },
    { label: "Net Profit", value: "₹13,92,500", icon: DollarSign, color: "primary", trend: 18 },
    { label: "Fuel Cost", value: "₹8,45,200", icon: Fuel, color: "warning", trend: 3 },
    { label: "Maintenance Cost", value: "₹4,25,800", icon: Truck, color: "purple", trend: -2 },
    { label: "Insurance Cost", value: "₹2,40,000", icon: Shield, color: "cyan", trend: 0 },
    { label: "Profit Margin", value: "32.5%", icon: BarChart3, color: "success", trend: 8 },
    { label: "Outstanding Invoices", value: "₹8,50,000", icon: Receipt, color: "danger", trend: 15 },
    { label: "Paid Invoices", value: "₹34,35,000", icon: CheckCircle, color: "success", trend: 22 },
    { label: "Monthly Spending", value: "₹4,82,000", icon: Wallet, color: "warning", trend: -3 },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <PageHeader title="Finance Dashboard" subtitle="Financial overview and KPIs"
        actions={<button className="btn btn-primary text-xs flex items-center gap-1.5"><Download className="w-3.5 h-3.5" /> Export Report</button>}
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {stats.map((s, i) => <StatCard key={s.label} {...s} delay={i * 0.025} />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Revenue vs Expenses" subtitle="Monthly comparison" delay={0.3}>
          <div className="flex items-end gap-2 h-40">
            {monthlyRevenue.slice(0, 7).map((m, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex gap-0.5">
                  <div className="flex-1 rounded-t-sm" style={{ height: `${(monthlyRevenue[i].value / Math.max(...monthlyRevenue.map(r => r.value)) * 120)}px`, backgroundColor: "#2563EB", opacity: 0.8 }} />
                  <div className="flex-1 rounded-t-sm" style={{ height: `${(monthlyExpenses[i].value / Math.max(...monthlyRevenue.map(r => r.value)) * 120)}px`, backgroundColor: "#EF4444", opacity: 0.8 }} />
                </div>
                <span className="text-[9px] text-neutral-textMuted font-medium">{m.label}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-3 text-[11px]">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-blue-500" /> Revenue</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-sm bg-red-500" /> Expenses</span>
          </div>
        </ChartCard>
        <ChartCard title="Revenue Growth" subtitle="Monthly trend" delay={0.35}>
          <AreaChart data={monthlyRevenue} color="blue" />
        </ChartCard>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard title="Expense Breakdown" subtitle="By category" delay={0.4}>
          <DonutChart data={expenseDist} size={130} thickness={16} />
        </ChartCard>
        <ChartCard title="Vehicle ROI" subtitle="Top vehicles by ROI %" delay={0.45}>
          <SimpleBarChart data={roiData} height={140} color="#7C3AED" />
        </ChartCard>
        <ChartCard title="Recent Transactions" delay={0.5}>
          <div className="space-y-0">
            {recentTxns.map((t, i) => (
              <div key={i} className="flex items-center justify-between py-2.5 border-b border-neutral-border/50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-neutral-textMain">{t.desc}</p>
                  <p className="text-[11px] text-neutral-textMuted">{t.date}</p>
                </div>
                <span className={`text-sm font-bold ${t.type === "credit" ? "text-success" : "text-danger"}`}>{t.amount}</span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>
    </motion.div>
  );
}
