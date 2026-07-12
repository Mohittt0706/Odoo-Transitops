import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import ChartCard from "../../components/charts/ChartCard";
import SimpleBarChart from "../../components/charts/BarChart";
import { TrendingUp, Route, IndianRupee, Users } from "lucide-react";

const fleetUtilizationTrend = [
  { label: "Jan", value: 62 },
  { label: "Feb", value: 65 },
  { label: "Mar", value: 68 },
  { label: "Apr", value: 72 },
  { label: "May", value: 70 },
  { label: "Jun", value: 75 },
  { label: "Jul", value: 78 },
];

const tripCompletionRate = [
  { label: "Jan", value: 88 },
  { label: "Feb", value: 91 },
  { label: "Mar", value: 85 },
  { label: "Apr", value: 93 },
  { label: "May", value: 90 },
  { label: "Jun", value: 95 },
  { label: "Jul", value: 92 },
];

const revenueGrowth = [
  { label: "Jan", value: 8 },
  { label: "Feb", value: 9 },
  { label: "Mar", value: 10 },
  { label: "Apr", value: 11 },
  { label: "May", value: 10.5 },
  { label: "Jun", value: 11.8 },
  { label: "Jul", value: 12.4 },
];

const driverPerformance = [
  { label: "Rajesh", value: 98 },
  { label: "Suresh", value: 95 },
  { label: "Vikram", value: 99 },
  { label: "Anil", value: 88 },
  { label: "Deepak", value: 94 },
  { label: "Jose", value: 96 },
];

export default function AnalyticsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageHeader
        title="Analytics"
        subtitle="Fleet performance insights and trends"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <ChartCard
          title="Fleet Utilization Trend"
          subtitle="Monthly utilization percentage"
          delay={0.1}
          actions={
            <div className="flex items-center gap-1 text-xs text-success font-semibold">
              <TrendingUp className="w-3.5 h-3.5" /> +16% YoY
            </div>
          }
        >
          <SimpleBarChart data={fleetUtilizationTrend} color="#2563EB" height={180} />
        </ChartCard>

        <ChartCard
          title="Trip Completion Rate"
          subtitle="Monthly completion percentage"
          delay={0.15}
          actions={
            <div className="flex items-center gap-1 text-xs text-success font-semibold">
              <Route className="w-3.5 h-3.5" /> 92% this month
            </div>
          }
        >
          <SimpleBarChart data={tripCompletionRate} color="#22C55E" height={180} />
        </ChartCard>

        <ChartCard
          title="Revenue Growth"
          subtitle="Monthly revenue in lakhs (₹)"
          delay={0.2}
          actions={
            <div className="flex items-center gap-1 text-xs text-success font-semibold">
              <IndianRupee className="w-3.5 h-3.5" /> +15% growth
            </div>
          }
        >
          <SimpleBarChart data={revenueGrowth} color="#F59E0B" height={180} />
        </ChartCard>

        <ChartCard
          title="Driver Performance"
          subtitle="Compliance score by driver"
          delay={0.25}
          actions={
            <div className="flex items-center gap-1 text-xs text-success font-semibold">
              <Users className="w-3.5 h-3.5" /> Avg 95%
            </div>
          }
        >
          <SimpleBarChart data={driverPerformance} color="#8B5CF6" height={180} />
        </ChartCard>
      </div>
    </motion.div>
  );
}
