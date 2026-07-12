import { useState } from "react";
import { motion } from "framer-motion";
import PageHeader from "../../components/layout/PageHeader";
import ChartCard from "../../components/charts/ChartCard";
import StatusBadge from "../../components/common/Badge";
import { ConfirmationModal, Toast } from "../../components/road-captain/RoadCaptainComponents";
import { AlertTriangle, Phone, Shield, Ambulance, Building2, Truck, Siren, CircleCheck, Clock, MapPin, Wrench, Car, Heart, Bell, Flame, LifeBuoy, Navigation } from "lucide-react";

const emergencyContacts = [];

const emergencyTypes = [];

const procedureChecklist = [];

export default function EmergencyPage() {
  const [sosOpen, setSosOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const handleSOS = () => {
    setSosOpen(false);
    setToast({ type: "error", message: "SOS alert sent to dispatch and emergency contacts!" });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="bg-danger-light border border-danger/20 rounded-xl p-4 flex items-center gap-3">
        <AlertTriangle className="w-5 h-5 text-danger flex-shrink-0" />
        <p className="text-sm font-semibold text-danger">In case of emergency, call 112 (Police) / 108 (Ambulance) / 101 (Fire)</p>
      </div>

      <PageHeader
        title="Emergency"
        subtitle="Emergency contacts and quick actions"
        actions={
          <button onClick={() => setSosOpen(true)} className="flex items-center gap-2 px-5 py-2.5 bg-danger text-white text-sm font-bold rounded-xl hover:bg-danger/90 transition-colors animate-pulse">
            <Phone className="w-4 h-4" /> SOS
          </button>
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {emergencyTypes.map((type, i) => (
          <motion.button
            key={type.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className={`flex flex-col items-center gap-2 p-3 rounded-xl border ${type.color} hover:shadow-soft-md transition-all`}
          >
            <type.icon className="w-6 h-6" strokeWidth={1.8} />
            <span className="text-[11px] font-bold">{type.label}</span>
          </motion.button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {emergencyContacts.map((contact, i) => (
          <motion.div
            key={contact.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04, duration: 0.35 }}
            className="bg-white border border-neutral-border rounded-xl p-4 shadow-soft-sm hover:shadow-soft-md transition-all"
          >
            <div className="flex items-start gap-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${contact.color} flex-shrink-0`}>
                <contact.icon className="w-[18px] h-[18px]" strokeWidth={1.8} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold font-headings text-neutral-textMain">{contact.name}</h3>
                <p className="text-xs text-neutral-textMuted">{contact.person}</p>
                <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="flex items-center gap-1.5 mt-2 text-sm font-semibold text-primary hover:underline">
                  <Phone className="w-3.5 h-3.5" />{contact.phone}
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Emergency Procedures" delay={0.3}>
          <div className="space-y-2">
            {procedureChecklist.map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${item.done ? "bg-success border-success" : "border-neutral-border"}`}>
                  {item.done && <CircleCheck className="w-3 h-3 text-white" />}
                </div>
                <span className={`text-sm ${item.done ? "text-neutral-textMuted line-through" : "text-neutral-textMain font-medium"}`}>{item.step}</span>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Live Location Sharing" delay={0.35}>
          <div className="flex flex-col items-center py-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-3">
              <Navigation className="w-8 h-8 text-primary" strokeWidth={1.5} />
            </div>
            <p className="text-sm font-bold text-neutral-textMain">Location Sharing Active</p>
            <p className="text-xs text-neutral-textMuted mt-1">Your real-time location is being shared with dispatch</p>
            <div className="flex items-center gap-1.5 mt-3 text-xs text-success bg-success-light px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" /> Live
            </div>
          </div>
        </ChartCard>
      </div>

      <ConfirmationModal open={sosOpen} title="Send SOS Alert" message="This will notify fleet manager, safety officer, and emergency contacts with your live location." confirmLabel="Send SOS" variant="danger" onConfirm={handleSOS} onCancel={() => setSosOpen(false)} />
      {toast && <Toast show type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
    </motion.div>
  );
}
