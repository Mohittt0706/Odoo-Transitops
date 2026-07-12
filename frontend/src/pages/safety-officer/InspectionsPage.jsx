import PageHeader from "../../components/layout/PageHeader"
import KPICard from "../../components/dashboard/KPICard"
import ChartCard from "../../components/charts/ChartCard"
import DataTable from "../../components/common/DataTable"
import StatusBadge from "../../components/common/Badge"
import { inspections } from "../../data/mockData"
import { motion } from "framer-motion"
import { ClipboardCheck, Plus, CheckCircle, XCircle, AlertTriangle } from "lucide-react"

const columns = [
  { key: "id", label: "ID" },
  { key: "vehicle", label: "Vehicle" },
  { key: "plate", label: "Plate" },
  { key: "type", label: "Type" },
  { key: "date", label: "Date" },
  { key: "inspector", label: "Inspector" },
  {
    key: "result",
    label: "Result",
    render: (val) => (
      <StatusBadge
        status={val}
        colorMap={{
          Pass: "bg-green-100 text-green-700",
          Fail: "bg-red-100 text-red-700",
          Conditional: "bg-amber-100 text-amber-700",
        }}
      />
    ),
  },
  { key: "notes", label: "Notes" },
]

export default function InspectionsPage() {
  const total = inspections.length
  const pass = inspections.filter((i) => i.result === "Pass").length
  const fail = inspections.filter((i) => i.result === "Fail").length
  const conditional = inspections.filter((i) => i.result === "Conditional").length

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <PageHeader title="Inspections" subtitle="Schedule and track vehicle inspections">
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          Schedule Inspection
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Total Inspections" value={total} icon={ClipboardCheck} color="blue" />
        <KPICard title="Pass" value={pass} icon={CheckCircle} color="green" />
        <KPICard title="Fail" value={fail} icon={XCircle} color="red" />
        <KPICard title="Conditional" value={conditional} icon={AlertTriangle} color="amber" />
      </div>

      <ChartCard title="Inspection Records">
        <DataTable columns={columns} data={inspections} />
      </ChartCard>
    </motion.div>
  )
}
