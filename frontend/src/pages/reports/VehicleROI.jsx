import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import StatCard from "../../components/reports/StatCard";
import ChartCard from "../../components/charts/ChartCard";
import SimpleBarChart from "../../components/charts/BarChart";
import AreaChart from "../../components/charts/AreaChart";
import TrendIndicator from "../../components/reports/TrendIndicator";
import { IndianRupee, TrendingUp, DollarSign, PieChart, Target, Wallet, Loader, TriangleAlert, Inbox } from "lucide-react";
import { reportService } from "../../services/report.service";

export default function VehicleROI() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isMounted = useRef(true);

  useEffect(() => {
    return () => { isMounted.current = false; };
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await reportService.finance();
      if (isMounted.current) setData(res.data);
    } catch (err) {
      if (isMounted.current) setError(err.response?.data?.message || "Failed to load ROI data");
    } finally {
      if (isMounted.current) setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const roiData = data?.roiData || [];
  const monthlyRevenue = data?.monthlyRevenue || [];
  const monthlyExpenses = data?.monthlyExpenses || [];

  const totalPurchaseCost = roiData.reduce((s, v) => s + (v.purchaseCost || 0), 0);
  const totalOperationalCost = roiData.reduce((s, v) => s + (v.totalOperationalCost || 0), 0);
  const totalRevenue = roiData.reduce((s, v) => s + (v.revenue || 0), 0);
  const totalNetProfit = roiData.reduce((s, v) => s + (v.netProfit || 0), 0);
  const avgROI = roiData.length ? Math.round(roiData.reduce((s, v) => s + (v.roi || 0), 0) / roiData.length) : 0;
  const totalLifetimeValue = roiData.reduce((s, v) => s + (v.lifetimeValue || 0), 0);

  const sortedByROI = [...roiData].sort((a, b) => (b.roi || 0) - (a.roi || 0));
  const topROI = sortedByROI.slice(0, 5);
  const lowestROI = sortedByROI.slice(-5).reverse();

  const netProfitMonthly = monthlyRevenue.map((d, i) => ({
    label: d.label,
    value: (d.value || 0) - (monthlyExpenses[i]?.value || 0),
  }));

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="w-14 h-14 rounded-xl bg-danger-light flex items-center justify-center">
          <TriangleAlert className="w-7 h-7 text-danger" />
        </div>
        <p className="text-sm font-bold text-neutral-textMain">{error}</p>
        <button
          onClick={fetchData}
          className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary-dark transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="w-14 h-14 rounded-xl bg-neutral-light flex items-center justify-center">
          <Inbox className="w-7 h-7 text-neutral-textMuted" />
        </div>
        <p className="text-sm font-bold text-neutral-textMuted">No ROI data available</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageHeader
        title="Vehicle ROI"
        subtitle="Return on investment analysis and vehicle profitability tracking"
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-5">
        <StatCard title="Total Purchase Cost" value={`₹${(totalPurchaseCost / 100000).toFixed(1)}L`} icon={Wallet} change="+2 veh" changeType="up" sparklineData={[18, 20, 22, 24, 25, 27, Math.round(totalPurchaseCost / 100000)]} color="bg-primary/10 text-primary" delay={0} />
        <StatCard title="Operational Cost" value={`₹${(totalOperationalCost / 100000).toFixed(1)}L`} icon={DollarSign} change="+4.8%" changeType="up" sparklineData={[145, 150, 155, 160, 162, 165, Math.round(totalOperationalCost / 100000)]} color="bg-amber-50 text-amber-600" delay={0.02} />
        <StatCard title="Total Revenue" value={`₹${(totalRevenue / 100000).toFixed(1)}L`} icon={IndianRupee} change="+12.4%" changeType="up" sparklineData={[185, 195, 205, 215, 225, 235, Math.round(totalRevenue / 100000)]} color="bg-emerald-50 text-emerald-600" delay={0.04} />
        <StatCard title="Net Profit" value={`₹${(totalNetProfit / 100000).toFixed(1)}L`} icon={TrendingUp} change="+18.2%" changeType="up" sparklineData={[35, 40, 45, 50, 55, 60, Math.round(totalNetProfit / 100000)]} color="bg-cyan-50 text-cyan-600" delay={0.06} />
        <StatCard title="Avg ROI" value={`${avgROI}%`} icon={Target} change="+5.3%" changeType="up" sparklineData={[28, 30, 32, 34, 35, 37, avgROI]} color="bg-purple-50 text-purple-600" delay={0.08} />
        <StatCard title="Lifetime Value" value={`₹${(totalLifetimeValue / 10000000).toFixed(1)}Cr`} icon={PieChart} change="+8.5%" changeType="up" sparklineData={[75, 80, 85, 88, 92, 95, Math.round(totalLifetimeValue / 100000)]} color="bg-blue-50 text-blue-600" delay={0.1} />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
        <ChartCard title="ROI Comparison" subtitle="ROI % by vehicle" delay={0.2}
          actions={<TrendIndicator value={`${avgROI}% avg`} type="up" />}
        >
          <SimpleBarChart data={sortedByROI.map(v => ({ label: v.name.split(' ')[1], value: v.roi }))} color="#7C3AED" height={180} />
        </ChartCard>

        <ChartCard title="Vehicle Profitability" subtitle="Net profit by vehicle" delay={0.25}
          actions={<TrendIndicator value="+18.2%" type="up" />}
        >
          <SimpleBarChart data={sortedByROI.map(v => ({ label: v.name.split(' ')[1], value: Math.round(v.netProfit / 1000) }))} color="#059669" height={180} />
        </ChartCard>
      </div>

      {/* Charts Row 2 */}
      <ChartCard title="Lifetime Revenue" subtitle="Monthly net profit trend" delay={0.3}
        actions={<TrendIndicator value="+15.2%" type="up" />}
      >
        <AreaChart data={netProfitMonthly.map(d => ({ label: d.label, value: Math.round(d.value / 1000) }))} color="#059669" height={200} />
      </ChartCard>

      {/* Top / Bottom ROI */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5">
        <ChartCard title="Top ROI Vehicles" subtitle="Highest return on investment" delay={0.35}>
          <div className="space-y-2.5">
            {topROI.map((v, i) => (
              <div key={v.id} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-success-light text-success text-[10px] font-bold flex items-center justify-center">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-sm font-bold text-neutral-textMain truncate">{v.name}</span>
                    <span className="text-xs font-bold text-success">+{v.roi}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-neutral-light rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(v.roi, 100)}%` }}
                      transition={{ delay: 0.4 + i * 0.05, duration: 0.6 }}
                      className="h-full rounded-full bg-success"
                    />
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-neutral-textMain">₹{v.revenue.toLocaleString()}</p>
                  <p className="text-[10px] text-neutral-textMuted">Profit: ₹{v.netProfit.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Lowest ROI Vehicles" subtitle="Needs optimization" delay={0.4}>
          <div className="space-y-2.5">
            {lowestROI.map((v, i) => (
              <div key={v.id} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-danger-light text-danger text-[10px] font-bold flex items-center justify-center">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-sm font-bold text-neutral-textMain truncate">{v.name}</span>
                    <span className="text-xs font-bold text-danger">{v.roi}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-neutral-light rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.max(v.roi, 5)}%` }}
                      transition={{ delay: 0.4 + i * 0.05, duration: 0.6 }}
                      className="h-full rounded-full bg-danger"
                    />
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-neutral-textMain">₹{v.revenue.toLocaleString()}</p>
                  <p className="text-[10px] text-neutral-textMuted">Cost: ₹{v.totalOperationalCost.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>
    </motion.div>
  );
}

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
