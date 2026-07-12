import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import KPICard from "../../components/dashboard/KPICard";
import DataTable from "../../components/common/DataTable";
import { fuelLogs } from "../../data/mockData";
import { Fuel, IndianRupee, Gauge, CalendarPlus, Plus } from "lucide-react";

const columns = [
  { key: "id", label: "Log ID" },
  { key: "driver", label: "Driver" },
  { key: "vehicle", label: "Vehicle" },
  { key: "date", label: "Date" },
  {
    key: "liters",
    label: "Liters",
    render: (val) => `${val} L`,
  },
  { key: "cost", label: "Cost" },
  { key: "station", label: "Station" },
  { key: "mileage", label: "Mileage" },
];

export default function FuelLogsPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader
        title="Fuel Logs"
        subtitle="Track fuel consumption and expenses"
        actions={
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary/90 transition-colors">
            <Plus className="w-4 h-4" />
            Add Entry
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Fuel"
          value="618 L"
          icon={Fuel}
          color="bg-primary/10 text-primary"
          delay={0}
        />
        <KPICard
          title="Total Cost"
          value="₹55,620"
          icon={IndianRupee}
          color="bg-success-light text-success"
          delay={0.05}
        />
        <KPICard
          title="Average Mileage"
          value="5.1 km/L"
          icon={Gauge}
          color="bg-warning-light text-warning"
          change="+0.3 km/L"
          changeType="up"
          delay={0.1}
        />
        <KPICard
          title="This Week"
          value="3 entries"
          icon={CalendarPlus}
          color="bg-purple-50 text-purple-600"
          delay={0.15}
        />
      </div>

      <DataTable
        columns={columns}
        data={fuelLogs}
        searchPlaceholder="Search fuel logs by driver, vehicle, or station..."
        pageSize={8}
      />
    </motion.div>
  );
}
