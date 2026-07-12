import { motion } from "framer-motion";
import PageHeader from "../../components/ui/PageHeader";
import ChartCard from "../../components/ui/ChartCard";
import StatusBadge from "../../components/ui/StatusBadge";
import {
  AlertTriangle,
  Phone,
  Shield,
  Ambulance,
  Building2,
  Truck,
  Siren,
  CircleCheck,
  Clock,
  MapPin,
} from "lucide-react";

const emergencyContacts = [
  {
    id: 1,
    name: "Fleet Manager",
    person: "Rajesh Mehta",
    phone: "+91 98765 43200",
    icon: Truck,
    color: "bg-primary/10 text-primary",
  },
  {
    id: 2,
    name: "Safety Officer",
    person: "Anita Desai",
    phone: "+91 98765 43201",
    icon: Shield,
    color: "bg-success-light text-success",
  },
  {
    id: 3,
    name: "Roadside Assistance",
    person: "24/7 Helpline",
    phone: "1800-103-7777",
    icon: Siren,
    color: "bg-warning-light text-warning",
  },
  {
    id: 4,
    name: "Insurance Provider",
    person: "Bajaj Allianz",
    phone: "1800-209-5858",
    icon: Shield,
    color: "bg-purple-50 text-purple-600",
  },
  {
    id: 5,
    name: "Hospital Nearby",
    person: "Kokilaben Hospital",
    phone: "+91 22 3099 9999",
    icon: Ambulance,
    color: "bg-danger-light text-danger",
  },
  {
    id: 6,
    name: "Police Station",
    person: "Andheri PS",
    phone: "022-2620 5555",
    icon: Building2,
    color: "bg-info-light text-primary",
  },
];

const procedureChecklist = [
  { step: "Ensure personal safety first", done: true },
  { step: "Turn on hazard lights", done: true },
  { step: "Place warning triangle behind vehicle", done: false },
  { step: "Call Fleet Manager immediately", done: false },
  { step: "Take photos of the scene", done: false },
  { step: "Exchange information if applicable", done: false },
  { step: "File police report if needed", done: false },
];

export default function EmergencyPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="bg-danger-light border border-danger/20 rounded-xl p-4 flex items-center gap-3">
        <AlertTriangle className="w-5 h-5 text-danger flex-shrink-0" />
        <p className="text-sm font-semibold text-danger">
          In case of emergency, call 112 (Police) / 108 (Ambulance) / 101 (Fire)
        </p>
      </div>

      <PageHeader
        title="Emergency"
        subtitle="Emergency contacts and procedures"
        actions={
          <button className="flex items-center gap-2 px-5 py-2.5 bg-danger text-white text-sm font-bold rounded-xl hover:bg-danger/90 transition-colors animate-pulse">
            <Phone className="w-4 h-4" />
            SOS
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {emergencyContacts.map((contact, i) => (
          <motion.div
            key={contact.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.35 }}
            className="bg-white border border-neutral-border rounded-xl p-5 shadow-soft-sm hover:shadow-soft-md transition-all duration-300"
          >
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${contact.color} flex-shrink-0`}>
                <contact.icon className="w-5 h-5" strokeWidth={1.8} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold font-headings text-neutral-textMain">
                  {contact.name}
                </h3>
                <p className="text-xs text-neutral-textMuted mt-0.5">{contact.person}</p>
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-1.5 mt-2 text-sm font-semibold text-primary hover:underline"
                >
                  <Phone className="w-3.5 h-3.5" />
                  {contact.phone}
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
              <div
                key={i}
                className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                    item.done
                      ? "bg-success border-success"
                      : "border-neutral-border"
                  }`}
                >
                  {item.done && <CircleCheck className="w-3 h-3 text-white" />}
                </div>
                <span
                  className={`text-sm ${
                    item.done
                      ? "text-neutral-textMuted line-through"
                      : "text-neutral-textMain font-medium"
                  }`}
                >
                  {item.step}
                </span>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Last Incident Report" delay={0.35}>
          <div className="p-4 rounded-xl bg-slate-50/80 border border-neutral-border/50">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-neutral-textMain">IN-005</span>
              <StatusBadge status="Resolved" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-neutral-textMuted" />
                <span className="text-xs text-neutral-textMuted">2026-06-28</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-neutral-textMuted" />
                <span className="text-xs text-neutral-textMuted">Mumbai Warehouse</span>
              </div>
              <p className="text-sm text-neutral-textMain mt-2">
                Minor packaging damage during loading. Cargo inspected and repackaged.
                No financial impact reported.
              </p>
            </div>
          </div>
        </ChartCard>
      </div>
    </motion.div>
  );
}
