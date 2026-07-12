import PageHeader from "../../components/layout/PageHeader"
import KPICard from "../../components/dashboard/KPICard"
import ChartCard from "../../components/charts/ChartCard"
import DataTable from "../../components/common/DataTable"
import StatusBadge from "../../components/common/Badge"
import { training } from "../../data/mockData"
import { motion } from "framer-motion"
import { BookOpen, Plus, Calendar, CheckCircle } from "lucide-react"

const columns = [
  { key: "id", label: "ID" },
  { key: "course", label: "Course" },
  { key: "driver", label: "Driver" },
  { key: "date", label: "Date" },
  { key: "duration", label: "Duration" },
  {
    key: "status",
    label: "Status",
    render: (val) => (
      <StatusBadge
        status={val}
        colorMap={{
          Scheduled: "bg-blue-100 text-blue-700",
          Completed: "bg-green-100 text-green-700",
          "In Progress": "bg-amber-100 text-amber-700",
          Cancelled: "bg-red-100 text-red-700",
        }}
      />
    ),
  },
  { key: "instructor", label: "Instructor" },
]

export default function TrainingPage() {
  const totalCourses = training.length
  const scheduled = training.filter((t) => t.status === "Scheduled").length
  const completed = training.filter((t) => t.status === "Completed").length

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <PageHeader title="Training" subtitle="Manage driver safety training programs">
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          Schedule Training
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <KPICard title="Total Courses" value={totalCourses} icon={BookOpen} color="blue" />
        <KPICard title="Scheduled" value={scheduled} icon={Calendar} color="amber" />
        <KPICard title="Completed" value={completed} icon={CheckCircle} color="green" />
      </div>

      <ChartCard title="Training Records">
        <DataTable columns={columns} data={training} />
      </ChartCard>
    </motion.div>
  )
}
