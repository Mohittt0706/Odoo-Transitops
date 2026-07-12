import { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PageHeader from "../../components/layout/PageHeader";
import KPICard from "../../components/dashboard/KPICard";
import ChartCard from "../../components/charts/ChartCard";
import DonutChart from "../../components/charts/PieChart";
import SimpleBarChart from "../../components/charts/BarChart";
import AreaChart from "../../components/charts/AreaChart";
import { dashboardService } from "../../services/dashboard.service";
import { formatCurrency } from "../../utils/utils";
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
  Download,
} from "lucide-react";

const STATUS_COLORS = {
  AVAILABLE: "#059669",
  ON_TRIP: "#1E3A5F",
  IN_MAINTENANCE: "#D97706",
  OUT_OF_SERVICE: "#DC2626",
  ACTIVE: "#059669",
  COMPLETED: "#2563EB",
  CANCELLED: "#94A3B8",
  ON_DUTY: "#059669",
  OFF_DUTY: "#94A3B8",
  SCHEDULED: "#D97706",
};

const KPI_CONFIG = [
  { key: "vehiclesOnTrip", title: "Active Vehicles", icon: Truck, color: "bg-primary/10 text-primary" },
  { key: "availableVehicles", title: "Available", icon: CheckCircle, color: "bg-emerald-50 text-emerald-600" },
  { key: "vehiclesInMaintenance", title: "In Maintenance", icon: Wrench, color: "bg-amber-50 text-amber-600" },
  { key: "activeTrips", title: "Active Trips", icon: Route, color: "bg-purple-50 text-purple-600" },
  { key: "pendingTrips", title: "Pending Trips", icon: Clock, color: "bg-cyan-50 text-cyan-600" },
  { key: "driversOnTrip", title: "Drivers On Duty", icon: Users, color: "bg-indigo-50 text-indigo-600" },
  { key: "fleetUtilization", title: "Fleet Utilization", icon: Gauge, color: "bg-emerald-50 text-emerald-600" },
  { key: "revenue", title: "Revenue", icon: IndianRupee, color: "bg-amber-50 text-amber-600" },
];

function loader() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-neutral-textMuted">Loading dashboard...</p>
      </div>
    </div>
  );
}

function errorView(message, onRetry) {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex flex-col items-center gap-3">
        <p className="text-sm text-danger">{message || "Failed to load dashboard"}</p>
        {onRetry && (
          <button onClick={onRetry} className="px-4 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary-dark transition-colors">
            Retry
          </button>
        )}
      </div>
    </div>
  );
}

export default function OperationsDashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await dashboardService.getDashboard();
      setData(res.data);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const kpis = useMemo(() => {
    if (!data) return null;
    const { kpis: k, fleetHealth } = data;
    const pendingTrips = k.totalTrips - k.activeTrips - k.completedTrips - k.cancelledTrips;
    return {
      vehiclesOnTrip: k.vehiclesOnTrip,
      availableVehicles: k.availableVehicles,
      vehiclesInMaintenance: k.vehiclesInMaintenance,
      activeTrips: k.activeTrips,
      pendingTrips: Math.max(0, pendingTrips),
      driversOnTrip: k.driversOnTrip,
      fleetUtilization: fleetHealth?.fleetHealthScore != null ? `${Math.round(fleetHealth.fleetHealthScore)}%` : "N/A",
      revenue: formatCurrency(k.totalOperationalCost),
    };
  }, [data]);

  const fleetUtilizationData = useMemo(() => {
    if (!data?.analytics?.vehicleStatusSummary) return [];
    return data.analytics.vehicleStatusSummary.map((s) => ({
      label: s._id?.replace(/_/g, " ") || "Unknown",
      value: s.count,
      color: STATUS_COLORS[s._id] || "#94A3B8",
    }));
  }, [data]);

  const driverStatusData = useMemo(() => {
    if (!data?.analytics?.driverStatusSummary) return [];
    return data.analytics.driverStatusSummary.map((s) => ({
      label: s._id?.replace(/_/g, " ") || "Unknown",
      value: s.count,
    }));
  }, [data]);

  const tripAnalyticsData = useMemo(() => {
    if (!data?.analytics?.tripStatusSummary) return [];
    return data.analytics.tripStatusSummary.map((s) => ({
      label: s._id?.replace(/_/g, " ") || "Unknown",
      value: s.count,
    }));
  }, [data]);

  if (loading) return loader();
  if (error) return errorView(error, fetchDashboard);
  if (!data) return errorView("No data available", fetchDashboard);

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
            <button
              onClick={() => navigate("/dashboard/operations/fleet")}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-colors"
            >
              <Plus className="w-4 h-4" /> Register Vehicle
            </button>
            <button
              onClick={() => navigate("/dashboard/operations/trips")}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neutral-border text-sm font-semibold rounded-lg hover:bg-accent-light transition-colors"
            >
              <Route className="w-4 h-4" /> Create Trip
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neutral-border text-sm font-semibold rounded-lg hover:bg-accent-light transition-colors">
              <Download className="w-4 h-4" /> Export Report
            </button>
          </>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {KPI_CONFIG.map((cfg, i) => (
          <KPICard
            key={cfg.key}
            title={cfg.title}
            value={kpis?.[cfg.key] ?? "—"}
            change={null}
            changeType="neutral"
            icon={cfg.icon}
            color={cfg.color}
            delay={i * 0.05}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-5">
        <ChartCard title="Fleet Utilization" subtitle="Current vehicle distribution" delay={0.4}>
          {fleetUtilizationData.length > 0 ? (
            <DonutChart data={fleetUtilizationData} />
          ) : (
            <p className="text-sm text-neutral-textMuted text-center py-8">No vehicle data</p>
          )}
        </ChartCard>
        <ChartCard title="Driver Status" subtitle="Drivers by current status" delay={0.45}>
          {driverStatusData.length > 0 ? (
            <SimpleBarChart data={driverStatusData} color="#1E3A5F" />
          ) : (
            <p className="text-sm text-neutral-textMuted text-center py-8">No driver data</p>
          )}
        </ChartCard>
        <ChartCard title="Trip Analytics" subtitle="Trips by status" delay={0.5}>
          {tripAnalyticsData.length > 0 ? (
            <AreaChart data={tripAnalyticsData} color="#059669" />
          ) : (
            <p className="text-sm text-neutral-textMuted text-center py-8">No trip data</p>
          )}
        </ChartCard>
      </div>

      {data.quickActions && data.quickActions.length > 0 && (
        <ChartCard title="Quick Actions" subtitle="Common operations" delay={0.55}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {data.quickActions.map((action, i) => (
              <motion.button
                key={action.action}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.04 }}
                whileHover={{ y: -2 }}
                onClick={() => navigate(action.route)}
                className="flex flex-col items-center gap-2 p-3.5 rounded-lg border border-neutral-border hover:border-primary/20 hover:shadow-soft-md transition-all duration-200 bg-white cursor-pointer"
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-primary/10 text-primary">
                  {action.action === "CREATE_VEHICLE" && <Truck className="w-[18px] h-[18px]" strokeWidth={1.8} />}
                  {action.action === "CREATE_TRIP" && <Route className="w-[18px] h-[18px]" strokeWidth={1.8} />}
                  {action.action === "CREATE_DRIVER" && <Users className="w-[18px] h-[18px]" strokeWidth={1.8} />}
                  {action.action === "SCHEDULE_MAINTENANCE" && <Wrench className="w-[18px] h-[18px]" strokeWidth={1.8} />}
                  {!["CREATE_VEHICLE", "CREATE_TRIP", "CREATE_DRIVER", "SCHEDULE_MAINTENANCE"].includes(action.action) && (
                    <Plus className="w-[18px] h-[18px]" strokeWidth={1.8} />
                  )}
                </div>
                <span className="text-[11px] font-semibold text-neutral-textMain text-center leading-tight">{action.label}</span>
              </motion.button>
            ))}
          </div>
        </ChartCard>
      )}
    </motion.div>
  );
}
