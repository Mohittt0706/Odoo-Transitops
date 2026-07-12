import { useState } from "react";
import Modal from "../common/Modal";
import { useToast } from "../common/Toast";
import { allNotifications } from "../../data/notificationData";
import { Calendar, User, Building2, Mail, Phone, MessageSquare, Send } from "lucide-react";

let notifCounter = 1000;

export default function RequestDemoModal({ open, onClose }) {
  const toast = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    fullName: "", company: "", email: "", phone: "", demoDate: "", demoTime: "", message: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.fullName.trim()) errs.fullName = "Full name is required";
    if (!form.company.trim()) errs.company = "Company name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email format";
    if (!form.phone.trim()) errs.phone = "Phone is required";
    else if (!/^[\d\s\+\-\(\)]{7,20}$/.test(form.phone)) errs.phone = "Invalid phone number";
    if (!form.demoDate.trim()) errs.demoDate = "Preferred date is required";
    if (!form.demoTime.trim()) errs.demoTime = "Preferred time is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (key, value) => {
    setForm(f => ({ ...f, [key]: value }));
    if (errors[key]) setErrors(e => ({ ...e, [key]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    const demoReq = {
      id: `DEMO-${String(++notifCounter).padStart(4, "0")}`,
      ...form,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem("demo_requests") || "[]");
    existing.push(demoReq);
    localStorage.setItem("demo_requests", JSON.stringify(existing));
    localStorage.setItem("new_demo_request", "true");

    allNotifications.unshift({
      id: `NOT-DEMO-${Date.now()}`,
      title: `New Demo Request — ${form.company}`,
      description: `${form.fullName} from ${form.company} has requested a live demo on ${form.demoDate} at ${form.demoTime}.`,
      category: "general",
      subcategory: "Demo Request",
      priority: "high",
      sender: form.fullName,
      date: new Date().toISOString(),
      read: false,
      archived: false,
      pinned: false,
      demoRequestId: demoReq.id,
      demoStatus: "Pending",
    });

    toast("Demo request submitted successfully! Our team will contact you soon.", "success");
    setSubmitting(false);
    setForm({ fullName: "", company: "", email: "", phone: "", demoDate: "", demoTime: "", message: "" });
    onClose();
  };

  const Field = ({ label, icon: Icon, name, type = "text", placeholder, required, rows }) => (
    <div>
      <label className="text-[10px] font-bold text-neutral-textMuted uppercase block mb-1">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-textMuted">
            <Icon className="w-3.5 h-3.5" />
          </div>
        )}
        {rows ? (
          <textarea value={form[name]} onChange={e => handleChange(name, e.target.value)}
            rows={rows} placeholder={placeholder}
            className={`w-full px-3 py-2 text-xs bg-neutral-light border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 resize-none ${Icon ? "pl-9" : ""} ${errors[name] ? "border-danger" : "border-neutral-border"}`} />
        ) : (
          <input type={type} value={form[name]} onChange={e => handleChange(name, e.target.value)}
            placeholder={placeholder}
            className={`w-full h-9 px-3 text-xs bg-neutral-light border rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 ${Icon ? "pl-9" : ""} ${errors[name] ? "border-danger" : "border-neutral-border"}`} />
        )}
      </div>
      {errors[name] && <p className="text-[9px] text-danger mt-0.5">{errors[name]}</p>}
    </div>
  );

  return (
    <Modal open={open} onClose={onClose} title="Request a Live Demo" subtitle="Fill in your details and we'll get back to you within 24 hours" size="md">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Full Name" icon={User} name="fullName" placeholder="Rahul Sharma" required />
          <Field label="Company Name" icon={Building2} name="company" placeholder="Blue Dart Express" required />
          <Field label="Email Address" icon={Mail} name="email" type="email" placeholder="rahul@bluedart.com" required />
          <Field label="Phone Number" icon={Phone} name="phone" placeholder="+91 98765 43210" required />
          <Field label="Preferred Demo Date" icon={Calendar} name="demoDate" type="date" required />
          <Field label="Preferred Demo Time" icon={Calendar} name="demoTime" type="time" required />
        </div>
        <Field label="Message" icon={MessageSquare} name="message" placeholder="Tell us about your fleet size, current challenges, or specific modules you'd like to see..." rows={3} />

        <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-border/60">
          <button type="button" onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-neutral-textMuted bg-white border border-neutral-border rounded-lg hover:bg-accent-light transition-all">
            Cancel
          </button>
          <button type="submit" disabled={submitting}
            className="px-5 py-2 text-xs font-semibold text-white bg-primary rounded-lg hover:bg-primary-dark transition-all flex items-center gap-1.5 shadow-soft-sm disabled:opacity-60">
            {submitting ? (
              <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
            Submit Request
          </button>
        </div>
      </form>
    </Modal>
  );
}
