import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import KPICard from "../../components/dashboard/KPICard";
import DataTable from "../../components/common/DataTable";
import { deliveries } from "../../data/mockData";
import { CheckCircle, Calendar, Percent, Clock } from "lucide-react";

const completedData = deliveries.filter((d) => d.status === "Completed");

const columns = [
  { key: "id", label: "ID" },
  { key: "truck", label: "Truck" },
  { key: "driver", label: "Driver" },
  { key: "origin", label: "Origin" },
  { key: "destination", label: "Destination" },
  { key: "eta", label: "Delivered At" },
  { key: "cargo", label: "Cargo" },
  { key: "dock", label: "Dock" },
];

export default function CompletedDeliveriesPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageHeader
        title="Completed Deliveries"
        subtitle="View all successfully completed deliveries"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard title="Total Completed" value="42" icon={CheckCircle} color="bg-emerald-50 text-emerald-600" delay={0} />
        <KPICard title="This Week" value="8" change="12%" changeType="up" icon={Calendar} color="bg-primary/10 text-primary" delay={0.05} />
        <KPICard title="On-Time Rate" value="94%" change="2%" changeType="up" icon={Percent} color="bg-blue-50 text-blue-600" delay={0.1} />
        <KPICard title="Average Time" value="4.5h" icon={Clock} color="bg-purple-50 text-purple-600" delay={0.15} />
      </div>

      <DataTable
        columns={columns}
        data={completedData}
        searchPlaceholder="Search completed deliveries..."
        pageSize={10}
      />
    </motion.div>
  );
}
