import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../../utils/utils";
import PageHeader from "../../../components/layout/PageHeader";
import TimelineItem from "../../../components/timeline/TimelineItem";
import { vehicles } from "../../../data/vehicleData";
import { ChevronDown, Calendar } from "lucide-react";

const generateTimelineEvents = (vehicle) => {
  const events = [];

  vehicle.tripHistory.forEach((trip) => {
    events.push({
      type: "trip",
      title: `Trip: ${trip.from} → ${trip.to}`,
      description: `${trip.distance} — ${trip.status}`,
      date: new Date(trip.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
      detail: `Trip ID: ${trip.id}`,
      sortDate: trip.date,
    });
  });

  vehicle.maintenanceHistory.forEach((m) => {
    events.push({
      type: "maintenance",
      title: m.type,
      description: `${m.technician} — ${m.status}`,
      date: new Date(m.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
      detail: `Cost: ${m.cost} | ID: ${m.id}`,
      sortDate: m.date,
    });
  });

  vehicle.fuelLogs.forEach((fuel) => {
    events.push({
      type: "fuel",
      title: `Refueled at ${fuel.station}`,
      description: `${fuel.liters}L — ${fuel.cost} — Mileage: ${fuel.mileage}`,
      date: new Date(fuel.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
      detail: `Log ID: ${fuel.id}`,
      sortDate: fuel.date,
    });
  });

  events.push({
    type: "insurance",
    title: "Insurance Renewed",
    description: `${vehicle.insuranceProvider} — Valid until ${new Date(vehicle.insuranceExpiry).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}`,
    date: new Date(vehicle.purchaseDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
    detail: `Policy renewed annually`,
    sortDate: vehicle.purchaseDate,
  });

  events.push({
    type: "document",
    title: "Vehicle Purchased",
    description: `${vehicle.name} — ${vehicle.manufacturer}`,
    date: new Date(vehicle.purchaseDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
    detail: `Acquisition Cost: ${vehicle.acquisitionCost} | VIN: ${vehicle.vin}`,
    sortDate: vehicle.purchaseDate,
  });

  const extraEvents = [
    {
      type: "fuel",
      title: `Refueled at IOCL, ${vehicle.registration.split("-")[0]}`,
      description: "85L — ₹7,650 — Mileage: 4.9 km/L",
      date: "15 Jun 2026",
      detail: "Log ID: FL-010",
      sortDate: "2026-06-15",
    },
    {
      type: "maintenance",
      title: "Scheduled Oil Change",
      description: "Ravi Mechanicals — Completed",
      date: "10 Jun 2026",
      detail: "Cost: ₹12,500 | ID: MT-015",
      sortDate: "2026-06-10",
    },
    {
      type: "trip",
      title: `Trip: ${vehicle.registration.split("-")[0]} → Pune`,
      description: "210 km — Completed",
      date: "05 Jun 2026",
      detail: "Trip ID: TR-0060",
      sortDate: "2026-06-05",
    },
    {
      type: "insurance",
      title: "Fitness Certificate Renewed",
      description: "Regional Transport Office — Valid until Dec 2026",
      date: "01 Jun 2026",
      detail: "Certificate ID: FC-2026-0451",
      sortDate: "2026-06-01",
    },
    {
      type: "fuel",
      title: `Refueled at BPCL, ${vehicle.registration.split("-")[1]}`,
      description: "100L — ₹9,000 — Mileage: 5.1 km/L",
      date: "28 May 2026",
      detail: "Log ID: FL-008",
      sortDate: "2026-05-28",
    },
    {
      type: "maintenance",
      title: "Tire Rotation & Alignment",
      description: "FleetFix Pro — Completed",
      date: "20 May 2026",
      detail: "Cost: ₹8,400 | ID: MT-011",
      sortDate: "2026-05-20",
    },
    {
      type: "trip",
      title: `Trip: Mumbai → ${vehicle.registration.split("-")[0]}`,
      description: "175 km — Completed",
      date: "15 May 2026",
      detail: "Trip ID: TR-0052",
      sortDate: "2026-05-15",
    },
    {
      type: "document",
      title: "PUC Certificate Renewed",
      description: "Authorized Pollution Center — Valid until Nov 2026",
      date: "10 May 2026",
      detail: "Certificate ID: PUC-2026-0892",
      sortDate: "2026-05-10",
    },
  ];

  events.push(...extraEvents);

  events.sort((a, b) => new Date(b.sortDate) - new Date(a.sortDate));

  return events;
};

const groupByMonth = (events) => {
  const groups = {};
  events.forEach((event) => {
    const d = new Date(event.sortDate);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const label = d.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
    if (!groups[key]) groups[key] = { label, items: [] };
    groups[key].items.push(event);
  });
  return Object.values(groups);
};

export default function VehicleHistory() {
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0].id);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const vehicle = vehicles.find((v) => v.id === selectedVehicle) || vehicles[0];
  const allEvents = generateTimelineEvents(vehicle);
  const groupedEvents = groupByMonth(allEvents);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <PageHeader
        title="Vehicle History"
        subtitle="Complete event timeline for your vehicles"
      />

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 h-10 px-4 text-sm font-medium bg-white border border-neutral-border rounded-xl hover:bg-accent-light transition-colors min-w-[280px] justify-between"
          >
            <span className="truncate">{vehicle.name} ({vehicle.registration})</span>
            <ChevronDown className={cn("w-4 h-4 text-neutral-textMuted transition-transform", dropdownOpen && "rotate-180")} />
          </button>
          {dropdownOpen && (
            <div className="absolute top-full left-0 mt-1 w-full bg-white border border-neutral-border rounded-xl shadow-soft-lg py-1 z-20 max-h-60 overflow-y-auto">
              {vehicles.map((v) => (
                <button
                  key={v.id}
                  onClick={() => {
                    setSelectedVehicle(v.id);
                    setDropdownOpen(false);
                  }}
                  className={cn(
                    "w-full text-left px-4 py-2.5 text-sm hover:bg-accent-light transition-colors",
                    v.id === selectedVehicle && "bg-primary-light text-primary font-medium"
                  )}
                >
                  {v.name} — {v.registration}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 text-sm text-neutral-textMuted">
          <Calendar className="w-4 h-4" />
          <span>{allEvents.length} events recorded</span>
        </div>
      </div>

      <div className="bg-white border border-neutral-border rounded-xl shadow-soft-sm p-6">
        {groupedEvents.map((group, gi) => (
          <div key={gi} className={gi > 0 ? "mt-8" : ""}>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1 bg-neutral-border" />
              <span className="text-xs font-bold text-neutral-textMuted uppercase tracking-wider whitespace-nowrap">
                {group.label}
              </span>
              <div className="h-px flex-1 bg-neutral-border" />
            </div>

            <div className="space-y-0">
              {group.items.map((item, i) => (
                <TimelineItem
                  key={`${gi}-${i}`}
                  item={item}
                  index={i}
                  isLast={i === group.items.length - 1 && gi === groupedEvents.length - 1}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
