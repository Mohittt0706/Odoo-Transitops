import PageHeader from "../../components/ui/PageHeader"
import KPICard from "../../components/ui/KPICard"
import ChartCard from "../../components/ui/ChartCard"
import DataTable from "../../components/ui/DataTable"
import StatusBadge from "../../components/ui/StatusBadge"
import { incidents } from "../../data/mockData"
import { motion } from "framer-motion"
import { AlertTriangle, Plus, Clock, CheckCircle } from "lucide-react"

const columns = [
  { key: "id", label: "ID" },
  { key: "date", label: "Date" },
  { key: "driver", label: "Driver" },
  { key: "vehicle", label: "Vehicle" },
  { key: "type", label: "Type" },
  {
    key: "severity",
    label: "Severity",
    render: (val) => (
      <StatusBadge
        status={val}
        colorMap={{
          Low: "bg-blue-100 text-blue-700",
          Medium: "bg-amber-100 text-amber-700",
          High: "bg-red-100 text-red-700",
          Critical: "bg-red-200 text-red-800",
        }}
      />
    ),
  },
  {
    key: "status",
    label: "Status",
    render: (val) => (
      <StatusBadge
        status={val}
        colorMap={{
          "Under Investigation": "bg-amber-100 text-amber-700",
          Resolved: "bg-green-100 text-green-700",
          Open: "bg-red-100 text-red-700",
          Closed: "bg-gray-100 text-gray-700",
        }}
      />
    ),
  },
  { key: "location", label: "Location" },
]

export default function IncidentsPage() {
  const total = incidents.length
  const highSeverity = incidents.filter((i) => i.severity === "High" || i.severity === "Critical").length
  const underInvestigation = incidents.filter((i) => i.status === "Under Investigation").length
  const resolved = incidents.filter((i) => i.status === "Resolved").length

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <PageHeader title="Incidents" subtitle="Track and manage safety incidents">
        <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
          <Plus className="w-4 h-4" />
          Report Incident
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Total Incidents" value={total} icon={AlertTriangle} color="blue" />
        <KPICard title="High Severity" value={highSeverity} icon={AlertTriangle} color="red" />
        <KPICard title="Under Investigation" value={underInvestigation} icon={Clock} color="amber" />
        <KPICard title="Resolved" value={resolved} icon={CheckCircle} color="green" />
      </div>

      <ChartCard title="Incident Reports">
        <DataTable columns={columns} data={incidents} />
      </ChartCard>
    </motion.div>
  )
}
