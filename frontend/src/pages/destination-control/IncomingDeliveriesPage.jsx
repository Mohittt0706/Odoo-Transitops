import { motion } from "framer-motion";
import PageHeader from "../../components/ui/PageHeader";
import KPICard from "../../components/ui/KPICard";
import DataTable from "../../components/ui/DataTable";
import StatusBadge from "../../components/ui/StatusBadge";
import { deliveries } from "../../data/mockData";
import { Truck, ArrowRight, AlertTriangle, Clock } from "lucide-react";

const incomingData = deliveries.filter((d) => d.status === "In Transit" || d.status === "Delayed");

const columns = [
  { key: "id", label: "ID" },
  { key: "truck", label: "Truck" },
  { key: "driver", label: "Driver" },
  { key: "origin", label: "Origin" },
  { key: "destination", label: "Destination" },
  { key: "eta", label: "ETA" },
  {
    key: "status",
    label: "Status",
    render: (val) => <StatusBadge status={val} />,
  },
  { key: "cargo", label: "Cargo" },
  { key: "dock", label: "Dock" },
];

export default function IncomingDeliveriesPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageHeader
        title="Incoming Deliveries"
        subtitle="Track and manage inbound shipments"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard title="Incoming" value="3" icon={Truck} color="bg-primary/10 text-primary" delay={0} />
        <KPICard title="In Transit" value="2" icon={ArrowRight} color="bg-blue-50 text-blue-600" delay={0.05} />
        <KPICard title="Delayed" value="1" icon={AlertTriangle} color="bg-red-50 text-red-600" delay={0.1} />
        <KPICard title="On Time" value="2" change="67%" changeType="up" icon={Clock} color="bg-emerald-50 text-emerald-600" delay={0.15} />
      </div>

      <DataTable
        columns={columns}
        data={incomingData}
        searchPlaceholder="Search incoming deliveries..."
        pageSize={10}
      />
    </motion.div>
  );
}
