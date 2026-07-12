import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageHeader from "../../../components/layout/PageHeader";
import { vehicles, fuelStations } from "../../../data/fuelExpenseData";
import { Toast, ConfirmationModal, FileUpload } from "../../../components/fuel-expense/FuelExpenseComponents";
import { ArrowLeft } from "lucide-react";

const fuelTypes = ["Diesel", "Petrol", "CNG", "EV"];
const paymentMethods = ["Fuel Card", "Cash", "Credit", "UPI"];

const init = { vehicle: "", driver: "", fuelStation: "", fuelType: "Diesel", quantity: "", pricePerLiter: "", totalAmount: "", currentOdometer: "", previousOdometer: "", fuelEconomy: "", paymentMethod: "Fuel Card", fuelDate: "", remarks: "" };

export default function AddFuelLog() {
  const navigate = useNavigate();
  const [form, setForm] = useState(init);
  const [errors, setErrors] = useState({});
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [receipt, setReceipt] = useState(null);

  const set = (k, v) => {
    const next = { ...form, [k]: v };
    if (k === "quantity" || k === "pricePerLiter") {
      const q = parseFloat(next.quantity) || 0;
      const p = parseFloat(next.pricePerLiter) || 0;
      next.totalAmount = q * p ? `₹${(q * p).toLocaleString()}` : "";
    }
    if ((k === "currentOdometer" || k === "previousOdometer") && next.currentOdometer && next.previousOdometer) {
      const diff = parseFloat(next.currentOdometer) - parseFloat(next.previousOdometer);
      const q = parseFloat(next.quantity) || 1;
      next.fuelEconomy = diff > 0 ? (diff / q).toFixed(1) : "";
    }
    setForm(next);
  };

  const validate = () => {
    const e = {};
    if (!form.vehicle) e.vehicle = "Vehicle is required";
    if (!form.driver) e.driver = "Driver is required";
    if (!form.quantity || parseFloat(form.quantity) <= 0) e.quantity = "Valid quantity required";
    if (form.totalAmount && parseFloat(form.totalAmount.replace(/[₹,]/g, "")) <= 0) e.totalAmount = "Valid amount required";
    if (!form.fuelDate) e.fuelDate = "Date is required";
    if (!form.currentOdometer) e.currentOdometer = "Odometer reading required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => { e.preventDefault(); if (validate()) setConfirmOpen(true); };
  const handleConfirm = () => {
    setConfirmOpen(false);
    setToast({ type: "success", message: "Fuel log created successfully!" });
    setTimeout(() => navigate("/dashboard/operations/fuel"), 1500);
  };

  const selectedVehicle = vehicles.find((v) => v.plate === form.vehicle);

  const fields = [
    { key: "vehicle", label: "Vehicle", type: "select", options: vehicles.map((v) => ({ value: v.plate, label: `${v.name} (${v.plate})` })), required: true, col: true },
    { key: "driver", label: "Driver", type: "text", required: true, placeholder: selectedVehicle?.driver !== "—" ? selectedVehicle.driver : "Enter driver name", col: true },
    { key: "fuelStation", label: "Fuel Station", type: "select", options: fuelStations.map((f) => ({ value: f, label: f })), col: true },
    { key: "fuelType", label: "Fuel Type", type: "select", options: fuelTypes.map((f) => ({ value: f, label: f })), col: true },
    { key: "quantity", label: "Fuel Quantity (L)", type: "number", placeholder: "e.g. 100", col: true },
    { key: "pricePerLiter", label: "Price Per Liter (₹)", type: "number", placeholder: "e.g. 90", col: true },
    { key: "totalAmount", label: "Total Amount", type: "text", readOnly: true, placeholder: "Auto-calculated", col: true },
    { key: "currentOdometer", label: "Current Odometer (km)", type: "number", placeholder: "e.g. 124500", col: true },
    { key: "previousOdometer", label: "Previous Odometer (km)", type: "number", placeholder: "e.g. 123900", col: true },
    { key: "fuelEconomy", label: "Fuel Economy (km/L)", type: "text", readOnly: true, placeholder: "Auto-calculated", col: true },
    { key: "paymentMethod", label: "Payment Method", type: "select", options: paymentMethods.map((p) => ({ value: p, label: p })), col: true },
    { key: "fuelDate", label: "Fuel Date", type: "date", required: true, col: true },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <PageHeader
        title="Add Fuel Log"
        subtitle="Record new fuel transaction"
        actions={
          <button onClick={() => navigate(-1)} className="btn btn-secondary text-xs flex items-center gap-1.5">
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>
        }
      />
      <form onSubmit={handleSubmit} className="max-w-3xl">
        <div className="card space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fields.map((f) => (
              <div key={f.key} className={f.col ? "" : "sm:col-span-2"}>
                <label className="block text-xs font-semibold text-neutral-textMuted mb-1.5">
                  {f.label}{f.required && <span className="text-danger ml-0.5">*</span>}
                </label>
                {f.type === "select" ? (
                  <select
                    value={form[f.key]}
                    onChange={(e) => set(f.key, e.target.value)}
                    className="w-full h-10 px-3 text-sm bg-white border border-neutral-border rounded-lg outline-none focus:border-primary"
                  >
                    <option value="">Select...</option>
                    {f.options.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={f.type}
                    value={form[f.key]}
                    readOnly={f.readOnly}
                    onChange={(e) => set(f.key, e.target.value)}
                    placeholder={f.placeholder || ""}
                    className={`w-full h-10 px-3 text-sm bg-white border rounded-lg outline-none transition-all ${f.readOnly ? "bg-neutral-light border-neutral-border text-neutral-textMuted" : "border-neutral-border focus:border-primary"}`}
                  />
                )}
                {errors[f.key] && <p className="text-[11px] text-danger mt-1">{errors[f.key]}</p>}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FileUpload label="Upload Receipt" accept=".pdf,.png,.jpg,.jpeg" onFile={(e) => setReceipt(e.target.files[0])} preview={receipt} />
            <div>
              <label className="block text-xs font-semibold text-neutral-textMuted mb-1.5">Remarks</label>
              <textarea
                value={form.remarks}
                onChange={(e) => set("remarks", e.target.value)}
                rows={3}
                placeholder="Optional notes..."
                className="w-full px-3 py-2 text-sm bg-white border border-neutral-border rounded-lg outline-none focus:border-primary resize-none"
              />
            </div>
          </div>
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-border">
            <button type="button" onClick={() => navigate(-1)} className="btn btn-secondary text-xs px-5 py-2.5">Cancel</button>
            <button type="reset" onClick={() => { setForm(init); setErrors({}); }} className="btn btn-ghost text-xs px-5 py-2.5">Reset</button>
            <button type="submit" className="btn btn-primary text-xs px-5 py-2.5">Submit Fuel Log</button>
          </div>
        </div>
      </form>
      <ConfirmationModal open={confirmOpen} title="Add Fuel Log" message="Submit this fuel log entry?" confirmLabel="Submit" onConfirm={handleConfirm} onCancel={() => setConfirmOpen(false)} />
      {toast && <Toast show type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
    </motion.div>
  );
}
