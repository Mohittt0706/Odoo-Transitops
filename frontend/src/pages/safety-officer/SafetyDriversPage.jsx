import PageHeader from "../../components/layout/PageHeader"
import KPICard from "../../components/dashboard/KPICard"
import ChartCard from "../../components/charts/ChartCard"
import DataTable from "../../components/common/DataTable"
import StatusBadge from "../../components/common/Badge"
import { drivers } from "../../data/mockData"
import { motion } from "framer-motion"
import { Users, Shield, AlertTriangle, Ban, Plus } from "lucide-react"

const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "license", label: "License" },
  { key: "expiry", label: "Expiry" },
  {
    key: "status",
    label: "Status",
    render: (val) => (
      <StatusBadge
        status={val}
        colorMap={{
          Active: "bg-green-100 text-green-700",
          "At Risk": "bg-amber-100 text-amber-700",
          Suspended: "bg-red-100 text-red-700",
        }}
      />
    ),
  },
  { key: "rating", label: "Rating" },
  {
    key: "complianceScore",
    label: "Compliance Score",
    render: (val) => <span className="font-medium">{val}%</span>,
  },
  { key: "phone", label: "Phone" },
]

export default function SafetyDriversPage() {
  const total = drivers.length
  const compliant = drivers.filter((d) => d.status === "Active").length
  const atRisk = drivers.filter((d) => d.status === "At Risk").length
  const suspended = drivers.filter((d) => d.status === "Suspended").length

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <PageHeader title="Drivers" subtitle="Manage driver safety profiles and compliance">
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          Add Driver
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Total Drivers" value={total} icon={Users} color="blue" />
        <KPICard title="Compliant" value={compliant} icon={Shield} color="green" />
        <KPICard title="At Risk" value={atRisk} icon={AlertTriangle} color="amber" />
        <KPICard title="Suspended" value={suspended} icon={Ban} color="red" />
      </div>

      <ChartCard title="Drivers Overview">
        <DataTable columns={columns} data={drivers} />
      </ChartCard>
    </motion.div>
  )
}
