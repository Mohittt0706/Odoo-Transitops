import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageHeader from "../../../components/layout/PageHeader";
import { Toast, ConfirmationModal } from "../../../components/maintenance/MaintenanceComponents";
import { ArrowLeft, Upload } from "lucide-react";

const fields = [
  { key: "vehicle", label: "Vehicle", type: "select", required: true, options: ["Tata Prima 4040.S", "Ashok Leyland 4220", "Eicher Pro 6036", "Mahindra Blazo X25", "Volvo FH16", "Scania R450", "BharatBenz 2528", "Isuzu FVR"] },
  { key: "issue", label: "Issue Title", type: "text", required: true },
  { key: "description", label: "Issue Description", type: "textarea" },
  { key: "priority", label: "Priority", type: "select", required: true, options: ["Critical", "High", "Medium", "Low"] },
  { key: "category", label: "Category", type: "select", options: ["Preventive", "Repair", "Major Repair", "Service", "Inspections"] },
  { key: "assignedMechanic", label: "Assigned Mechanic", type: "select", options: ["Rajesh Mechanic", "Suresh Auto", "Anil Brakes", "CoolTech Kumar", "PowerCell Sharma"] },
  { key: "garage", label: "Garage", type: "select", options: ["Ravi Mechanicals", "Transit Auto Care", "FleetFix Pro", "CoolTech Services", "PowerCell India"] },
  { key: "estimatedCost", label: "Estimated Cost", type: "text", required: true, placeholder: "₹ 0.00" },
  { key: "expectedDate", label: "Expected Completion", type: "date", required: true },
  { key: "notes", label: "Additional Notes", type: "textarea" },
];

const initState = fields.reduce((a, f) => ({ ...a, [f.key]: f.type === "textarea" ? "" : "" }), {});

export default function CreateMaintenance() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initState);
  const [errors, setErrors] = useState({});
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const validate = () => {
    const errs = {};
    fields.forEach(f => { if (f.required && !form[f.key]) errs[f.key] = `${f.label} is required`; });
    if (form.estimatedCost && !/^[₹]?\d+[,\d]*$/.test(form.estimatedCost)) errs.estimatedCost = "Enter valid cost";
    if (form.expectedDate && form.expectedDate < new Date().toISOString().split("T")[0]) errs.expectedDate = "Must be future date";
    setErrors(errs); return Object.keys(errs).length === 0;
  };
  const handleSubmit = (e) => { e.preventDefault(); if (validate()) setConfirmOpen(true); };
  const handleConfirm = () => { setConfirmOpen(false); setToast({ type: "success", message: "Maintenance request created!" }); setTimeout(() => navigate("/dashboard/operations/maintenance"), 1500); };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <PageHeader title="Create Maintenance Request" subtitle="Schedule new vehicle service"
        actions={<button onClick={() => navigate(-1)} className="btn btn-secondary text-xs flex items-center gap-1.5"><ArrowLeft className="w-3.5 h-3.5" /> Back</button>}
      />
      <form onSubmit={handleSubmit} className="max-w-3xl">
        <div className="card space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fields.map(f => (
              <div key={f.key} className={f.key === "description" || f.key === "notes" ? "sm:col-span-2" : ""}>
                <label className="block text-xs font-semibold text-neutral-textMuted mb-1.5">{f.label}{f.required && <span className="text-danger ml-0.5">*</span>}</label>
                {f.type === "select" ? (
                  <select value={form[f.key]} onChange={e => set(f.key, e.target.value)} className="w-full h-10 px-3 text-sm bg-white border border-neutral-border rounded-lg outline-none focus:border-primary"><option value="">Select...</option>{f.options.map(o => <option key={o}>{o}</option>)}</select>
                ) : f.type === "textarea" ? (
                  <textarea value={form[f.key]} onChange={e => set(f.key, e.target.value)} rows={3} className="w-full px-3 py-2 text-sm bg-white border border-neutral-border rounded-lg outline-none focus:border-primary resize-none" />
                ) : (
                  <input type={f.type} value={form[f.key]} onChange={e => set(f.key, e.target.value)} placeholder={f.placeholder || ""} className="w-full h-10 px-3 text-sm bg-white border border-neutral-border rounded-lg outline-none focus:border-primary" />
                )}
                {errors[f.key] && <p className="text-[11px] text-danger mt-1">{errors[f.key]}</p>}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="block text-xs font-semibold text-neutral-textMuted mb-1.5">Upload Images</label><div className="flex items-center gap-2 h-10 px-3 border border-dashed border-neutral-border rounded-lg text-sm text-neutral-textMuted cursor-pointer hover:border-primary"><Upload className="w-3.5 h-3.5" /> Click to upload</div></div>
            <div><label className="block text-xs font-semibold text-neutral-textMuted mb-1.5">Upload Documents</label><div className="flex items-center gap-2 h-10 px-3 border border-dashed border-neutral-border rounded-lg text-sm text-neutral-textMuted cursor-pointer hover:border-primary"><Upload className="w-3.5 h-3.5" /> Click to upload</div></div>
          </div>
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-border">
            <button type="button" onClick={() => navigate(-1)} className="btn btn-secondary text-xs px-5 py-2.5">Cancel</button>
            <button type="submit" className="btn btn-primary text-xs px-5 py-2.5">Submit Request</button>
          </div>
        </div>
      </form>
      <ConfirmationModal open={confirmOpen} title="Create Request" message="Submit this maintenance request?" confirmLabel="Submit" onConfirm={handleConfirm} onCancel={() => setConfirmOpen(false)} />
      {toast && <Toast show type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
    </motion.div>
  );
}
