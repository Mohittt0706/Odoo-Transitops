import { motion } from "framer-motion";
import PageHeader from "../../components/ui/PageHeader";
import KPICard from "../../components/ui/KPICard";
import DataTable from "../../components/ui/DataTable";
import StatusBadge from "../../components/ui/StatusBadge";
import { maintenance } from "../../data/mockData";
import { Wrench, Settings, CalendarCheck, CheckCircle, Plus } from "lucide-react";

const columns = [
  { key: "id", label: "ID" },
  { key: "vehicle", label: "Vehicle" },
  { key: "plate", label: "Plate" },
  { key: "type", label: "Type" },
  {
    key: "status",
    label: "Status",
    render: (val) => <StatusBadge status={val} />,
  },
  { key: "date", label: "Date" },
  { key: "cost", label: "Cost" },
  { key: "technician", label: "Technician" },
];

export default function MaintenancePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageHeader
        title="Maintenance"
        subtitle="Track vehicle maintenance and service"
        actions={
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-colors">
            <Plus className="w-4 h-4" /> Schedule Maintenance
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard title="Total Jobs" value="6" icon={Wrench} color="bg-primary/10 text-primary" delay={0} />
        <KPICard title="In Progress" value="2" icon={Settings} color="bg-amber-50 text-amber-600" delay={0.05} />
        <KPICard title="Scheduled" value="2" icon={CalendarCheck} color="bg-purple-50 text-purple-600" delay={0.1} />
        <KPICard title="Completed" value="2" change="This month" changeType="up" icon={CheckCircle} color="bg-emerald-50 text-emerald-600" delay={0.15} />
      </div>

      <DataTable
        columns={columns}
        data={maintenance}
        searchPlaceholder="Search maintenance..."
        pageSize={10}
      />
    </motion.div>
  );
}
