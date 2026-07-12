import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import {
  Settings,
  Bell,
  Monitor,
  Shield,
} from "lucide-react";
import { useState } from "react";

function SettingToggle({ label, description, enabled, onChange }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex-1 min-w-0 mr-4">
        <p className="text-sm font-medium text-neutral-textMain">{label}</p>
        {description && <p className="text-xs text-neutral-textMuted mt-0.5">{description}</p>}
      </div>
      <button
        onClick={onChange}
        className={`relative w-11 h-6 rounded-full transition-colors ${
          enabled ? "bg-primary" : "bg-neutral-border"
        }`}
      >
        <div
          className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
            enabled ? "translate-x-[22px]" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}

function SettingSelect({ label, description, options }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex-1 min-w-0 mr-4">
        <p className="text-sm font-medium text-neutral-textMain">{label}</p>
        {description && <p className="text-xs text-neutral-textMuted mt-0.5">{description}</p>}
      </div>
      <select className="h-9 px-3 text-sm border border-neutral-border rounded-lg bg-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/10">
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

function SettingInput({ label, description, value, type = "text" }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex-1 min-w-0 mr-4">
        <p className="text-sm font-medium text-neutral-textMain">{label}</p>
        {description && <p className="text-xs text-neutral-textMuted mt-0.5">{description}</p>}
      </div>
      <input
        type={type}
        defaultValue={value}
        className="h-9 px-3 text-sm border border-neutral-border rounded-lg bg-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 w-56"
      />
    </div>
  );
}

function SettingCard({ title, icon: Icon, color, children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="bg-white border border-neutral-border rounded-xl shadow-soft-sm overflow-hidden"
    >
      <div className="flex items-center gap-3 px-5 py-4 border-b border-neutral-border">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="w-4.5 h-4.5" strokeWidth={1.8} />
        </div>
        <h3 className="text-sm font-bold font-headings text-neutral-textMain">{title}</h3>
      </div>
      <div className="px-5 divide-y divide-neutral-border">{children}</div>
    </motion.div>
  );
}

export default function OperationsSettings() {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    tripUpdates: true,
    maintenanceAlerts: true,
    complianceAlerts: true,
  });

  const [security, setSecurity] = useState({
    twoFactor: false,
    sessionTimeout: true,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageHeader
        title="Settings"
        subtitle="Configure your TransitOps preferences"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SettingCard title="General Settings" icon={Settings} color="bg-primary/10 text-primary" delay={0.1}>
          <SettingInput label="Company Name" value="TransitOps India Pvt Ltd" />
          <SettingSelect label="Timezone" value="IST" options={["IST (UTC+5:30)", "GMT (UTC+0)", "PST (UTC-8)"]} />
          <SettingSelect label="Language" value="English" options={["English", "Hindi", "Tamil", "Telugu", "Kannada"]} />
          <SettingInput label="Default Currency" value="₹ INR" />
        </SettingCard>

        <SettingCard title="Notification Preferences" icon={Bell} color="bg-amber-50 text-amber-600" delay={0.15}>
          <SettingToggle
            label="Email Notifications"
            description="Receive alerts via email"
            enabled={notifications.email}
            onChange={() => setNotifications((p) => ({ ...p, email: !p.email }))}
          />
          <SettingToggle
            label="SMS Notifications"
            description="Get critical alerts via SMS"
            enabled={notifications.sms}
            onChange={() => setNotifications((p) => ({ ...p, sms: !p.sms }))}
          />
          <SettingToggle
            label="Push Notifications"
            description="Browser push notifications"
            enabled={notifications.push}
            onChange={() => setNotifications((p) => ({ ...p, push: !p.push }))}
          />
          <SettingToggle
            label="Trip Updates"
            description="Notify on trip status changes"
            enabled={notifications.tripUpdates}
            onChange={() => setNotifications((p) => ({ ...p, tripUpdates: !p.tripUpdates }))}
          />
          <SettingToggle
            label="Maintenance Alerts"
            description="Upcoming maintenance reminders"
            enabled={notifications.maintenanceAlerts}
            onChange={() => setNotifications((p) => ({ ...p, maintenanceAlerts: !p.maintenanceAlerts }))}
          />
          <SettingToggle
            label="Compliance Alerts"
            description="License and document expiry warnings"
            enabled={notifications.complianceAlerts}
            onChange={() => setNotifications((p) => ({ ...p, complianceAlerts: !p.complianceAlerts }))}
          />
        </SettingCard>

        <SettingCard title="Display Settings" icon={Monitor} color="bg-purple-50 text-purple-600" delay={0.2}>
          <SettingSelect label="Theme" value="Light" options={["Light", "Dark", "System"]} />
          <SettingSelect label="Date Format" value="DD/MM/YYYY" options={["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"]} />
          <SettingSelect label="Time Format" value="12-hour" options={["12-hour", "24-hour"]} />
          <SettingSelect label="Rows per Page" value="10" options={["5", "10", "25", "50"]} />
        </SettingCard>

        <SettingCard title="Security" icon={Shield} color="bg-emerald-50 text-emerald-600" delay={0.25}>
          <SettingToggle
            label="Two-Factor Authentication"
            description="Add an extra layer of security"
            enabled={security.twoFactor}
            onChange={() => setSecurity((p) => ({ ...p, twoFactor: !p.twoFactor }))}
          />
          <SettingToggle
            label="Session Timeout"
            description="Auto-logout after inactivity"
            enabled={security.sessionTimeout}
            onChange={() => setSecurity((p) => ({ ...p, sessionTimeout: !p.sessionTimeout }))}
          />
          <SettingSelect label="Session Duration" value="30 minutes" options={["15 minutes", "30 minutes", "1 hour", "2 hours"]} />
          <SettingInput label="Password" value="••••••••" type="password" />
        </SettingCard>
      </div>
    </motion.div>
  );
}
