import { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import {
  Search, Download, ChevronUp, ChevronDown, ChevronLeft, ChevronRight,
  MoreHorizontal, Users, UserCheck, Truck, Clock, Star, Phone,
  Mail, CheckCircle, XCircle, Shield, Plus, RotateCcw, Filter,
  Eye, Edit, AlertTriangle, Trash2, FileText,
} from "lucide-react";
import { receiverService } from "../../services/receiver.service";
import AddReceiverModal from "./AddReceiverModal";
import {
  ViewReceiverModal, EditReceiverModal, VerifyReceiverModal,
  SuspendReceiverModal, DeleteReceiverModal,
} from "./ReceiverActionModals";

export default function ReceiversPage() {
  const [receiverList, setReceiverList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReceivers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await receiverService.getAll();
      setReceiverList((res.data.receivers || []).map(r => ({ ...r, status: r.status || "active" })));
    } catch (e) {
      setReceiverList([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchReceivers(); }, [fetchReceivers]);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [openAction, setOpenAction] = useState(null);
  const [filterStatus, setFilterStatus] = useState("");

  const [viewReceiver, setViewReceiver] = useState(null);
  const [editReceiver, setEditReceiver] = useState(null);
  const [verifyReceiver, setVerifyReceiver] = useState(null);
  const [suspendReceiver, setSuspendReceiver] = useState(null);
  const [deleteReceiver, setDeleteReceiver] = useState(null);

  const pageSize = 10;

  const filtered = useMemo(() => {
    let result = receiverList;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(r =>
        [r.name, r.contact, r.phone, r.email, r.address, r.companyCode, r.id]
          .some(s => s?.toLowerCase().includes(q))
      );
    }
    if (filterStatus) {
      result = result.filter(r => {
        if (filterStatus === "verified") return r.verified;
        if (filterStatus === "unverified") return !r.verified;
        if (filterStatus === "suspended") return r.status === "suspended";
        if (filterStatus === "active") return r.status !== "suspended";
        return true;
      });
    }
    if (sortKey) {
      result = [...result].sort((a, b) => {
        const aVal = a[sortKey], bVal = b[sortKey];
        const cmp = typeof aVal === "number" ? aVal - bVal : String(aVal).localeCompare(String(bVal));
        return sortDir === "asc" ? cmp : -cmp;
      });
    }
    return result;
  }, [receiverList, search, sortKey, sortDir, filterStatus]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
  };

  const SortIcon = ({ colKey }) => sortKey !== colKey
    ? <ChevronUp className="w-3 h-3 opacity-0 group-hover:opacity-30" />
    : sortDir === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />;

  const handleAddReceiver = async (formData) => {
    try {
      const res = await receiverService.create(formData);
      setReceiverList(prev => [res.data, ...prev]);
    } catch (e) {
      return { error: e?.response?.data?.message || "Failed to create receiver" };
    }
  };

  const handleDelete = async (id) => {
    try {
      await receiverService.remove(id);
      setReceiverList(prev => prev.filter(r => r._id !== id && r.id !== id));
    } catch (e) {
      // ignore
    }
  };

  const refreshList = () => fetchReceivers();

  const verifiedCount = receiverList.filter(r => r.verified).length;
  const totalPendingDeliveries = receiverList.reduce((s, r) => s + r.pendingDeliveries, 0);
  const totalDeliveries = receiverList.reduce((s, r) => s + r.totalDeliveries, 0);

  const exportData = (format) => {
    const headers = ["Company", "Contact Person", "Phone", "Email", "Address", "Verified", "Total Deliveries", "Pending", "Rating", "Status", "ID"];
    const rows = filtered.map(r => [r.name, r.contact, r.phone, r.email, r.address, r.verified ? "Yes" : "No", r.totalDeliveries, r.pendingDeliveries, r.rating, r.status || "active", r.id]);

    if (format === "csv") {
      const csv = [headers.join(","), ...rows.map(r => r.map(v => `"${v}"`).join(","))].join("\n");
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a"); a.href = url; a.download = "receivers.csv"; a.click();
      URL.revokeObjectURL(url);
    } else if (format === "xlsx") {
      const csv = [headers.join("\t"), ...rows.map(r => r.join("\t"))].join("\n");
      const blob = new Blob([csv], { type: "application/vnd.ms-excel" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a"); a.href = url; a.download = "receivers.xls"; a.click();
      URL.revokeObjectURL(url);
    } else if (format === "pdf") {
      const w = window.open("", "_blank");
      const tableRows = rows.map(r => `<tr>${r.map(c => `<td style="border:1px solid #ddd;padding:4px;font-size:11px">${c}</td>`).join("")}</tr>`).join("");
      w.document.write(`<html><head><title>Receivers</title><style>table{width:100%;border-collapse:collapse}th{background:#BE123C;color:#fff;padding:6px;font-size:11px;text-align:left}</style></head><body><h2>Receivers List</h2><table><thead><tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr></thead><tbody>${tableRows}</tbody></table></body></html>`);
      w.document.close();
    }
  };

  const cols = [
    { key: "name", label: "Company" },
    { key: "contact", label: "Contact Person" },
    { key: "phone", label: "Phone" },
    { key: "email", label: "Email" },
    { key: "verified", label: "Verification Status" },
    { key: "totalDeliveries", label: "Received" },
    { key: "pendingDeliveries", label: "Pending" },
    { key: "rating", label: "Rating" },
  ];

  const rowActions = [
    { label: "View Details", icon: Eye, action: (r) => setViewReceiver(r) },
    { label: "Edit Receiver", icon: Edit, action: (r) => setEditReceiver(r) },
    { label: "Verify Receiver", icon: Shield, action: (r) => setVerifyReceiver(r) },
    { label: "Suspend Receiver", icon: AlertTriangle, action: (r) => setSuspendReceiver(r) },
    { label: "Delete Receiver", icon: Trash2, action: (r) => setDeleteReceiver(r), danger: true },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <PageHeader title="Receivers" subtitle="Manage clients, delivery recipients, and verification status"
        actions={
          <div className="flex items-center gap-2">
            <button onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary-dark transition-colors shadow-soft-sm">
              <Plus className="w-4 h-4" /> Add Receiver
            </button>
            <div className="relative group">
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neutral-border text-neutral-textMain text-sm font-bold rounded-lg hover:bg-accent-light transition-colors">
                <Download className="w-4 h-4" /> Export
              </button>
              <div className="absolute right-0 top-full mt-1 w-36 bg-white border border-neutral-border rounded-xl shadow-lg z-20 py-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <button onClick={() => exportData("csv")} className="w-full flex items-center gap-2 px-3 py-1.5 text-[12px] font-medium text-neutral-textMain hover:bg-accent-light transition-colors">
                  Export as CSV
                </button>
                <button onClick={() => exportData("xlsx")} className="w-full flex items-center gap-2 px-3 py-1.5 text-[12px] font-medium text-neutral-textMain hover:bg-accent-light transition-colors">
                  Export as Excel
                </button>
                <button onClick={() => exportData("pdf")} className="w-full flex items-center gap-2 px-3 py-1.5 text-[12px] font-medium text-neutral-textMain hover:bg-accent-light transition-colors">
                  Export as PDF
                </button>
              </div>
            </div>
          </div>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
        {[
          { label: "Total Receivers", value: receiverList.length, icon: Users, color: "bg-primary/10 text-primary" },
          { label: "Verified", value: verifiedCount, icon: Shield, color: "bg-emerald-50 text-emerald-600" },
          { label: "Unverified", value: receiverList.length - verifiedCount, icon: XCircle, color: "bg-amber-50 text-amber-600" },
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
          <div className="flex items-center gap-3 flex-1">
            <div className="relative max-w-xs flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-textMuted" />
              <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search by company, contact, email, phone..."
                className="w-full h-9 pl-9 pr-4 text-sm bg-neutral-light border border-neutral-border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
            </div>
            <select value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }}
              className="h-9 px-3 text-xs bg-neutral-light border border-neutral-border rounded-lg outline-none focus:border-primary transition-all">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="verified">Verified</option>
              <option value="unverified">Unverified</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
          <button onClick={() => { setPage(1); setSearch(""); setFilterStatus(""); }}
            className="p-2 rounded-lg hover:bg-accent-light text-neutral-textMuted transition-colors">
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-border bg-slate-50/80 sticky top-0">
                {cols.map(col => (
                  <th key={col.key} onClick={() => toggleSort(col.key)}
                    className="group px-4 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-neutral-textMuted cursor-pointer select-none hover:text-accent whitespace-nowrap bg-slate-50/80">
                    <span className="flex items-center gap-1">{col.label} <SortIcon colKey={col.key} /></span>
                  </th>
                ))}
                <th className="w-16 px-4 py-3 bg-slate-50/80" />
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
                    <button onClick={() => setShowAddModal(true)} className="text-xs text-primary font-bold mt-1 hover:underline">Add a new receiver</button>
                  </div>
                </td></tr>
              ) : paginated.map((row, i) => (
                <motion.tr key={row.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.015 }}
                  className={`border-b border-neutral-border/50 transition-colors hover:bg-accent-light/50 ${row.status === "suspended" ? "opacity-60" : ""}`}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${row.verified ? "bg-emerald-50 text-emerald-600" : "bg-primary/10 text-primary"}`}>
                        {row.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-neutral-textMain">{row.name}</p>
                        <p className="text-[10px] text-neutral-textMuted">{row.companyCode || row.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-neutral-textMuted flex-shrink-0" />
                      <div>
                        <span className="text-sm text-neutral-textMain">{row.contact}</span>
                        {row.designation && <p className="text-[9px] text-neutral-textMuted">{row.designation}</p>}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 text-neutral-textMuted">
                      <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="text-xs">{row.phone}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 text-neutral-textMuted">
                      <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="text-xs truncate max-w-[160px]">{row.email}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      {row.verified ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200/50">
                          <CheckCircle className="w-2.5 h-2.5" /> Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-50 text-amber-600 border border-amber-200/50">
                          <XCircle className="w-2.5 h-2.5" /> Unverified
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-bold text-neutral-textMain">{row.totalDeliveries}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-sm font-bold ${row.pendingDeliveries > 0 ? "text-amber-600" : "text-emerald-600"}`}>
                      {row.pendingDeliveries}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Star className={`w-3.5 h-3.5 ${row.rating >= 4.5 ? "text-amber-400 fill-amber-400" : row.rating >= 4 ? "text-amber-400" : "text-neutral-textMuted"}`} />
                      <span className="text-sm font-bold text-neutral-textMain">{row.rating}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 relative">
                    <button onClick={() => setOpenAction(openAction === row.id ? null : row.id)}
                      className="p-1.5 rounded-lg hover:bg-accent-light text-neutral-textMuted transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                    <AnimatePresence>
                      {openAction === row.id && (
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                          className="absolute right-0 top-full mt-1 w-44 bg-white border border-neutral-border rounded-xl shadow-lg z-20 py-1.5">
                          {rowActions.map(action => (
                            <button key={action.label} onClick={() => { setOpenAction(null); action.action(row); }}
                              className={`w-full flex items-center gap-2 px-3 py-1.5 text-[12px] font-medium transition-colors ${action.danger ? "text-danger hover:bg-danger-light" : "text-neutral-textMain hover:bg-accent-light"}`}>
                              <action.icon className="w-3.5 h-3.5" strokeWidth={1.8} />
                              {action.label}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
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
                  className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all ${page === pn ? "bg-primary text-white" : "text-neutral-textMuted hover:bg-accent-light"}`}>{pn}</button>;
              })}
              <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}
                className="p-1.5 rounded-lg hover:bg-accent-light text-neutral-textMuted disabled:opacity-30 disabled:cursor-not-allowed">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <AddReceiverModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddReceiver}
        existingReceivers={receiverList}
      />

      {viewReceiver && (
        <ViewReceiverModal
          open={!!viewReceiver}
          onClose={() => setViewReceiver(null)}
          receiver={viewReceiver}
        />
      )}

      {editReceiver && (
        <EditReceiverModal
          open={!!editReceiver}
          onClose={() => setEditReceiver(null)}
          receiver={editReceiver}
          onSave={refreshList}
        />
      )}

      {verifyReceiver && (
        <VerifyReceiverModal
          open={!!verifyReceiver}
          onClose={() => setVerifyReceiver(null)}
          receiver={verifyReceiver}
          onVerify={refreshList}
        />
      )}

      {suspendReceiver && (
        <SuspendReceiverModal
          open={!!suspendReceiver}
          onClose={() => setSuspendReceiver(null)}
          receiver={suspendReceiver}
          onSuspend={refreshList}
        />
      )}

      {deleteReceiver && (
        <DeleteReceiverModal
          open={!!deleteReceiver}
          onClose={() => setDeleteReceiver(null)}
          receiver={deleteReceiver}
          onDelete={handleDelete}
        />
      )}
    </motion.div>
  );
}
