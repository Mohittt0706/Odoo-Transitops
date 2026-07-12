import { useState } from "react";
import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import ChartCard from "../../components/charts/ChartCard";
import { Toast } from "../../components/road-captain/RoadCaptainComponents";
import { User, Bell, Route, Monitor, Shield, Save, ChevronRight, Eye, EyeOff } from "lucide-react";

const sections = [];

function Toggle({ enabled, onChange }) {
  return (
    <button onClick={() => onChange(!enabled)}
      className={`relative w-10 h-6 rounded-full transition-colors duration-200 ${enabled ? "bg-primary" : "bg-neutral-border"}`}>
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${enabled ? "translate-x-4" : ""}`} />
    </button>
  );
}

function SettingRow({ label, desc, children }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-neutral-border/50 last:border-0">
      <div><p className="text-sm font-medium text-neutral-textMain">{label}</p><p className="text-xs text-neutral-textMuted">{desc}</p></div>
      {children}
    </div>
  );
}

export default function RoadCaptainSettings() {
  const [active, setActive] = useState("profile");
  const [toast, setToast] = useState(null);
  const [autoStart, setAutoStart] = useState(true);
  const [gpsTracking, setGpsTracking] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [compact, setCompact] = useState(false);

  const showSaved = () => setToast({ type: "success", message: "Settings saved successfully!" });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <PageHeader title="Settings" subtitle="Manage preferences and account" />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <ChartCard delay={0} className="p-0">
            <nav className="p-2">
              {sections.map((s) => (
                <button key={s.id} onClick={() => setActive(s.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${active === s.id ? "bg-primary-light text-primary" : "text-neutral-textMain hover:bg-slate-50"}`}>
                  <s.icon className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm font-medium">{s.title}</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-auto text-neutral-textMuted" />
                </button>
              ))}
            </nav>
          </ChartCard>
        </div>

        <div className="lg:col-span-3 space-y-6">
          {active === "profile" && (
            <ChartCard title="Profile Settings" delay={0.05}>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "Full Name", val: "" },
                    { label: "Phone Number", val: "" },
                    { label: "Email", val: "", type: "email" },
                    { label: "License Number", val: "" },
                    { label: "Address", val: "" },
                    { label: "Emergency Contact", val: "" },
                  ].map((f) => (
                    <div key={f.label}>
                      <label className="text-xs font-semibold text-neutral-textMuted uppercase">{f.label}</label>
                      <input type={f.type || "text"} defaultValue={f.val}
                        className="w-full mt-1.5 px-3 py-2.5 text-sm bg-neutral-light border border-neutral-border rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
                    </div>
                  ))}
                </div>
                <div className="flex justify-end pt-2">
                  <button onClick={showSaved} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary/90 transition-colors">
                    <Save className="w-4 h-4" /> Save Changes
                  </button>
                </div>
              </div>
            </ChartCard>
          )}

          {active === "notifications" && (
            <ChartCard title="Notification Preferences" delay={0.05}>
              <div className="space-y-0">
                <SettingRow label="Email Notifications" desc="Receive updates via email"><Toggle enabled={emailNotif} onChange={setEmailNotif} /></SettingRow>
                <SettingRow label="Push Notifications" desc="Get alerts on your device"><Toggle enabled={pushNotif} onChange={setPushNotif} /></SettingRow>
                <SettingRow label="SMS Alerts" desc="Critical alerts via SMS"><Toggle enabled={smsNotif} onChange={setSmsNotif} /></SettingRow>
                <SettingRow label="Trip Updates" desc="Route changes and ETA updates"><Toggle enabled={true} onChange={() => {}} /></SettingRow>
                <SettingRow label="Fuel Reminders" desc="Low fuel level alerts"><Toggle enabled={true} onChange={() => {}} /></SettingRow>
              </div>
            </ChartCard>
          )}

          {active === "trip" && (
            <ChartCard title="Trip Preferences" delay={0.05}>
              <div className="space-y-0">
                <SettingRow label="Auto-Start Trip" desc="Automatically start trip when vehicle moves"><Toggle enabled={autoStart} onChange={setAutoStart} /></SettingRow>
                <SettingRow label="GPS Tracking" desc="Share live location during trips"><Toggle enabled={gpsTracking} onChange={setGpsTracking} /></SettingRow>
                <SettingRow label="Speed Alerts" desc="Notify when exceeding speed limit"><Toggle enabled={true} onChange={() => {}} /></SettingRow>
                <SettingRow label="Route Optimization" desc="Use AI-optimized routes"><Toggle enabled={true} onChange={() => {}} /></SettingRow>
                <SettingRow label="Auto Log Fuel" desc="Prompt for fuel entry at each stop"><Toggle enabled={true} onChange={() => {}} /></SettingRow>
              </div>
            </ChartCard>
          )}

          {active === "display" && (
            <ChartCard title="Display Settings" delay={0.05}>
              <div className="space-y-0">
                <SettingRow label="Dark Mode" desc="Switch to dark theme"><Toggle enabled={darkMode} onChange={setDarkMode} /></SettingRow>
                <SettingRow label="Compact View" desc="Show more content on screen"><Toggle enabled={compact} onChange={setCompact} /></SettingRow>
                <div className="py-3 border-b border-neutral-border/50">
                  <p className="text-sm font-medium text-neutral-textMain mb-2">Language</p>
                  <select className="w-full px-3 py-2.5 text-sm bg-neutral-light border border-neutral-border rounded-xl outline-none focus:border-primary">
                    <option>English</option><option>Hindi</option><option>Marathi</option><option>Tamil</option>
                  </select>
                </div>
              </div>
            </ChartCard>
          )}

          {active === "security" && (
            <ChartCard title="Security" delay={0.05}>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-neutral-textMuted uppercase">Current Password</label>
                  <input type="password" placeholder="Enter current password"
                    className="w-full mt-1.5 px-3 py-2.5 text-sm bg-neutral-light border border-neutral-border rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className="text-xs font-semibold text-neutral-textMuted uppercase">New Password</label>
                    <input type="password" placeholder="Enter new password"
                      className="w-full mt-1.5 px-3 py-2.5 text-sm bg-neutral-light border border-neutral-border rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" /></div>
                  <div><label className="text-xs font-semibold text-neutral-textMuted uppercase">Confirm Password</label>
                    <input type="password" placeholder="Confirm new password"
                      className="w-full mt-1.5 px-3 py-2.5 text-sm bg-neutral-light border border-neutral-border rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" /></div>
                </div>
                <div className="space-y-0 pt-2">
                  <SettingRow label="Two-Factor Authentication" desc="Add extra security layer"><Toggle enabled={false} onChange={() => {}} /></SettingRow>
                  <SettingRow label="Login Notifications" desc="Get notified on new device login"><Toggle enabled={true} onChange={() => {}} /></SettingRow>
                </div>
                <div className="flex justify-end pt-2">
                  <button onClick={showSaved} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary/90 transition-colors">
                    <Shield className="w-4 h-4" /> Update Password
                  </button>
                </div>
              </div>
            </ChartCard>
          )}
        </div>
      </div>

      {toast && <Toast show type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
    </motion.div>
  );
}
