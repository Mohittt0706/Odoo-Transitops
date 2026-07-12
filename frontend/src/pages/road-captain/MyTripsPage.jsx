import { motion } from "framer-motion";
import PageHeader from "../../components/ui/PageHeader";
import KPICard from "../../components/ui/KPICard";
import DataTable from "../../components/ui/DataTable";
import StatusBadge from "../../components/ui/StatusBadge";
import { trips } from "../../data/mockData";
import { Truck, Route, CheckCircle } from "lucide-react";

const columns = [
  { key: "id", label: "Trip ID" },
  { key: "from", label: "From" },
  { key: "to", label: "To" },
  {
    key: "status",
    label: "Status",
    render: (val) => <StatusBadge status={val} />,
  },
  { key: "departure", label: "Departure" },
  { key: "eta", label: "ETA" },
  { key: "distance", label: "Distance" },
  { key: "cargo", label: "Cargo" },
];

export default function MyTripsPage() {
  const activeTrips = trips.filter(
    (t) => t.status === "In Transit" || t.status === "Pending"
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader
        title="My Trips"
        subtitle="Active and upcoming trips"
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KPICard
          title="Active Trips"
          value={activeTrips.length}
          icon={Truck}
          color="bg-success-light text-success"
          delay={0}
        />
        <KPICard
          title="Today's Distance"
          value="148 km"
          icon={Route}
          color="bg-primary/10 text-primary"
          delay={0.05}
        />
        <KPICard
          title="On-Time Rate"
          value="95%"
          icon={CheckCircle}
          color="bg-warning-light text-warning"
          change="+2% this week"
          changeType="up"
          delay={0.1}
        />
      </div>

      <DataTable
        columns={columns}
        data={trips}
        searchPlaceholder="Search trips by ID, route, or cargo..."
        pageSize={8}
      />
    </motion.div>
  );
}
