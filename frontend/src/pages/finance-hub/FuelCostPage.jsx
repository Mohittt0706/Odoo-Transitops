import PageHeader from "../../components/layout/PageHeader";
import KPICard from "../../components/dashboard/KPICard";
import DataTable from "../../components/common/DataTable";
import { fuelLogs } from "../../data/mockData";
import { motion } from "framer-motion";
import { Fuel, Droplets, Calculator, Calendar } from "lucide-react";

const columns = [
  { key: "id", label: "ID" },
  { key: "driver", label: "Driver" },
  { key: "vehicle", label: "Vehicle" },
  { key: "date", label: "Date" },
  { key: "liters", label: "Liters" },
  { key: "cost", label: "Cost" },
  { key: "station", label: "Station" },
  { key: "mileage", label: "Mileage" },
];

export default function FuelCostPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <PageHeader title="Fuel Cost" subtitle="Track fuel consumption and costs" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard title="Total Fuel Cost" value="₹12.4L" change="3%" trend="down" icon={<Fuel className="w-5 h-5" />} />
        <KPICard title="Average Price/L" value="₹90" change="1%" trend="up" icon={<Droplets className="w-5 h-5" />} />
        <KPICard title="Total Liters" value="13,778L" change="2%" trend="up" icon={<Calculator className="w-5 h-5" />} />
        <KPICard title="This Month" value="₹55,620" change="4%" trend="up" icon={<Calendar className="w-5 h-5" />} />
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <DataTable columns={columns} data={fuelLogs} />
      </div>
    </motion.div>
  );
}
