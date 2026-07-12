import PageHeader from "../../components/ui/PageHeader";
import { motion } from "framer-motion";
import { Building2, Calendar, Globe, Percent, CreditCard, Bell } from "lucide-react";

const sections = [
  {
    title: "Company Details",
    icon: <Building2 className="w-5 h-5" />,
    fields: [
      { label: "Company Name", value: "TransitOps Logistics Pvt. Ltd.", type: "text" },
      { label: "GST Number", value: "27AABCT1234F1Z5", type: "text" },
      { label: "PAN Number", value: "AABCT1234F", type: "text" },
      { label: "Registered Address", value: "14th Floor, Commerzone, Andheri Kurla Road, Andheri East, Mumbai 400069", type: "textarea" },
    ],
  },
  {
    title: "Fiscal Year",
    icon: <Calendar className="w-5 h-5" />,
    fields: [
      { label: "Fiscal Year Start", value: "2026-04-01", type: "date" },
      { label: "Fiscal Year End", value: "2027-03-31", type: "date" },
      { label: "Current Period", value: "Q1 FY 2026-27", type: "text" },
    ],
  },
  {
    title: "Currency",
    icon: <Globe className="w-5 h-5" />,
    fields: [
      { label: "Base Currency", value: "INR (₹)", type: "text" },
      { label: "Decimal Places", value: "2", type: "number" },
      { label: "Thousands Separator", value: ",", type: "text" },
    ],
  },
  {
    title: "Tax Rates",
    icon: <Percent className="w-5 h-5" />,
    fields: [
      { label: "GST Rate (Services)", value: "18%", type: "text" },
      { label: "GST Rate (Goods)", value: "28%", type: "text" },
      { label: "TDS Rate", value: "10%", type: "text" },
      { label: "Input Tax Credit", value: "Enabled", type: "text" },
    ],
  },
  {
    title: "Payment Terms",
    icon: <CreditCard className="w-5 h-5" />,
    fields: [
      { label: "Default Payment Terms", value: "Net 15", type: "text" },
      { label: "Late Payment Penalty", value: "1.5% per month", type: "text" },
      { label: "Advance Payment", value: "20%", type: "text" },
      { label: "Accepted Payment Methods", value: "NEFT, RTGS, UPI, Cheque", type: "text" },
    ],
  },
  {
    title: "Notification Preferences",
    icon: <Bell className="w-5 h-5" />,
    fields: [
      { label: "Invoice Reminders", value: "7 days before due", type: "text" },
      { label: "Overdue Alerts", value: "Daily", type: "text" },
      { label: "Budget Alerts", value: "80% threshold", type: "text" },
      { label: "Email Notifications", value: "Enabled", type: "text" },
    ],
  },
];

export default function FinanceSettings() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <PageHeader title="Settings" subtitle="Configure finance module preferences" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sections.map((section, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.08 }}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                {section.icon}
              </div>
              <h3 className="text-base font-semibold text-gray-900">{section.title}</h3>
            </div>
            <div className="space-y-4">
              {section.fields.map((field, j) => (
                <div key={j}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                  {field.type === "textarea" ? (
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                      rows={3}
                      defaultValue={field.value}
                    />
                  ) : (
                    <input
                      type={field.type}
                      defaultValue={field.value}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
          Save Settings
        </button>
      </div>
    </motion.div>
  );
}
