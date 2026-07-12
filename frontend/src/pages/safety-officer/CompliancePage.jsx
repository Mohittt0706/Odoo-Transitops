import PageHeader from "../../components/layout/PageHeader"
import KPICard from "../../components/dashboard/KPICard"
import ChartCard from "../../components/charts/ChartCard"
import DataTable from "../../components/common/DataTable"
import StatusBadge from "../../components/common/Badge"
import { drivers, compliance } from "../../data/mockData"
import { motion } from "framer-motion"
import { cn } from "../../utils/utils"
import { Shield, CheckCircle } from "lucide-react"

const complianceData = drivers.map((d) => {
  const comp = compliance.find((c) => c.driverId === d.id) || {}
  return {
    driver: d.name,
    insurance: comp.insurance || "Valid",
    fitness: comp.fitness || "Valid",
    pollution: comp.pollution || "Valid",
    tax: comp.tax || "Valid",
    overall: comp.overall || d.complianceScore,
  }
})

const columns = [
  { key: "driver", label: "Driver" },
  {
    key: "insurance",
    label: "Insurance",
    render: (val) => (
      <StatusBadge
        status={val}
        colorMap={{
          Valid: "bg-green-100 text-green-700",
          Expired: "bg-red-100 text-red-700",
        }}
      />
    ),
  },
  {
    key: "fitness",
    label: "Fitness",
    render: (val) => (
      <StatusBadge
        status={val}
        colorMap={{
          Valid: "bg-green-100 text-green-700",
          Expired: "bg-red-100 text-red-700",
        }}
      />
    ),
  },
  {
    key: "pollution",
    label: "Pollution",
    render: (val) => (
      <StatusBadge
        status={val}
        colorMap={{
          Valid: "bg-green-100 text-green-700",
          Expired: "bg-red-100 text-red-700",
        }}
      />
    ),
  },
  { key: "tax", label: "Tax" },
  {
    key: "overall",
    label: "Overall",
    render: (val) => (
      <div className="flex items-center gap-2">
        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full",
              val >= 90 ? "bg-green-500" : val >= 70 ? "bg-amber-500" : "bg-red-500"
            )}
            style={{ width: `${val}%` }}
          />
        </div>
        <span className="text-sm font-medium">{val}%</span>
      </div>
    ),
  },
]

export default function CompliancePage() {
  const insuranceValid = complianceData.filter((c) => c.insurance === "Valid").length
  const fitnessValid = complianceData.filter((c) => c.fitness === "Valid").length
  const pollutionValid = complianceData.filter((c) => c.pollution === "Valid").length

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <PageHeader title="Compliance" subtitle="Track document compliance for all drivers" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Overall Score" value="0" icon={Shield} color="green" />
        <KPICard title="Insurance Valid" value={`${insuranceValid}/${drivers.length}`} icon={CheckCircle} color="blue" />
        <KPICard title="Fitness Valid" value={`${fitnessValid}/${drivers.length}`} icon={CheckCircle} color="emerald" />
        <KPICard title="Pollution Valid" value={`${pollutionValid}/${drivers.length}`} icon={CheckCircle} color="teal" />
      </div>

      <ChartCard title="Compliance Status">
        <DataTable columns={columns} data={complianceData} />
      </ChartCard>
    </motion.div>
  )
}
