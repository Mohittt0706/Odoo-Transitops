import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import StatusBadge from "../../components/common/Badge";
import {
  Search, Download, ChevronUp, ChevronDown, ChevronLeft, ChevronRight,
  MoreHorizontal, Users, UserCheck, Truck, Clock, Star, Phone,
  Mail, CheckCircle, XCircle, Shield, Plus, RotateCcw,
} from "lucide-react";
import { receivers } from "../../data/destinationData";

export default function ReceiversPage() {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filtered = useMemo(() => {
    let result = receivers;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(r => [r.name, r.contact, r.phone, r.email, r.address].some(s => s.toLowerCase().includes(q)));
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

  const SortIcon = ({ colKey }) => sortKey !== colKey ? null : sortDir === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />;

  const verifiedCount = receivers.filter(r => r.verified).length;
  const totalPendingDeliveries = receivers.reduce((s, r) => s + r.pendingDeliveries, 0);
  const totalDeliveries = receivers.reduce((s, r) => s + r.totalDeliveries, 0);

  const cols = [
    { key: "name", label: "Company" },
    { key: "contact", label: "Contact Person" },
    { key: "phone", label: "Phone" },
    { key: "email", label: "Email" },
    { key: "verified", label: "Verified" },
    { key: "totalDeliveries", label: "Received" },
    { key: "pendingDeliveries", label: "Pending" },
    { key: "rating", label: "Rating" },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <PageHeader title="Receivers" subtitle="Manage clients, delivery recipients, and verification status"
        actions={
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary-dark transition-colors shadow-soft-sm">
              <Plus className="w-4 h-4" /> Add Receiver
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neutral-border text-neutral-textMain text-sm font-bold rounded-lg hover:bg-accent-light transition-colors">
              <Download className="w-4 h-4" /> Export
            </button>
          </div>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
        {[
          { label: "Total Receivers", value: receivers.length, icon: Users, color: "bg-primary/10 text-primary" },
          { label: "Verified", value: verifiedCount, icon: Shield, color: "bg-emerald-50 text-emerald-600" },
          { label: "Unverified", value: receivers.length - verifiedCount, icon: XCircle, color: "bg-amber-50 text-amber-600" },
          { label: "Total Deliveries", value: totalDeliveries, icon: Truck, color: "bg-blue-50 text-blue-600" },
          { label: "Pending Deliveries", value: totalPendingDeliveries, icon: Clock, color: "bg-red-50 text-red-600" },
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

      {/* Table */}
      <div className="bg-white border border-neutral-border rounded-xl shadow-soft-sm overflow-hidden">
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-neutral-border">
          <div className="relative max-w-xs flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-textMuted" />
            <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search receivers..."
              className="w-full h-9 pl-9 pr-4 text-sm bg-neutral-light border border-neutral-border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
          </div>
          <button onClick={() => setPage(1)} className="p-2 rounded-lg hover:bg-accent-light text-neutral-textMuted transition-colors">
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-border bg-slate-50/80 sticky top-0">
                {cols.map(col => (
                  <th key={col.key} onClick={() => toggleSort(col.key)}
                    className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-neutral-textMuted cursor-pointer select-none hover:text-accent whitespace-nowrap">
                    <span className="flex items-center gap-1">{col.label} <SortIcon colKey={col.key} /></span>
                  </th>
                ))}
                <th className="w-12 px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr><td colSpan={cols.length + 1} className="px-4 py-16 text-center">
                  <div className="text-neutral-textMuted">
                    <div className="w-12 h-12 bg-accent-light rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Search className="w-5 h-5" />
                    </div>
                    <p className="text-sm font-medium">No receivers found</p>
                  </div>
                </td></tr>
              ) : paginated.map((row, i) => (
                <motion.tr key={row.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.015 }}
                  className="border-b border-neutral-border/50 transition-colors hover:bg-accent-light/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                        {row.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-neutral-textMain">{row.name}</p>
                        <p className="text-[10px] text-neutral-textMuted">{row.address}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-neutral-textMuted" />
                      <span className="text-sm text-neutral-textMain">{row.contact}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 text-neutral-textMuted">
                      <Phone className="w-3.5 h-3.5" />
                      <span className="text-xs">{row.phone}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 text-neutral-textMuted">
                      <Mail className="w-3.5 h-3.5" />
                      <span className="text-xs">{row.email}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {row.verified ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600">
                        <CheckCircle className="w-3 h-3" /> Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-600">
                        <XCircle className="w-3 h-3" /> Unverified
                      </span>
                    )}
                    {row.verificationDate && (
                      <p className="text-[9px] text-neutral-textMuted mt-0.5">{row.verificationDate}</p>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-bold text-neutral-textMain">{row.totalDeliveries}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-sm font-bold ${row.pendingDeliveries > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                      {row.pendingDeliveries}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Star className={`w-3.5 h-3.5 ${row.rating >= 4.5 ? 'text-amber-400 fill-amber-400' : row.rating >= 4 ? 'text-amber-400' : 'text-neutral-textMuted'}`} />
                      <span className="text-sm font-bold text-neutral-textMain">{row.rating}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
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
    </motion.div>
  );
}
