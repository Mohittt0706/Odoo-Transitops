import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../../utils/utils";
import PageHeader from "../../../components/ui/PageHeader";
import KPICard from "../../../components/ui/KPICard";
import ChartCard from "../../../components/ui/ChartCard";
import SimpleBarChart from "../../../components/ui/SimpleBarChart";
import DonutChart from "../../../components/ui/DonutChart";
import DataTable from "../../../components/ui/DataTable";
import { vehicles } from "../../../data/vehicleData";
import {
  Route,
  Fuel,
  Gauge,
  Wrench,
  IndianRupee,
  TrendingUp,
  DollarSign,
  CheckCircle,
} from "lucide-react";

const dateRanges = ["This Month", "Last 3 Months", "Last 6 Months", "This Year"];

const fuelEfficiencyData = [
  { label: "Jan", value: 4.1 },
  { label: "Feb", value: 4.3 },
  { label: "Mar", value: 3.9 },
  { label: "Apr", value: 4.5 },
  { label: "May", value: 4.2 },
  { label: "Jun", value: 4.6 },
];

const mileageByVehicleData = [
  { label: "Prima", value: 4.2 },
  { label: "Leyland", value: 3.8 },
  { label: "Eicher", value: 5.5 },
  { label: "Blazo", value: 4.5 },
  { label: "Benz", value: 4.8 },
  { label: "Ultra", value: 8.2 },
  { label: "FH16", value: 3.5 },
  { label: "R450", value: 3.2 },
];

const maintenanceCostData = [
  { label: "Engine", value: 35, color: "#2563EB" },
  { label: "Brakes", value: 20, color: "#F59E0B" },
  { label: "Tires", value: 18, color: "#22C55E" },
  { label: "Electrical", value: 12, color: "#8B5CF6" },
  { label: "Body", value: 15, color: "#EF4444" },
];

const revenueVsCostData = [
  { label: "Jan", value: 18.5 },
  { label: "Feb", value: 16.2 },
  { label: "Mar", value: 20.1 },
  { label: "Apr", value: 19.8 },
  { label: "May", value: 22.4 },
  { label: "Jun", value: 21.0 },
];

const performanceColumns = [
  {
    key: "name",
    label: "Vehicle",
    render: (val, row) => (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: row.color + "15" }}>
          <Gauge className="w-4 h-4" style={{ color: row.color }} />
        </div>
        <div>
          <p className="font-medium text-sm">{val}</p>
          <p className="text-[11px] text-neutral-textMuted font-mono">{row.registration}</p>
        </div>
      </div>
    ),
  },
  { key: "distance", label: "Distance (km)" },
  { key: "fuelConsumed", label: "Fuel (L)" },
  { key: "mileage", label: "Mileage" },
  { key: "maintenanceCost", label: "Maint. Cost" },
  { key: "trips", label: "Trips" },
];

const performanceData = vehicles.map((v, i) => ({
  ...v,
  distance: [24500, 19800, 28300, 15200, 22100, 8400, 12600, 31200, 5600, 18700][i].toLocaleString(),
  fuelConsumed: [5830, 5210, 5140, 3380, 4600, 1020, 3600, 9750, 930, 4675][i].toLocaleString(),
  mileage: v.mileage,
  maintenanceCost: ["₹12,500", "₹18,200", "₹85,000", "₹0", "₹22,000", "₹0", "₹15,600", "₹0", "₹34,200", "₹8,400"][i],
  trips: [8, 6, 0, 3, 5, 1, 2, 4, 0, 3][i],
  color: v.color,
}));

export default function VehicleAnalytics() {
  const [dateRange, setDateRange] = useState("This Month");

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageHeader
        title="Vehicle Analytics"
        subtitle="Fleet performance metrics and insights"
        actions={
          <div className="flex items-center gap-1 bg-white border border-neutral-border rounded-xl p-1">
            {dateRanges.map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={cn(
                  "px-3 py-1.5 text-xs font-semibold rounded-lg transition-all",
                  dateRange === range
                    ? "bg-primary text-white"
                    : "text-neutral-textMuted hover:text-neutral-textMain hover:bg-accent-light"
                )}
              >
                {range}
              </button>
            ))}
          </div>
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <KPICard title="Total Distance" value="1,04,200 km" change="8.2%" changeType="up" icon={Route} color="bg-primary/10 text-primary" delay={0} />
        <KPICard title="Fuel Consumed" value="24,350 L" change="5.1%" changeType="up" icon={Fuel} color="bg-amber-50 text-amber-600" delay={0.05} />
        <KPICard title="Avg Mileage" value="4.3 km/L" change="0.2 km/L" changeType="up" icon={Gauge} color="bg-emerald-50 text-emerald-600" delay={0.1} />
        <KPICard title="Maintenance Cost" value="₹2,05,700" change="12%" changeType="down" icon={Wrench} color="bg-purple-50 text-purple-600" delay={0.15} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <KPICard title="Revenue Generated" value="₹12,40,000" change="15%" changeType="up" icon={IndianRupee} color="bg-emerald-50 text-emerald-600" delay={0.2} />
        <KPICard title="Operating Cost" value="₹8,90,000" change="7%" changeType="up" icon={DollarSign} color="bg-amber-50 text-amber-600" delay={0.25} />
        <KPICard title="ROI" value="28.5%" change="3.2%" changeType="up" icon={TrendingUp} color="bg-primary/10 text-primary" delay={0.3} />
        <KPICard title="Trips Completed" value="42" change="6 trips" changeType="up" icon={CheckCircle} color="bg-emerald-50 text-emerald-600" delay={0.35} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <ChartCard title="Fuel Efficiency Trend" subtitle="Average km/L over time" delay={0.1}>
          <SimpleBarChart data={fuelEfficiencyData} color="#2563EB" height={200} />
        </ChartCard>

        <ChartCard title="Mileage by Vehicle" subtitle="km/L comparison across fleet" delay={0.15}>
          <SimpleBarChart data={mileageByVehicleData} color="#22C55E" height={200} />
        </ChartCard>

        <ChartCard title="Maintenance Cost Distribution" subtitle="Cost breakdown by category" delay={0.2}>
          <div className="flex items-center justify-center py-2">
            <DonutChart data={maintenanceCostData} size={160} thickness={18} />
          </div>
        </ChartCard>

        <ChartCard title="Revenue vs Operating Cost" subtitle="Monthly comparison in lakhs (₹)" delay={0.25}>
          <SimpleBarChart data={revenueVsCostData} color="#F59E0B" height={200} />
        </ChartCard>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        <DataTable
          columns={performanceColumns}
          data={performanceData}
          searchPlaceholder="Search vehicles..."
          pageSize={10}
        />
      </motion.div>
    </motion.div>
  );
}
