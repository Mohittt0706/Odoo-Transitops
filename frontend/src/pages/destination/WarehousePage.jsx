import { motion } from "framer-motion";
import PageHeader from "../../components/ui/PageHeader";
import KPICard from "../../components/ui/KPICard";
import DataTable from "../../components/ui/DataTable";
import StatusBadge from "../../components/ui/StatusBadge";
import { warehouse } from "../../data/mockData";
import { Warehouse, Building2, Gauge, Ruler, HardDrive } from "lucide-react";

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "capacity", label: "Capacity" },
  { key: "used", label: "Used" },
  {
    key: "utilization",
    label: "Utilization",
    render: (val) => (
      <div className="flex items-center gap-2">
        <div className="w-16 h-2 bg-neutral-border rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${
              val > 85 ? "bg-red-500" : val > 65 ? "bg-amber-500" : "bg-emerald-500"
            }`}
            style={{ width: `${val}%` }}
          />
        </div>
        <span className="text-xs font-medium">{val}%</span>
      </div>
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (val) => <StatusBadge status={val} />,
  },
  { key: "manager", label: "Manager" },
  { key: "temperature", label: "Temperature" },
];

export default function WarehousePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageHeader
        title="Warehouse"
        subtitle="Manage warehouse facilities and capacity"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <KPICard title="Total Facilities" value="5" icon={Warehouse} color="bg-primary/10 text-primary" delay={0} />
        <KPICard title="Active" value="4" icon={Building2} color="bg-emerald-50 text-emerald-600" delay={0.05} />
        <KPICard title="Average Utilization" value="76%" change="2%" changeType="up" icon={Gauge} color="bg-purple-50 text-purple-600" delay={0.1} />
        <KPICard title="Total Capacity" value="51,500 sq ft" icon={Ruler} color="bg-blue-50 text-blue-600" delay={0.15} />
        <KPICard title="Used" value="40,400 sq ft" icon={HardDrive} color="bg-amber-50 text-amber-600" delay={0.2} />
      </div>

      <DataTable
        columns={columns}
        data={warehouse}
        searchPlaceholder="Search warehouses..."
        pageSize={10}
      />
    </motion.div>
  );
}
