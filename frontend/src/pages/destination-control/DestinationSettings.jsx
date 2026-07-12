import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import {
  Bell,
  Monitor,
  Warehouse,
  Truck,
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

export default function DestinationSettings() {
  const [warehouseSettings, setWarehouseSettings] = useState({
    autoAssignDock: true,
    capacityAlerts: true,
  });

  const [deliveryRules, setDeliveryRules] = useState({
    autoConfirm: false,
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageHeader
        title="Settings"
        subtitle="Configure destination control preferences"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SettingCard title="Warehouse Configuration" icon={Warehouse} color="bg-primary/10 text-primary" delay={0.1}>
          <SettingToggle
            label="Auto-Assign Dock"
            description="Automatically assign docks based on cargo type and availability"
            enabled={warehouseSettings.autoAssignDock}
            onChange={() => setWarehouseSettings((p) => ({ ...p, autoAssignDock: !p.autoAssignDock }))}
          />
          <SettingToggle
            label="Capacity Alerts"
            description="Notify when warehouse utilization exceeds 85%"
            enabled={warehouseSettings.capacityAlerts}
            onChange={() => setWarehouseSettings((p) => ({ ...p, capacityAlerts: !p.capacityAlerts }))}
          />
          <SettingSelect label="Default Temperature Zone" value="Ambient" options={["Ambient", "Cold Storage", "Frozen", "Controlled"]} />
          <SettingInput label="Max Capacity Threshold" value="90%" />
        </SettingCard>

        <SettingCard title="Delivery Rules" icon={Truck} color="bg-emerald-50 text-emerald-600" delay={0.15}>
          <SettingInput label="ETA Tolerance" value="30 minutes" />
          <SettingToggle
            label="Auto-Confirm Deliveries"
            description="Automatically confirm deliveries when POD is uploaded"
            enabled={deliveryRules.autoConfirm}
            onChange={() => setDeliveryRules((p) => ({ ...p, autoConfirm: !p.autoConfirm }))}
          />
          <SettingSelect label="Delayed Threshold" value="30 min" options={["15 min", "30 min", "45 min", "1 hour"]} />
          <SettingInput label="Grace Period" value="15 minutes" />
        </SettingCard>

        <SettingCard title="Notification Preferences" icon={Bell} color="bg-amber-50 text-amber-600" delay={0.2}>
          <SettingToggle
            label="Email Notifications"
            description="Receive delivery alerts via email"
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
          <SettingSelect label="Alert Frequency" value="Immediate" options={["Immediate", "Every 15 min", "Hourly", "Daily Digest"]} />
        </SettingCard>

        <SettingCard title="Display Settings" icon={Monitor} color="bg-purple-50 text-purple-600" delay={0.25}>
          <SettingSelect label="Theme" value="Light" options={["Light", "Dark", "System"]} />
          <SettingSelect label="Date Format" value="DD/MM/YYYY" options={["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"]} />
          <SettingSelect label="Time Format" value="12-hour" options={["12-hour", "24-hour"]} />
          <SettingSelect label="Rows per Page" value="10" options={["5", "10", "25", "50"]} />
        </SettingCard>
      </div>
    </motion.div>
  );
}
