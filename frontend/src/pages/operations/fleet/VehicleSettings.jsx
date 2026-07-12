import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";
import PageHeader from "../../../components/ui/PageHeader";
import {
  Settings,
  Tag,
  Fuel,
  Bell,
  Plus,
  Pencil,
  Trash2,
  Save,
} from "lucide-react";

function SettingCard({ title, icon: Icon, color, children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="bg-white border border-neutral-border rounded-xl shadow-soft-sm overflow-hidden"
    >
      <div className="flex items-center gap-3 px-5 py-4 border-b border-neutral-border">
        <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center", color)}>
          <Icon className="w-4.5 h-4.5" strokeWidth={1.8} />
        </div>
        <h3 className="text-sm font-bold font-headings text-neutral-textMain">{title}</h3>
      </div>
      <div className="px-5 py-4">{children}</div>
    </motion.div>
  );
}

function Toggle({ label, enabled, onChange, days, onDaysChange, daysLabel = "days before" }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex-1 min-w-0 mr-4">
        <p className="text-sm font-medium text-neutral-textMain">{label}</p>
      </div>
      <div className="flex items-center gap-3">
        {enabled && (
          <div className="flex items-center gap-1.5">
            <input
              type="number"
              value={days}
              onChange={(e) => onDaysChange(Number(e.target.value))}
              className="w-16 h-8 px-2 text-sm text-center border border-neutral-border rounded-lg bg-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
            <span className="text-xs text-neutral-textMuted whitespace-nowrap">{daysLabel}</span>
          </div>
        )}
        <button
          onClick={onChange}
          className={cn(
            "relative w-11 h-6 rounded-full transition-colors flex-shrink-0",
            enabled ? "bg-primary" : "bg-neutral-border"
          )}
        >
          <div
            className={cn(
              "absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform",
              enabled ? "translate-x-[22px]" : "translate-x-0.5"
            )}
          />
        </button>
      </div>
    </div>
  );
}

export default function VehicleSettings() {
  const [categories, setCategories] = useState([
    "Heavy Truck",
    "Medium Truck",
    "Light Truck",
    "Trailer",
    "Tanker",
  ]);
  const [fuelTypes, setFuelTypes] = useState(["Diesel", "Petrol", "CNG", "Electric", "Hybrid"]);
  const [newCategory, setNewCategory] = useState("");
  const [newFuelType, setNewFuelType] = useState("");
  const [reminders, setReminders] = useState({
    maintenance: { enabled: true, days: 7 },
    insurance: { enabled: true, days: 30 },
    fitness: { enabled: false, days: 15 },
  });

  const addCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory("");
    }
  };

  const removeCategory = (cat) => {
    setCategories(categories.filter((c) => c !== cat));
  };

  const addFuelType = () => {
    if (newFuelType.trim() && !fuelTypes.includes(newFuelType.trim())) {
      setFuelTypes([...fuelTypes, newFuelType.trim()]);
      setNewFuelType("");
    }
  };

  const removeFuelType = (ft) => {
    setFuelTypes(fuelTypes.filter((f) => f !== ft));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageHeader
        title="Fleet Settings"
        subtitle="Configure fleet management preferences"
        actions={
          <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary/90 transition-colors">
            <Save className="w-4 h-4" />
            Save Settings
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SettingCard title="Company Fleet Preferences" icon={Settings} color="bg-primary/10 text-primary" delay={0.1}>
          <div className="space-y-1">
            <div className="flex items-center justify-between py-3">
              <p className="text-sm font-medium text-neutral-textMain">Company Name</p>
              <input
                type="text"
                defaultValue="TransitOps India Pvt Ltd"
                className="h-9 px-3 text-sm border border-neutral-border rounded-lg bg-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 w-56"
              />
            </div>
            <div className="flex items-center justify-between py-3">
              <p className="text-sm font-medium text-neutral-textMain">Fleet Size Limit</p>
              <input
                type="number"
                defaultValue={50}
                className="h-9 px-3 text-sm border border-neutral-border rounded-lg bg-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 w-56"
              />
            </div>
            <div className="flex items-center justify-between py-3">
              <p className="text-sm font-medium text-neutral-textMain">Default Currency</p>
              <select className="h-9 px-3 text-sm border border-neutral-border rounded-lg bg-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 w-56">
                <option>₹ INR</option>
                <option>$ USD</option>
                <option>€ EUR</option>
                <option>£ GBP</option>
              </select>
            </div>
            <div className="flex items-center justify-between py-3">
              <p className="text-sm font-medium text-neutral-textMain">Timezone</p>
              <select className="h-9 px-3 text-sm border border-neutral-border rounded-lg bg-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 w-56">
                <option>IST (UTC+5:30)</option>
                <option>GMT (UTC+0)</option>
                <option>PST (UTC-8)</option>
                <option>CST (UTC+6)</option>
              </select>
            </div>
          </div>
        </SettingCard>

        <SettingCard title="Vehicle Categories" icon={Tag} color="bg-amber-50 text-amber-600" delay={0.15}>
          <div className="space-y-2">
            {categories.map((cat) => (
              <div key={cat} className="flex items-center justify-between py-2 px-3 bg-accent-light/50 rounded-lg">
                <span className="text-sm font-medium text-neutral-textMain">{cat}</span>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 text-neutral-textMuted hover:text-primary hover:bg-primary-light rounded-lg transition-colors">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => removeCategory(cat)}
                    className="p-1.5 text-neutral-textMuted hover:text-danger hover:bg-danger-light rounded-lg transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addCategory()}
                placeholder="New category..."
                className="flex-1 h-9 px-3 text-sm border border-neutral-border rounded-lg bg-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
              <button
                onClick={addCategory}
                className="flex items-center gap-1.5 px-3 h-9 text-xs font-semibold text-primary bg-primary-light rounded-lg hover:bg-primary/15 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>
          </div>
        </SettingCard>

        <SettingCard title="Fuel Types" icon={Fuel} color="bg-emerald-50 text-emerald-600" delay={0.2}>
          <div className="space-y-2">
            {fuelTypes.map((ft) => (
              <div key={ft} className="flex items-center justify-between py-2 px-3 bg-accent-light/50 rounded-lg">
                <span className="text-sm font-medium text-neutral-textMain">{ft}</span>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 text-neutral-textMuted hover:text-primary hover:bg-primary-light rounded-lg transition-colors">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => removeFuelType(ft)}
                    className="p-1.5 text-neutral-textMuted hover:text-danger hover:bg-danger-light rounded-lg transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                value={newFuelType}
                onChange={(e) => setNewFuelType(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addFuelType()}
                placeholder="New fuel type..."
                className="flex-1 h-9 px-3 text-sm border border-neutral-border rounded-lg bg-white outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
              <button
                onClick={addFuelType}
                className="flex items-center gap-1.5 px-3 h-9 text-xs font-semibold text-primary bg-primary-light rounded-lg hover:bg-primary/15 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>
          </div>
        </SettingCard>

        <SettingCard title="Reminder Settings" icon={Bell} color="bg-purple-50 text-purple-600" delay={0.25}>
          <div className="divide-y divide-neutral-border">
            <Toggle
              label="Maintenance Reminder"
              enabled={reminders.maintenance.enabled}
              onChange={() =>
                setReminders((p) => ({
                  ...p,
                  maintenance: { ...p.maintenance, enabled: !p.maintenance.enabled },
                }))
              }
              days={reminders.maintenance.days}
              onDaysChange={(v) =>
                setReminders((p) => ({
                  ...p,
                  maintenance: { ...p.maintenance, days: v },
                }))
              }
            />
            <Toggle
              label="Insurance Expiry Reminder"
              enabled={reminders.insurance.enabled}
              onChange={() =>
                setReminders((p) => ({
                  ...p,
                  insurance: { ...p.insurance, enabled: !p.insurance.enabled },
                }))
              }
              days={reminders.insurance.days}
              onDaysChange={(v) =>
                setReminders((p) => ({
                  ...p,
                  insurance: { ...p.insurance, days: v },
                }))
              }
            />
            <Toggle
              label="Fitness Certificate Reminder"
              enabled={reminders.fitness.enabled}
              onChange={() =>
                setReminders((p) => ({
                  ...p,
                  fitness: { ...p.fitness, enabled: !p.fitness.enabled },
                }))
              }
              days={reminders.fitness.days}
              onDaysChange={(v) =>
                setReminders((p) => ({
                  ...p,
                  fitness: { ...p.fitness, days: v },
                }))
              }
            />
          </div>
        </SettingCard>
      </div>

      <div className="flex justify-end mt-6">
        <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary/90 transition-colors">
          <Save className="w-4 h-4" />
          Save Settings
        </button>
      </div>
    </motion.div>
  );
}
