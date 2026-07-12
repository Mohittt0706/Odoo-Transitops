import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import KPICard from "../../components/dashboard/KPICard";
import DataTable from "../../components/common/DataTable";
import StatusBadge from "../../components/common/Badge";
import { vehicles } from "../../data/mockData";
import { Truck, CheckCircle, XCircle, Clock, Plus } from "lucide-react";

const columns = [
  { key: "id", label: "ID" },
  {
    key: "name",
    label: "Name",
    render: (val) => (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Truck className="w-4 h-4 text-primary" />
        </div>
        <span className="font-medium">{val}</span>
      </div>
    ),
  },
  { key: "type", label: "Type" },
  { key: "plate", label: "Plate Number" },
  {
    key: "status",
    label: "Status",
    render: (val) => <StatusBadge status={val} />,
  },
  { key: "driver", label: "Driver" },
  {
    key: "fuel",
    label: "Fuel Level (%)",
    render: (val) => (
      <div className="flex items-center gap-2">
        <div className="w-16 h-2 bg-neutral-border rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${
              val > 70 ? "bg-emerald-500" : val > 40 ? "bg-amber-500" : "bg-red-500"
            }`}
            style={{ width: `${val}%` }}
          />
        </div>
        <span className="text-xs font-medium">{val}%</span>
      </div>
    ),
  },
  { key: "mileage", label: "Mileage" },
];

export default function VehiclesPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageHeader
        title="Vehicles"
        subtitle="Manage your vehicle inventory"
        actions={
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-colors">
            <Plus className="w-4 h-4" /> Add Vehicle
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard title="Total Vehicles" value="24" icon={Truck} color="bg-primary/10 text-primary" delay={0} />
        <KPICard title="Active" value="18" change="12%" changeType="up" icon={CheckCircle} color="bg-emerald-50 text-emerald-600" delay={0.05} />
        <KPICard title="Inactive" value="4" icon={XCircle} color="bg-amber-50 text-amber-600" delay={0.1} />
        <KPICard title="Average Age" value="3.2 years" icon={Clock} color="bg-purple-50 text-purple-600" delay={0.15} />
      </div>

      <DataTable
        columns={columns}
        data={vehicles}
        searchPlaceholder="Search vehicles..."
        pageSize={10}
      />
    </motion.div>
  );
}
