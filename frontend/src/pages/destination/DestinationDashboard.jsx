import { motion } from "framer-motion";
import PageHeader from "../../components/ui/PageHeader";
import KPICard from "../../components/ui/KPICard";
import ChartCard from "../../components/ui/ChartCard";
import SimpleBarChart from "../../components/ui/SimpleBarChart";
import {
  Truck,
  CheckCircle,
  AlertTriangle,
  Clock,
  Warehouse,
  PackageCheck,
  XCircle,
  Upload,
} from "lucide-react";

const deliveryPerformanceData = [
  { label: "Mon", value: 8 },
  { label: "Tue", value: 10 },
  { label: "Wed", value: 7 },
  { label: "Thu", value: 12 },
  { label: "Fri", value: 9 },
  { label: "Sat", value: 11 },
  { label: "Sun", value: 6 },
];

const arrivalTrendData = [
  { label: "Mon", value: 9 },
  { label: "Tue", value: 11 },
  { label: "Wed", value: 8 },
  { label: "Thu", value: 13 },
  { label: "Fri", value: 10 },
  { label: "Sat", value: 12 },
  { label: "Sun", value: 7 },
];

const dockUsageData = [
  { label: "Dock 1", value: 85 },
  { label: "Dock 2", value: 70 },
  { label: "Dock 3", value: 92 },
  { label: "Dock 4", value: 55 },
  { label: "Dock 5", value: 68 },
  { label: "Dock 6", value: 40 },
  { label: "Dock 7", value: 78 },
];

const quickActions = [
  { title: "Confirm Delivery", icon: PackageCheck, color: "bg-emerald-50 text-emerald-600" },
  { title: "Reject Delivery", icon: XCircle, color: "bg-red-50 text-red-600" },
  { title: "Upload POD", icon: Upload, color: "bg-blue-50 text-blue-600" },
];

export default function DestinationDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageHeader
        title="Arrival Hub"
        subtitle="Monitor deliveries and warehouse operations"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <KPICard title="Incoming Trucks" value="3" icon={Truck} color="bg-primary/10 text-primary" delay={0} />
        <KPICard title="Completed Today" value="2" change="2" changeType="up" icon={CheckCircle} color="bg-emerald-50 text-emerald-600" delay={0.05} />
        <KPICard title="Delayed" value="1" icon={AlertTriangle} color="bg-red-50 text-red-600" delay={0.1} />
        <KPICard title="Pending Confirmation" value="0" icon={Clock} color="bg-amber-50 text-amber-600" delay={0.15} />
        <KPICard title="Warehouse Capacity" value="76%" change="3%" changeType="up" icon={Warehouse} color="bg-purple-50 text-purple-600" delay={0.2} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <ChartCard title="Delivery Performance" subtitle="Deliveries completed per day" delay={0.25}>
          <SimpleBarChart data={deliveryPerformanceData} color="#22C55E" />
        </ChartCard>
        <ChartCard title="Arrival Trend" subtitle="Trucks arrived per day" delay={0.3}>
          <SimpleBarChart data={arrivalTrendData} color="#2563EB" />
        </ChartCard>
        <ChartCard title="Dock Usage" subtitle="Utilization by dock" delay={0.35}>
          <SimpleBarChart data={dockUsageData} color="#8B5CF6" />
        </ChartCard>
      </div>

      <ChartCard title="Quick Actions" subtitle="Common operations" delay={0.4}>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {quickActions.map((action, i) => (
            <motion.button
              key={action.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.45 + i * 0.04 }}
              className="flex flex-col items-center gap-2.5 p-4 rounded-xl border border-neutral-border hover:border-primary/30 hover:shadow-soft-md transition-all duration-200 bg-white"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${action.color}`}>
                <action.icon className="w-5 h-5" strokeWidth={1.8} />
              </div>
              <span className="text-xs font-semibold text-neutral-textMain text-center">{action.title}</span>
            </motion.button>
          ))}
        </div>
      </ChartCard>
    </motion.div>
  );
}
