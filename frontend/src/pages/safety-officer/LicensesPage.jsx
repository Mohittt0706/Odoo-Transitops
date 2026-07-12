import PageHeader from "../../components/layout/PageHeader"
import KPICard from "../../components/dashboard/KPICard"
import ChartCard from "../../components/charts/ChartCard"
import DataTable from "../../components/common/DataTable"
import StatusBadge from "../../components/common/Badge"
import { licenses } from "../../data/mockData"
import { motion } from "framer-motion"
import { FileText, CheckCircle, AlertTriangle, XCircle } from "lucide-react"

const columns = [
  { key: "driver", label: "Driver" },
  { key: "licenseNo", label: "License No" },
  { key: "type", label: "Type" },
  { key: "issued", label: "Issued" },
  { key: "expiry", label: "Expiry" },
  {
    key: "status",
    label: "Status",
    render: (val) => (
      <StatusBadge
        status={val}
        colorMap={{
          Valid: "bg-green-100 text-green-700",
          "Expiring Soon": "bg-amber-100 text-amber-700",
          Expired: "bg-red-100 text-red-700",
        }}
      />
    ),
  },
]

export default function LicensesPage() {
  const total = licenses.length
  const valid = licenses.filter((l) => l.status === "Valid").length
  const expiringSoon = licenses.filter((l) => l.status === "Expiring Soon").length
  const expired = licenses.filter((l) => l.status === "Expired").length

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <PageHeader title="Licenses" subtitle="Manage driver license status and renewals" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Total Licenses" value={total} icon={FileText} color="blue" />
        <KPICard title="Valid" value={valid} icon={CheckCircle} color="green" />
        <KPICard title="Expiring Soon" value={expiringSoon} icon={AlertTriangle} color="amber" />
        <KPICard title="Expired" value={expired} icon={XCircle} color="red" />
      </div>

      <ChartCard title="License Overview">
        <DataTable columns={columns} data={licenses} />
      </ChartCard>
    </motion.div>
  )
}
