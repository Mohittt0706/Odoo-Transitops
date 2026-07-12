import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import DataTable from "../../components/common/DataTable";
import ChartCard from "../../components/charts/ChartCard";
import SimpleBarChart from "../../components/charts/BarChart";
import { TripStatusBadge, MetricCard, Timeline } from "../../components/road-captain/RoadCaptainComponents";
import { rcTrips } from "../../data/roadCaptainData";
import { CheckCircle, Calendar, Ruler, Star, TrendingUp, MessageSquare } from "lucide-react";

const columns = [
  { key: "id", label: "Trip ID" },
  { key: "from", label: "From" },
  { key: "to", label: "To" },
  { key: "date", label: "Date", render: (v, r) => r.departure?.split(" ")[0] },
  { key: "distance", label: "Distance" },
  { key: "cargo", label: "Cargo" },
  { key: "value", label: "Value" },
  { key: "status", label: "Status", render: (v) => <TripStatusBadge status={v} /> },
  { key: "rating", label: "Rating", render: (v) => v ? <span className="flex items-center gap-1 text-sm font-semibold text-warning"><Star className="w-3.5 h-3.5 fill-warning" />{v}</span> : "—", sortable: false },
];

const monthlyStats = [
  { label: "Jan", value: 12 }, { label: "Feb", value: 15 }, { label: "Mar", value: 10 }, { label: "Apr", value: 18 }, { label: "May", value: 14 }, { label: "Jun", value: 16 },
];

export default function TripHistoryPage() {
  const completed = rcTrips.filter((t) => t.status === "Completed");
  const cancelled = rcTrips.filter((t) => t.status === "Cancelled");

  const timeline = [
    { date: "2026-07-12", title: "Trip TR-0084 Started", description: "Mumbai → Pune — Electronics" },
    { date: "2026-07-11", title: "Trip TR-0080 Completed", description: "Ahmedabad → Rajkot — On time" },
    { date: "2026-07-10", title: "Trip TR-0077 Completed", description: "Chennai → Bangalore — Rating 4.8" },
    { date: "2026-07-09", title: "Trip TR-0076 Completed", description: "Indore → Bhopal — Early delivery" },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <PageHeader title="Trip History" subtitle="Completed trips and performance overview" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard label="Completed Trips" value={completed.length} icon={CheckCircle} color="success" />
        <MetricCard label="Cancelled" value={cancelled.length} icon={CheckCircle} color="danger" />
        <MetricCard label="Avg Distance" value="278 km" icon={Ruler} color="warning" />
        <MetricCard label="Avg Rating" value="4.7" icon={Star} color="purple" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard title="Monthly Trips" subtitle="Last 6 months" delay={0.15} className="lg:col-span-2">
          <SimpleBarChart data={monthlyStats} color="#2563EB" />
        </ChartCard>
        <ChartCard title="Recent Timeline" delay={0.2}>
          <Timeline stages={timeline} />
        </ChartCard>
      </div>

      <DataTable columns={columns} data={completed} searchPlaceholder="Search trip history..." pageSize={8} />
    </motion.div>
  );
}
