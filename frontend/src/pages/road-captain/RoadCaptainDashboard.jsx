import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import ChartCard from "../../components/charts/ChartCard";
import SimpleBarChart from "../../components/charts/BarChart";
import { rcTrips, weeklyDistanceData, fuelTrendData } from "../../data/roadCaptainData";
import { TripStatusBadge, QuickActionButton, MetricCard } from "../../components/road-captain/RoadCaptainComponents";
import { Route, Truck, MapPin, Clock, Fuel, Star, BarChart3, Play, Pause, CheckCircle, AlertTriangle, Receipt, Gauge, Shield, TrendingUp, DollarSign } from "lucide-react";

export default function RoadCaptainDashboard() {
  const activeTrip = null;

  const stats = [
    { label: "Today's Trips", value: "0", icon: Route, color: "primary" },
    { label: "Distance Left", value: "0 km", icon: MapPin, color: "warning" },
    { label: "ETA", value: "N/A", icon: Clock, color: "info" },
    { label: "Fuel Level", value: "0%", icon: Fuel, color: "success" },
    { label: "Vehicle Health", value: "N/A", icon: Gauge, color: "success" },
    { label: "Performance", value: "0%", icon: TrendingUp, color: "primary" },
    { label: "Safety Score", value: "0%", icon: Shield, color: "success" },
    { label: "Weekly Earnings", value: "₹0", icon: DollarSign, color: "purple" },
  ];

  const quickActions = [];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <PageHeader title="Driver Cockpit" subtitle="Your daily operations overview" />

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {stats.map((s, i) => <MetricCard key={s.label} {...s} delay={i * 0.03} />)}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Weekly Distance" subtitle="Kilometers driven this week" delay={0.25}>
          <SimpleBarChart data={weeklyDistanceData} color="#2563EB" />
        </ChartCard>
        <ChartCard title="Fuel Trend" subtitle="Fuel level % this week" delay={0.3}>
          <SimpleBarChart data={fuelTrendData} color="#16A34A" />
        </ChartCard>
      </div>

      <ChartCard title="Quick Actions" delay={0.35}>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {quickActions.map((a) => <QuickActionButton key={a.label} {...a} />)}
        </div>
      </ChartCard>

      {activeTrip && (
        <ChartCard
          title="Current Trip"
          subtitle={`${activeTrip.from} → ${activeTrip.to}`}
          delay={0.4}
          actions={<TripStatusBadge status={activeTrip.status} />}
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
            <div><p className="text-[10px] text-neutral-textMuted uppercase">Trip ID</p><p className="text-sm font-bold mt-0.5">{activeTrip.id}</p></div>
            <div><p className="text-[10px] text-neutral-textMuted uppercase">Vehicle</p><p className="text-sm font-bold mt-0.5">{activeTrip.vehicle}</p></div>
            <div><p className="text-[10px] text-neutral-textMuted uppercase">Cargo</p><p className="text-sm font-bold mt-0.5">{activeTrip.cargo}</p></div>
            <div><p className="text-[10px] text-neutral-textMuted uppercase">Value</p><p className="text-sm font-bold mt-0.5">{activeTrip.value}</p></div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-neutral-textMuted">Trip Progress</span>
              <span className="text-xs font-semibold text-primary">{activeTrip.progress}%</span>
            </div>
            <div className="w-full h-2 bg-neutral-border rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${activeTrip.progress}%` }} transition={{ duration: 1 }} className="h-full bg-primary rounded-full" />
            </div>
          </div>
        </ChartCard>
      )}
    </motion.div>
  );
}
