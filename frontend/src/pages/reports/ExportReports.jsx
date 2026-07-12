import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import StatusBadge from "../../components/common/Badge";
import FilterPanel from "../../components/reports/FilterPanel";
import ExportModal from "../../components/reports/ExportModal";
import TrendIndicator from "../../components/reports/TrendIndicator";
import {
  Search,
  Download,
  FileText,
  FileSpreadsheet,
  FileJson,
  Printer,
  Send,
  Calendar,
  Clock,
  MoreHorizontal,
  Check,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  RotateCcw,
  Loader,
  TriangleAlert,
  Inbox,
} from "lucide-react";
import { reportService } from "../../services/report.service";
import { cn } from "../../utils/utils";

export default function ExportReports() {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(new Set());
  const [showExportModal, setShowExportModal] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pageSize = 10;

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await reportService.overview();
      setData(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const reports = useMemo(() => {
    if (!data) return [];
    const items = [];
    const now = new Date();
    const fmtDate = (d) => d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

    if (data.totalVehicles !== undefined) {
      items.push({
        id: "RPT-001", name: "Fleet Overview", category: "Fleet", generatedBy: "System",
        createdDate: fmtDate(now), status: "Completed", format: "PDF", size: "2.4 MB",
      });
    }
    if (data.totalTrips !== undefined) {
      items.push({
        id: "RPT-002", name: "Trip Summary", category: "Trip", generatedBy: "System",
        createdDate: fmtDate(now), status: "Completed", format: "CSV", size: "1.8 MB",
      });
    }
    if (data.totalDrivers !== undefined) {
      items.push({
        id: "RPT-003", name: "Driver Performance", category: "Driver", generatedBy: "System",
        createdDate: fmtDate(now), status: "Completed", format: "Excel", size: "3.1 MB",
      });
    }
    if (data.totalRevenue !== undefined) {
      items.push({
        id: "RPT-004", name: "Revenue Report", category: "Revenue", generatedBy: "System",
        createdDate: fmtDate(now), status: "Completed", format: "PDF", size: "1.2 MB",
      });
    }
    if (data.totalExpenses !== undefined) {
      items.push({
        id: "RPT-005", name: "Expense Analysis", category: "Fuel", generatedBy: "System",
        createdDate: fmtDate(now), status: "Completed", format: "CSV", size: "0.9 MB",
      });
    }
    if (data.activeVehicles !== undefined) {
      items.push({
        id: "RPT-006", name: "Vehicle Health", category: "Maintenance", generatedBy: "System",
        createdDate: fmtDate(now), status: "Completed", format: "PDF", size: "1.5 MB",
      });
    }
    return items;
  }, [data]);

  const handleDownload = async (format, type = 'fleet') => {
    try {
      const service = format === 'PDF' ? reportService.exportPDF : reportService.exportCSV;
      const response = await service({ type });
      const blob = new Blob([response.data]);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `report.${format.toLowerCase()}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(`Export ${format} failed`, err);
    }
  };

  const filtered = useMemo(() => {
    let result = reports;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((r) =>
        [r.id, r.name, r.category, r.generatedBy, r.status, r.format].some((s) =>
          s.toLowerCase().includes(q)
        )
      );
    }
    if (sortKey) {
      result = [...result].sort((a, b) => {
        const aVal = a[sortKey];
        const bVal = b[sortKey];
        const cmp = typeof aVal === "number" ? aVal - bVal : String(aVal).localeCompare(String(bVal));
        return sortDir === "asc" ? cmp : -cmp;
      });
    }
    return result;
  }, [search, sortKey, sortDir, reports]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const toggleSort = (key) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const toggleSelectAll = () => {
    if (selected.size === paginated.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(paginated.map((_, i) => i)));
    }
  };

  const toggleSelect = (i) => {
    const next = new Set(selected);
    if (next.has(i)) next.delete(i);
    else next.add(i);
    setSelected(next);
  };

  const handleExport = (format) => {
    setShowExportModal(false);
    handleDownload(format);
  };

  const SortIcon = ({ colKey }) => {
    if (sortKey !== colKey) return null;
    return sortDir === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />;
  };

  const formatIcons = {
    PDF: FileText,
    Excel: FileSpreadsheet,
    CSV: FileText,
    JSON: FileJson,
  };

  const formatColors = {
    PDF: "text-danger bg-danger-light",
    Excel: "text-success bg-success-light",
    CSV: "text-primary bg-primary-light",
    JSON: "text-purple-600 bg-purple-50",
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="w-14 h-14 rounded-xl bg-danger-light flex items-center justify-center">
          <TriangleAlert className="w-7 h-7 text-danger" />
        </div>
        <p className="text-sm font-bold text-neutral-textMain">{error}</p>
        <button
          onClick={fetchData}
          className="px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary-dark transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="w-14 h-14 rounded-xl bg-neutral-light flex items-center justify-center">
          <Inbox className="w-7 h-7 text-neutral-textMuted" />
        </div>
        <p className="text-sm font-bold text-neutral-textMuted">No export data available</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageHeader
        title="Export Reports"
        subtitle="Generate, download, and schedule report exports in multiple formats"
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowExportModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-bold rounded-lg hover:bg-primary-dark transition-colors shadow-soft-sm"
            >
              <Download className="w-4 h-4" /> Export
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-neutral-border text-neutral-textMain text-sm font-bold rounded-lg hover:bg-accent-light transition-colors">
              <Printer className="w-4 h-4" /> Print
            </button>
          </div>
        }
      />

      {/* Quick Actions */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {[
          { label: "Generate Report", icon: FileText, color: "bg-primary/10 text-primary hover:bg-primary/20" },
          { label: "Download PDF", icon: FileText, color: "bg-danger-light text-danger hover:bg-danger/20" },
          { label: "Export CSV", icon: FileText, color: "bg-primary-light text-primary hover:bg-primary/20" },
          { label: "Export Excel", icon: FileSpreadsheet, color: "bg-success-light text-success hover:bg-success/20" },
          { label: "Print Report", icon: Printer, color: "bg-accent-light text-neutral-textMuted hover:bg-accent" },
          { label: "Share Analytics", icon: Send, color: "bg-purple-50 text-purple-600 hover:bg-purple-100" },
          { label: "Schedule Export", icon: Calendar, color: "bg-cyan-50 text-cyan-600 hover:bg-cyan-100" },
        ].map((action, i) => (
          <motion.button
            key={action.label}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.02 }}
            onClick={() => {
              if (action.label === "Export CSV") handleDownload("CSV", "fleet");
              else if (action.label === "Download PDF") handleDownload("PDF", "fleet");
              else if (action.label === "Export Excel") handleDownload("CSV", "fleet");
              else if (action.label === "Generate Report") setShowExportModal(true);
              else if (action.label === "Print Report") window.print();
            }}
            className={cn(
              "inline-flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-lg border border-transparent transition-all",
              action.color
            )}
          >
            <action.icon className="w-3.5 h-3.5" strokeWidth={2} />
            {action.label}
          </motion.button>
        ))}
      </div>

      {/* Main Table Card */}
      <div className="bg-white border border-neutral-border rounded-xl shadow-soft-sm overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-neutral-border">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative max-w-xs flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-textMuted" />
              <input
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search reports..."
                className="w-full h-9 pl-9 pr-4 text-sm bg-neutral-light border border-neutral-border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
              />
            </div>
            {selected.size > 0 && (
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold text-neutral-textMuted">{selected.size} selected</span>
                <button className="text-xs font-bold text-primary hover:underline">Bulk Export</button>
                <button className="text-xs font-bold text-danger hover:underline">Delete</button>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setPage(1)} className="p-2 rounded-lg hover:bg-accent-light text-neutral-textMuted transition-colors">
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-border bg-slate-50/80 sticky top-0">
                <th className="w-12 px-4 py-3">
                  <button
                    onClick={toggleSelectAll}
                    className={cn(
                      "w-4 h-4 rounded border-2 flex items-center justify-center transition-all",
                      selected.size === paginated.length && paginated.length > 0
                        ? "bg-primary border-primary"
                        : "border-neutral-border hover:border-neutral-textMuted"
                    )}
                  >
                    {selected.size === paginated.length && paginated.length > 0 && (
                      <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                    )}
                  </button>
                </th>
                {[
                  { key: "id", label: "Report ID" },
                  { key: "name", label: "Report Name" },
                  { key: "category", label: "Category" },
                  { key: "generatedBy", label: "Generated By" },
                  { key: "createdDate", label: "Created Date" },
                  { key: "status", label: "Status" },
                  { key: "format", label: "Format" },
                  { key: "size", label: "Size" },
                ].map((col) => (
                  <th
                    key={col.key}
                    onClick={() => toggleSort(col.key)}
                    className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-neutral-textMuted cursor-pointer select-none hover:text-accent"
                  >
                    <span className="flex items-center gap-1">
                      {col.label}
                      <SortIcon colKey={col.key} />
                    </span>
                  </th>
                ))}
                <th className="w-12 px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-4 py-16 text-center">
                    <div className="text-neutral-textMuted">
                      <div className="w-12 h-12 bg-accent-light rounded-xl flex items-center justify-center mx-auto mb-3">
                        <Search className="w-5 h-5" />
                      </div>
                      <p className="text-sm font-medium">No reports found</p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginated.map((row, i) => {
                  const FormatIcon = formatIcons[row.format] || FileText;
                  const formatColor = formatColors[row.format] || "text-neutral-textMuted bg-accent-light";
                  return (
                    <motion.tr
                      key={row.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.015 }}
                      className={cn(
                        "border-b border-neutral-border/50 transition-colors hover:bg-accent-light/50",
                        selected.has(i) && "bg-primary/[0.03]"
                      )}
                    >
                      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => toggleSelect(i)}
                          className={cn(
                            "w-4 h-4 rounded border-2 flex items-center justify-center transition-all",
                            selected.has(i)
                              ? "bg-primary border-primary"
                              : "border-neutral-border hover:border-neutral-textMuted"
                          )}
                        >
                          {selected.has(i) && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
                        </button>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs font-bold text-primary">{row.id}</td>
                      <td className="px-4 py-3 font-bold text-neutral-textMain">{row.name}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={row.category} variant={
                          row.category === "Fleet" ? "info" :
                          row.category === "Fuel" ? "warning" :
                          row.category === "Revenue" ? "success" :
                          row.category === "Maintenance" ? "warning" :
                          row.category === "Driver" ? "purple" :
                          row.category === "Trip" ? "info" : "muted"
                        } />
                      </td>
                      <td className="px-4 py-3 text-neutral-textMuted">{row.generatedBy}</td>
                      <td className="px-4 py-3 text-neutral-textMuted tabular-nums">{row.createdDate}</td>
                      <td className="px-4 py-3"><StatusBadge status={row.status} /></td>
                      <td className="px-4 py-3">
                        <span className={cn("inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold", formatColor)}>
                          <FormatIcon className="w-3 h-3" strokeWidth={2} />
                          {row.format}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-neutral-textMuted tabular-nums">{row.size}</td>
                      <td className="px-4 py-3">
                        <div className="relative">
                          <button
                            className="p-1 rounded hover:bg-accent-light text-neutral-textMuted transition-colors"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filtered.length > 0 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-neutral-border">
            <p className="text-xs text-neutral-textMuted">
              Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, filtered.length)} of {filtered.length}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="p-1.5 rounded-lg hover:bg-accent-light text-neutral-textMuted disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) pageNum = i + 1;
                else if (page <= 3) pageNum = i + 1;
                else if (page >= totalPages - 2) pageNum = totalPages - 4 + i;
                else pageNum = page - 2 + i;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={cn(
                      "w-8 h-8 rounded-lg text-xs font-semibold transition-all",
                      page === pageNum
                        ? "bg-primary text-white"
                        : "text-neutral-textMuted hover:bg-accent-light"
                    )}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="p-1.5 rounded-lg hover:bg-accent-light text-neutral-textMuted disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Schedule Export Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
        {[
          { title: "Daily Reports", desc: "Automated daily fleet summary", time: "08:00 AM", icon: Clock, color: "bg-primary/10 text-primary" },
          { title: "Weekly Analytics", desc: "Weekly performance digest", time: "Every Monday", icon: Calendar, color: "bg-purple-50 text-purple-600" },
          { title: "Monthly Executive", desc: "Monthly executive summary", time: "1st of month", icon: FileText, color: "bg-emerald-50 text-emerald-600" },
        ].map((schedule, i) => (
          <motion.div
            key={schedule.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.05 }}
            className="bg-white border border-neutral-border rounded-xl p-4 shadow-soft-sm hover:shadow-soft-md transition-all"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center", schedule.color)}>
                <schedule.icon className="w-[18px] h-[18px]" strokeWidth={1.8} />
              </div>
              <div>
                <p className="text-sm font-bold text-neutral-textMain">{schedule.title}</p>
                <p className="text-xs text-neutral-textMuted">{schedule.desc}</p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-neutral-border">
              <span className="text-xs font-semibold text-neutral-textMuted">
                <Clock className="w-3 h-3 inline mr-1" />
                {schedule.time}
              </span>
              <button className="text-xs font-bold text-primary hover:underline">Configure</button>
            </div>
          </motion.div>
        ))}
      </div>

      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        onExport={handleExport}
      />
    </motion.div>
  );
}
