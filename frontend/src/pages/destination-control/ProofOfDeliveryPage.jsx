import { useState, useMemo, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import StatusBadge from "../../components/common/Badge";
import Button from "../../components/common/Button";
import Modal from "../../components/common/Modal";
import InputField from "../../components/common/Input";
import Select from "../../components/common/Select";
import FileUpload from "../../components/common/FileUpload";
import { useToast } from "../../components/common/Toast";
import {
  Search, Download, ChevronUp, ChevronDown, ChevronLeft, ChevronRight,
  MoreHorizontal, Check, FileText, Camera, Image, Clock, Upload,
  FileCheck, XCircle, Eye, RotateCcw, Printer, Trash2, Edit3,
  FileDown, FileSpreadsheet, File as FileIcon, X, Plus, AlertCircle,
  User, Truck, MapPin, Calendar, Phone, Mail, Save, RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { cn } from "../../utils/utils";

let podCounter = 0;

function generatePodNumber() {
  podCounter += 1;
  const num = String(podCounter).padStart(3, "0");
  return `POD-2026-${num}`;
}

export default function ProofOfDeliveryPage() {
  const toast = useToast();

  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(new Set());
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [showFilters, setShowFilters] = useState(false);
  const pageSize = 10;

  const [uploadOpen, setUploadOpen] = useState(false);
  const [viewPod, setViewPod] = useState(null);
  const [editPod, setEditPod] = useState(null);
  const [verifyPod, setVerifyPod] = useState(null);
  const [deletePod, setDeletePod] = useState(null);
  const [deleteMany, setDeleteMany] = useState(false);
  const [showExport, setShowExport] = useState(false);

  const [form, setForm] = useState(createEmptyForm());
  const [formErrors, setFormErrors] = useState({});
  const [formFiles, setFormFiles] = useState([]);
  const [signaturePad, setSignaturePad] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [editMode, setEditMode] = useState(false);

  function createEmptyForm() {
    return {
      deliveryId: "",
      tripId: "",
      vehicle: "",
      driver: "",
      receiverName: "",
      deliveryDate: "",
      deliveryTime: "",
      deliveryStatus: "",
      receiverVerified: "",
      receiverMobile: "",
      receiverEmail: "",
      deliveryNotes: "",
      damageReport: "",
      delayReason: "",
      driverComments: "",
    };
  }

  const deliveryOptions = useMemo(() => [
    { value: "DEL-001", label: "DEL-001 — Mumbai → Pune" },
    { value: "DEL-002", label: "DEL-002 — Delhi → Jaipur" },
    { value: "DEL-003", label: "DEL-003 — Bangalore → Chennai" },
    { value: "DEL-004", label: "DEL-004 — Kochi → Coimbatore" },
    { value: "DEL-005", label: "DEL-005 — Ahmedabad → Rajkot" },
    { value: "DEL-006", label: "DEL-006 — Hyderabad → Vizag" },
    { value: "DEL-007", label: "DEL-007 — Kolkata → Patna" },
    { value: "DEL-008", label: "DEL-008 — Chennai → Bangalore" },
    { value: "DEL-009", label: "DEL-009 — Mumbai → Surat" },
    { value: "DEL-010", label: "DEL-010 — Indore → Bhopal" },
  ], []);

  const deliveryDetails = useMemo(() => ({
    "DEL-001": { tripId: "TR-0084", vehicle: "MH-12-RT-2244", driver: "Vikram Singh", receiver: "Reliance Retail Ltd" },
    "DEL-002": { tripId: "TR-0083", vehicle: "DL-03-KP-5567", driver: "Anil Sharma", receiver: "Flipkart Logistics" },
    "DEL-003": { tripId: "TR-0082", vehicle: "KA-01-MN-3312", driver: "Suresh Patel", receiver: "Amazon India" },
    "DEL-004": { tripId: "TR-0081", vehicle: "KL-07-AU-4521", driver: "Rajesh Kumar", receiver: "Tata Chemicals" },
    "DEL-005": { tripId: "TR-0080", vehicle: "KL-03-GH-3344", driver: "Jose Thomas", receiver: "HUL Distribution" },
    "DEL-006": { tripId: "TR-0079", vehicle: "UP-32-CD-6677", driver: "Deepak Verma", receiver: "Wipro Technologies" },
    "DEL-007": { tripId: "TR-0078", vehicle: "RJ-14-AB-9988", driver: "Mohammed Ali", receiver: "Adani Logistics" },
    "DEL-008": { tripId: "TR-0077", vehicle: "MH-12-RT-2244", driver: "Vikram Singh", receiver: "Mahindra Logistics" },
    "DEL-009": { tripId: "TR-0076", vehicle: "KL-07-AU-4521", driver: "Rajesh Kumar", receiver: "Transport Corporation" },
    "DEL-010": { tripId: "TR-0075", vehicle: "MH-12-RT-2244", driver: "Vikram Singh", receiver: "DHL Supply Chain" },
  }), []);

  const handleDeliveryChange = useCallback((e) => {
    const val = e.target.value;
    const details = deliveryDetails[val];
    setForm((prev) => ({
      ...prev,
      deliveryId: val,
      tripId: details?.tripId || "",
      vehicle: details?.vehicle || "",
      driver: details?.driver || "",
      receiverName: details?.receiver || "",
      deliveryDate: new Date().toISOString().split("T")[0],
      deliveryTime: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false }),
    }));
    setFormErrors((prev) => ({ ...prev, deliveryId: "" }));
  }, []);

  const handleFormChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: "" }));
  }, [formErrors]);

  const validateForm = useCallback(() => {
    const errs = {};
    if (!form.deliveryId) errs.deliveryId = "Delivery ID is required";
    if (!form.receiverName?.trim()) errs.receiverName = "Receiver name is required";
    if (!form.deliveryStatus) errs.deliveryStatus = "Delivery status is required";
    if (!form.deliveryDate) errs.deliveryDate = "Delivery date is required";
    if (!form.receiverVerified) errs.receiverVerified = "Verification is required";
    if (formFiles.length === 0 && !signaturePad) errs.files = "Upload at least one proof document or signature";
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];
    for (const f of formFiles) {
      if (!allowedTypes.includes(f.type)) {
        errs.files = `${f.name}: Invalid file type`;
        break;
      }
      if (f.size > 10 * 1024 * 1024) {
        errs.files = `${f.name}: Exceeds 10MB limit`;
        break;
      }
    }
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  }, [form, formFiles, signaturePad]);

  const resetForm = useCallback(() => {
    setForm(createEmptyForm());
    setFormErrors({});
    setFormFiles([]);
    setSignaturePad(null);
    setEditMode(false);
  }, []);

  const handleUpload = useCallback(async (addAnother = false) => {
    if (!validateForm()) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));

    const photos = formFiles.filter((f) => f.type?.startsWith("image/"));
    const docs = formFiles.filter((f) => f.type === "application/pdf" || !f.type?.startsWith("image/"));
    const now = new Date();
    const ts = now.toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

    const podNumber = generatePodNumber();
    const newRecord = {
      id: podNumber,
      deliveryId: form.deliveryId,
      tripId: form.tripId,
      vehicle: form.vehicle,
      driver: form.driver,
      receiver: form.receiverName,
      receiverMobile: form.receiverMobile,
      receiverEmail: form.receiverEmail,
      deliveryDate: form.deliveryDate,
      deliveryTime: form.deliveryTime,
      deliveryStatus: form.deliveryStatus,
      receiverVerified: form.receiverVerified,
      signedBy: form.receiverName,
      signature: !!signaturePad,
      photos: photos.length,
      documents: docs.length + (signaturePad ? 1 : 0),
      status: "Uploaded",
      deliveryNotes: form.deliveryNotes,
      damageReport: form.damageReport,
      delayReason: form.delayReason,
      driverComments: form.driverComments,
      uploadedAt: ts,
      uploadedBy: "Current User",
      fileCount: formFiles.length + (signaturePad ? 1 : 0),
    };

    setRecords((prev) => [newRecord, ...prev]);
    setUploadOpen(false);
    resetForm();
    setSubmitting(false);

    if (addAnother) {
      setTimeout(() => setUploadOpen(true), 300);
    }

    toast("POD record created successfully", "success");
  }, [form, formFiles, signaturePad, validateForm, resetForm, toast]);

  const updateRecord = useCallback(async () => {
    if (!validateForm()) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));

    const photos = formFiles.filter((f) => f.type?.startsWith("image/"));
    const docs = formFiles.filter((f) => f.type === "application/pdf" || !f.type?.startsWith("image/"));

    setRecords((prev) =>
      prev.map((r) =>
        r.id === editPod?.id
          ? {
              ...r,
              deliveryId: form.deliveryId,
              tripId: form.tripId,
              vehicle: form.vehicle,
              driver: form.driver,
              receiver: form.receiverName,
              receiverMobile: form.receiverMobile,
              receiverEmail: form.receiverEmail,
              deliveryDate: form.deliveryDate,
              deliveryTime: form.deliveryTime,
              deliveryStatus: form.deliveryStatus,
              receiverVerified: form.receiverVerified,
              signedBy: form.receiverName,
              signature: !!signaturePad || r.signature,
              photos: photos.length || r.photos,
              documents: docs.length + (signaturePad ? 1 : 0) || r.documents,
              deliveryNotes: form.deliveryNotes,
              damageReport: form.damageReport,
              delayReason: form.delayReason,
              driverComments: form.driverComments,
            }
          : r
      )
    );
    setEditPod(null);
    resetForm();
    setSubmitting(false);
    toast("POD record updated successfully", "success");
  }, [form, formFiles, signaturePad, editPod, validateForm, resetForm, toast]);

  const openEdit = useCallback((record) => {
    setEditMode(true);
    setForm({
      deliveryId: record.deliveryId,
      tripId: record.tripId || "",
      vehicle: record.vehicle || "",
      driver: record.driver || "",
      receiverName: record.receiver,
      deliveryDate: record.deliveryDate || "",
      deliveryTime: record.deliveryTime || "",
      deliveryStatus: record.deliveryStatus || "",
      receiverVerified: record.receiverVerified || "",
      receiverMobile: record.receiverMobile || "",
      receiverEmail: record.receiverEmail || "",
      deliveryNotes: record.deliveryNotes || "",
      damageReport: record.damageReport || "",
      delayReason: record.delayReason || "",
      driverComments: record.driverComments || "",
    });
    setFormErrors({});
    setFormFiles([]);
    setSignaturePad(null);
    setEditPod(record);
  }, []);

  const openView = useCallback((record) => setViewPod(record), []);

  const handleVerify = useCallback((record) => {
    setRecords((prev) =>
      prev.map((r) => r.id === record.id ? { ...r, status: "Verified", verifiedAt: new Date().toISOString() } : r)
    );
    setVerifyPod(null);
    toast("POD verified successfully", "success");
  }, [toast]);

  const handleDelete = useCallback((record) => {
    setRecords((prev) => prev.filter((r) => r.id !== record.id));
    setDeletePod(null);
    toast("POD record deleted", "info");
  }, [toast]);

  const handleDeleteSelected = useCallback(() => {
    const idsToDelete = new Set(Array.from(selected).map((i) => paginated[i]?.id));
    setRecords((prev) => prev.filter((r) => !idsToDelete.has(r.id)));
    setSelected(new Set());
    setDeleteMany(false);
    toast(`${idsToDelete.size} record(s) deleted`, "info");
  }, [selected, paginated, toast]);

  const filtered = useMemo(() => {
    let result = records;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((r) =>
        [r.id, r.deliveryId, r.receiver, r.driver, r.vehicle, r.status, r.signedBy].some(
          (s) => s && s.toLowerCase().includes(q)
        )
      );
    }
    if (statusFilter !== "all") {
      result = result.filter((r) => r.status === statusFilter);
    }
    if (dateRange.from) {
      result = result.filter((r) => r.deliveryDate >= dateRange.from);
    }
    if (dateRange.to) {
      result = result.filter((r) => r.deliveryDate <= dateRange.to);
    }
    if (sortKey) {
      result = [...result].sort((a, b) => {
        const aVal = a[sortKey];
        const bVal = b[sortKey];
        const cmp = typeof aVal === "number" ? aVal - bVal : String(aVal || "").localeCompare(String(bVal || ""));
        return sortDir === "asc" ? cmp : -cmp;
      });
    }
    return result;
  }, [records, search, sortKey, sortDir, statusFilter, dateRange]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
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

  const SortIcon = ({ colKey }) =>
    sortKey !== colKey ? null : sortDir === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />;

  const verifiedCount = records.filter((r) => r.status === "Verified").length;
  const pendingCount = records.filter((r) => r.status !== "Verified").length;
  const totalPhotos = records.reduce((s, r) => s + (r.photos || 0), 0);
  const sigCount = records.filter((r) => r.signature).length;
  const successRate = records.length > 0 ? Math.round((verifiedCount / records.length) * 100) : 0;

  const kpis = useMemo(() => [
    { label: "Total POD Records", value: records.length, icon: FileText, color: "bg-primary/10 text-primary" },
    { label: "Verified", value: verifiedCount, icon: FileCheck, color: "bg-emerald-50 text-emerald-600" },
    { label: "Pending", value: pendingCount, icon: Clock, color: "bg-amber-50 text-amber-600" },
    { label: "Total Photos", value: totalPhotos, icon: Camera, color: "bg-blue-50 text-blue-600" },
    { label: "With Signature", value: sigCount, icon: Check, color: "bg-cyan-50 text-cyan-600" },
    { label: "Success Rate", value: `${successRate}%`, icon: ShieldCheck, color: "bg-purple-50 text-purple-600" },
  ], [records.length, verifiedCount, pendingCount, totalPhotos, sigCount, successRate]);

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
    { key: "documents", label: "Docs" },
    { key: "status", label: "Status" },
  ];

  const handleExport = useCallback((format) => {
    setShowExport(false);
    const exportData = filtered.map((r) => ({
      "POD ID": r.id,
      "Delivery ID": r.deliveryId,
      Receiver: r.receiver,
      Driver: r.driver,
      Vehicle: r.vehicle,
      "Delivery Time": r.deliveryTime,
      "Signed By": r.signedBy,
      Signature: r.signature ? "Yes" : "No",
      Photos: r.photos,
      Documents: r.documents,
      Status: r.status,
    }));
    if (format === "csv") {
      const headers = Object.keys(exportData[0] || {});
      const csv = [headers.join(","), ...exportData.map((row) => headers.map((h) => `"${(row[h] || "").replace(/"/g, '""')}"`).join(","))].join("\n");
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a"); a.href = url; a.download = `pod-records-${Date.now()}.csv`; a.click();
      URL.revokeObjectURL(url);
    } else if (format === "pdf") {
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(`
          <html><head><title>POD Records</title>
          <style>body{font-family:Arial,sans-serif;padding:20px}
          h1{font-size:18px;margin-bottom:10px}
          table{width:100%;border-collapse:collapse;font-size:11px}
          th,td{border:1px solid #ddd;padding:6px;text-align:left}
          th{background:#f5f5f5}</style></head><body>
          <h1>Proof of Delivery Records</h1>
          <table><thead><tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr></thead>
          <tbody>${exportData.map((row) => `<tr>${headers.map((h) => `<td>${row[h] || ""}</td>`).join("")}</tr>`).join("")}</tbody></table>
          <p style="font-size:10px;color:#888;margin-top:10px">Generated on ${new Date().toLocaleString()}</p>
          </body></html>
        `);
        printWindow.document.close();
        setTimeout(() => printWindow.print(), 300);
      }
    } else {
      toast("Export initiated — download started", "success");
    }
  }, [filtered, toast]);

  const openUpload = useCallback(() => {
    resetForm();
    setUploadOpen(true);
  }, [resetForm]);

  const currentPodNumber = useMemo(() => {
    const count = records.length + 1;
    return `POD-2026-${String(count).padStart(3, "0")}`;
  }, [records.length]);

  const uploadForm = (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="POD ID"
          name="podId"
          value={currentPodNumber}
          icon={FileText}
          disabled
          className="opacity-70"
        />
        <Select
          label="Delivery ID"
          name="deliveryId"
          value={form.deliveryId}
          onChange={handleDeliveryChange}
          options={deliveryOptions}
          placeholder="Select delivery..."
          error={formErrors.deliveryId}
        />
      </div>
      <div className="border-t border-neutral-border pt-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-textMuted mb-3">Delivery Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Trip ID" name="tripId" value={form.tripId} onChange={handleFormChange} icon={Route} disabled className="opacity-70" />
          <InputField label="Vehicle Number" name="vehicle" value={form.vehicle} onChange={handleFormChange} icon={Truck} disabled className="opacity-70" />
          <InputField label="Driver Name" name="driver" value={form.driver} onChange={handleFormChange} icon={User} disabled className="opacity-70" />
          <InputField label="Receiver Name" name="receiverName" value={form.receiverName} onChange={handleFormChange} error={formErrors.receiverName} icon={MapPin} />
          <InputField label="Delivery Date" type="date" name="deliveryDate" value={form.deliveryDate} onChange={handleFormChange} error={formErrors.deliveryDate} icon={Calendar} />
          <InputField label="Delivery Time" type="time" name="deliveryTime" value={form.deliveryTime} onChange={handleFormChange} />
        </div>
      </div>
      <div className="border-t border-neutral-border pt-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-textMuted mb-3">Delivery Confirmation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Delivery Status"
            name="deliveryStatus"
            value={form.deliveryStatus}
            onChange={handleFormChange}
            options={[
              { value: "Delivered", label: "Delivered" },
              { value: "Partially Delivered", label: "Partially Delivered" },
              { value: "Failed Delivery", label: "Failed Delivery" },
              { value: "Returned", label: "Returned" },
            ]}
            placeholder="Select status..."
            error={formErrors.deliveryStatus}
          />
          <Select
            label="Receiver Verification"
            name="receiverVerified"
            value={form.receiverVerified}
            onChange={handleFormChange}
            options={[
              { value: "Verified", label: "Verified" },
              { value: "Pending", label: "Pending" },
            ]}
            placeholder="Select..."
            error={formErrors.receiverVerified}
          />
          <InputField label="Receiver Mobile" name="receiverMobile" value={form.receiverMobile} onChange={handleFormChange} icon={Phone} />
          <InputField label="Receiver Email" type="email" name="receiverEmail" value={form.receiverEmail} onChange={handleFormChange} icon={Mail} />
        </div>
      </div>
      <div className="border-t border-neutral-border pt-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-textMuted mb-3">Proof of Delivery</h3>
        <div className="space-y-4">
          <FileUpload
            label="Upload delivery photos, invoices, and documents"
            hint="Drag & drop or click to browse — JPG, PNG, PDF up to 10MB"
            files={formFiles}
            onFilesChange={setFormFiles}
            multiple
          />
          {formErrors.files && <p className="text-xs text-danger font-medium">{formErrors.files}</p>}

          <div className="border border-neutral-border rounded-xl p-4 bg-accent-light/50">
            <p className="text-xs font-semibold text-neutral-textMuted mb-2">Receiver Signature</p>
            {signaturePad ? (
              <div className="relative">
                <img src={signaturePad} alt="Signature" className="max-w-full h-16 object-contain bg-white rounded-lg border border-neutral-border" />
                <button onClick={() => setSignaturePad(null)} className="mt-1 text-xs text-danger font-semibold hover:underline">Remove</button>
              </div>
            ) : (
              <button
                onClick={() => {
                  const canvas = document.createElement("canvas");
                  canvas.width = 400; canvas.height = 120;
                  const ctx = canvas.getContext("2d");
                  ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, 400, 120);
                  ctx.strokeStyle = "#1E3A5F"; ctx.lineWidth = 2;
                  ctx.beginPath();
                  const points = [
                    [40, 90], [60, 60], [85, 40], [110, 55], [130, 35],
                    [155, 50], [175, 30], [200, 45], [220, 25], [245, 40],
                    [265, 20], [290, 35], [310, 45], [335, 30], [360, 50],
                  ];
                  ctx.moveTo(points[0][0], points[0][1]);
                  for (let i = 1; i < points.length; i++) {
                    const xc = (points[i][0] + points[i - 1][0]) / 2;
                    const yc = (points[i][1] + points[i - 1][1]) / 2;
                    ctx.quadraticCurveTo(points[i - 1][0], points[i - 1][1], xc, yc);
                  }
                  ctx.stroke();
                  setSignaturePad(canvas.toDataURL());
                }}
                className="w-full h-16 border-2 border-dashed border-neutral-border rounded-lg flex items-center justify-center text-xs text-neutral-textMuted hover:border-primary hover:text-primary transition-colors"
              >
                <Plus className="w-4 h-4 mr-1.5" /> Click to generate mock signature
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="border-t border-neutral-border pt-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-textMuted mb-3">Additional Details</h3>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-neutral-textMain mb-1.5 block">Delivery Notes</label>
            <textarea
              name="deliveryNotes"
              value={form.deliveryNotes}
              onChange={handleFormChange}
              rows={2}
              className="w-full border border-neutral-border rounded-lg px-4 py-2.5 text-sm text-neutral-textMain outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none"
              placeholder="Any notes about the delivery..."
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-neutral-textMain mb-1.5 block">Damage Report (Optional)</label>
              <textarea
                name="damageReport"
                value={form.damageReport}
                onChange={handleFormChange}
                rows={2}
                className="w-full border border-neutral-border rounded-lg px-4 py-2.5 text-sm text-neutral-textMain outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none"
                placeholder="Describe any damage..."
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-neutral-textMain mb-1.5 block">Delay Reason (Optional)</label>
              <textarea
                name="delayReason"
                value={form.delayReason}
                onChange={handleFormChange}
                rows={2}
                className="w-full border border-neutral-border rounded-lg px-4 py-2.5 text-sm text-neutral-textMain outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none"
                placeholder="Reason for delay..."
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-neutral-textMain mb-1.5 block">Driver Comments</label>
            <textarea
              name="driverComments"
              value={form.driverComments}
              onChange={handleFormChange}
              rows={2}
              className="w-full border border-neutral-border rounded-lg px-4 py-2.5 text-sm text-neutral-textMain outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none"
              placeholder="Driver remarks..."
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <PageHeader
        title="Proof of Delivery"
        subtitle="Manage delivery confirmations, digital signatures, and documentation"
        actions={
          <div className="flex items-center gap-2">
            <Button onClick={openUpload} size="sm">
              <Upload className="w-4 h-4 mr-1.5" /> Upload POD
            </Button>
            <Button variant="secondary" size="sm" onClick={() => setShowExport(true)}>
              <Download className="w-4 h-4 mr-1.5" /> Export
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-4">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="bg-white border border-neutral-border rounded-xl p-3 shadow-soft-sm"
          >
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

      <div className="bg-white border border-neutral-border rounded-xl shadow-soft-sm overflow-hidden">
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-neutral-border">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative max-w-xs flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-textMuted" />
              <input
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search POD records..."
                className="w-full h-9 pl-9 pr-4 text-sm bg-neutral-light border border-neutral-border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "p-2 rounded-lg transition-colors",
                showFilters || statusFilter !== "all" ? "bg-primary/10 text-primary" : "text-neutral-textMuted hover:bg-accent-light"
              )}
            >
              <Filter className="w-4 h-4" />
            </button>
            {selected.size > 0 && (
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold text-neutral-textMuted">{selected.size} selected</span>
                <button onClick={() => setDeleteMany(true)} className="text-xs font-bold text-danger hover:underline">Delete Selected</button>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
              className="h-9 text-xs border border-neutral-border rounded-lg px-2.5 bg-white outline-none focus:border-primary text-neutral-textMain"
            >
              <option value="all">All Status</option>
              <option value="Verified">Verified</option>
              <option value="Uploaded">Uploaded</option>
              <option value="Pending">Pending</option>
              <option value="Partially Uploaded">Partially Uploaded</option>
              <option value="Rejected">Rejected</option>
            </select>
            <button onClick={() => { setSearch(""); setStatusFilter("all"); setDateRange({ from: "", to: "" }); setPage(1); }}
              className="p-2 rounded-lg hover:bg-accent-light text-neutral-textMuted transition-colors">
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {showFilters && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            className="border-b border-neutral-border bg-accent-light/50 px-5 py-3 overflow-hidden">
            <div className="flex items-center gap-3 flex-wrap">
              <div>
                <label className="text-[10px] font-semibold text-neutral-textMuted block mb-1">Date From</label>
                <input type="date" value={dateRange.from} onChange={(e) => setDateRange((p) => ({ ...p, from: e.target.value }))}
                  className="h-8 text-xs border border-neutral-border rounded-lg px-2.5 bg-white outline-none focus:border-primary" />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-neutral-textMuted block mb-1">Date To</label>
                <input type="date" value={dateRange.to} onChange={(e) => setDateRange((p) => ({ ...p, to: e.target.value }))}
                  className="h-8 text-xs border border-neutral-border rounded-lg px-2.5 bg-white outline-none focus:border-primary" />
              </div>
              <div className="pt-4">
                <button onClick={() => { setDateRange({ from: "", to: "" }); }} className="text-xs font-semibold text-primary hover:underline">Clear</button>
              </div>
            </div>
          </motion.div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-border bg-slate-50/80 sticky top-0">
                <th className="w-10 px-3 py-3">
                  <button onClick={toggleSelectAll}
                    className={cn(
                      "w-4 h-4 rounded border-2 flex items-center justify-center transition-all",
                      selected.size === paginated.length && paginated.length > 0
                        ? "bg-primary border-primary" : "border-neutral-border hover:border-neutral-textMuted"
                    )}>
                    {selected.size === paginated.length && paginated.length > 0 && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
                  </button>
                </th>
                {cols.map((col) => (
                  <th key={col.key} onClick={() => toggleSort(col.key)}
                    className="px-3 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-neutral-textMuted cursor-pointer select-none hover:text-accent whitespace-nowrap">
                    <span className="flex items-center gap-1">{col.label} <SortIcon colKey={col.key} /></span>
                  </th>
                ))}
                <th className="w-16 px-3 py-3 text-[10px] font-bold uppercase tracking-wider text-neutral-textMuted">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={cols.length + 2} className="px-4 py-16 text-center">
                    <div className="text-neutral-textMuted">
                      <div className="w-12 h-12 bg-accent-light rounded-xl flex items-center justify-center mx-auto mb-3">
                        <FileText className="w-5 h-5" />
                      </div>
                      <p className="text-sm font-medium">{records.length === 0 ? "No POD records yet — click Upload POD to begin" : "No matching records found"}</p>
                      {records.length === 0 && (
                        <Button onClick={openUpload} variant="secondary" size="sm" className="mt-3">
                          <Upload className="w-4 h-4 mr-1.5" /> Upload First POD
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                paginated.map((row, i) => (
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
                    <td className="px-3 py-3" onClick={(e) => e.stopPropagation()}>
                      <button onClick={() => toggleSelect(i)}
                        className={cn(
                          "w-4 h-4 rounded border-2 flex items-center justify-center transition-all",
                          selected.has(i) ? "bg-primary border-primary" : "border-neutral-border hover:border-neutral-textMuted"
                        )}>
                        {selected.has(i) && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
                      </button>
                    </td>
                    <td className="px-3 py-3 font-mono text-xs font-bold text-primary">{row.id}</td>
                    <td className="px-3 py-3 font-mono text-xs text-neutral-textMuted">{row.deliveryId}</td>
                    <td className="px-3 py-3 font-bold text-neutral-textMain max-w-[140px] truncate">{row.receiver}</td>
                    <td className="px-3 py-3 text-neutral-textMain">{row.driver}</td>
                    <td className="px-3 py-3 font-bold text-neutral-textMain whitespace-nowrap">{row.vehicle}</td>
                    <td className="px-3 py-3 text-neutral-textMuted text-xs tabular-nums whitespace-nowrap">{row.deliveryTime || row.deliveryDate}</td>
                    <td className="px-3 py-3 text-neutral-textMain">{row.signedBy}</td>
                    <td className="px-3 py-3">
                      {row.signature ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full whitespace-nowrap">
                          <Check className="w-3 h-3" /> Signed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full whitespace-nowrap">
                          <Clock className="w-3 h-3" /> Pending
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1">
                        <Camera className={cn("w-3.5 h-3.5", row.photos > 0 ? "text-emerald-500" : "text-neutral-textMuted")} />
                        <span className="text-xs font-bold text-neutral-textMain">{row.photos || 0}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1">
                        <FileText className={cn("w-3.5 h-3.5", row.documents > 0 ? "text-primary" : "text-neutral-textMuted")} />
                        <span className="text-xs font-bold text-neutral-textMain">{row.documents || 0}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <span className={cn(
                        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap",
                        row.status === "Verified" ? "bg-emerald-50 text-emerald-600" :
                        row.status === "Uploaded" ? "bg-blue-50 text-blue-600" :
                        row.status === "Partially Uploaded" ? "bg-purple-50 text-purple-600" :
                        row.status === "Rejected" ? "bg-red-50 text-red-600" :
                        "bg-amber-50 text-amber-600"
                      )}>
                        {row.status === "Verified" ? <FileCheck className="w-3 h-3" /> :
                         row.status === "Pending" ? <Clock className="w-3 h-3" /> :
                         row.status === "Rejected" ? <XCircle className="w-3 h-3" /> :
                         <Upload className="w-3 h-3" />}
                        {row.status}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="relative">
                        <ActionMenu record={row} onView={openView} onEdit={openEdit} onVerify={setVerifyPod} onDelete={setDeletePod} />
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {filtered.length > 0 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-neutral-border">
            <p className="text-xs text-neutral-textMuted">
              Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, filtered.length)} of {filtered.length}
            </p>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}
                className="p-1.5 rounded-lg hover:bg-accent-light text-neutral-textMuted disabled:opacity-30 disabled:cursor-not-allowed">
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pn = totalPages <= 5 ? i + 1 : page <= 3 ? i + 1 : page >= totalPages - 2 ? totalPages - 4 + i : page - 2 + i;
                return <button key={pn} onClick={() => setPage(pn)}
                  className={cn("w-8 h-8 rounded-lg text-xs font-semibold transition-all", page === pn ? "bg-primary text-white" : "text-neutral-textMuted hover:bg-accent-light")}>{pn}</button>;
              })}
              <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}
                className="p-1.5 rounded-lg hover:bg-accent-light text-neutral-textMuted disabled:opacity-30 disabled:cursor-not-allowed">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      <Modal open={uploadOpen} onClose={() => { if (!submitting) { setUploadOpen(false); resetForm(); } }} title={editMode ? "Edit Proof of Delivery" : "Upload Proof of Delivery"} size="xl">
        {uploadForm}
        <div className="flex items-center justify-between pt-6 border-t border-neutral-border mt-6">
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => { setUploadOpen(false); resetForm(); }} disabled={submitting}>
              Cancel
            </Button>
            <Button variant="secondary" onClick={resetForm} disabled={submitting}>
              <RefreshCw className="w-4 h-4 mr-1.5" /> Reset
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={() => handleUpload(false)} loading={submitting}>
              <Save className="w-4 h-4 mr-1.5" /> {editMode ? "Update POD" : "Upload POD"}
            </Button>
            {!editMode && (
              <Button onClick={() => handleUpload(true)} disabled={submitting}>
                <Upload className="w-4 h-4 mr-1.5" /> Upload & Add Another
              </Button>
            )}
          </div>
        </div>
      </Modal>

      <Modal open={!!viewPod} onClose={() => setViewPod(null)} title="View Proof of Delivery" size="lg">
        {viewPod && <ViewPodContent record={viewPod} />}
      </Modal>

      <Modal open={!!verifyPod} onClose={() => setVerifyPod(null)} title="Verify POD" size="sm">
        {verifyPod && (
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-8 h-8 text-emerald-500" strokeWidth={1.5} />
            </div>
            <p className="text-sm font-semibold text-neutral-textMain mb-2">Verify {verifyPod.id}?</p>
            <p className="text-xs text-neutral-textMuted mb-6">This will mark the POD as verified and confirmed.</p>
            <div className="flex items-center justify-center gap-3">
              <Button variant="secondary" onClick={() => setVerifyPod(null)}>Cancel</Button>
              <Button onClick={() => handleVerify(verifyPod)}>
                <Check className="w-4 h-4 mr-1.5" /> Confirm Verification
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={!!deletePod} onClose={() => setDeletePod(null)} title="Delete POD" size="sm">
        {deletePod && (
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-8 h-8 text-red-500" strokeWidth={1.5} />
            </div>
            <p className="text-sm font-semibold text-neutral-textMain mb-2">Delete {deletePod.id}?</p>
            <p className="text-xs text-neutral-textMuted mb-6">This action cannot be undone.</p>
            <div className="flex items-center justify-center gap-3">
              <Button variant="secondary" onClick={() => setDeletePod(null)}>Cancel</Button>
              <Button variant="danger" onClick={() => handleDelete(deletePod)}>
                <Trash2 className="w-4 h-4 mr-1.5" /> Delete
              </Button>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={deleteMany} onClose={() => setDeleteMany(false)} title="Delete Selected" size="sm">
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-8 h-8 text-red-500" strokeWidth={1.5} />
          </div>
          <p className="text-sm font-semibold text-neutral-textMain mb-2">Delete {selected.size} selected record(s)?</p>
          <p className="text-xs text-neutral-textMuted mb-6">This action cannot be undone.</p>
          <div className="flex items-center justify-center gap-3">
            <Button variant="secondary" onClick={() => setDeleteMany(false)}>Cancel</Button>
            <Button variant="danger" onClick={handleDeleteSelected}>
              <Trash2 className="w-4 h-4 mr-1.5" /> Delete All
            </Button>
          </div>
        </div>
      </Modal>

      <Modal open={showExport} onClose={() => setShowExport(false)} title="Export Records" size="sm">
        <div className="space-y-3 py-2">
          <p className="text-xs text-neutral-textMuted">Export {filtered.length} record(s) as:</p>
          <Button onClick={() => handleExport("csv")} className="w-full justify-start" variant="secondary">
            <FileSpreadsheet className="w-4 h-4 mr-2" /> Export as CSV
          </Button>
          <Button onClick={() => handleExport("excel")} className="w-full justify-start" variant="secondary">
            <FileDown className="w-4 h-4 mr-2" /> Export as Excel
          </Button>
          <Button onClick={() => handleExport("pdf")} className="w-full justify-start" variant="secondary">
            <FileIcon className="w-4 h-4 mr-2" /> Export as PDF
          </Button>
        </div>
      </Modal>
    </motion.div>
  );
}

function ActionMenu({ record, onView, onEdit, onVerify, onDelete }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)}
        className="p-1 rounded hover:bg-accent-light text-neutral-textMuted transition-colors">
        <MoreHorizontal className="w-4 h-4" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            className="absolute right-0 top-full mt-1 w-44 bg-white border border-neutral-border rounded-xl shadow-soft-lg py-1.5 z-20 overflow-hidden"
          >
            <MenuButton icon={Eye} label="View POD" onClick={() => { onView(record); setOpen(false); }} />
            <MenuButton icon={Edit3} label="Edit POD" onClick={() => { onEdit(record); setOpen(false); }} />
            <MenuButton icon={ShieldCheck} label="Verify POD" onClick={() => { onVerify(record); setOpen(false); }} />
            <div className="border-t border-neutral-border my-1" />
            <MenuButton icon={Download} label="Download PDF" onClick={() => setOpen(false)} />
            <MenuButton icon={Image} label="Download Images" onClick={() => setOpen(false)} />
            <MenuButton icon={Printer} label="Print POD" onClick={() => { window.print(); setOpen(false); }} />
            <div className="border-t border-neutral-border my-1" />
            <MenuButton icon={Trash2} label="Delete Record" onClick={() => { onDelete(record); setOpen(false); }} className="text-danger hover:bg-danger-light hover:text-danger" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MenuButton({ icon: Icon, label, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-2.5 px-3.5 py-2 text-sm text-neutral-textMuted hover:bg-accent-light transition-colors",
        className
      )}
    >
      <Icon className="w-4 h-4" strokeWidth={1.8} />
      {label}
    </button>
  );
}

function ViewPodContent({ record }) {
  const fields = [
    { label: "POD ID", value: record.id },
    { label: "Delivery ID", value: record.deliveryId },
    { label: "Trip ID", value: record.tripId || "—" },
    { label: "Vehicle", value: record.vehicle || "—" },
    { label: "Driver", value: record.driver || "—" },
    { label: "Receiver", value: record.receiver },
    { label: "Receiver Mobile", value: record.receiverMobile || "—" },
    { label: "Receiver Email", value: record.receiverEmail || "—" },
    { label: "Delivery Date", value: record.deliveryDate || "—" },
    { label: "Delivery Time", value: record.deliveryTime || "—" },
    { label: "Delivery Status", value: record.deliveryStatus || "—" },
    { label: "Verification", value: record.receiverVerified || "—" },
    { label: "Signed By", value: record.signedBy || "—" },
    { label: "Signature", value: record.signature ? "Collected" : "Pending" },
    { label: "Photos", value: record.photos || 0 },
    { label: "Documents", value: record.documents || 0 },
    { label: "Status", value: record.status },
    { label: "Uploaded At", value: record.uploadedAt || "—" },
    { label: "Uploaded By", value: record.uploadedBy || "—" },
  ];

  return (
    <div className="space-y-4">
      {record.deliveryNotes && (
        <div className="bg-accent-light rounded-lg p-3 border border-neutral-border/50">
          <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-textMuted mb-1">Delivery Notes</p>
          <p className="text-sm text-neutral-textMain">{record.deliveryNotes}</p>
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {fields.map((f) => (
          <div key={f.label} className="bg-accent-light/50 rounded-lg p-3 border border-neutral-border/50">
            <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-textMuted mb-0.5">{f.label}</p>
            <p className="text-sm font-semibold text-neutral-textMain">{f.value}</p>
          </div>
        ))}
      </div>
      {(record.damageReport || record.delayReason || record.driverComments) && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-neutral-border">
          {record.damageReport && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-danger mb-1">Damage Report</p>
              <p className="text-xs text-neutral-textMain">{record.damageReport}</p>
            </div>
          )}
          {record.delayReason && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-amber-600 mb-1">Delay Reason</p>
              <p className="text-xs text-neutral-textMain">{record.delayReason}</p>
            </div>
          )}
          {record.driverComments && (
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-textMuted mb-1">Driver Comments</p>
              <p className="text-xs text-neutral-textMain">{record.driverComments}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Route(props) {
  return <MapPin {...props} />;
}

function Filter(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}
