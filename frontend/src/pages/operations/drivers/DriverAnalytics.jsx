import { motion } from "framer-motion";
import PageHeader from "../../../components/layout/PageHeader";
import ChartCard from "../../../components/charts/ChartCard";
import SimpleBarChart from "../../../components/charts/BarChart";
import DonutChart from "../../../components/charts/PieChart";
import { DriverStatsCard } from "../../../components/drivers/DriverComponents";
import { drivers } from "../../../data/driverData";
import { TrendingUp, BarChart3, PieChart, Activity, Clock, Gauge, Droplets, AlertTriangle } from "lucide-react";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const monthlyDistance = months.map(m => ({ label: m, value: 1200 + Math.floor(Math.random() * 800) }));
const drivingHours = months.map(m => ({ label: m, value: 80 + Math.floor(Math.random() * 60) }));
const fuelEfficiency = months.map(m => ({ label: m, value: 4.2 + Math.random() * 1.5 }));

const safetyDistribution = [
  { label: "High (90+)", value: drivers.filter(d => d.safetyScore >= 90).length, color: "#22C55E" },
  { label: "Medium (75-89)", value: drivers.filter(d => d.safetyScore >= 75 && d.safetyScore < 90).length, color: "#F59E0B" },
  { label: "Low (<75)", value: drivers.filter(d => d.safetyScore < 75).length, color: "#EF4444" },
];

const tripCompletion = [
  { label: "Completed", value: drivers.reduce((s, d) => s + d.completed, 0), color: "#22C55E" },
  { label: "Cancelled", value: drivers.reduce((s, d) => s + d.cancelled, 0), color: "#EF4444" },
  { label: "In Progress", value: drivers.filter(d => d.currentTrip?.status === "In Transit").length, color: "#3B82F6" },
];

const avgScore = Math.round(drivers.reduce((s, d) => s + d.safetyScore, 0) / drivers.length);
const totalTrips = drivers.reduce((s, d) => s + d.trips, 0);
const incidentRate = ((drivers.filter(d => d.safetyScore < 75).length / drivers.length) * 100).toFixed(1);

export default function DriverAnalytics() {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <PageHeader title="Driver Analytics" subtitle="Performance metrics and insights" />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        <DriverStatsCard icon={TrendingUp} label="Total Trips" value={totalTrips} sub="All drivers" color="primary" />
        <DriverStatsCard icon={BarChart3} label="Avg Safety Score" value={`${avgScore}%`} sub="Fleet average" color={avgScore >= 90 ? "success" : "warning"} />
        <DriverStatsCard icon={PieChart} label="Trip Completion" value={`${Math.round((tripCompletion[0].value / (tripCompletion[0].value + tripCompletion[1].value)) * 100)}%`} sub="Completion rate" color="success" />
        <DriverStatsCard icon={Clock} label="Driving Hours" value="1,892" sub="This month" color="primary" />
        <DriverStatsCard icon={Droplets} label="Fuel Efficiency" value="4.8 km/L" sub="Fleet avg" color="warning" />
        <DriverStatsCard icon={AlertTriangle} label="Incident Rate" value={`${incidentRate}%`} sub="Low performers" color="danger" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCard title="Monthly Distance" subtitle="Kilometers covered per month">
          <SimpleBarChart data={monthlyDistance} height={180} color="#2563EB" />
        </ChartCard>
        <ChartCard title="Driving Hours" subtitle="Hours logged per month">
          <SimpleBarChart data={drivingHours} height={180} color="#22C55E" />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCard title="Fuel Efficiency" subtitle="km/L per month">
          <SimpleBarChart data={fuelEfficiency.map(d => ({ ...d, value: Math.round(d.value * 10) }))} height={180} color="#F59E0B" />
        </ChartCard>
        <ChartCard title="Safety Score Distribution" subtitle="Driver safety levels">
          <DonutChart data={safetyDistribution} size={130} thickness={16} />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <ChartCard title="Trip Completion" subtitle="Overall trip status breakdown">
          <DonutChart data={tripCompletion} size={130} thickness={16} />
        </ChartCard>
      </div>
    </motion.div>
  );
}
