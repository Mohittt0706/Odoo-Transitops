import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../utils/utils";
import {
  Filter,
  X,
  Calendar,
  ChevronDown,
  RotateCcw,
  Search,
} from "lucide-react";

const datePresets = [
  { label: "Today", days: 0 },
  { label: "Yesterday", days: 1 },
  { label: "Last 7 Days", days: 7 },
  { label: "Last 30 Days", days: 30 },
  { label: "This Month", days: null },
  { label: "Previous Month", days: null },
  { label: "Quarter", days: 90 },
  { label: "Year", days: 365 },
];

const vehicles = ["All Vehicles", "Volvo FH16", "Scania R500", "Mercedes Actros", "MAN TGX", "DAF XF", "Kenworth T680"];
const drivers = ["All Drivers", "Rajesh Kumar", "Suresh Patel", "Vikram Singh", "Anil Sharma", "Deepak Verma", "Jose Garcia"];
const departments = ["All Departments", "Transport", "Logistics", "Warehouse", "Maintenance", "Admin"];
const categories = ["All Categories", "Fleet", "Fuel", "Revenue", "Maintenance", "Driver", "Trip", "Safety"];
const statuses = ["All Statuses", "Active", "Pending", "Completed", "Cancelled"];
const fuelTypes = ["All Types", "Diesel", "Gasoline", "Electric", "Hybrid", "CNG"];

export default function FilterPanel({ onFilterChange, className }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activePreset, setActivePreset] = useState("Last 30 Days");
  const [filters, setFilters] = useState({
    vehicle: "All Vehicles",
    driver: "All Drivers",
    department: "All Departments",
    category: "All Categories",
    status: "All Statuses",
    fuelType: "All Types",
    dateRange: "Last 30 Days",
    customStart: "",
    customEnd: "",
    search: "",
  });

  const updateFilter = (key, value) => {
    const next = { ...filters, [key]: value };
    setFilters(next);
    onFilterChange?.(next);
  };

  const resetFilters = () => {
    const reset = {
      vehicle: "All Vehicles",
      driver: "All Drivers",
      department: "All Departments",
      category: "All Categories",
      status: "All Statuses",
      fuelType: "All Types",
      dateRange: "Last 30 Days",
      customStart: "",
      customEnd: "",
      search: "",
    };
    setFilters(reset);
    setActivePreset("Last 30 Days");
    onFilterChange?.(reset);
  };

  const activeCount = Object.values(filters).filter(v => v && v !== "All Vehicles" && v !== "All Drivers" && v !== "All Departments" && v !== "All Categories" && v !== "All Statuses" && v !== "All Types" && v !== "Last 30 Days").length;

  return (
    <div className={cn("bg-white border border-neutral-border rounded-xl shadow-soft-sm", className)}>
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-textMuted" />
            <input
              value={filters.search}
              onChange={(e) => updateFilter("search", e.target.value)}
              placeholder="Search reports..."
              className="w-full h-9 pl-9 pr-4 text-sm bg-neutral-light border border-neutral-border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
            />
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-lg border transition-all",
              isOpen
                ? "bg-primary text-white border-primary"
                : "bg-white text-neutral-textMuted border-neutral-border hover:border-primary hover:text-primary"
            )}
          >
            <Filter className="w-4 h-4" />
            Filters
            {activeCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-primary/20 text-white text-[10px] flex items-center justify-center">{activeCount}</span>
            )}
          </button>
          {activeCount > 0 && (
            <button onClick={resetFilters} className="p-2 rounded-lg hover:bg-accent-light text-neutral-textMuted hover:text-danger transition-colors">
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-neutral-border"
          >
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="text-[11px] font-bold text-neutral-textMuted uppercase tracking-wider mb-1.5 block">Date Range</label>
                <div className="flex flex-wrap gap-1.5">
                  {datePresets.map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() => { setActivePreset(preset.label); updateFilter("dateRange", preset.label); }}
                      className={cn(
                        "px-2.5 py-1.5 text-[11px] font-semibold rounded-lg border transition-all",
                        activePreset === preset.label
                          ? "bg-primary text-white border-primary"
                          : "bg-white text-neutral-textMuted border-neutral-border hover:border-primary hover:text-primary"
                      )}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-[11px] font-bold text-neutral-textMuted uppercase tracking-wider mb-1.5 block">Vehicle</label>
                <select
                  value={filters.vehicle}
                  onChange={(e) => updateFilter("vehicle", e.target.value)}
                  className="w-full h-9 px-3 text-sm bg-neutral-light border border-neutral-border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                >
                  {vehicles.map((v) => <option key={v}>{v}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[11px] font-bold text-neutral-textMuted uppercase tracking-wider mb-1.5 block">Driver</label>
                <select
                  value={filters.driver}
                  onChange={(e) => updateFilter("driver", e.target.value)}
                  className="w-full h-9 px-3 text-sm bg-neutral-light border border-neutral-border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                >
                  {drivers.map((d) => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[11px] font-bold text-neutral-textMuted uppercase tracking-wider mb-1.5 block">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => updateFilter("category", e.target.value)}
                  className="w-full h-9 px-3 text-sm bg-neutral-light border border-neutral-border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                >
                  {categories.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[11px] font-bold text-neutral-textMuted uppercase tracking-wider mb-1.5 block">Department</label>
                <select
                  value={filters.department}
                  onChange={(e) => updateFilter("department", e.target.value)}
                  className="w-full h-9 px-3 text-sm bg-neutral-light border border-neutral-border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                >
                  {departments.map((d) => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[11px] font-bold text-neutral-textMuted uppercase tracking-wider mb-1.5 block">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => updateFilter("status", e.target.value)}
                  className="w-full h-9 px-3 text-sm bg-neutral-light border border-neutral-border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                >
                  {statuses.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[11px] font-bold text-neutral-textMuted uppercase tracking-wider mb-1.5 block">Fuel Type</label>
                <select
                  value={filters.fuelType}
                  onChange={(e) => updateFilter("fuelType", e.target.value)}
                  className="w-full h-9 px-3 text-sm bg-neutral-light border border-neutral-border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                >
                  {fuelTypes.map((f) => <option key={f}>{f}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[11px] font-bold text-neutral-textMuted uppercase tracking-wider mb-1.5 block">Custom Range</label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={filters.customStart}
                    onChange={(e) => updateFilter("customStart", e.target.value)}
                    className="flex-1 h-9 px-3 text-sm bg-neutral-light border border-neutral-border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />
                  <input
                    type="date"
                    value={filters.customEnd}
                    onChange={(e) => updateFilter("customEnd", e.target.value)}
                    className="flex-1 h-9 px-3 text-sm bg-neutral-light border border-neutral-border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
