import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import StatCard from "../../components/reports/StatCard";
import ChartCard from "../../components/charts/ChartCard";
import SimpleBarChart from "../../components/charts/BarChart";
import AreaChart from "../../components/charts/AreaChart";
import TrendIndicator from "../../components/reports/TrendIndicator";
import { Fuel, DollarSign, Gauge, TrendingUp, Zap, Route, Loader, TriangleAlert, Inbox } from "lucide-react";
import { reportService } from "../../services/report.service";

export default function FuelAnalytics() {
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
      const res = await reportService.fleet();
      if (isMounted.current) setData(res.data);
    } catch (err) {
      if (isMounted.current) setError(err.response?.data?.message || "Failed to load fuel data");
    } finally {
      if (isMounted.current) setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const fuelData = data?.fuelData || [];
  const fuelConsumption = data?.fuelConsumption || [];
  const monthlyExpenses = data?.monthlyExpenses || [];
  const vehiclePerformance = data?.vehiclePerformance || [];

  const totalFuelCost = fuelData.reduce((s, f) => s + (f.fuelCost || 0), 0);
  const totalConsumption = fuelData.reduce((s, f) => s + (f.consumption || 0), 0);
  const avgEfficiency = fuelData.length
    ? (fuelData.reduce((s, f) => s + (f.efficiency || 0), 0) / fuelData.length).toFixed(1)
    : "0.0";
  const avgMileage = fuelData.length
    ? Math.round(fuelData.reduce((s, f) => s + (f.mileage || 0), 0) / fuelData.length)
    : 0;
  const totalFuelExpense = monthlyExpenses.reduce((s, d) => s + (d.fuel || 0), 0);
  const wasteEstimate = Math.round(totalConsumption * 0.08);

  const sortedByEfficiency = [...fuelData].sort((a, b) => (b.efficiency || 0) - (a.efficiency || 0));

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
        <p className="text-sm font-bold text-neutral-textMuted">No fuel data available</p>
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
        title="Fuel Analytics"
        subtitle="Fuel consumption trends, cost analysis, and efficiency metrics"
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-5">
        <StatCard title="Total Fuel Cost" value={`₹${(totalFuelCost / 1000).toFixed(0)}K`} icon={DollarSign} change="+5.8%" changeType="up" sparklineData={[320, 340, 355, 370, 385, 395, Math.round(totalFuelCost / 1000)]} color="bg-rose-50 text-rose-600" delay={0} />
        <StatCard title="Total Consumption" value={`${(totalConsumption / 1000).toFixed(1)}K L`} icon={Fuel} change="+4.2%" changeType="up" sparklineData={[48, 50, 52, 54, 56, 57, Math.round(totalConsumption / 1000)]} color="bg-amber-50 text-amber-600" delay={0.02} />
        <StatCard title="Avg Fuel Efficiency" value={`${avgEfficiency} km/L`} icon={Gauge} change="+3.5%" changeType="up" sparklineData={[5.2, 5.4, 5.6, 5.8, 6.0, 6.1, parseFloat(avgEfficiency)]} color="bg-emerald-50 text-emerald-600" delay={0.04} />
        <StatCard title="Average Mileage" value={`${avgMileage.toLocaleString()} km`} icon={Route} change="+6.1%" changeType="up" sparklineData={[11, 11.5, 12, 12.5, 13, 13.5, Math.round(avgMileage / 1000)]} color="bg-blue-50 text-blue-600" delay={0.06} />
        <StatCard title="Fuel Expense (YTD)" value={`₹${(totalFuelExpense / 1000).toFixed(0)}K`} icon={TrendingUp} change="+5.2%" changeType="up" sparklineData={[1200, 1250, 1300, 1350, 1400, 1450, Math.round(totalFuelExpense / 1000)]} color="bg-purple-50 text-purple-600" delay={0.08} />
        <StatCard title="Waste Estimate" value={`${wasteEstimate.toLocaleString()} L`} icon={Zap} change="-2.1%" changeType="down" sparklineData={[4200, 4100, 4000, 3950, 3900, 3850, wasteEstimate]} color="bg-orange-50 text-orange-600" delay={0.1} />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">
        <ChartCard title="Fuel Consumption Trend" subtitle="Monthly fuel usage (L)" delay={0.2}
          actions={<TrendIndicator value="+4.2%" type="up" />}
        >
          <AreaChart data={fuelConsumption.map(d => ({ label: d.label, value: Math.round(d.value / 100) }))} color="#D97706" height={160} />
        </ChartCard>

        <ChartCard title="Fuel Cost Trend" subtitle="Monthly fuel expenses" delay={0.25}
          actions={<TrendIndicator value="+5.8%" type="up" />}
        >
          <AreaChart data={monthlyExpenses.map(d => ({ label: d.label, value: Math.round(d.fuel / 1000) }))} color="#DC2626" height={160} />
        </ChartCard>

        <ChartCard title="Fuel Efficiency" subtitle="km/L by vehicle" delay={0.3}
          actions={<TrendIndicator value={`${avgEfficiency} avg`} type="up" />}
        >
          <SimpleBarChart data={sortedByEfficiency.map(f => ({ label: f.vehicle.split(' ')[1], value: Math.round(f.efficiency * 10) }))} color="#059669" height={160} />
        </ChartCard>
      </div>

      {/* Fuel Per Vehicle Table */}
      <ChartCard title="Fuel Per Vehicle" subtitle="Detailed fuel consumption analysis" delay={0.35}
        actions={
          <div className="flex items-center gap-2">
            <TrendIndicator value="Best: DAF XF" type="up" />
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-border">
                <th className="text-left px-3 py-2.5 text-[10px] font-bold uppercase tracking-wider text-neutral-textMuted">Vehicle</th>
                <th className="text-right px-3 py-2.5 text-[10px] font-bold uppercase tracking-wider text-neutral-textMuted">Fuel Cost</th>
                <th className="text-right px-3 py-2.5 text-[10px] font-bold uppercase tracking-wider text-neutral-textMuted">Consumption (L)</th>
                <th className="text-right px-3 py-2.5 text-[10px] font-bold uppercase tracking-wider text-neutral-textMuted">Efficiency</th>
                <th className="text-right px-3 py-2.5 text-[10px] font-bold uppercase tracking-wider text-neutral-textMuted">Mileage (km)</th>
                <th className="text-right px-3 py-2.5 text-[10px] font-bold uppercase tracking-wider text-neutral-textMuted">Cost/km</th>
              </tr>
            </thead>
            <tbody>
              {sortedByEfficiency.map((f, i) => (
                <motion.tr
                  key={f.vehicle}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 + i * 0.03 }}
                  className="border-b border-neutral-border/50 hover:bg-accent-light transition-colors"
                >
                  <td className="px-3 py-3 font-bold text-neutral-textMain">{f.vehicle}</td>
                  <td className="px-3 py-3 text-right font-semibold text-neutral-textMain tabular-nums">₹{f.fuelCost.toLocaleString()}</td>
                  <td className="px-3 py-3 text-right font-semibold text-neutral-textMain tabular-nums">{f.consumption.toLocaleString()}</td>
                  <td className="px-3 py-3 text-right">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      f.efficiency >= 6.5 ? 'bg-success-light text-success' : 
                      f.efficiency >= 5.5 ? 'bg-warning-light text-warning' : 
                      'bg-danger-light text-danger'
                    }`}>
                      {f.efficiency} km/L
                    </span>
                  </td>
                  <td className="px-3 py-3 text-right font-semibold text-neutral-textMain tabular-nums">{f.mileage.toLocaleString()}</td>
                  <td className="px-3 py-3 text-right font-semibold text-neutral-textMain tabular-nums">₹{(f.fuelCost / f.mileage).toFixed(2)}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </motion.div>
  );
}

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
