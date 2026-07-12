import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import ChartCard from "../../components/charts/ChartCard";
import SimpleBarChart from "../../components/charts/BarChart";
import DonutChart from "../../components/charts/PieChart";
import TrendIndicator from "../../components/reports/TrendIndicator";
import StatCard from "../../components/reports/StatCard";
import {
  Warehouse, Building2, Gauge, Ruler, Users, Package,
  Clock, Dock, Thermometer, HardDrive, ArrowUpDown, Loader,
} from "lucide-react";
import {
  dockData as rawDockData, warehouseWorkers, warehouseSections as rawSections,
  warehouseCapacityHistory, dockUtilizationHistory, workerProductivity,
  storageDistribution as rawStorageDistribution, incomingOutgoing, incomingDeliveries,
} from "../../data/destinationData";
import AssignDockModal from "./AssignDockModal";
import NewSectionModal from "./NewSectionModal";

export default function WarehousePage() {
  const [dockList, setDockList] = useState(() => rawDockData.map(d => ({ ...d })));
  const [sections, setSections] = useState(() => rawSections.map(s => ({ ...s })));
  const [storageDist, setStorageDist] = useState(() => rawStorageDistribution.map(d => ({ ...d })));
  const [showAssignDock, setShowAssignDock] = useState(false);
  const [showNewSection, setShowNewSection] = useState(false);

  const totalCapacity = useMemo(() => sections.reduce((s, sec) => s + sec.capacity, 0), [sections]);
  const totalUsed = useMemo(() => sections.reduce((s, sec) => s + sec.used, 0), [sections]);
  const availableSpace = totalCapacity - totalUsed;
  const occupancyPct = useMemo(() => Math.round((totalUsed / totalCapacity) * 100), [totalUsed, totalCapacity]);
  const activeDocks = useMemo(() => dockList.filter(d => d.status === "Occupied").length, [dockList]);
  const availableDocks = useMemo(() => dockList.filter(d => d.status === "Available").length, [dockList]);
  const activeWorkers = warehouseWorkers.filter(w => w.active).length;
  const pendingShipments = incomingDeliveries.filter(d => d.status === "Arrived" || d.status === "Docked").length;
  const avgEfficiency = Math.round(warehouseWorkers.reduce((s, w) => s + w.productivity, 0) / warehouseWorkers.length);
  const avgDockUtil = useMemo(() => Math.round(dockList.reduce((s, d) => s + d.utilization, 0) / dockList.length), [dockList]);

  const handleAssignDock = useCallback(() => {
    setDockList(rawDockData.map(d => ({ ...d })));
  }, []);

  const handleNewSection = useCallback(({ section, distribution }) => {
    rawSections.push(section);
    rawStorageDistribution.push(distribution);
    setSections(rawSections.map(s => ({ ...s })));
    setStorageDist(rawStorageDistribution.map(d => ({ ...d })));
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <PageHeader title="Warehouse Operations" subtitle="Manage warehouse capacity, docks, storage, and workforce"
        actions={
          <div className="flex items-center gap-2">
            <button onClick={() => setShowAssignDock(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary-dark transition-colors shadow-soft-sm">
              <Dock className="w-4 h-4" /> Assign Dock
            </button>
            <button onClick={() => setShowNewSection(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neutral-border text-neutral-textMain text-sm font-bold rounded-lg hover:bg-accent-light transition-colors">
              <Package className="w-4 h-4" /> New Section
            </button>
          </div>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-3 mb-5">
        <StatCard title="Total Capacity" value={`${(totalCapacity / 1000).toFixed(0)}K sqft`} icon={Ruler} change="+5%" type="up" sparklineData={[48, 50, 52, 54, 55, 56, Math.round(totalCapacity / 1000)]} color="bg-primary/10 text-primary" delay={0} />
        <StatCard title="Occupied Space" value={`${(totalUsed / 1000).toFixed(0)}K sqft`} icon={HardDrive} change="+3%" type="up" sparklineData={[32, 34, 36, 37, 38, 39, Math.round(totalUsed / 1000)]} color="bg-amber-50 text-amber-600" delay={0.02} />
        <StatCard title="Available Space" value={`${(availableSpace / 1000).toFixed(0)}K sqft`} icon={Warehouse} change="+2%" type="up" sparklineData={[16, 16, 16, 17, 17, 17, Math.round(availableSpace / 1000)]} color="bg-emerald-50 text-emerald-600" delay={0.04} />
        <StatCard title="Active Docks" value={`${activeDocks}/${dockList.length}`} icon={Dock} change="+3" type="up" sparklineData={[12, 14, 15, 13, 16, 17, activeDocks]} color="bg-blue-50 text-blue-600" delay={0.06} />
        <StatCard title="Available Docks" value={availableDocks} icon={Loader} change={availableDocks < 5 ? "-2" : "+1"} type={availableDocks < 5 ? "down" : "up"} sparklineData={[8, 7, 6, 5, 4, 3, availableDocks]} color="bg-cyan-50 text-cyan-600" delay={0.08} />
        <StatCard title="Active Workers" value={activeWorkers} icon={Users} change="+2" type="up" sparklineData={[22, 23, 24, 24, 25, 26, activeWorkers]} color="bg-purple-50 text-purple-600" delay={0.1} />
        <StatCard title="Pending Shipments" value={pendingShipments} icon={Package} change="-3" type="down" sparklineData={[18, 16, 14, 12, 11, 10, pendingShipments]} color="bg-orange-50 text-orange-600" delay={0.12} />
        <StatCard title="Efficiency" value={`${avgEfficiency}%`} icon={Gauge} change="+4%" type="up" sparklineData={[78, 80, 82, 83, 85, 86, avgEfficiency]} color="bg-teal-50 text-teal-600" delay={0.14} />
      </div>

      {/* Utilization Overview */}
      <div className="bg-white border border-neutral-border rounded-xl p-4 shadow-soft-sm mb-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-neutral-textMain">Warehouse Utilization</h3>
          <span className="text-xs font-bold text-primary">{occupancyPct}% Occupied</span>
        </div>
        <div className="w-full h-3 bg-neutral-light rounded-full overflow-hidden">
          <motion.div key={occupancyPct} initial={{ width: 0 }} animate={{ width: `${occupancyPct}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`h-full rounded-full ${occupancyPct > 85 ? "bg-red-500" : occupancyPct > 70 ? "bg-amber-500" : "bg-emerald-500"}`} />
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">
        <ChartCard title="Warehouse Load Trend" subtitle="Monthly capacity utilization" delay={0.2}
          actions={<TrendIndicator value={`${occupancyPct}% now`} type={occupancyPct > 80 ? "up" : "neutral"} />}>
          <SimpleBarChart data={warehouseCapacityHistory} color="#1E3A5F" height={160} />
        </ChartCard>

        <ChartCard title="Dock Usage" subtitle={`Current dock utilization — ${avgDockUtil}% avg`} delay={0.25}
          actions={<TrendIndicator value={`${avgDockUtil}% avg`} type="neutral" />}>
          <SimpleBarChart data={dockUtilizationHistory} color="#7C3AED" height={160} />
        </ChartCard>

        <ChartCard title="Storage Distribution" subtitle="By section type" delay={0.3}>
          <DonutChart data={storageDist} size={130} thickness={15} key={storageDist.length} />
        </ChartCard>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
        <ChartCard title="Incoming vs Outgoing" subtitle="Daily warehouse flow" delay={0.35}
          actions={<TrendIndicator value="+12% incoming" type="up" />}>
          <div className="flex items-end gap-1.5" style={{ height: 160 }}>
            {incomingOutgoing.map((d, i) => {
              const max = Math.max(...incomingOutgoing.flatMap(d => [d.incoming, d.outgoing]));
              return (
                <div key={d.label} className="flex-1 flex flex-col items-center gap-0.5 group">
                  <div className="relative flex-1 flex items-end w-full gap-0.5">
                    <motion.div initial={{ height: 0 }} animate={{ height: (d.incoming / max) * 136 }}
                      transition={{ delay: 0.4 + i * 0.03, duration: 0.4 }}
                      className="flex-1 rounded-t-sm bg-primary/60 group-hover:bg-primary transition-colors cursor-pointer" />
                    <motion.div initial={{ height: 0 }} animate={{ height: (d.outgoing / max) * 136 }}
                      transition={{ delay: 0.45 + i * 0.03, duration: 0.4 }}
                      className="flex-1 rounded-t-sm bg-emerald-500/60 group-hover:bg-emerald-500 transition-colors cursor-pointer" />
                  </div>
                  <span className="text-[8px] text-neutral-textMuted font-medium">{d.label}</span>
                </div>
              );
            })}
          </div>
        </ChartCard>

        <ChartCard title="Worker Productivity" subtitle="Top performing workers" delay={0.4}
          actions={<TrendIndicator value={`${avgEfficiency}% avg`} type="up" />}>
          <SimpleBarChart data={workerProductivity.slice(0, 6).map(w => ({ label: w.name.split(" ")[0], value: w.value }))} color="#059669" height={160} />
        </ChartCard>
      </div>

      {/* Dock Status Grid */}
      <ChartCard title="Dock Status Overview" subtitle={`${dockList.length} docks — ${activeDocks} active`} delay={0.45}
        actions={<TrendIndicator value={`${availableDocks} available`} type={availableDocks > 3 ? "up" : "down"} />}>
        <div className="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-10 gap-2">
          {dockList.map((dock, i) => (
            <motion.div key={dock.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.01 }}
              className={`p-2 rounded-lg border text-center transition-all cursor-pointer ${
                dock.status === "Available" ? "border-emerald-200 bg-emerald-50 hover:bg-emerald-100" :
                dock.status === "Occupied" ? "border-blue-200 bg-blue-50 hover:bg-blue-100" :
                dock.status === "Reserved" ? "border-amber-200 bg-amber-50 hover:bg-amber-100" :
                "border-slate-200 bg-slate-50 hover:bg-slate-100"
              }`}>
              <p className="text-[9px] font-bold text-neutral-textMain">{dock.name}</p>
              <div className="w-full h-1 bg-white rounded-full mt-1 overflow-hidden">
                <div className={`h-full rounded-full ${dock.status === "Available" ? "bg-emerald-500 w-full" : dock.status === "Occupied" ? "bg-blue-500" : dock.status === "Reserved" ? "bg-amber-500" : "bg-slate-300"}`}
                  style={{ width: `${dock.utilization}%` }} />
              </div>
              <p className="text-[7px] text-neutral-textMuted mt-0.5 truncate">{dock.currentVehicle || dock.status}</p>
            </motion.div>
          ))}
        </div>
      </ChartCard>

      {/* Storage Sections */}
      <ChartCard title="Storage Sections" subtitle="Capacity utilization by section" delay={0.55}>
        <div className="space-y-2.5">
          {sections.map((sec, i) => {
            const pct = Math.round((sec.used / sec.capacity) * 100);
            return (
              <motion.div key={sec.name} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 0.6 + i * 0.04 }}
                className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${sec.type === "Cold" ? "bg-cyan-500" : sec.type === "Controlled" ? "bg-purple-500" : sec.type === "Ventilated" ? "bg-amber-500" : "bg-primary"}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs font-bold text-neutral-textMain truncate">{sec.name}</span>
                    <span className="text-[10px] font-bold text-neutral-textMuted">{sec.used.toLocaleString()} / {sec.capacity.toLocaleString()} sqft</span>
                  </div>
                  <div className="w-full h-2 bg-neutral-light rounded-full overflow-hidden">
                    <motion.div key={`${sec.name}-${pct}`} initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                      transition={{ delay: 0.65 + i * 0.04, duration: 0.6 }}
                      className={`h-full rounded-full ${pct > 85 ? "bg-red-500" : pct > 70 ? "bg-amber-500" : "bg-emerald-500"}`} />
                  </div>
                </div>
                <span className="text-[10px] font-bold text-neutral-textMuted w-10 text-right">{pct}%</span>
              </motion.div>
            );
          })}
        </div>
      </ChartCard>

      {/* Modals */}
      <AssignDockModal
        open={showAssignDock}
        onClose={() => setShowAssignDock(false)}
        onAssign={handleAssignDock}
        dockData={dockList}
        incomingDeliveries={incomingDeliveries}
        warehouseWorkers={warehouseWorkers}
      />

      <NewSectionModal
        open={showNewSection}
        onClose={() => setShowNewSection(false)}
        onCreate={handleNewSection}
        warehouseSections={sections}
      />
    </motion.div>
  );
}
