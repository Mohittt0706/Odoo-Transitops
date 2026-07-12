import { motion } from "framer-motion";
import PageHeader from "../../components/ui/PageHeader";
import KPICard from "../../components/ui/KPICard";
import ChartCard from "../../components/ui/ChartCard";
import SimpleBarChart from "../../components/ui/SimpleBarChart";
import { trips } from "../../data/mockData";
import {
  Route,
  Truck,
  MapPin,
  Clock,
  Fuel,
  Star,
  BarChart3,
  Play,
  Pause,
  CheckCircle,
  AlertTriangle,
  Receipt,
} from "lucide-react";

const weeklyDistanceData = [
  { label: "Mon", value: 245 },
  { label: "Tue", value: 312 },
  { label: "Wed", value: 189 },
  { label: "Thu", value: 420 },
  { label: "Fri", value: 285 },
  { label: "Sat", value: 148 },
  { label: "Sun", value: 0 },
];

const fuelTrendData = [
  { label: "Mon", value: 85 },
  { label: "Tue", value: 72 },
  { label: "Wed", value: 90 },
  { label: "Thu", value: 68 },
  { label: "Fri", value: 82 },
  { label: "Sat", value: 78 },
  { label: "Sun", value: 100 },
];

const quickActions = [
  { label: "Start Trip", icon: Play, color: "bg-success-light text-success" },
  { label: "Pause Trip", icon: Pause, color: "bg-warning-light text-warning" },
  { label: "Complete Trip", icon: CheckCircle, color: "bg-primary-light text-primary" },
  { label: "Report Issue", icon: AlertTriangle, color: "bg-danger-light text-danger" },
  { label: "Upload Expense", icon: Receipt, color: "bg-purple-50 text-purple-600" },
];

export default function RoadCaptainDashboard() {
  const activeTrip = trips.find((t) => t.id === "TR-0084");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader
        title="Driver Cockpit"
        subtitle="Your daily operations overview"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Today's Route"
          value="Mumbai → Pune"
          icon={Route}
          color="bg-primary/10 text-primary"
          delay={0}
        />
        <KPICard
          title="Current Trip"
          value="TR-0084"
          icon={Truck}
          color="bg-success-light text-success"
          delay={0.05}
        />
        <KPICard
          title="Distance Remaining"
          value="68 km"
          icon={MapPin}
          color="bg-warning-light text-warning"
          delay={0.1}
        />
        <KPICard
          title="ETA"
          value="2h 15m"
          icon={Clock}
          color="bg-info-light text-primary"
          delay={0.15}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Fuel Level"
          value="78%"
          icon={Fuel}
          color="bg-success-light text-success"
          change="3% above avg"
          changeType="up"
          delay={0.2}
        />
        <KPICard
          title="Driver Score"
          value="4.8 / 5"
          icon={Star}
          color="bg-warning-light text-warning"
          change="+0.2 this month"
          changeType="up"
          delay={0.25}
        />
        <KPICard
          title="Trips This Week"
          value="5"
          icon={BarChart3}
          color="bg-purple-50 text-purple-600"
          change="+1 vs last week"
          changeType="up"
          delay={0.3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Weekly Distance"
          subtitle="Kilometers driven this week"
          delay={0.35}
        >
          <SimpleBarChart data={weeklyDistanceData} color="#2563EB" />
        </ChartCard>

        <ChartCard
          title="Fuel Consumption"
          subtitle="Fuel level trend (%)"
          delay={0.4}
        >
          <SimpleBarChart data={fuelTrendData} color="#16A34A" />
        </ChartCard>
      </div>

      <ChartCard
        title="Quick Actions"
        subtitle="Common trip operations"
        delay={0.45}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.label}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-neutral-border hover:shadow-soft-md transition-all duration-200 group"
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${action.color} group-hover:scale-110 transition-transform`}
              >
                <action.icon className="w-5 h-5" strokeWidth={1.8} />
              </div>
              <span className="text-xs font-semibold text-neutral-textMain">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </ChartCard>

      {activeTrip && (
        <ChartCard
          title="Current Trip Status"
          subtitle="TR-0084 — Mumbai to Pune"
          delay={0.5}
          actions={
            <span className="flex items-center gap-1.5 text-xs font-semibold text-success bg-success-light px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              In Transit
            </span>
          }
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <p className="text-[11px] text-neutral-textMuted uppercase tracking-wider">Departure</p>
              <p className="text-sm font-bold text-neutral-textMain mt-1">06:00 AM</p>
            </div>
            <div>
              <p className="text-[11px] text-neutral-textMuted uppercase tracking-wider">ETA</p>
              <p className="text-sm font-bold text-neutral-textMain mt-1">11:30 AM</p>
            </div>
            <div>
              <p className="text-[11px] text-neutral-textMuted uppercase tracking-wider">Distance</p>
              <p className="text-sm font-bold text-neutral-textMain mt-1">{activeTrip.distance}</p>
            </div>
            <div>
              <p className="text-[11px] text-neutral-textMuted uppercase tracking-wider">Cargo</p>
              <p className="text-sm font-bold text-neutral-textMain mt-1">{activeTrip.cargo}</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-neutral-textMuted">Route Progress</span>
              <span className="text-xs font-semibold text-primary">54%</span>
            </div>
            <div className="w-full h-2 bg-neutral-border rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: "54%" }} />
            </div>
          </div>
        </ChartCard>
      )}
    </motion.div>
  );
}
