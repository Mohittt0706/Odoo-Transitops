import PageHeader from "../../components/layout/PageHeader";
import { motion } from "framer-motion";
import { Building2, Calendar, Globe, Percent, CreditCard, Bell } from "lucide-react";

const sections = [];

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
