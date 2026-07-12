import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../../components/layout/PageHeader";
import KPICard from "../../../components/dashboard/KPICard";
import ChartCard from "../../../components/charts/ChartCard";
import DonutChart from "../../../components/charts/PieChart";
import SimpleBarChart from "../../../components/charts/BarChart";
import ActivityFeed from "../../../components/timeline/ActivityFeed";
import VehicleCard from "../../../components/dashboard/VehicleCard";
import VehicleStatusBadge from "../../../components/common/VehicleStatusBadge";
import { vehicles, recentActivity, monthlyUsage } from "../../../data/vehicleData";
import { Truck, CheckCircle, Wrench, XCircle, BarChart3, Plus, Calendar } from "lucide-react";

const statusDistribution = [
  { label: "Active", value: 5, color: "#22C55E" },
  { label: "Maintenance", value: 2, color: "#F59E0B" },
  { label: "Inactive", value: 2, color: "#6B7280" },
  { label: "On Trip", value: 1, color: "#2563EB" },
];

const fleetUtilization = [
  { label: "Jan", value: 65 },
  { label: "Feb", value: 62 },
  { label: "Mar", value: 70 },
  { label: "Apr", value: 68 },
  { label: "May", value: 75 },
  { label: "Jun", value: 78 },
];

const maintenanceTrend = [
  { label: "Jan", value: 3 },
  { label: "Feb", value: 2 },
  { label: "Mar", value: 4 },
  { label: "Apr", value: 1 },
  { label: "May", value: 3 },
  { label: "Jun", value: 5 },
];

export default function VehicleOverview() {
  const navigate = useNavigate();

  const upcomingMaintenance = vehicles
    .filter((v) => v.nextService)
    .sort((a, b) => new Date(a.nextService) - new Date(b.nextService))
    .slice(0, 4);

  const recentVehicles = [...vehicles].reverse().slice(0, 3);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <PageHeader
        title="Vehicle Overview"
        subtitle="Fleet status at a glance"
        actions={
          <button
            onClick={() => navigate("/dashboard/operations/fleet/register")}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-colors"
          >
            <Plus className="w-4 h-4" /> Register Vehicle
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        <KPICard title="Total Vehicles" value="10" icon={Truck} color="bg-primary/10 text-primary" delay={0} />
        <KPICard title="Available" value="5" change="2" changeType="up" icon={CheckCircle} color="bg-emerald-50 text-emerald-600" delay={0.05} />
        <KPICard title="On Trip" value="2" icon={Truck} color="bg-blue-50 text-blue-600" delay={0.1} />
        <KPICard title="In Maintenance" value="2" icon={Wrench} color="bg-amber-50 text-amber-600" delay={0.15} />
        <KPICard title="Inactive" value="1" icon={XCircle} color="bg-slate-100 text-slate-500" delay={0.2} />
        <KPICard title="Fleet Utilization" value="70%" change="5%" changeType="up" icon={BarChart3} color="bg-purple-50 text-purple-600" delay={0.25} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <ChartCard title="Vehicle Status Distribution" subtitle="Current fleet status breakdown" delay={0.1}>
          <DonutChart data={statusDistribution} size={130} thickness={16} />
        </ChartCard>
        <ChartCard title="Fleet Utilization" subtitle="Monthly utilization percentage" delay={0.15}>
          <SimpleBarChart data={fleetUtilization} color="#2563EB" />
        </ChartCard>
        <ChartCard title="Monthly Vehicle Usage" subtitle="Trips per month" delay={0.2}>
          <SimpleBarChart data={monthlyUsage.map((m) => ({ label: m.month, value: m.trips }))} color="#22C55E" />
        </ChartCard>
        <ChartCard title="Maintenance Trend" subtitle="Monthly maintenance count" delay={0.25}>
          <SimpleBarChart data={maintenanceTrend} color="#F59E0B" />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <ChartCard title="Recent Activity" subtitle="Latest fleet events" className="lg:col-span-1" delay={0.2}>
          <ActivityFeed activities={recentActivity} />
        </ChartCard>

        <ChartCard title="Upcoming Maintenance" subtitle="Vehicles due for service" className="lg:col-span-1" delay={0.25}>
          <div className="space-y-3">
            {upcomingMaintenance.map((v) => (
              <div
                key={v.id}
                onClick={() => navigate(`/dashboard/operations/fleet/details/${v.id}`)}
                className="flex items-center gap-3 p-3 rounded-lg border border-neutral-border/50 hover:bg-accent-light/50 cursor-pointer transition-colors"
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: v.color + "15" }}>
                  <Truck className="w-4.5 h-4.5" style={{ color: v.color }} strokeWidth={1.8} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-neutral-textMain truncate">{v.name}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Calendar className="w-3 h-3 text-neutral-textMuted" />
                    <span className="text-[11px] text-neutral-textMuted">
                      {new Date(v.nextService).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                  </div>
                </div>
                <VehicleStatusBadge status={v.status} />
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Recently Added Vehicles" subtitle="Last 3 registered vehicles" className="lg:col-span-1" delay={0.3}>
          <div className="grid grid-cols-1 gap-3">
            {recentVehicles.map((v, i) => (
              <VehicleCard key={v.id} vehicle={v} index={i} />
            ))}
          </div>
        </ChartCard>
      </div>
    </motion.div>
  );
}
