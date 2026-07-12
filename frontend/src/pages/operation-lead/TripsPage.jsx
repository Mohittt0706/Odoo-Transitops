import { motion } from "framer-motion";
import PageHeader from "../../components/ui/PageHeader";
import KPICard from "../../components/ui/KPICard";
import DataTable from "../../components/ui/DataTable";
import StatusBadge from "../../components/ui/StatusBadge";
import { trips } from "../../data/mockData";
import { Route, Navigation, CheckCircle, Clock, Plus } from "lucide-react";

const columns = [
  { key: "id", label: "ID" },
  { key: "from", label: "From" },
  { key: "to", label: "To" },
  { key: "driver", label: "Driver" },
  { key: "vehicle", label: "Vehicle" },
  {
    key: "status",
    label: "Status",
    render: (val) => <StatusBadge status={val} />,
  },
  { key: "departure", label: "Departure" },
  { key: "eta", label: "ETA" },
  { key: "distance", label: "Distance" },
  { key: "cargo", label: "Cargo" },
  { key: "value", label: "Value" },
];

export default function TripsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageHeader
        title="Trips"
        subtitle="Track and manage all trips"
        actions={
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-dark transition-colors">
            <Plus className="w-4 h-4" /> Create Trip
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard title="Total Trips" value="8" icon={Route} color="bg-primary/10 text-primary" delay={0} />
        <KPICard title="In Transit" value="3" change="Active now" changeType="up" icon={Navigation} color="bg-amber-50 text-amber-600" delay={0.05} />
        <KPICard title="Completed" value="3" change="This week" changeType="up" icon={CheckCircle} color="bg-emerald-50 text-emerald-600" delay={0.1} />
        <KPICard title="Pending" value="1" icon={Clock} color="bg-purple-50 text-purple-600" delay={0.15} />
      </div>

      <DataTable
        columns={columns}
        data={trips}
        searchPlaceholder="Search trips..."
        pageSize={10}
      />
    </motion.div>
  );
}
