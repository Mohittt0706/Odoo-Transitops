import { useState } from "react";
import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import { SettingsCard, ToggleSwitch } from "../../components/notifications/NotificationComponents";
import { Bell, BellRing, MessageSquare, AlertTriangle, Route, Wrench, DollarSign, FileText, Volume2, Save, RotateCcw, Undo, CheckCircle } from "lucide-react";

const defaultSettings = {
  email: true, push: true, sms: false, desktop: true,
  emergency: true, trip: true, maintenance: true, financial: true, license: true,
  sound: true,
};

export default function NotificationSettings() {
  const [settings, setSettings] = useState({ ...defaultSettings });
  const [saved, setSaved] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const toggle = (key) => setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => setShowConfirm(true);

  const handleRestoreDefaults = () => {
    setSettings({ ...defaultSettings });
    setShowConfirm(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <PageHeader title="Notification Settings" subtitle="Configure how you receive notifications"
        actions={
          <div className="flex items-center gap-2">
            {saved && (
              <motion.span initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-1 text-[11px] font-semibold text-success">
                <CheckCircle className="w-3.5 h-3.5" /> Settings Saved
              </motion.span>
            )}
            <button onClick={handleReset} className="btn btn-secondary text-xs flex items-center gap-1.5">
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
            <button onClick={handleSave} className="btn btn-primary text-xs flex items-center gap-1.5">
              <Save className="w-3.5 h-3.5" /> Save Settings
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SettingsCard title="Email Notifications" description="Receive notifications via email" icon={Bell} color="primary">
          <ToggleSwitch checked={settings.email} onChange={() => toggle("email")} label="Enable email notifications" />
          <ToggleSwitch checked={true} onChange={() => {}} label="Daily digest email" />
          <ToggleSwitch checked={false} onChange={() => {}} label="Weekly summary" />
        </SettingsCard>

        <SettingsCard title="Push Notifications" description="Receive notifications in the app" icon={BellRing} color="purple">
          <ToggleSwitch checked={settings.push} onChange={() => toggle("push")} label="Enable push notifications" />
          <ToggleSwitch checked={settings.sound} onChange={() => toggle("sound")} label="Notification sound" />
          <ToggleSwitch checked={settings.desktop} onChange={() => toggle("desktop")} label="Desktop notifications" />
        </SettingsCard>

        <SettingsCard title="SMS Notifications" description="Receive text message alerts" icon={MessageSquare} color="cyan">
          <ToggleSwitch checked={settings.sms} onChange={() => toggle("sms")} label="Enable SMS notifications" />
          <ToggleSwitch checked={false} onChange={() => {}} label="Critical alerts only" />
        </SettingsCard>

        <SettingsCard title="Emergency Alerts" description="Critical alerts that require immediate attention" icon={AlertTriangle} color="danger">
          <ToggleSwitch checked={settings.emergency} onChange={() => toggle("emergency")} label="Emergency alert notifications" />
          <ToggleSwitch checked={true} onChange={() => {}} label="SMS for critical alerts" />
          <ToggleSwitch checked={true} onChange={() => {}} label="Phone call for critical" />
        </SettingsCard>

        <SettingsCard title="Trip Alerts" description="Alerts related to trip operations" icon={Route} color="primary">
          <ToggleSwitch checked={settings.trip} onChange={() => toggle("trip")} label="Trip assignment alerts" />
          <ToggleSwitch checked={true} onChange={() => {}} label="Trip delay notifications" />
          <ToggleSwitch checked={false} onChange={() => {}} label="Route change alerts" />
        </SettingsCard>

        <SettingsCard title="Maintenance Alerts" description="Vehicle maintenance notifications" icon={Wrench} color="warning">
          <ToggleSwitch checked={settings.maintenance} onChange={() => toggle("maintenance")} label="Maintenance due alerts" />
          <ToggleSwitch checked={true} onChange={() => {}} label="Service reminders" />
          <ToggleSwitch checked={false} onChange={() => {}} label="Inspection alerts" />
        </SettingsCard>

        <SettingsCard title="Financial Alerts" description="Financial and invoice notifications" icon={DollarSign} color="success">
          <ToggleSwitch checked={settings.financial} onChange={() => toggle("financial")} label="Financial alerts" />
          <ToggleSwitch checked={true} onChange={() => {}} label="Invoice overdue alerts" />
          <ToggleSwitch checked={false} onChange={() => {}} label="Budget alerts" />
        </SettingsCard>

        <SettingsCard title="License Alerts" description="License and permit expiry notifications" icon={FileText} color="purple">
          <ToggleSwitch checked={settings.license} onChange={() => toggle("license")} label="License alerts" />
          <ToggleSwitch checked={true} onChange={() => {}} label="Insurance expiry" />
          <ToggleSwitch checked={false} onChange={() => {}} label="Permit renewal reminders" />
        </SettingsCard>

        <SettingsCard title="Notification Sound" description="Sound preferences" icon={Volume2} color="slate">
          <ToggleSwitch checked={settings.sound} onChange={() => toggle("sound")} label="Play notification sounds" />
          <div className="pt-3 border-t border-neutral-border/50 mt-3">
            <label className="text-xs font-medium text-neutral-textMuted mb-1.5 block">Sound Type</label>
            <select className="w-full h-9 px-3 text-xs font-semibold bg-neutral-light border border-neutral-border rounded-lg outline-none focus:border-primary transition-all text-neutral-textMain">
              <option>Default</option>
              <option>Chime</option>
              <option>Alert</option>
              <option>Bell</option>
              <option>None</option>
            </select>
          </div>
        </SettingsCard>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm" onClick={() => setShowConfirm(false)}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl border border-neutral-border shadow-soft-lg p-6 max-w-sm w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-base font-bold text-neutral-textMain mb-2">Restore Defaults?</h3>
            <p className="text-sm text-neutral-textMuted mb-5">This will reset all notification settings to their default values.</p>
            <div className="flex items-center justify-end gap-2">
              <button onClick={() => setShowConfirm(false)} className="px-4 py-2 text-xs font-semibold text-neutral-textMuted bg-accent-light rounded-lg hover:bg-neutral-border transition-all">Cancel</button>
              <button onClick={handleRestoreDefaults} className="px-4 py-2 text-xs font-semibold text-white bg-primary rounded-lg hover:bg-primary/80 transition-all flex items-center gap-1.5">
                <Undo className="w-3.5 h-3.5" /> Restore Defaults
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
