import PageHeader from "../../components/ui/PageHeader"
import KPICard from "../../components/ui/KPICard"
import ChartCard from "../../components/ui/ChartCard"
import SimpleBarChart from "../../components/ui/SimpleBarChart"
import { drivers, incidents, licenses } from "../../data/mockData"
import { motion } from "framer-motion"
import { cn } from "../../lib/utils"
import { AlertTriangle, Shield, FileText, Calendar, UserX, TrendingUp } from "lucide-react"

const complianceTrend = [
  { label: "Jan", value: 88 },
  { label: "Feb", value: 90 },
  { label: "Mar", value: 91 },
  { label: "Apr", value: 93 },
  { label: "May", value: 92 },
  { label: "Jun", value: 94 },
]

const incidentTrend = [
  { label: "Jan", value: 3 },
  { label: "Feb", value: 2 },
  { label: "Mar", value: 4 },
  { label: "Apr", value: 1 },
  { label: "May", value: 3 },
  { label: "Jun", value: 2 },
]

const driverSafetyScores = drivers.map((d) => ({
  label: d.name.split(" ")[0],
  value: d.compliance,
}))

const quickActions = [
  { icon: UserX, label: "Suspend Driver", color: "text-red-600", bg: "bg-red-50" },
  { icon: Calendar, label: "Schedule Inspection", color: "text-blue-600", bg: "bg-blue-50" },
  { icon: AlertTriangle, label: "Issue Warning", color: "text-amber-600", bg: "bg-amber-50" },
  { icon: FileText, label: "Generate Report", color: "text-green-600", bg: "bg-green-50" },
]

export default function SafetyDashboard() {
  const driversAtRisk = drivers.filter((d) => d.status === "At Risk").length
  const licenseExpiring = licenses.filter((l) => l.status === "Expiring Soon").length

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <PageHeader title="Safety Command" subtitle="Monitor compliance and safety metrics" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <KPICard title="Drivers At Risk" value={driversAtRisk} icon={AlertTriangle} trend="up" trendValue="+1 this month" color="red" />
        <KPICard title="License Expiry" value={licenseExpiring} icon={FileText} trend="up" trendValue="Within 30 days" color="amber" />
        <KPICard title="Compliance Score" value="94%" icon={Shield} trend="up" trendValue="+2% vs last month" color="green" />
        <KPICard title="Incidents" value={incidents.length} icon={AlertTriangle} trend="down" trendValue="-2 vs last month" color="blue" />
        <KPICard title="Safety Rating" value="A" icon={TrendingUp} trend="up" trendValue="Maintained" color="emerald" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Compliance Trend">
          <SimpleBarChart data={complianceTrend} />
        </ChartCard>
        <ChartCard title="Incident Trend">
          <SimpleBarChart data={incidentTrend} />
        </ChartCard>
      </div>

      <ChartCard title="Driver Safety Scores">
        <SimpleBarChart data={driverSafetyScores} />
      </ChartCard>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action) => (
          <button
            key={action.label}
            className={cn(
              "flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200 bg-white"
            )}
          >
            <div className={cn("p-3 rounded-lg", action.bg)}>
              <action.icon className={cn("w-5 h-5", action.color)} />
            </div>
            <span className="font-medium text-gray-800">{action.label}</span>
          </button>
        ))}
      </div>
    </motion.div>
  )
}
