import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import StatusBadge from "../../components/common/Badge";
import TrendIndicator from "../../components/reports/TrendIndicator";
import {
  Search, Download, Filter, RotateCcw, ChevronUp, ChevronDown,
  ChevronLeft, ChevronRight, Check, MoreHorizontal, Truck,
  AlertTriangle, Clock, PackageCheck, XCircle, Eye,
} from "lucide-react";
import { incomingDeliveries } from "../../data/destinationData";

export default function IncomingDeliveriesPage() {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(new Set());
  const pageSize = 10;

  const filtered = useMemo(() => {
    let result = incomingDeliveries;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(r => [r.id, r.truck, r.driver, r.source, r.destination, r.cargo, r.status, r.dock].some(s => s.toLowerCase().includes(q)));
    }
    if (sortKey) {
      result = [...result].sort((a, b) => {
        const aVal = a[sortKey], bVal = b[sortKey];
        const cmp = typeof aVal === "number" ? aVal - bVal : String(aVal).localeCompare(String(bVal));
        return sortDir === "asc" ? cmp : -cmp;
      });
    }
    return result;
  }, [search, sortKey, sortDir]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
  };
  const toggleSelectAll = () => {
    if (selected.size === paginated.length) setSelected(new Set());
    else setSelected(new Set(paginated.map((_, i) => i)));
  };
  const toggleSelect = (i) => {
    const next = new Set(selected);
    next.has(i) ? next.delete(i) : next.add(i);
    setSelected(next);
  };

  const SortIcon = ({ colKey }) => sortKey !== colKey ? null : sortDir === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />;

  const statusColors = {
    'In Transit': 'bg-primary-light text-primary',
    'Arrived': 'bg-emerald-50 text-emerald-600',
    'Docked': 'bg-blue-50 text-blue-600',
    'Unloading': 'bg-amber-50 text-amber-600',
    'Delayed': 'bg-red-50 text-red-600',
  };
  const priorityColors = { High: 'bg-red-50 text-red-600', Medium: 'bg-amber-50 text-amber-600', Low: 'bg-emerald-50 text-emerald-600' };

  const cols = [
    { key: "id", label: "Delivery ID" },
    { key: "truck", label: "Truck Number" },
    { key: "driver", label: "Driver" },
    { key: "source", label: "Source" },
    { key: "destination", label: "Destination" },
    { key: "arrivalTime", label: "Arrival Time" },
    { key: "eta", label: "ETA" },
    { key: "dock", label: "Dock" },
    { key: "cargo", label: "Cargo" },
    { key: "weight", label: "Weight" },
    { key: "priority", label: "Priority" },
    { key: "status", label: "Status" },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <PageHeader title="Incoming Deliveries" subtitle="Track and manage inbound shipments in real-time"
        actions={
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary-dark transition-colors shadow-soft-sm">
              <PackageCheck className="w-4 h-4" /> Confirm
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neutral-border text-danger text-sm font-bold rounded-lg hover:bg-red-50 transition-colors">
              <XCircle className="w-4 h-4" /> Reject
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neutral-border text-neutral-textMain text-sm font-bold rounded-lg hover:bg-accent-light transition-colors">
              <Download className="w-4 h-4" /> Export
            </button>
          </div>
        }
      />

      {/* KPI Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 mb-4">
        {[
          { label: "Total Incoming", value: incomingDeliveries.length, icon: Truck, color: "bg-primary/10 text-primary" },
          { label: "In Transit", value: incomingDeliveries.filter(d => d.status === 'In Transit').length, icon: Truck, color: "bg-blue-50 text-blue-600" },
          { label: "Arrived", value: incomingDeliveries.filter(d => d.status === 'Arrived').length, icon: CheckCircle, color: "bg-emerald-50 text-emerald-600" },
          { label: "Docked", value: incomingDeliveries.filter(d => d.status === 'Docked').length, icon: PackageCheck, color: "bg-cyan-50 text-cyan-600" },
          { label: "Delayed", value: incomingDeliveries.filter(d => d.status === 'Delayed').length, icon: AlertTriangle, color: "bg-red-50 text-red-600" },
          { label: "On Time Rate", value: `${Math.round((incomingDeliveries.filter(d => d.status !== 'Delayed').length / incomingDeliveries.length) * 100)}%`, icon: Clock, color: "bg-purple-50 text-purple-600" },
        ].map((kpi, i) => (
          <motion.div key={kpi.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="bg-white border border-neutral-border rounded-xl p-3 shadow-soft-sm">
            <div className="flex items-center gap-2 mb-1">
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${kpi.color}`}>
                <kpi.icon className="w-3.5 h-3.5" strokeWidth={1.8} />
              </div>
              <span className="text-[10px] font-semibold text-neutral-textMuted uppercase">{kpi.label}</span>
            </div>
            <p className="text-xl font-extrabold text-neutral-textMain tabular-nums ml-9">{kpi.value}</p>
          </motion.div>
        ))}
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
                <button className="text-xs font-bold text-danger hover:underline">Reject</button>
              </div>
            )}
          </div>
          <button onClick={() => setPage(1)} className="p-2 rounded-lg hover:bg-accent-light text-neutral-textMuted transition-colors">
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-border bg-slate-50/80 sticky top-0">
                <th className="w-10 px-3 py-3">
                  <button onClick={toggleSelectAll}
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                      selected.size === paginated.length && paginated.length > 0 ? 'bg-primary border-primary' : 'border-neutral-border hover:border-neutral-textMuted'
                    }`}>
                    {selected.size === paginated.length && paginated.length > 0 && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
                  </button>
                </th>
                {cols.map(col => (
                  <th key={col.key} onClick={() => toggleSort(col.key)}
                    className="px-3 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-neutral-textMuted cursor-pointer select-none hover:text-accent whitespace-nowrap">
                    <span className="flex items-center gap-1">{col.label} <SortIcon colKey={col.key} /></span>
                  </th>
                ))}
                <th className="w-12 px-3 py-3" />
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
                  </div>
                </td></tr>
              ) : paginated.map((row, i) => (
                <motion.tr key={row.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.015 }}
                  className={`border-b border-neutral-border/50 transition-colors hover:bg-accent-light/50 ${selected.has(i) ? 'bg-primary/[0.03]' : ''}`}>
                  <td className="px-3 py-3" onClick={e => e.stopPropagation()}>
                    <button onClick={() => toggleSelect(i)}
                      className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                        selected.has(i) ? 'bg-primary border-primary' : 'border-neutral-border hover:border-neutral-textMuted'
                      }`}>
                      {selected.has(i) && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
                    </button>
                  </td>
                  <td className="px-3 py-3 font-mono text-xs font-bold text-primary">{row.id}</td>
                  <td className="px-3 py-3 font-bold text-neutral-textMain whitespace-nowrap">{row.truck}</td>
                  <td className="px-3 py-3 text-neutral-textMain">{row.driver}</td>
                  <td className="px-3 py-3 text-neutral-textMuted">{row.source}</td>
                  <td className="px-3 py-3 text-neutral-textMuted max-w-[120px] truncate">{row.destination}</td>
                  <td className="px-3 py-3 text-neutral-textMuted text-xs tabular-nums whitespace-nowrap">{row.arrivalTime}</td>
                  <td className="px-3 py-3 font-semibold text-neutral-textMain tabular-nums">{row.eta}</td>
                  <td className="px-3 py-3 font-semibold text-primary">{row.dock}</td>
                  <td className="px-3 py-3 text-neutral-textMain">{row.cargo}</td>
                  <td className="px-3 py-3 text-neutral-textMuted tabular-nums text-xs">{row.weight}</td>
                  <td className="px-3 py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${priorityColors[row.priority] || 'bg-accent-light text-neutral-textMuted'}`}>
                      {row.priority}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold ${statusColors[row.status] || 'bg-accent-light text-neutral-textMuted'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${dotColor(row.status)}`} />
                      {row.status}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <div className="relative">
                      <button className="p-1 rounded hover:bg-accent-light text-neutral-textMuted transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
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

function dotColor(s) {
  const map = { 'In Transit': 'bg-primary', 'Arrived': 'bg-emerald-500', 'Docked': 'bg-blue-500', 'Unloading': 'bg-amber-500', 'Delayed': 'bg-red-500' };
  return map[s] || 'bg-neutral-textMuted';
}
