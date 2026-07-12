export const trips = [
  { id: "TR-0084", from: "Mumbai", to: "Pune", driver: "Vikram Singh", driverId: "DR-003", vehicle: "MH-12-RT-2244", vehicleName: "Mahindra Blazo X25", status: "In Transit", departure: "2026-07-12 06:00", eta: "2026-07-12 11:30", distance: "148 km", distanceVal: 148, cargo: "Electronics", cargoWeight: "2.5 tons", value: "₹12,50,000", priority: "High", revenue: "₹1,250", deliveryTime: "5h 30m", rating: 4.8, fuelUsage: "32 L", expenses: "₹450", documents: ["Manifest", "Insurance", "Invoice"], completedAt: null, cancelledAt: null, cancelledBy: null, cancelReason: null, refundStatus: null, notes: "Time-sensitive delivery", progress: 65 },
  { id: "TR-0083", from: "Delhi", to: "Jaipur", driver: "Anil Sharma", driverId: "DR-004", vehicle: "DL-03-KP-5567", vehicleName: "BharatBenz 2528", status: "Completed", departure: "2026-07-11 08:00", eta: "2026-07-11 14:00", distance: "268 km", distanceVal: 268, cargo: "Textiles", cargoWeight: "4.0 tons", value: "₹8,75,000", priority: "Medium", revenue: "₹2,680", deliveryTime: "5h 45m", rating: 4.6, fuelUsage: "58 L", expenses: "₹890", documents: ["Manifest", "Insurance", "Invoice", "POD"], completedAt: "2026-07-11 13:45", cancelledAt: null, cancelledBy: null, cancelReason: null, refundStatus: null, notes: "", progress: 100 },
  { id: "TR-0082", from: "Bangalore", to: "Chennai", driver: "Suresh Patel", driverId: "DR-002", vehicle: "KA-01-MN-3312", vehicleName: "Ashok Leyland 4220", status: "In Transit", departure: "2026-07-12 04:30", eta: "2026-07-12 10:00", distance: "346 km", distanceVal: 346, cargo: "Auto Parts", cargoWeight: "3.2 tons", value: "₹15,20,000", priority: "High", revenue: "₹3,460", deliveryTime: "5h 30m", rating: 4.7, fuelUsage: "72 L", expenses: "₹1,200", documents: ["Manifest", "Insurance"], completedAt: null, cancelledAt: null, cancelledBy: null, cancelReason: null, refundStatus: null, notes: "", progress: 70 },
  { id: "TR-0081", from: "Kochi", to: "Coimbatore", driver: "Rajesh Kumar", driverId: "DR-001", vehicle: "KL-07-AU-4521", vehicleName: "Tata Prima 4040.S", status: "Pending", departure: "2026-07-13 05:00", eta: "2026-07-13 12:00", distance: "195 km", distanceVal: 195, cargo: "Pharmaceuticals", cargoWeight: "1.8 tons", value: "₹22,00,000", priority: "Critical", revenue: "₹1,950", deliveryTime: null, rating: null, fuelUsage: null, expenses: null, documents: ["Manifest", "Insurance", "Cold Chain Cert"], completedAt: null, cancelledAt: null, cancelledBy: null, cancelReason: null, refundStatus: null, notes: "Temperature controlled", progress: 0 },
  { id: "TR-0080", from: "Ahmedabad", to: "Rajkot", driver: "Jose Thomas", driverId: "DR-007", vehicle: "KL-03-GH-3344", vehicleName: "AMW 2523", status: "Completed", departure: "2026-07-11 07:00", eta: "2026-07-11 11:00", distance: "216 km", distanceVal: 216, cargo: "Chemicals", cargoWeight: "5.0 tons", value: "₹6,40,000", priority: "Medium", revenue: "₹2,160", deliveryTime: "3h 50m", rating: 4.9, fuelUsage: "48 L", expenses: "₹670", documents: ["Manifest", "HazMat", "Insurance"], completedAt: "2026-07-11 10:50", cancelledAt: null, cancelledBy: null, cancelReason: null, refundStatus: null, notes: "", progress: 100 },
  { id: "TR-0079", from: "Hyderabad", to: "Visakhapatnam", driver: "Deepak Verma", driverId: "DR-006", vehicle: "UP-32-CD-6677", vehicleName: "Scania R450", status: "Delayed", departure: "2026-07-12 03:00", eta: "2026-07-12 12:00", distance: "625 km", distanceVal: 625, cargo: "Steel Products", cargoWeight: "8.0 tons", value: "₹34,50,000", priority: "High", revenue: "₹6,250", deliveryTime: null, rating: null, fuelUsage: "85 L", expenses: "₹1,850", documents: ["Manifest", "Insurance", "Permit"], completedAt: null, cancelledAt: null, cancelledBy: null, cancelReason: null, refundStatus: null, notes: "Delayed due to road construction", progress: 45 },
  { id: "TR-0078", from: "Kolkata", to: "Patna", driver: "Mohammed Ali", driverId: "DR-005", vehicle: "RJ-14-AB-9988", vehicleName: "Volvo FH16", status: "Cancelled", departure: "2026-07-11 09:00", eta: "—", distance: "590 km", distanceVal: 590, cargo: "Machinery", cargoWeight: "12.0 tons", value: "₹41,20,000", priority: "Low", revenue: null, deliveryTime: null, rating: null, fuelUsage: null, expenses: null, documents: ["Manifest", "Insurance"], completedAt: null, cancelledAt: "2026-07-11 08:30", cancelledBy: "Operations Manager", cancelReason: "Vehicle breakdown - no replacement available", refundStatus: "Full Refund", notes: "", progress: 0 },
  { id: "TR-0077", from: "Chennai", to: "Bangalore", driver: "Vikram Singh", driverId: "DR-003", vehicle: "MH-12-RT-2244", vehicleName: "Mahindra Blazo X25", status: "Completed", departure: "2026-07-10 06:00", eta: "2026-07-10 11:30", distance: "346 km", distanceVal: 346, cargo: "FMCG Goods", cargoWeight: "3.5 tons", value: "₹9,80,000", priority: "Medium", revenue: "₹3,460", deliveryTime: "5h 15m", rating: 4.5, fuelUsage: "68 L", expenses: "₹950", documents: ["Manifest", "Insurance", "POD"], completedAt: "2026-07-10 11:15", cancelledAt: null, cancelledBy: null, cancelReason: null, refundStatus: null, notes: "", progress: 100 },
  { id: "TR-0076", from: "Mumbai", to: "Surat", driver: "Rajesh Kumar", driverId: "DR-001", vehicle: "KL-07-AU-4521", vehicleName: "Tata Prima 4040.S", status: "In Transit", departure: "2026-07-12 08:00", eta: "2026-07-12 14:00", distance: "265 km", distanceVal: 265, cargo: "Textile Raw Materials", cargoWeight: "4.5 tons", value: "₹5,60,000", priority: "Normal", revenue: "₹2,650", deliveryTime: null, rating: null, fuelUsage: "42 L", expenses: "₹520", documents: ["Manifest", "Insurance"], completedAt: null, cancelledAt: null, cancelledBy: null, cancelReason: null, refundStatus: null, notes: "", progress: 35 },
];

export const tripStats = {
  total: trips.length,
  inTransit: trips.filter(t => t.status === "In Transit").length,
  completed: trips.filter(t => t.status === "Completed").length,
  cancelled: trips.filter(t => t.status === "Cancelled").length,
  delayed: trips.filter(t => t.status === "Delayed").length,
  pending: trips.filter(t => t.status === "Pending").length,
  totalDistance: trips.reduce((s, t) => s + (t.distanceVal || 0), 0),
  todayDeliveries: 4,
};

export const timelineEvents = [
  { tripId: "TR-0084", events: [
    { time: "2026-07-11 14:00", title: "Trip Created", desc: "Trip registered in system", icon: "FileText" },
    { time: "2026-07-11 15:30", title: "Vehicle Assigned", desc: "MH-12-RT-2244 assigned", icon: "Truck" },
    { time: "2026-07-11 16:00", title: "Driver Assigned", desc: "Vikram Singh assigned", icon: "User" },
    { time: "2026-07-12 06:00", title: "Departed", desc: "Left Mumbai warehouse", icon: "MapPin" },
    { time: "2026-07-12 08:15", title: "Checkpoint: Panvel", desc: "Cleared weigh station", icon: "Flag" },
    { time: "2026-07-12 10:00", title: "Checkpoint: Lonavala", desc: "Refueling stop", icon: "Fuel" },
  ]},
  { tripId: "TR-0082", events: [
    { time: "2026-07-11 09:00", title: "Trip Created", desc: "Trip registered in system", icon: "FileText" },
    { time: "2026-07-11 10:30", title: "Vehicle Assigned", desc: "KA-01-MN-3312 assigned", icon: "Truck" },
    { time: "2026-07-11 11:00", title: "Driver Assigned", desc: "Suresh Patel assigned", icon: "User" },
    { time: "2026-07-12 04:30", title: "Departed", desc: "Left Bangalore hub", icon: "MapPin" },
    { time: "2026-07-12 07:00", title: "Checkpoint: Krishnagiri", desc: "Crossed Tamil Nadu border", icon: "Flag" },
  ]},
];
