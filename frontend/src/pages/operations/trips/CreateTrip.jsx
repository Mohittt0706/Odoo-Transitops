import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageHeader from "../../../components/ui/PageHeader";
import { Toast, ConfirmationModal } from "../../../components/trips/TripComponents";
import { ArrowLeft } from "lucide-react";

const fields = [
  { key: "source", label: "Source", type: "select", required: true, options: ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Ahmedabad", "Kochi"] },
  { key: "destination", label: "Destination", type: "select", required: true, options: ["Pune", "Jaipur", "Chennai", "Coimbatore", "Patna", "Visakhapatnam", "Rajkot", "Surat"] },
  { key: "driver", label: "Driver", type: "select", required: true, options: ["Vikram Singh", "Rajesh Kumar", "Suresh Patel", "Anil Sharma", "Deepak Verma", "Jose Thomas"] },
  { key: "vehicle", label: "Vehicle", type: "select", required: true, options: ["MH-12-RT-2244", "KL-07-AU-4521", "KA-01-MN-3312", "DL-03-KP-5567", "UP-32-CD-6677", "KL-03-GH-3344"] },
  { key: "cargoType", label: "Cargo Type", type: "text", required: true },
  { key: "cargoWeight", label: "Cargo Weight", type: "text", required: true, placeholder: "e.g. 2.5 tons" },
  { key: "estimatedDistance", label: "Estimated Distance", type: "number", required: true, placeholder: "km" },
  { key: "startDate", label: "Start Date", type: "date", required: true },
  { key: "deliveryDate", label: "Delivery Date", type: "date", required: true },
  { key: "priority", label: "Priority", type: "select", required: true, options: ["Low", "Normal", "Medium", "High", "Critical"] },
  { key: "notes", label: "Notes", type: "textarea" },
];

const initState = fields.reduce((a, f) => ({ ...a, [f.key]: "" }), {});

export default function CreateTrip() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initState);
  const [errors, setErrors] = useState({});
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const validate = () => {
    const errs = {};
    fields.forEach(f => {
      if (f.required && !form[f.key]) errs[f.key] = `${f.label} is required`;
      if (f.key === "estimatedDistance" && form[f.key] && Number(form[f.key]) <= 0) errs[f.key] = "Must be positive";
      if (f.key === "startDate" && form[f.key] && f.key === "deliveryDate" && form.deliveryDate && new Date(form.deliveryDate) <= new Date(form.startDate)) errs.deliveryDate = "Must be after start date";
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => { e.preventDefault(); if (validate()) setConfirmOpen(true); };
  const handleConfirm = () => {
    setConfirmOpen(false); setToast({ type: "success", message: "Trip created successfully!" });
    setTimeout(() => navigate("/dashboard/operations/trips"), 1500);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <PageHeader title="Create Trip" subtitle="Schedule a new delivery trip"
        actions={<button onClick={() => navigate(-1)} className="btn btn-secondary text-xs flex items-center gap-1.5"><ArrowLeft className="w-3.5 h-3.5" /> Back</button>}
      />
      <form onSubmit={handleSubmit} className="max-w-3xl">
        <div className="card space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fields.map(f => (
              <div key={f.key} className={f.key === "notes" ? "sm:col-span-2" : ""}>
                <label className="block text-xs font-semibold text-neutral-textMuted mb-1.5">{f.label}{f.required && <span className="text-danger ml-0.5">*</span>}</label>
                {f.type === "select" ? (
                  <select value={form[f.key]} onChange={e => set(f.key, e.target.value)} className="w-full h-10 px-3 text-sm bg-white border border-neutral-border rounded-lg outline-none focus:border-primary">
                    <option value="">Select...</option>
                    {f.options.map(o => <option key={o}>{o}</option>)}
                  </select>
                ) : f.type === "textarea" ? (
                  <textarea value={form[f.key]} onChange={e => set(f.key, e.target.value)} rows={3} className="w-full px-3 py-2 text-sm bg-white border border-neutral-border rounded-lg outline-none focus:border-primary resize-none" />
                ) : (
                  <input type={f.type} value={form[f.key]} onChange={e => set(f.key, e.target.value)} placeholder={f.placeholder || ""} className="w-full h-10 px-3 text-sm bg-white border border-neutral-border rounded-lg outline-none focus:border-primary" />
                )}
                {errors[f.key] && <p className="text-[11px] text-danger mt-1">{errors[f.key]}</p>}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-border">
            <button type="button" onClick={() => navigate(-1)} className="btn btn-secondary text-xs px-6 py-2.5">Cancel</button>
            <button type="submit" className="btn btn-primary text-xs px-6 py-2.5">Create Trip</button>
          </div>
        </div>
      </form>
      <ConfirmationModal open={confirmOpen} title="Create Trip" message="Are you sure you want to create this trip?" confirmLabel="Create" onConfirm={handleConfirm} onCancel={() => setConfirmOpen(false)} />
      {toast && <Toast show type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
    </motion.div>
  );
}
