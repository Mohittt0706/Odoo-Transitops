import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import KPICard from "../../components/dashboard/KPICard";
import ChartCard from "../../components/charts/ChartCard";
import DonutChart from "../../components/charts/PieChart";
import SimpleBarChart from "../../components/charts/BarChart";
import AreaChart from "../../components/charts/AreaChart";
import {
  Truck,
  CheckCircle,
  Wrench,
  Route,
  Clock,
  Users,
  Gauge,
  IndianRupee,
  Plus,
  FileText,
  Download,
  MapPin,
} from "lucide-react";

const fleetUtilizationData = [
  { label: "Active", value: 18, color: "#059669" },
  { label: "Maintenance", value: 2, color: "#D97706" },
  { label: "Idle", value: 4, color: "#94A3B8" },
];

const vehicleStatusData = [
  { label: "Mon", value: 16 },
  { label: "Tue", value: 18 },
  { label: "Wed", value: 15 },
  { label: "Thu", value: 19 },
  { label: "Fri", value: 17 },
  { label: "Sat", value: 14 },
];

const tripAnalyticsData = [
  { label: "Mon", value: 8 },
  { label: "Tue", value: 12 },
  { label: "Wed", value: 10 },
  { label: "Thu", value: 14 },
  { label: "Fri", value: 11 },
  { label: "Sat", value: 7 },
];

const quickActions = [
  { title: "Register Vehicle", icon: Truck, color: "bg-blue-50 text-blue-600" },
  { title: "Create Trip", icon: Route, color: "bg-emerald-50 text-emerald-600" },
  { title: "Add Driver", icon: Users, color: "bg-purple-50 text-purple-600" },
  { title: "Schedule Maintenance", icon: Wrench, color: "bg-amber-50 text-amber-600" },
  { title: "Generate Report", icon: FileText, color: "bg-rose-50 text-rose-600" },
  { title: "View Map", icon: MapPin, color: "bg-cyan-50 text-cyan-600" },
];

export default function OperationsDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageHeader
        title="Mission Control"
        subtitle="Overview of your fleet operations"
        actions={
          <>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-colors">
              <Plus className="w-4 h-4" /> Register Vehicle
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neutral-border text-sm font-semibold rounded-lg hover:bg-accent-light transition-colors">
              <Route className="w-4 h-4" /> Create Trip
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neutral-border text-sm font-semibold rounded-lg hover:bg-accent-light transition-colors">
              <Download className="w-4 h-4" /> Export Report
            </button>
          </>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        <KPICard title="Active Vehicles" value="18" change="12%" changeType="up" icon={Truck} color="bg-primary/10 text-primary" delay={0} />
        <KPICard title="Available" value="4" change="Neutral" changeType="neutral" icon={CheckCircle} color="bg-emerald-50 text-emerald-600" delay={0.05} />
        <KPICard title="In Maintenance" value="2" change="1 vehicle" changeType="down" icon={Wrench} color="bg-amber-50 text-amber-600" delay={0.1} />
        <KPICard title="Active Trips" value="6" change="8%" changeType="up" icon={Route} color="bg-purple-50 text-purple-600" delay={0.15} />
        <KPICard title="Pending Trips" value="3" change="Neutral" changeType="neutral" icon={Clock} color="bg-cyan-50 text-cyan-600" delay={0.2} />
        <KPICard title="Drivers On Duty" value="14" change="5%" changeType="up" icon={Users} color="bg-indigo-50 text-indigo-600" delay={0.25} />
        <KPICard title="Fleet Utilization" value="78%" change="3%" changeType="up" icon={Gauge} color="bg-emerald-50 text-emerald-600" delay={0.3} />
        <KPICard title="Revenue" value="₹12.4L" change="15%" changeType="up" icon={IndianRupee} color="bg-amber-50 text-amber-600" delay={0.35} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-5">
        <ChartCard title="Fleet Utilization" subtitle="Current vehicle distribution" delay={0.4}>
          <DonutChart data={fleetUtilizationData} />
        </ChartCard>
        <ChartCard title="Vehicle Status" subtitle="Active vehicles per day" delay={0.45}>
          <SimpleBarChart data={vehicleStatusData} color="#1E3A5F" />
        </ChartCard>
        <ChartCard title="Trip Analytics" subtitle="Trips completed this week" delay={0.5}>
          <AreaChart data={tripAnalyticsData} color="#059669" />
        </ChartCard>
      </div>

      <ChartCard title="Quick Actions" subtitle="Common operations" delay={0.55}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {quickActions.map((action, i) => (
            <motion.button
              key={action.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.04 }}
              whileHover={{ y: -2 }}
              className="flex flex-col items-center gap-2 p-3.5 rounded-lg border border-neutral-border hover:border-primary/20 hover:shadow-soft-md transition-all duration-200 bg-white cursor-pointer"
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${action.color}`}>
                <action.icon className="w-[18px] h-[18px]" strokeWidth={1.8} />
              </div>
              <span className="text-[11px] font-semibold text-neutral-textMain text-center leading-tight">{action.title}</span>
            </motion.button>
          ))}
        </div>
      </ChartCard>
    </motion.div>
  );
}
