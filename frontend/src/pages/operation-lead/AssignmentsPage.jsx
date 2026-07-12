import { motion } from "framer-motion";
import PageHeader from "../../components/ui/PageHeader";
import KPICard from "../../components/ui/KPICard";
import DataTable from "../../components/ui/DataTable";
import StatusBadge from "../../components/ui/StatusBadge";
import { assignments } from "../../data/mockData";
import { ClipboardList, CheckCircle, CalendarClock, Plus } from "lucide-react";

const columns = [
  { key: "id", label: "ID" },
  { key: "driver", label: "Driver" },
  { key: "vehicle", label: "Vehicle" },
  { key: "trip", label: "Trip" },
  { key: "route", label: "Route" },
  { key: "startDate", label: "Start Date" },
  { key: "endDate", label: "End Date" },
  {
    key: "status",
    label: "Status",
    render: (val) => <StatusBadge status={val} />,
  },
];

export default function AssignmentsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageHeader
        title="Assignments"
        subtitle="Driver-vehicle assignments"
        actions={
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-colors">
            <Plus className="w-4 h-4" /> New Assignment
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <KPICard title="Total Assignments" value="6" icon={ClipboardList} color="bg-primary/10 text-primary" delay={0} />
        <KPICard title="Active" value="3" change="Ongoing" changeType="up" icon={CheckCircle} color="bg-emerald-50 text-emerald-600" delay={0.05} />
        <KPICard title="Scheduled" value="1" icon={CalendarClock} color="bg-purple-50 text-purple-600" delay={0.1} />
      </div>

      <DataTable
        columns={columns}
        data={assignments}
        searchPlaceholder="Search assignments..."
        pageSize={10}
      />
    </motion.div>
  );
}
