import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import StatusBadge from "../../components/common/Badge";
import {
  Search, Download, Filter, RotateCcw, ChevronUp, ChevronDown,
  ChevronLeft, ChevronRight, Check, MoreHorizontal, Truck,
  AlertTriangle, Clock, PackageCheck, XCircle, Eye, Calendar,
  MapPin, Building2, Users, Hash, FileText, Printer,
  CheckCircle, Anchor, BarChart3, ArrowUpDown,
} from "lucide-react";
import { incomingDeliveries, dailyDeliveries, dockUtilizationHistory } from "../../data/destinationData";

const allStatuses = ['Incoming', 'On Route', 'Arrived', 'Waiting Dock', 'Dock Assigned', 'Unloading', 'Delayed', 'Completed', 'Cancelled'];
const allPriorities = ['High', 'Medium', 'Low'];
const allWarehouses = [...new Set(incomingDeliveries.map(d => d.destination))];
const allDrivers = [...new Set(incomingDeliveries.map(d => d.driver))];
const allVehicles = [...new Set(incomingDeliveries.map(d => d.vehicle))];
const allCargoTypes = [...new Set(incomingDeliveries.map(d => d.cargo))];
const allDocks = [...new Set(incomingDeliveries.map(d => d.dock))];

const statusColors = {
  'Incoming': 'bg-blue-50 text-blue-600 border-blue-200/50',
  'On Route': 'bg-amber-50 text-amber-600 border-amber-200/50',
  'Arrived': 'bg-emerald-50 text-emerald-600 border-emerald-200/50',
  'Waiting Dock': 'bg-orange-50 text-orange-600 border-orange-200/50',
  'Dock Assigned': 'bg-cyan-50 text-cyan-600 border-cyan-200/50',
  'Unloading': 'bg-purple-50 text-purple-600 border-purple-200/50',
  'Delayed': 'bg-red-50 text-red-600 border-red-200/50',
  'Completed': 'bg-green-50 text-green-600 border-green-200/50',
  'Cancelled': 'bg-slate-50 text-slate-500 border-slate-200/50',
};
const statusDots = {
  'Incoming': 'bg-blue-500', 'On Route': 'bg-amber-500', 'Arrived': 'bg-emerald-500',
  'Waiting Dock': 'bg-orange-500', 'Dock Assigned': 'bg-cyan-500', 'Unloading': 'bg-purple-500',
  'Delayed': 'bg-red-500', 'Completed': 'bg-green-500', 'Cancelled': 'bg-slate-400',
};
const priorityColors = { High: 'bg-red-50 text-red-600', Medium: 'bg-amber-50 text-amber-600', Low: 'bg-emerald-50 text-emerald-600' };

function BarChart({ data, dataKey, labelKey, height = 120, color = 'bg-primary' }) {
  const max = Math.max(...data.map(d => d[dataKey]), 1);
  return (
    <div className="flex items-end gap-1.5" style={{ height }}>
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div className="w-full rounded-t-md relative" style={{ height: `${(d[dataKey] / max) * 100}%` }}>
            <div className={`absolute inset-0 rounded-t-md ${color} opacity-80 hover:opacity-100 transition-opacity`} />
          </div>
          <span className="text-[9px] text-neutral-textMuted font-medium truncate w-full text-center">{d[labelKey]}</span>
        </div>
      ))}
    </div>
  );
}

function HorizontalBar({ data, dataKey, labelKey, height = 200, colors }) {
  const max = Math.max(...data.map(d => d[dataKey]), 1);
  return (
    <div className="space-y-2" style={{ height }}>
      {data.map((d, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="text-[10px] font-medium text-neutral-textMuted w-24 truncate text-right">{d[labelKey]}</span>
          <div className="flex-1 bg-neutral-light rounded-full h-5 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${colors ? colors[i % colors.length] : 'bg-primary'} flex items-center justify-end px-2`}
              style={{ width: `${(d[dataKey] / max) * 100}%` }}
            >
              <span className="text-[9px] text-white font-bold">{d[dataKey]}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function DonutChart({ data, size = 140 }) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const cx = size / 2, cy = size / 2, r = size * 0.38;
  const colors = ['#2563EB', '#06B6D4', '#D97706', '#059669', '#DC2626', '#7C3AED', '#BE123C', '#8B5CF6'];
  let cumulative = 0;
  const slices = data.map((d, i) => {
    const pct = d.value / total;
    const startAngle = cumulative * 360;
    cumulative += pct;
    const endAngle = cumulative * 360;
    const startRad = ((startAngle - 90) * Math.PI) / 180;
    const endRad = ((endAngle - 90) * Math.PI) / 180;
    const x1 = cx + r * Math.cos(startRad);
    const y1 = cy + r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad);
    const y2 = cy + r * Math.sin(endRad);
    const largeArc = pct > 0.5 ? 1 : 0;
    return { path: `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`, fill: colors[i % colors.length], label: d.label, value: d.value, pct: Math.round(pct * 100) };
  });
  return (
    <div className="flex items-center justify-center gap-4">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {slices.map((s, i) => <path key={i} d={s.path} fill={s.fill} stroke="white" strokeWidth="1" />)}
        <circle cx={cx} cy={cy} r={r * 0.55} fill="white" />
        <text x={cx} y={cy - 3} textAnchor="middle" fill="#1E293B" fontSize="12" fontWeight="bold">{total}</text>
        <text x={cx} y={cy + 10} textAnchor="middle" fill="#94A3B8" fontSize="9">Total</text>
      </svg>
      <div className="space-y-1">
        {slices.map((s, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: s.fill }} />
            <span className="text-[10px] text-neutral-textMuted">{s.label}</span>
            <span className="text-[10px] font-bold text-neutral-textMain">{s.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function IncomingDeliveriesPage() {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [openAction, setOpenAction] = useState(null);
  const pageSize = 10;

  const [filters, setFilters] = useState({
    date: '', warehouse: '', driver: '', vehicle: '', cargoType: '', priority: '', status: '', dock: '',
  });

  const filtered = useMemo(() => {
    let result = incomingDeliveries;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(r => [r.id, r.truck, r.driver, r.vehicle, r.source, r.destination, r.cargo, r.status, r.dock].some(s => s.toLowerCase().includes(q)));
    }
    Object.entries(filters).forEach(([key, val]) => {
      if (!val) return;
      if (key === 'date') {
        result = result.filter(r => r.arrivalTime.startsWith(val));
      } else if (key === 'warehouse') {
        result = result.filter(r => r.destination === val);
      } else if (key === 'driver') {
        result = result.filter(r => r.driver === val);
      } else if (key === 'vehicle') {
        result = result.filter(r => r.vehicle === val);
      } else if (key === 'cargoType') {
        result = result.filter(r => r.cargo === val);
      } else {
        result = result.filter(r => r[key] === val);
      }
    });
    if (sortKey) {
      result = [...result].sort((a, b) => {
        const aVal = a[sortKey], bVal = b[sortKey];
        const cmp = typeof aVal === "number" ? aVal - bVal : String(aVal).localeCompare(String(bVal));
        return sortDir === "asc" ? cmp : -cmp;
      });
    }
    return result;
  }, [search, sortKey, sortDir, filters]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
  };
  const toggleSelectAll = () => {
    if (selected.size === paginated.length) setSelected(new Set());
    else setSelected(new Set(paginated.map((_, i) => i + (page - 1) * pageSize)));
  };
  const toggleSelect = (globalIdx) => {
    const next = new Set(selected);
    next.has(globalIdx) ? next.delete(globalIdx) : next.add(globalIdx);
    setSelected(next);
  };

  const clearFilters = () => {
    setFilters({ date: '', warehouse: '', driver: '', vehicle: '', cargoType: '', priority: '', status: '', dock: '' });
    setSearch('');
    setPage(1);
  };

  const exportCSV = () => {
    const headers = ['Delivery ID','Truck Number','Driver','Vehicle','Source','Destination','Arrival Time','ETA','Assigned Dock','Cargo Type','Weight','Status','Priority'];
    const rows = filtered.map(r => [r.id, r.truck, r.driver, r.vehicle, r.source, r.destination, r.arrivalTime, r.eta, r.dock, r.cargo, r.weight, r.status, r.priority]);
    const csv = [headers.join(','), ...rows.map(r => r.map(v => `"${v}"`).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'incoming-deliveries.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  const exportPDF = () => {
    const w = window.open('', '_blank');
    const rows = filtered.map(r => `<tr><td>${r.id}</td><td>${r.truck}</td><td>${r.driver}</td><td>${r.status}</td><td>${r.priority}</td></tr>`).join('');
    w.document.write(`<html><head><title>Incoming Deliveries</title><style>table{width:100%;border-collapse:collapse}th,td{border:1px solid #ddd;padding:6px;text-align:left;font-size:12px}th{background:#BE123C;color:#fff}</style></head><body><h2>Incoming Deliveries</h2><table><thead><tr><th>ID</th><th>Truck</th><th>Driver</th><th>Status</th><th>Priority</th></tr></thead><tbody>${rows}</tbody></table></body></html>`);
    w.document.close();
  };

  const kpiData = useMemo(() => [
    { label: 'Incoming Trucks', value: incomingDeliveries.length, icon: Truck, color: 'bg-primary/10 text-primary',
      change: '0', changeType: 'up' },
    { label: 'Expected Today', value: incomingDeliveries.filter(d => {
      const today = new Date().toISOString().split('T')[0];
      return d.arrivalTime.startsWith(today);
    }).length, icon: Calendar, color: 'bg-blue-50 text-blue-600',
      change: '0', changeType: 'up' },
    { label: 'Delayed Trucks', value: incomingDeliveries.filter(d => d.status === 'Delayed').length, icon: AlertTriangle, color: 'bg-red-50 text-red-600',
      change: '0', changeType: 'down' },
    { label: 'Waiting for Dock', value: incomingDeliveries.filter(d => d.status === 'Waiting Dock').length, icon: Clock, color: 'bg-orange-50 text-orange-600',
      change: '0', changeType: 'up' },
    { label: 'Assigned Dock', value: incomingDeliveries.filter(d => d.status === 'Dock Assigned' || d.status === 'Unloading').length, icon: Anchor, color: 'bg-cyan-50 text-cyan-600',
      change: '0', changeType: 'up' },
    { label: 'Avg Arrival Time', value: '0', icon: Clock, color: 'bg-purple-50 text-purple-600',
      change: '0', changeType: 'down' },
  ], []);

  const cols = [
    { key: "id", label: "Delivery ID" },
    { key: "truck", label: "Truck Number" },
    { key: "driver", label: "Driver" },
    { key: "vehicle", label: "Vehicle" },
    { key: "source", label: "Source" },
    { key: "destination", label: "Destination" },
    { key: "arrivalTime", label: "Arrival Time" },
    { key: "eta", label: "ETA" },
    { key: "dock", label: "Assigned Dock" },
    { key: "cargo", label: "Cargo Type" },
    { key: "weight", label: "Weight" },
    { key: "status", label: "Status" },
    { key: "priority", label: "Priority" },
  ];

  const SortIcon = ({ colKey }) => sortKey !== colKey ? <ArrowUpDown className="w-3 h-3 opacity-30" /> : sortDir === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />;

  const FilterSelect = ({ label, value, options, onChange }) => (
    <select value={value} onChange={e => { onChange(e.target.value); setPage(1); }}
      className="h-8 px-2 text-[11px] bg-neutral-light border border-neutral-border rounded-lg outline-none focus:border-primary focus:ring-1 focus:ring-primary/10 transition-all">
      <option value="">All {label}</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  );

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <PageHeader title="Incoming Deliveries" subtitle="Monitor all trucks arriving at warehouse destinations."
        actions={
          <div className="flex items-center gap-2">
            <button onClick={exportCSV} className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-neutral-border text-neutral-textMain text-xs font-bold rounded-lg hover:bg-accent-light transition-colors">
              <Download className="w-3.5 h-3.5" /> CSV
            </button>
            <button onClick={exportPDF} className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-neutral-border text-neutral-textMain text-xs font-bold rounded-lg hover:bg-accent-light transition-colors">
              <FileText className="w-3.5 h-3.5" /> PDF
            </button>
            <button className="inline-flex items-center gap-1.5 px-3 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary-dark transition-colors shadow-soft-sm">
              <PackageCheck className="w-3.5 h-3.5" /> Confirm Arrival
            </button>
            <button className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-neutral-border text-danger text-xs font-bold rounded-lg hover:bg-red-50 transition-colors">
              <XCircle className="w-3.5 h-3.5" /> Reject
            </button>
          </div>
        }
      />

      {/* KPI Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
        {kpiData.map((kpi, i) => (
          <motion.div key={kpi.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="bg-white border border-neutral-border rounded-xl p-3 shadow-soft-sm">
            <div className="flex items-center gap-2 mb-1">
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${kpi.color}`}>
                <kpi.icon className="w-3.5 h-3.5" strokeWidth={1.8} />
              </div>
              <span className="text-[10px] font-semibold text-neutral-textMuted uppercase">{kpi.label}</span>
            </div>
            <div className="flex items-baseline justify-between ml-9">
              <p className="text-xl font-extrabold text-neutral-textMain tabular-nums">{kpi.value}</p>
              <span className={`text-[10px] font-bold ${kpi.changeType === 'up' ? 'text-success' : 'text-danger'}`}>{kpi.change}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <div className="bg-white border border-neutral-border rounded-xl p-4 shadow-soft-sm">
          <h3 className="text-xs font-bold text-neutral-textMain mb-3">Incoming Deliveries Per Day</h3>
          <BarChart data={dailyDeliveries} dataKey="incoming" labelKey="label" height={100} color="bg-primary" />
        </div>
        <div className="bg-white border border-neutral-border rounded-xl p-4 shadow-soft-sm">
          <h3 className="text-xs font-bold text-neutral-textMain mb-3">Arrival Trend</h3>
          <BarChart data={dailyDeliveries} dataKey="incoming" labelKey="label" height={100} color="bg-emerald-500" />
          <div className="flex items-center gap-4 mt-2 text-[10px] text-neutral-textMuted">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-primary" /> Incoming</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-emerald-500" /> Completed</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-red-500" /> Delayed</span>
          </div>
        </div>
        <div className="bg-white border border-neutral-border rounded-xl p-4 shadow-soft-sm">
          <h3 className="text-xs font-bold text-neutral-textMain mb-3">Dock Utilization</h3>
          <BarChart data={dockUtilizationHistory} dataKey="value" labelKey="label" height={100} color="bg-cyan-500" />
        </div>
        <div className="bg-white border border-neutral-border rounded-xl p-4 shadow-soft-sm">
          <h3 className="text-xs font-bold text-neutral-textMain mb-3">Delayed Deliveries</h3>
          <BarChart data={dailyDeliveries} dataKey="delayed" labelKey="label" height={100} color="bg-red-500" />
        </div>
        <div className="bg-white border border-neutral-border rounded-xl p-4 shadow-soft-sm sm:col-span-2">
          <h3 className="text-xs font-bold text-neutral-textMain mb-3">Cargo Distribution</h3>
          <DonutChart data={[]} />
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-neutral-border rounded-xl shadow-soft-sm overflow-hidden mb-4">
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-neutral-border">
          <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-1.5 text-[11px] font-bold text-neutral-textMuted hover:text-neutral-textMain transition-colors">
            <Filter className="w-3.5 h-3.5" /> Filters {showFilters ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
          {(Object.values(filters).some(v => v) || search) && (
            <button onClick={clearFilters} className="flex items-center gap-1 text-[11px] font-bold text-primary hover:underline">
              <RotateCcw className="w-3 h-3" /> Clear
            </button>
          )}
        </div>
        <AnimatePresence>
          {showFilters && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <div className="p-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
                <div>
                  <label className="text-[9px] font-bold uppercase text-neutral-textMuted block mb-1">Date</label>
                  <input type="date" value={filters.date} onChange={e => { setFilters(f => ({ ...f, date: e.target.value })); setPage(1); }}
                    className="w-full h-8 px-2 text-[11px] bg-neutral-light border border-neutral-border rounded-lg outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="text-[9px] font-bold uppercase text-neutral-textMuted block mb-1">Warehouse</label>
                  <FilterSelect label="Warehouse" value={filters.warehouse} options={allWarehouses} onChange={v => setFilters(f => ({ ...f, warehouse: v }))} />
                </div>
                <div>
                  <label className="text-[9px] font-bold uppercase text-neutral-textMuted block mb-1">Driver</label>
                  <FilterSelect label="Driver" value={filters.driver} options={allDrivers} onChange={v => setFilters(f => ({ ...f, driver: v }))} />
                </div>
                <div>
                  <label className="text-[9px] font-bold uppercase text-neutral-textMuted block mb-1">Vehicle</label>
                  <FilterSelect label="Vehicle" value={filters.vehicle} options={allVehicles} onChange={v => setFilters(f => ({ ...f, vehicle: v }))} />
                </div>
                <div>
                  <label className="text-[9px] font-bold uppercase text-neutral-textMuted block mb-1">Cargo Type</label>
                  <FilterSelect label="Cargo" value={filters.cargoType} options={allCargoTypes} onChange={v => setFilters(f => ({ ...f, cargoType: v }))} />
                </div>
                <div>
                  <label className="text-[9px] font-bold uppercase text-neutral-textMuted block mb-1">Priority</label>
                  <FilterSelect label="Priority" value={filters.priority} options={allPriorities} onChange={v => setFilters(f => ({ ...f, priority: v }))} />
                </div>
                <div>
                  <label className="text-[9px] font-bold uppercase text-neutral-textMuted block mb-1">Status</label>
                  <FilterSelect label="Status" value={filters.status} options={allStatuses} onChange={v => setFilters(f => ({ ...f, status: v }))} />
                </div>
                <div>
                  <label className="text-[9px] font-bold uppercase text-neutral-textMuted block mb-1">Dock</label>
                  <FilterSelect label="Dock" value={filters.dock} options={allDocks} onChange={v => setFilters(f => ({ ...f, dock: v }))} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Table Card */}
      <div className="bg-white border border-neutral-border rounded-xl shadow-soft-sm overflow-hidden">
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-neutral-border">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative max-w-xs flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-textMuted" />
              <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search deliveries..."
                className="w-full h-9 pl-9 pr-4 text-sm bg-neutral-light border border-neutral-border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
            </div>
            {selected.size > 0 && (
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold text-neutral-textMuted">{selected.size} selected</span>
                <button className="text-xs font-bold text-primary hover:underline">Assign Dock</button>
                <button className="text-xs font-bold text-primary hover:underline">Confirm</button>
                <button className="text-xs font-bold text-danger hover:underline">Reject</button>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowFilters(!showFilters)} className={`p-2 rounded-lg transition-colors ${showFilters ? 'bg-primary-light text-primary' : 'hover:bg-accent-light text-neutral-textMuted'}`}>
              <Filter className="w-4 h-4" />
            </button>
            <button onClick={() => { clearFilters(); setShowFilters(false); }} className="p-2 rounded-lg hover:bg-accent-light text-neutral-textMuted transition-colors">
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-border bg-slate-50/80 sticky top-0 z-10">
                <th className="w-10 px-3 py-3 bg-slate-50/80">
                  <button onClick={toggleSelectAll}
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                      selected.size === paginated.length && paginated.length > 0 ? 'bg-primary border-primary' : 'border-neutral-border hover:border-neutral-textMuted'
                    }`}>
                    {selected.size === paginated.length && paginated.length > 0 && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
                  </button>
                </th>
                {cols.map(col => (
                  <th key={col.key} onClick={() => toggleSort(col.key)}
                    className="px-3 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-neutral-textMuted cursor-pointer select-none hover:text-accent whitespace-nowrap bg-slate-50/80">
                    <span className="flex items-center gap-1">{col.label} <SortIcon colKey={col.key} /></span>
                  </th>
                ))}
                <th className="w-16 px-3 py-3 bg-slate-50/80" />
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={cols.length + 2} className="px-4 py-16 text-center">
                  <div className="text-neutral-textMuted">
                    <div className="w-12 h-12 bg-accent-light rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Search className="w-5 h-5" />
                    </div>
                    <p className="text-sm font-medium">No deliveries found</p>
                    <button onClick={clearFilters} className="text-xs text-primary font-bold mt-1 hover:underline">Clear filters</button>
                  </div>
                </td></tr>
              ) : paginated.map((row, i) => {
                const globalIdx = i + (page - 1) * pageSize;
                return (
                <motion.tr key={row.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.015 }}
                  className={`border-b border-neutral-border/50 transition-colors hover:bg-accent-light/50 ${selected.has(globalIdx) ? 'bg-primary/[0.03]' : ''}`}>
                  <td className="px-3 py-3" onClick={e => e.stopPropagation()}>
                    <button onClick={() => toggleSelect(globalIdx)}
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                        selected.has(globalIdx) ? 'bg-primary border-primary' : 'border-neutral-border hover:border-neutral-textMuted'
                      }`}>
                      {selected.has(globalIdx) && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
                    </button>
                  </td>
                  <td className="px-3 py-3 font-mono text-xs font-bold text-primary whitespace-nowrap">{row.id}</td>
                  <td className="px-3 py-3 font-bold text-neutral-textMain whitespace-nowrap">{row.truck}</td>
                  <td className="px-3 py-3 text-neutral-textMain whitespace-nowrap">{row.driver}</td>
                  <td className="px-3 py-3 text-neutral-textMuted text-xs whitespace-nowrap">{row.vehicle}</td>
                  <td className="px-3 py-3 text-neutral-textMuted">{row.source}</td>
                  <td className="px-3 py-3 text-neutral-textMuted max-w-[120px] truncate">{row.destination}</td>
                  <td className="px-3 py-3 text-neutral-textMuted text-xs tabular-nums whitespace-nowrap">{row.arrivalTime}</td>
                  <td className="px-3 py-3 font-semibold text-neutral-textMain tabular-nums">{row.eta}</td>
                  <td className="px-3 py-3 font-semibold text-primary whitespace-nowrap">{row.dock}</td>
                  <td className="px-3 py-3 text-neutral-textMain">{row.cargo}</td>
                  <td className="px-3 py-3 text-neutral-textMuted tabular-nums text-xs whitespace-nowrap">{row.weight}</td>
                  <td className="px-3 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusColors[row.status] || 'bg-accent-light text-neutral-textMuted border-neutral-border'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${statusDots[row.status] || 'bg-neutral-textMuted'}`} />
                      {row.status}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${priorityColors[row.priority] || 'bg-accent-light text-neutral-textMuted'}`}>
                      {row.priority}
                    </span>
                  </td>
                  <td className="px-3 py-3 relative">
                    <button onClick={() => setOpenAction(openAction === row.id ? null : row.id)}
                      className="p-1 rounded hover:bg-accent-light text-neutral-textMuted transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                    <AnimatePresence>
                      {openAction === row.id && (
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                          className="absolute right-0 top-full mt-1 w-44 bg-white border border-neutral-border rounded-xl shadow-lg z-20 py-1.5">
                          {[
                            { label: 'Assign Dock', icon: Anchor },
                            { label: 'Confirm Arrival', icon: CheckCircle },
                            { label: 'Reject Entry', icon: XCircle },
                            { label: 'View Details', icon: Eye },
                            { label: 'Generate Report', icon: FileText },
                            { label: 'Print Slip', icon: Printer },
                            { label: 'Export Data', icon: Download },
                          ].map(action => (
                            <button key={action.label} onClick={() => setOpenAction(null)}
                              className="w-full flex items-center gap-2 px-3 py-1.5 text-[12px] font-medium text-neutral-textMain hover:bg-accent-light transition-colors">
                              <action.icon className="w-3.5 h-3.5 text-neutral-textMuted" strokeWidth={1.8} />
                              {action.label}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </td>
                </motion.tr>
              );})}
            </tbody>
          </table>
        </div>

        {filtered.length > 0 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-neutral-border">
            <p className="text-xs text-neutral-textMuted">Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, filtered.length)} of {filtered.length}</p>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}
                className="p-1.5 rounded-lg hover:bg-accent-light text-neutral-textMuted disabled:opacity-30 disabled:cursor-not-allowed">
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pn = totalPages <= 5 ? i + 1 : page <= 3 ? i + 1 : page >= totalPages - 2 ? totalPages - 4 + i : page - 2 + i;
                return (
                  <button key={pn} onClick={() => setPage(pn)}
                    className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all ${page === pn ? 'bg-primary text-white' : 'text-neutral-textMuted hover:bg-accent-light'}`}>
                    {pn}
                  </button>
                );
              })}
              <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}
                className="p-1.5 rounded-lg hover:bg-accent-light text-neutral-textMuted disabled:opacity-30 disabled:cursor-not-allowed">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
