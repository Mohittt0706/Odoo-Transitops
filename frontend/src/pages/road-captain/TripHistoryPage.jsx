import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import KPICard from "../../components/dashboard/KPICard";
import DataTable from "../../components/common/DataTable";
import { trips } from "../../data/mockData";
import { CheckCircle, Calendar, Ruler, IndianRupee, Star } from "lucide-react";

const columns = [
  { key: "id", label: "Trip ID" },
  { key: "from", label: "From" },
  { key: "to", label: "To" },
  { key: "departure", label: "Date", render: (val) => val?.split(" ")[0] || val },
  { key: "distance", label: "Distance" },
  { key: "cargo", label: "Cargo" },
  { key: "value", label: "Value" },
  {
    key: "rating",
    label: "Rating",
    render: () => (
      <span className="flex items-center gap-1 text-sm font-semibold text-warning">
        <Star className="w-3.5 h-3.5 fill-warning text-warning" />
        {(4 + Math.random()).toFixed(1)}
      </span>
    ),
    sortable: false,
  },
];

export default function TripHistoryPage() {
  const completedTrips = trips.filter((t) => t.status === "Completed");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <PageHeader
        title="Trip History"
        subtitle="View all completed trips and performance"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Completed"
          value="45"
          icon={CheckCircle}
          color="bg-success-light text-success"
          delay={0}
        />
        <KPICard
          title="This Month"
          value="8"
          icon={Calendar}
          color="bg-primary/10 text-primary"
          change="+3 vs last month"
          changeType="up"
          delay={0.05}
        />
        <KPICard
          title="Average Distance"
          value="280 km"
          icon={Ruler}
          color="bg-warning-light text-warning"
          delay={0.1}
        />
        <KPICard
          title="Total Revenue"
          value="₹5.2L"
          icon={IndianRupee}
          color="bg-purple-50 text-purple-600"
          change="+12% this quarter"
          changeType="up"
          delay={0.15}
        />
      </div>

      <DataTable
        columns={columns}
        data={completedTrips}
        searchPlaceholder="Search trip history..."
        pageSize={8}
      />
    </motion.div>
  );
}
