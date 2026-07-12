import { useState } from "react";
import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import { Bell, Monitor, Warehouse, Truck, Shield, Clock, Database, Palette, Save } from "lucide-react";

function Toggle({ label, desc, enabled, onChange }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex-1 min-w-0 mr-4">
        <p className="text-sm font-medium text-neutral-textMain">{label}</p>
        {desc && <p className="text-xs text-neutral-textMuted mt-0.5">{desc}</p>}
      </div>
      <button onClick={onChange}
        className={`relative w-11 h-6 rounded-full transition-colors ${enabled ? "bg-primary" : "bg-neutral-border"}`}>
        <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${enabled ? "translate-x-[22px]" : "translate-x-0.5"}`} />
      </button>
    </div>
  );
}

function Select({ label, desc, value, options }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex-1 min-w-0 mr-4">
        <p className="text-sm font-medium text-neutral-textMain">{label}</p>
        {desc && <p className="text-xs text-neutral-textMuted mt-0.5">{desc}</p>}
      </div>
      <select defaultValue={value}
        className="h-9 px-3 text-sm border border-neutral-border rounded-lg bg-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 w-48">
        {options.map(opt => <option key={opt}>{opt}</option>)}
      </select>
    </div>
  );
}

function Input({ label, desc, value, type = "text" }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex-1 min-w-0 mr-4">
        <p className="text-sm font-medium text-neutral-textMain">{label}</p>
        {desc && <p className="text-xs text-neutral-textMuted mt-0.5">{desc}</p>}
      </div>
      <input type={type} defaultValue={value}
        className="h-9 px-3 text-sm border border-neutral-border rounded-lg bg-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 w-48" />
    </div>
  );
}

function Card({ title, icon: Icon, color, children, delay = 0, wide }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      className={`bg-white border border-neutral-border rounded-xl shadow-soft-sm overflow-hidden ${wide ? 'lg:col-span-2' : ''}`}>
      <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-border">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
            <Icon className="w-[18px] h-[18px]" strokeWidth={1.8} />
          </div>
          <h3 className="text-sm font-bold text-neutral-textMain">{title}</h3>
        </div>
      </div>
      <div className="px-5 divide-y divide-neutral-border">{children}</div>
    </motion.div>
  );
}

export default function DestinationSettings() {
  const [warehouseSettings, setWarehouseSettings] = useState({ autoAssignDock: true, capacityAlerts: true, tempAlerts: false });
  const [deliveryRules, setDeliveryRules] = useState({ autoConfirm: false, notifyOnArrival: true, requireSignature: true });
  const [notifications, setNotifications] = useState({ email: true, sms: false, push: true, whatsapp: false });
  const [security, setSecurity] = useState({ twoFactor: false, requireApproval: true, auditLog: true });
  const [backup, setBackup] = useState({ autoBackup: true, dailyDigest: false });

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <PageHeader title="Settings" subtitle="Configure warehouse, delivery, notification, and security preferences"
        actions={
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary-dark transition-colors shadow-soft-sm">
            <Save className="w-4 h-4" /> Save Changes
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card title="Warehouse Information" icon={Warehouse} color="bg-primary/10 text-primary" delay={0.05}>
          <Input label="Warehouse Name" value="Mumbai Central Hub" />
          <Input label="Location" value="Mumbai, Maharashtra" />
          <Input label="Total Capacity (sq ft)" value="51,500" />
          <Input label="Working Hours" value="06:00 - 22:00" />
          <Select label="Time Zone" value="Asia/Kolkata (IST)" options={["Asia/Kolkata (IST)", "UTC"]} />
        </Card>

        <Card title="Company Details" icon={Truck} color="bg-emerald-50 text-emerald-600" delay={0.08}>
          <Input label="Company Name" value="TransitOps Logistics" />
          <Input label="GST Number" value="27AABCU9603R1Z1" />
          <Input label="Contact Email" value="warehouse@transitops.com" />
          <Input label="Contact Phone" value="+91 1800-123-4567" />
          <Input label="Address" value="Plot 42, Industrial Area, Andheri East" />
        </Card>

        <Card title="Dock Configuration" icon={Warehouse} color="bg-blue-50 text-blue-600" delay={0.1}>
          <Input label="Total Docks" value="25" />
          <Select label="Auto-Assign Logic" value="Nearest Available" options={["Nearest Available", "Least Utilized", "Cargo Type Match", "Manual Only"]} />
          <Input label="Max Dock Occupancy (hrs)" value="4" />
          <Toggle label="Auto-Assign on Arrival" desc="Automatically assign dock when truck arrives" enabled={warehouseSettings.autoAssignDock}
            onChange={() => setWarehouseSettings(p => ({ ...p, autoAssignDock: !p.autoAssignDock }))} />
          <Toggle label="Temperature Alerts" desc="Alert when cold storage temps deviate" enabled={warehouseSettings.tempAlerts}
            onChange={() => setWarehouseSettings(p => ({ ...p, tempAlerts: !p.tempAlerts }))} />
        </Card>

        <Card title="Delivery Rules" icon={Truck} color="bg-amber-50 text-amber-600" delay={0.12}>
          <Select label="ETA Tolerance" value="30 minutes" options={["15 minutes", "30 minutes", "45 minutes", "1 hour"]} />
          <Select label="Delayed Threshold" value="30 min" options={["15 min", "30 min", "45 min", "1 hour"]} />
          <Input label="Grace Period" value="15 minutes" />
          <Toggle label="Auto-Confirm Deliveries" desc="Auto-confirm when POD is uploaded" enabled={deliveryRules.autoConfirm}
            onChange={() => setDeliveryRules(p => ({ ...p, autoConfirm: !p.autoConfirm }))} />
          <Toggle label="Notify on Arrival" desc="Alert staff when truck arrives" enabled={deliveryRules.notifyOnArrival}
            onChange={() => setDeliveryRules(p => ({ ...p, notifyOnArrival: !p.notifyOnArrival }))} />
          <Toggle label="Require Digital Signature" desc="Signature mandatory for all deliveries" enabled={deliveryRules.requireSignature}
            onChange={() => setDeliveryRules(p => ({ ...p, requireSignature: !p.requireSignature }))} />
        </Card>

        <Card title="POD Preferences" icon={Warehouse} color="bg-purple-50 text-purple-600" delay={0.14}>
          <Select label="Photo Requirement" value="Required - All Deliveries" options={["Required - All Deliveries", "Optional", "Not Required"]} />
          <Input label="Max Photos per POD" value="5" />
          <Select label="Document Format" value="PDF" options={["PDF", "JPEG", "PNG", "All Formats"]} />
          <Input label="Storage Retention (days)" value="365" />
        </Card>

        <Card title="Notification Settings" icon={Bell} color="bg-amber-50 text-amber-600" delay={0.16}>
          <Toggle label="Email Notifications" desc="Delivery and warehouse alerts via email" enabled={notifications.email}
            onChange={() => setNotifications(p => ({ ...p, email: !p.email }))} />
          <Toggle label="SMS Notifications" desc="Critical alerts via SMS" enabled={notifications.sms}
            onChange={() => setNotifications(p => ({ ...p, sms: !p.sms }))} />
          <Toggle label="Push Notifications" desc="Browser push alerts" enabled={notifications.push}
            onChange={() => setNotifications(p => ({ ...p, push: !p.push }))} />
          <Toggle label="WhatsApp Alerts" desc="WhatsApp delivery notifications" enabled={notifications.whatsapp}
            onChange={() => setNotifications(p => ({ ...p, whatsapp: !p.whatsapp }))} />
          <Select label="Alert Frequency" value="Immediate" options={["Immediate", "Every 15 min", "Hourly", "Daily Digest"]} />
        </Card>

        <Card title="Security Settings" icon={Shield} color="bg-red-50 text-red-600" delay={0.18}>
          <Toggle label="Two-Factor Auth" desc="Require OTP for sensitive operations" enabled={security.twoFactor}
            onChange={() => setSecurity(p => ({ ...p, twoFactor: !p.twoFactor }))} />
          <Toggle label="Require Approval" desc="Dock assignments need supervisor approval" enabled={security.requireApproval}
            onChange={() => setSecurity(p => ({ ...p, requireApproval: !p.requireApproval }))} />
          <Toggle label="Audit Log" desc="Track all warehouse operations" enabled={security.auditLog}
            onChange={() => setSecurity(p => ({ ...p, auditLog: !p.auditLog }))} />
          <Select label="Session Timeout" value="30 minutes" options={["15 minutes", "30 minutes", "1 hour", "4 hours", "Never"]} />
        </Card>

        <Card title="Backup Settings" icon={Database} color="bg-cyan-50 text-cyan-600" delay={0.2}>
          <Toggle label="Auto Backup" desc="Daily automatic data backup" enabled={backup.autoBackup}
            onChange={() => setBackup(p => ({ ...p, autoBackup: !p.autoBackup }))} />
          <Toggle label="Daily Digest" desc="Email daily operations summary" enabled={backup.dailyDigest}
            onChange={() => setBackup(p => ({ ...p, dailyDigest: !p.dailyDigest }))} />
          <Select label="Backup Frequency" value="Daily" options={["Hourly", "Daily", "Weekly", "Monthly"]} />
          <Input label="Retention Period" value="90 days" />
        </Card>

        <Card title="Theme Settings" icon={Palette} color="bg-purple-50 text-purple-600" delay={0.22}>
          <Select label="Theme" value="Light" options={["Light", "Dark", "System"]} />
          <Select label="Primary Color" value="Blue" options={["Blue", "Indigo", "Emerald", "Purple"]} />
          <Select label="Date Format" value="DD/MM/YYYY" options={["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"]} />
          <Select label="Time Format" value="12-hour" options={["12-hour", "24-hour"]} />
          <Select label="Rows per Page" value="10" options={["5", "10", "25", "50", "100"]} />
        </Card>
      </div>
    </motion.div>
  );
}
