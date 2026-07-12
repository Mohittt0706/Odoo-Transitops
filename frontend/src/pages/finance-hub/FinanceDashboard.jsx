import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import ChartCard from "../../components/charts/ChartCard";
import DonutChart from "../../components/charts/PieChart";
import SimpleBarChart from "../../components/charts/BarChart";
import AreaChart from "../../components/charts/AreaChart";
import { StatCard } from "../../components/finance-hub/FinanceHubComponents";
import { dashboardService } from "../../services/dashboard.service";
import { TrendingUp, IndianRupee, Fuel, Truck, BarChart3, Download, CheckCircle, TrendingDown, DollarSign, Receipt, Wallet, Shield, Loader2, Inbox, AlertTriangle } from "lucide-react";

const roiData = [];

const recentTxns = [];

export default function FinanceDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetchData = () => {
    setLoading(true);
    setError(null);
    dashboardService.getDashboard()
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load finance data");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-danger mx-auto mb-3" />
          <p className="text-sm text-neutral-textMuted">{error}</p>
          <button onClick={fetchData} className="btn btn-primary mt-4">Retry</button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Inbox className="w-12 h-12 text-neutral-textMuted mx-auto mb-3" />
          <p className="text-sm text-neutral-textMuted">No data available</p>
        </div>
      </div>
    );
  }

  const monthlyRevenue = data.monthlyRevenue || [];
  const monthlyExpenses = data.monthlyExpenses || [];
  const expenseDist = data.expenseDist || [];

  const stats = [];

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
