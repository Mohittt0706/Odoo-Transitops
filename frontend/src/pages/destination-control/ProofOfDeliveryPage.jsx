import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import StatusBadge from "../../components/common/Badge";
import TrendIndicator from "../../components/reports/TrendIndicator";
import {
  Search, Download, ChevronUp, ChevronDown, ChevronLeft, ChevronRight,
  MoreHorizontal, Check, FileText, Camera, Image, Clock, Upload,
  FileCheck, XCircle, Eye, RotateCcw,
} from "lucide-react";
import { podRecords } from "../../data/destinationData";

export default function ProofOfDeliveryPage() {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(new Set());
  const [previewPod, setPreviewPod] = useState(null);
  const pageSize = 10;

  const filtered = useMemo(() => {
    let result = podRecords;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(r => [r.id, r.deliveryId, r.receiver, r.driver, r.vehicle, r.status, r.signedBy].some(s => s.toLowerCase().includes(q)));
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

  const verifiedCount = podRecords.filter(r => r.status === 'Verified').length;
  const pendingCount = podRecords.filter(r => r.status === 'Pending' || r.status === 'Awaiting Photo').length;
  const totalPhotos = podRecords.reduce((s, r) => s + r.photos, 0);

  const cols = [
    { key: "id", label: "POD ID" },
    { key: "deliveryId", label: "Delivery ID" },
    { key: "receiver", label: "Receiver" },
    { key: "driver", label: "Driver" },
    { key: "vehicle", label: "Vehicle" },
    { key: "deliveryTime", label: "Delivery Time" },
    { key: "signedBy", label: "Signed By" },
    { key: "signature", label: "Signature" },
    { key: "photos", label: "Photos" },
    { key: "documents", label: "Documents" },
    { key: "status", label: "Status" },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <PageHeader title="Proof of Delivery" subtitle="Manage delivery confirmations, digital signatures, and documentation"
        actions={
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary-dark transition-colors shadow-soft-sm">
              <Upload className="w-4 h-4" /> Upload POD
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neutral-border text-neutral-textMain text-sm font-bold rounded-lg hover:bg-accent-light transition-colors">
              <Download className="w-4 h-4" /> Export
            </button>
          </div>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
        {[
          { label: "Total POD Records", value: podRecords.length, icon: FileText, color: "bg-primary/10 text-primary" },
          { label: "Verified", value: verifiedCount, icon: FileCheck, color: "bg-emerald-50 text-emerald-600" },
          { label: "Pending", value: pendingCount, icon: Clock, color: "bg-amber-50 text-amber-600" },
          { label: "Total Photos", value: totalPhotos, icon: Camera, color: "bg-blue-50 text-blue-600" },
          { label: "With Signature", value: podRecords.filter(r => r.signature).length, icon: Check, color: "bg-cyan-50 text-cyan-600" },
          { label: "Success Rate", value: `${Math.round((verifiedCount / podRecords.length) * 100)}%`, icon: FileCheck, color: "bg-purple-50 text-purple-600" },
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
                placeholder="Search POD records..."
                className="w-full h-9 pl-9 pr-4 text-sm bg-neutral-light border border-neutral-border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
            </div>
            {selected.size > 0 && (
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold text-neutral-textMuted">{selected.size} selected</span>
                <button className="text-xs font-bold text-primary hover:underline">Download Selected</button>
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
                    <p className="text-sm font-medium">No POD records found</p>
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
                  <td className="px-3 py-3 font-mono text-xs text-neutral-textMuted">{row.deliveryId}</td>
                  <td className="px-3 py-3 font-bold text-neutral-textMain">{row.receiver}</td>
                  <td className="px-3 py-3 text-neutral-textMain">{row.driver}</td>
                  <td className="px-3 py-3 font-bold text-neutral-textMain whitespace-nowrap">{row.vehicle}</td>
                  <td className="px-3 py-3 text-neutral-textMuted text-xs tabular-nums whitespace-nowrap">{row.deliveryTime}</td>
                  <td className="px-3 py-3 text-neutral-textMain">{row.signedBy}</td>
                  <td className="px-3 py-3">
                    {row.signature ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        <Check className="w-3 h-3" /> Signed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                        <Clock className="w-3 h-3" /> Pending
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1">
                      <Camera className={`w-3.5 h-3.5 ${row.photos > 0 ? 'text-emerald-500' : 'text-neutral-textMuted'}`} />
                      <span className="text-xs font-bold text-neutral-textMain">{row.photos}</span>
                      {row.photos > 0 && (
                        <button onClick={() => setPreviewPod(previewPod === row.id ? null : row.id)}
                          className="ml-1 p-0.5 rounded hover:bg-accent-light text-neutral-textMuted">
                          <Eye className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1">
                      <FileText className={`w-3.5 h-3.5 ${row.documents > 0 ? 'text-primary' : 'text-neutral-textMuted'}`} />
                      <span className="text-xs font-bold text-neutral-textMain">{row.documents}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      row.status === 'Verified' ? 'bg-emerald-50 text-emerald-600' :
                      row.status === 'Uploaded' ? 'bg-blue-50 text-blue-600' :
                      row.status === 'Partially Uploaded' ? 'bg-purple-50 text-purple-600' :
                      row.status === 'Rejected' ? 'bg-red-50 text-red-600' :
                      'bg-amber-50 text-amber-600'
                    }`}>
                      {row.status === 'Verified' ? <FileCheck className="w-3 h-3" /> :
                       row.status === 'Pending' ? <Clock className="w-3 h-3" /> :
                       row.status === 'Awaiting Photo' ? <Camera className="w-3 h-3" /> :
                       row.status === 'Rejected' ? <XCircle className="w-3 h-3" /> :
                       <Upload className="w-3 h-3" />}
                      {row.status}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <button className="p-1 rounded hover:bg-accent-light text-neutral-textMuted transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
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
                return <button key={pn} onClick={() => setPage(pn)}
                  className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all ${page === pn ? 'bg-primary text-white' : 'text-neutral-textMuted hover:bg-accent-light'}`}>{pn}</button>;
              })}
              <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}
                className="p-1.5 rounded-lg hover:bg-accent-light text-neutral-textMuted disabled:opacity-30 disabled:cursor-not-allowed">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Photo Preview */}
      {previewPod && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-neutral-border rounded-xl p-4 mt-4 shadow-soft-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-neutral-textMain">POD Photos - {previewPod}</h3>
            <button onClick={() => setPreviewPod(null)} className="text-xs font-bold text-primary hover:underline">Close</button>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {Array.from({ length: Math.min(podRecords.find(r => r.id === previewPod)?.photos || 3, 5) }, (_, i) => (
              <div key={i} className="aspect-square rounded-xl bg-neutral-light border border-neutral-border flex items-center justify-center hover:border-primary transition-colors cursor-pointer">
                <Camera className="w-8 h-8 text-neutral-textMuted/40" />
              </div>
            ))}
            <div className="aspect-square rounded-xl border-2 border-dashed border-neutral-border flex items-center justify-center hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer">
              <Upload className="w-6 h-6 text-neutral-textMuted/40" />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <button className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
              <Download className="w-3.5 h-3.5" /> Download All
            </button>
            <button className="text-xs font-bold text-neutral-textMuted hover:text-primary transition-colors">
              Upload Additional Files
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
