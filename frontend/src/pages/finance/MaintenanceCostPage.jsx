import PageHeader from "../../components/ui/PageHeader";
import KPICard from "../../components/ui/KPICard";
import DataTable from "../../components/ui/DataTable";
import StatusBadge from "../../components/ui/StatusBadge";
import { maintenance } from "../../data/mockData";
import { motion } from "framer-motion";
import { Wrench, Calculator, Clock, CheckCircle } from "lucide-react";

const columns = [
  { key: "id", label: "ID" },
  { key: "vehicle", label: "Vehicle" },
  { key: "type", label: "Type" },
  { key: "status", label: "Status", render: (val) => <StatusBadge status={val} /> },
  { key: "date", label: "Date" },
  { key: "cost", label: "Cost" },
  { key: "technician", label: "Technician" },
];

export default function MaintenanceCostPage() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <PageHeader title="Maintenance Cost" subtitle="Track maintenance expenses and schedules" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard title="Total Cost" value="₹1.78L" change="6%" trend="up" icon={<Wrench className="w-5 h-5" />} />
        <KPICard title="Average Job" value="₹29,600" change="2%" trend="up" icon={<Calculator className="w-5 h-5" />} />
        <KPICard title="Scheduled" value="3" change="0%" trend="neutral" icon={<Clock className="w-5 h-5" />} />
        <KPICard title="Completed" value="3" change="100%" trend="up" icon={<CheckCircle className="w-5 h-5" />} />
      </div>

      <div className="bg-white rounded-xl border border-gray-200">
        <DataTable columns={columns} data={maintenance} />
      </div>
    </motion.div>
  );
}
