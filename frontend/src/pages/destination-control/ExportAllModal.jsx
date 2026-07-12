import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "../../components/common/Modal";
import { useToast } from "../../components/common/Toast";
import {
  FileText, CheckSquare, Square, Download, Eye, X, FileSpreadsheet,
  FileJson, FileArchive, Calendar, Building2, Filter, PieChart,
  Table, FileBarChart, Loader, Clock,
} from "lucide-react";

const reports = [
  { id: "daily", label: "Daily Delivery Report" },
  { id: "weekly", label: "Weekly Performance Report" },
  { id: "monthly", label: "Monthly Summary Report" },
  { id: "warehouse", label: "Warehouse Utilization Report" },
  { id: "performance", label: "Delivery Performance Report" },
  { id: "dock", label: "Dock Utilization Report" },
  { id: "delay", label: "Delay Analysis Report" },
  { id: "pod", label: "POD Status Report" },
  { id: "receiver", label: "Receiver Activity Report" },
  { id: "inventory", label: "Inventory Status Report" },
];

const warehouses = ["All Warehouses", "Mumbai Central Hub", "Chennai Distribution", "Delhi North Facility", "Bangalore Tech Park", "Kochi Port Terminal"];
const statusFilters = ["All Statuses", "Completed", "In Transit", "Delayed", "Pending"];
const receivers = ["All Receivers", "Reliance Retail Ltd", "Flipkart Logistics", "Amazon India", "Tata Chemicals", "HUL Distribution"];

export default function ExportAllModal({ open, onClose }) {
  const toast = useToast();
  const [selected, setSelected] = useState(new Set(reports.map(r => r.id)));
  const [format, setFormat] = useState("pdf");
  const [dateRange, setDateRange] = useState("today");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");
  const [warehouse, setWarehouse] = useState("All Warehouses");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [receiver, setReceiver] = useState("All Receivers");
  const [includeCharts, setIncludeCharts] = useState(true);
  const [includeTables, setIncludeTables] = useState(true);
  const [includeSummary, setIncludeSummary] = useState(true);
  const [compressZip, setCompressZip] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [progress, setProgress] = useState(0);

  const allSelected = selected.size === reports.length;
  const someSelected = selected.size > 0 && !allSelected;

  const toggleAll = () => {
    if (allSelected) setSelected(new Set());
    else setSelected(new Set(reports.map(r => r.id)));
  };

  const toggle = (id) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };

  const formatIcons = {
    pdf: FileText,
    xlsx: FileSpreadsheet,
    csv: FileText,
    json: FileJson,
  };
  const FormatIcon = formatIcons[format] || FileText;

  const handleExport = () => {
    if (selected.size === 0) {
      toast("Please select at least one report to export.", "error");
      return;
    }
    setExporting(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.random() * 15 + 5;
        if (next >= 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(next, 99);
      });
    }, 300);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);

      const ext = format === "xlsx" ? "xlsx" : format;
      const blob = new Blob([generateMockContent()], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `destination-reports.${ext}`;
      a.click();
      URL.revokeObjectURL(url);

      toast("Reports exported successfully.", "success");
      setTimeout(() => {
        setExporting(false);
        setProgress(0);
        onClose();
      }, 500);
    }, 3000);
  };

  const generateMockContent = () => {
    const reportNames = reports.filter(r => selected.has(r.id)).map(r => r.label);
    return [
      "=== Destination Control Reports Export ===",
      `Generated: ${new Date().toLocaleString()}`,
      `Format: ${format.toUpperCase()}`,
      `Date Range: ${dateRange}`,
      `Warehouse: ${warehouse}`,
      `Status: ${statusFilter}`,
      `Receiver: ${receiver}`,
      "",
      "--- Selected Reports ---",
      ...reportNames.map((r, i) => `${i + 1}. ${r}`),
      "",
      "--- Summary ---",
      `Total Reports: ${reportNames.length}`,
      `Include Charts: ${includeCharts ? "Yes" : "No"}`,
      `Include Tables: ${includeTables ? "Yes" : "No"}`,
      `Include Summary: ${includeSummary ? "Yes" : "No"}`,
      `Compressed: ${compressZip ? "Yes" : "No"}`,
      "",
      "--- Mock Data ---",
      "This is a simulated export. No backend integration.",
      "All values are representative mock data.",
      ...(format === "json" ? [
        "",
        JSON.stringify({
          exportedAt: new Date().toISOString(),
          reports: reportNames,
          format,
          dateRange,
          warehouse,
          statusFilter,
          receiver,
          includeCharts,
          includeTables,
          includeSummary,
        }, null, 2),
      ] : []),
    ].join("\n");
  };

  const handlePreview = () => {
    if (selected.size === 0) {
      toast("Please select at least one report to preview.", "error");
      return;
    }
    const w = window.open("", "_blank");
    const reportNames = reports.filter(r => selected.has(r.id)).map(r => r.label);
    w.document.write(`<html><head><title>Export Preview</title>
      <style>body{font-family:sans-serif;padding:24px;background:#f8fafc;color:#1e293b}
      h1{font-size:18px;margin-bottom:4px}h2{font-size:14px;color:#64748b;margin-bottom:16px}
      .badge{display:inline-block;padding:2px 8px;border-radius:12px;font-size:11px;font-weight:600;margin:2px;background:#e2e8f0}
      table{width:100%;border-collapse:collapse;margin-top:12px}
      th,td{border:1px solid #e2e8f0;padding:6px 10px;text-align:left;font-size:12px}
      th{background:#f1f5f9;font-weight:600}
      .status{display:inline-block;padding:2px 6px;border-radius:8px;font-size:10px;font-weight:600}
    </style></head><body>
    <h1>Export Preview (${format.toUpperCase()})</h1>
    <h2>${reportNames.length} report(s) selected</h2>
    <div>${reportNames.map(r => `<span class="badge">${r}</span>`).join("")}</div>
    <table><thead><tr><th>Report</th><th>Status</th><th>Records</th><th>Generated</th></tr></thead><tbody>
    ${reportNames.map(r => `<tr><td>${r}</td><td><span class="status" style="background:#dbeafe;color:#1d4ed8">Ready</span></td><td>${Math.floor(Math.random() * 500 + 50)}</td><td>${new Date().toLocaleDateString()}</td></tr>`).join("")}
    </tbody></table>
    </body></html>`);
    w.document.close();
  };

  const CheckIcon = allSelected ? CheckSquare : someSelected ? CheckSquare : Square;

  return (
    <Modal open={open} onClose={exporting ? null : onClose} title="Export Destination Control Reports"
      subtitle="Select reports, format, and options for export" size="xl">
      <div className="space-y-5 max-h-[60vh] overflow-y-auto pr-1">
        {/* Report Selection */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-[11px] font-bold text-neutral-textMuted uppercase tracking-wider">Report Selection</h4>
            <div className="flex items-center gap-3">
              <button type="button" onClick={toggleAll}
                className="flex items-center gap-1.5 text-[10px] font-bold text-primary hover:underline">
                <CheckIcon className={`w-3.5 h-3.5 ${allSelected ? "text-primary" : "text-neutral-textMuted"}`} />
                {allSelected ? "Deselect All" : "Select All"}
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {reports.map(r => (
              <button type="button" key={r.id} onClick={() => toggle(r.id)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all text-left ${
                  selected.has(r.id) ? "bg-primary-light text-primary border border-primary/20" : "bg-neutral-light text-neutral-textMuted border border-transparent hover:bg-accent-light"
                }`}>
                {selected.has(r.id) ? <CheckSquare className="w-3.5 h-3.5 text-primary flex-shrink-0" /> : <Square className="w-3.5 h-3.5 text-neutral-textMuted flex-shrink-0" />}
                {r.label}
              </button>
            ))}
          </div>
          {selected.size > 0 && (
            <p className="text-[10px] text-neutral-textMuted mt-1.5">{selected.size} of {reports.length} reports selected</p>
          )}
        </div>

        {/* Export Format */}
        <div>
          <h4 className="text-[11px] font-bold text-neutral-textMuted uppercase tracking-wider mb-2">Export Format</h4>
          <div className="grid grid-cols-4 gap-2">
            {[
              { id: "pdf", label: "PDF", icon: FileText },
              { id: "xlsx", label: "Excel", icon: FileSpreadsheet },
              { id: "csv", label: "CSV", icon: FileText },
              { id: "json", label: "JSON", icon: FileJson },
            ].map(f => (
              <button type="button" key={f.id} onClick={() => setFormat(f.id)}
                className={`flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-lg border transition-all ${
                  format === f.id ? "bg-primary-light border-primary text-primary" : "bg-neutral-light border-neutral-border text-neutral-textMuted hover:bg-accent-light"
                }`}>
                <f.icon className="w-4 h-4" />
                <span className="text-[10px] font-bold">{f.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Additional Options */}
        <div>
          <h4 className="text-[11px] font-bold text-neutral-textMuted uppercase tracking-wider mb-2">Additional Options</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {/* Date Range */}
            <div>
              <label className="text-[10px] font-bold text-neutral-textMuted block mb-1">Date Range</label>
              <select value={dateRange} onChange={e => setDateRange(e.target.value)}
                className="w-full h-9 px-3 text-xs bg-neutral-light border border-neutral-border rounded-lg outline-none focus:border-primary">
                <option value="today">Today</option>
                <option value="7days">Last 7 Days</option>
                <option value="30days">Last 30 Days</option>
                <option value="custom">Custom Range</option>
              </select>
              {dateRange === "custom" && (
                <div className="flex items-center gap-2 mt-1.5">
                  <input type="date" value={customStart} onChange={e => setCustomStart(e.target.value)}
                    className="flex-1 h-8 px-2 text-[11px] bg-neutral-light border border-neutral-border rounded-lg outline-none focus:border-primary" />
                  <span className="text-[10px] text-neutral-textMuted">to</span>
                  <input type="date" value={customEnd} onChange={e => setCustomEnd(e.target.value)}
                    className="flex-1 h-8 px-2 text-[11px] bg-neutral-light border border-neutral-border rounded-lg outline-none focus:border-primary" />
                </div>
              )}
            </div>

            {/* Warehouse Filter */}
            <div>
              <label className="text-[10px] font-bold text-neutral-textMuted block mb-1">Warehouse</label>
              <select value={warehouse} onChange={e => setWarehouse(e.target.value)}
                className="w-full h-9 px-3 text-xs bg-neutral-light border border-neutral-border rounded-lg outline-none focus:border-primary">
                {warehouses.map(w => <option key={w} value={w}>{w}</option>)}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="text-[10px] font-bold text-neutral-textMuted block mb-1">Status</label>
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                className="w-full h-9 px-3 text-xs bg-neutral-light border border-neutral-border rounded-lg outline-none focus:border-primary">
                {statusFilters.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Receiver Filter */}
            <div>
              <label className="text-[10px] font-bold text-neutral-textMuted block mb-1">Receiver</label>
              <select value={receiver} onChange={e => setReceiver(e.target.value)}
                className="w-full h-9 px-3 text-xs bg-neutral-light border border-neutral-border rounded-lg outline-none focus:border-primary">
                {receivers.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            {/* Include Options */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-neutral-textMuted block mb-0.5">Include</label>
              {[
                { key: "includeCharts", label: "Charts", icon: PieChart },
                { key: "includeTables", label: "Tables", icon: Table },
                { key: "includeSummary", label: "Summary", icon: FileBarChart },
              ].map(opt => (
                <button type="button" key={opt.key} onClick={() => {
                  const setter = opt.key === "includeCharts" ? setIncludeCharts
                    : opt.key === "includeTables" ? setIncludeTables : setIncludeSummary;
                  setter(v => !v);
                }}
                  className="flex items-center gap-1.5 text-[11px] font-medium text-neutral-textMain hover:text-primary transition-colors">
                  {{ includeCharts, includeTables, includeSummary }[opt.key] ? <CheckSquare className="w-3 h-3 text-primary" /> : <Square className="w-3 h-3 text-neutral-textMuted" />}
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Compress */}
            <div>
              <label className="text-[10px] font-bold text-neutral-textMuted block mb-1">Compression</label>
              <button type="button" onClick={() => setCompressZip(!compressZip)}
                className={`flex items-center gap-2 w-full h-9 px-3 text-xs font-medium rounded-lg border transition-all ${
                  compressZip ? "bg-primary-light border-primary text-primary" : "bg-neutral-light border-neutral-border text-neutral-textMuted hover:bg-accent-light"
                }`}>
                <FileArchive className="w-3.5 h-3.5" />
                Compress into ZIP
              </button>
            </div>
          </div>
        </div>

        {/* Progress */}
        <AnimatePresence>
          {exporting && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
              className="bg-primary/5 border border-primary/20 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <Loader className="w-5 h-5 text-primary animate-spin" />
                <div>
                  <p className="text-sm font-bold text-primary">Exporting Reports...</p>
                  <p className="text-[11px] text-neutral-textMuted">{Math.round(progress)}% complete</p>
                </div>
              </div>
              <div className="w-full h-2 bg-neutral-light rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-full rounded-full bg-primary" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-end gap-2 pt-4 border-t border-neutral-border/60 mt-4">
        <button type="button" onClick={onClose} disabled={exporting}
          className="px-4 py-2 text-xs font-semibold text-neutral-textMuted bg-white border border-neutral-border rounded-lg hover:bg-accent-light transition-all disabled:opacity-50">
          Cancel
        </button>
        <button type="button" onClick={handlePreview} disabled={exporting}
          className="px-4 py-2 text-xs font-semibold text-neutral-textMain bg-white border border-neutral-border rounded-lg hover:bg-accent-light transition-all disabled:opacity-50 flex items-center gap-1.5">
          <Eye className="w-3.5 h-3.5" /> Preview
        </button>
        <button type="button" onClick={handleExport} disabled={exporting || selected.size === 0}
          className="px-5 py-2 text-xs font-semibold text-white bg-primary rounded-lg hover:bg-primary-dark transition-all disabled:opacity-50 flex items-center gap-1.5 shadow-soft-sm">
          {exporting ? (
            <><Loader className="w-3.5 h-3.5 animate-spin" /> Exporting...</>
          ) : (
            <><Download className="w-3.5 h-3.5" /> Export</>
          )}
        </button>
      </div>
    </Modal>
  );
}
