import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageHeader from "../../../components/layout/PageHeader";
import { drivers as driverData } from "../../../data/driverData";
import { ConfirmationModal, Toast } from "../../../components/drivers/DriverComponents";
import { cn } from "../../../lib/utils";
import { Upload, ArrowLeft } from "lucide-react";

const fields = [
  { key: "name", label: "Full Name", type: "text", required: true },
  { key: "email", label: "Email", type: "email", required: true },
  { key: "phone", label: "Phone", type: "text", required: true, pattern: "^\\+91 \\d{5} \\d{5}$", error: "Format: +91 XXXXX XXXXX" },
  { key: "address", label: "Address", type: "text", required: true },
  { key: "licenseNo", label: "License Number", type: "text", required: true },
  { key: "licenseType", label: "License Type", type: "select", required: true, options: ["Heavy Vehicle", "Medium Vehicle", "Light Vehicle"] },
  { key: "licenseExpiry", label: "Expiry Date", type: "date", required: true },
  { key: "dob", label: "Date of Birth", type: "date", required: true },
  { key: "joiningDate", label: "Joining Date", type: "date", required: true },
  { key: "vehicle", label: "Vehicle Assignment", type: "text" },
  { key: "emergencyContact", label: "Emergency Contact", type: "text", required: true },
];

const initState = fields.reduce((acc, f) => ({ ...acc, [f.key]: "" }), {});

export default function DriverForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const [form, setForm] = useState(initState);
  const [errors, setErrors] = useState({});
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (isEdit) {
      const d = driverData.find(d => d.id === id);
      if (d) {
        const values = { name: d.name, email: d.email, phone: d.phone, address: d.address, licenseNo: d.licenseNo, licenseType: d.licenseType, licenseExpiry: d.licenseExpiry, dob: d.dob, joiningDate: d.joiningDate, vehicle: d.vehicle, emergencyContact: d.emergencyContact };
        setForm(values);
      }
    }
  }, [id, isEdit]);

  const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const validate = () => {
    const errs = {};
    fields.forEach(f => {
      const val = form[f.key];
      if (f.required && !val) errs[f.key] = `${f.label} is required`;
      if (f.key === "email" && val && !/\S+@\S+\.\S+/.test(val)) errs.email = "Invalid email";
      if (f.key === "phone" && val && !/^\+91 \d{5} \d{5}$/.test(val)) errs.phone = "Format: +91 XXXXX XXXXX";
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) setConfirmOpen(true);
  };

  const handleConfirm = () => {
    setConfirmOpen(false);
    setToast({ type: "success", message: isEdit ? "Driver updated successfully!" : "Driver added successfully!" });
    setTimeout(() => navigate("/dashboard/operations/drivers"), 1500);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <PageHeader title={isEdit ? "Edit Driver" : "Add Driver"} subtitle={isEdit ? "Update driver information" : "Register a new driver"}
        actions={<button onClick={() => navigate(-1)} className="btn btn-secondary text-xs flex items-center gap-1.5"><ArrowLeft className="w-3.5 h-3.5" /> Back</button>}
      />

      <form onSubmit={handleSubmit} className="max-w-3xl">
        <div className="card space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fields.map(f => (
              <div key={f.key} className={cn(f.key === "address" && "sm:col-span-2")}>
                <label className="block text-xs font-semibold text-neutral-textMuted mb-1.5">{f.label}{f.required && <span className="text-danger ml-0.5">*</span>}</label>
                {f.type === "select" ? (
                  <select value={form[f.key]} onChange={e => set(f.key, e.target.value)} className="w-full h-10 px-3 text-sm bg-white border border-neutral-border rounded-lg outline-none focus:border-primary transition-all">
                    <option value="">Select...</option>
                    {f.options.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : (
                  <input type={f.type} value={form[f.key]} onChange={e => set(f.key, e.target.value)} className="w-full h-10 px-3 text-sm bg-white border border-neutral-border rounded-lg outline-none focus:border-primary transition-all" />
                )}
                {errors[f.key] && <p className="text-[11px] text-danger mt-1">{errors[f.key]}</p>}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-textMuted mb-1.5">Upload License</label>
              <div className="flex items-center gap-2 h-10 px-3 border border-dashed border-neutral-border rounded-lg text-sm text-neutral-textMuted cursor-pointer hover:border-primary transition-all">
                <Upload className="w-3.5 h-3.5" /> Click to upload
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-neutral-textMuted mb-1.5">Upload Profile Photo</label>
              <div className="flex items-center gap-2 h-10 px-3 border border-dashed border-neutral-border rounded-lg text-sm text-neutral-textMuted cursor-pointer hover:border-primary transition-all">
                <Upload className="w-3.5 h-3.5" /> Click to upload
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-border">
            <button type="button" onClick={() => navigate(-1)} className="btn btn-secondary text-xs px-6 py-2.5">Cancel</button>
            <button type="submit" className="btn btn-primary text-xs px-6 py-2.5">{isEdit ? "Update Driver" : "Add Driver"}</button>
          </div>
        </div>
      </form>

      <ConfirmationModal open={confirmOpen} title={isEdit ? "Update Driver" : "Add Driver"} message={`Are you sure you want to ${isEdit ? "update" : "add"} this driver?`} confirmLabel={isEdit ? "Update" : "Add"} onConfirm={handleConfirm} onCancel={() => setConfirmOpen(false)} variant="primary" />
      {toast && <Toast show type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
    </motion.div>
  );
}
