import PageHeader from "../../components/ui/PageHeader"
import { motion } from "framer-motion"
import ChartCard from "../../components/ui/ChartCard"
import { Bell, Shield, FileText, Save, AlertTriangle } from "lucide-react"
import { useState } from "react"

export default function SafetySettings() {
  const [complianceThreshold, setComplianceThreshold] = useState(80)
  const [licenseExpiryDays, setLicenseExpiryDays] = useState(30)
  const [autoSuspendScore, setAutoSuspendScore] = useState(60)
  const [incidentAutoEscalate, setIncidentAutoEscalate] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(true)
  const [weeklyReport, setWeeklyReport] = useState(true)
  const [monthlyReport, setMonthlyReport] = useState(true)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <PageHeader title="Settings" subtitle="Configure safety parameters and alerts" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Alert Thresholds">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Compliance Score Warning (%)
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={complianceThreshold}
                onChange={(e) => setComplianceThreshold(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0%</span>
                <span className="font-medium text-blue-600">{complianceThreshold}%</span>
                <span>100%</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Drivers below this score will receive a warning
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                License Expiry Alert (Days)
              </label>
              <input
                type="range"
                min="7"
                max="90"
                value={licenseExpiryDays}
                onChange={(e) => setLicenseExpiryDays(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>7 days</span>
                <span className="font-medium text-blue-600">{licenseExpiryDays} days</span>
                <span>90 days</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Alert before license expiry
              </p>
            </div>
          </div>
        </ChartCard>

        <ChartCard title="Notification Settings">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-800">Email Notifications</p>
                  <p className="text-xs text-gray-500">Receive alerts via email</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-800">SMS Notifications</p>
                  <p className="text-xs text-gray-500">Receive alerts via SMS</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={smsNotifications}
                  onChange={(e) => setSmsNotifications(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-800">Incident Auto-Escalate</p>
                  <p className="text-xs text-gray-500">Auto-escalate high severity incidents</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={incidentAutoEscalate}
                  onChange={(e) => setIncidentAutoEscalate(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </ChartCard>

        <ChartCard title="Auto-Suspend Rules">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Auto-Suspend Below Score (%)
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={autoSuspendScore}
                onChange={(e) => setAutoSuspendScore(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0%</span>
                <span className="font-medium text-red-600">{autoSuspendScore}%</span>
                <span>100%</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Drivers below this compliance score will be auto-suspended
              </p>
            </div>

            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-800">Current Active Suspend Rule</p>
                  <p className="text-sm text-amber-600 mt-1">
                    Drivers with compliance score below {autoSuspendScore}% will be automatically suspended pending review.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ChartCard>

        <ChartCard title="Report Schedules">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-800">Weekly Safety Report</p>
                  <p className="text-xs text-gray-500">Every Monday at 9:00 AM</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={weeklyReport}
                  onChange={(e) => setWeeklyReport(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-800">Monthly Compliance Report</p>
                  <p className="text-xs text-gray-500">1st of every month at 10:00 AM</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={monthlyReport}
                  onChange={(e) => setMonthlyReport(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <button className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              <Save className="w-4 h-4" />
              Save Settings
            </button>
          </div>
        </ChartCard>
      </div>
    </motion.div>
  )
}
