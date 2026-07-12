const rcTrips = [
  { id: "TR-0084", from: "Mumbai", to: "Pune", driver: "Vikram Singh", vehicle: "MH-12-RT-2244", vehicleName: "Mahindra Blazo X25", status: "In Transit", departure: "2026-07-12 06:00", eta: "2026-07-12 11:30", distance: "148 km", distanceVal: 148, cargo: "Electronics", value: "₹12,50,000", priority: "High", rating: 4.8, progress: 54 },
  { id: "TR-0083", from: "Delhi", to: "Jaipur", driver: "Anil Sharma", vehicle: "DL-03-KP-5567", vehicleName: "BharatBenz 2528", status: "Completed", departure: "2026-07-11 08:00", eta: "2026-07-11 14:00", distance: "268 km", distanceVal: 268, cargo: "Textiles", value: "₹8,75,000", priority: "Medium", rating: 4.5, progress: 100 },
  { id: "TR-0082", from: "Bangalore", to: "Chennai", driver: "Suresh Patel", vehicle: "KA-01-MN-3312", vehicleName: "Ashok Leyland 4220", status: "In Transit", departure: "2026-07-12 04:30", eta: "2026-07-12 10:00", distance: "346 km", distanceVal: 346, cargo: "Auto Parts", value: "₹15,20,000", priority: "High", rating: 4.6, progress: 72 },
  { id: "TR-0081", from: "Kochi", to: "Coimbatore", driver: "Rajesh Kumar", vehicle: "KL-07-AU-4521", vehicleName: "Tata Prima 4040.S", status: "Pending", departure: "2026-07-13 05:00", eta: "2026-07-13 12:00", distance: "195 km", distanceVal: 195, cargo: "Pharmaceuticals", value: "₹22,00,000", priority: "Critical", rating: 4.9, progress: 0 },
  { id: "TR-0080", from: "Ahmedabad", to: "Rajkot", driver: "Jose Thomas", vehicle: "KL-03-GH-3344", vehicleName: "AMW 2523", status: "Completed", departure: "2026-07-11 07:00", eta: "2026-07-11 11:00", distance: "216 km", distanceVal: 216, cargo: "Chemicals", value: "₹6,40,000", priority: "Medium", rating: 4.7, progress: 100 },
  { id: "TR-0079", from: "Hyderabad", to: "Visakhapatnam", driver: "Deepak Verma", vehicle: "UP-32-CD-6677", vehicleName: "Scania R450", status: "Delayed", departure: "2026-07-12 03:00", eta: "2026-07-12 14:00", distance: "625 km", distanceVal: 625, cargo: "Steel Products", value: "₹34,50,000", priority: "High", rating: 4.4, progress: 45 },
  { id: "TR-0078", from: "Kolkata", to: "Patna", driver: "Mohammed Ali", vehicle: "RJ-14-AB-9988", vehicleName: "Volvo FH16", status: "Cancelled", departure: "2026-07-11 09:00", eta: "—", distance: "590 km", distanceVal: 590, cargo: "Machinery", value: "₹41,20,000", priority: "Low", rating: 0, progress: 0 },
  { id: "TR-0077", from: "Chennai", to: "Bangalore", driver: "Vikram Singh", vehicle: "MH-12-RT-2244", vehicleName: "Mahindra Blazo X25", status: "Completed", departure: "2026-07-10 06:00", eta: "2026-07-10 11:30", distance: "346 km", distanceVal: 346, cargo: "FMCG Goods", value: "₹9,80,000", priority: "Medium", rating: 4.8, progress: 100 },
  { id: "TR-0076", from: "Indore", to: "Bhopal", driver: "Vikram Singh", vehicle: "MH-12-RT-2244", vehicleName: "Mahindra Blazo X25", status: "Completed", departure: "2026-07-09 07:00", eta: "2026-07-09 10:30", distance: "188 km", distanceVal: 188, cargo: "Food Products", value: "₹4,20,000", priority: "Low", rating: 4.6, progress: 100 },
  { id: "TR-0075", from: "Nagpur", to: "Pune", driver: "Vikram Singh", vehicle: "MH-12-RT-2244", vehicleName: "Mahindra Blazo X25", status: "Completed", departure: "2026-07-08 05:00", eta: "2026-07-08 12:00", distance: "355 km", distanceVal: 355, cargo: "Industrial Equipment", value: "₹18,00,000", priority: "High", rating: 4.9, progress: 100 },
];

const rcNotifications = [
  { id: 1, title: "Trip TR-0084 assigned", time: "2 min ago", type: "trip", unread: true },
  { id: 2, title: "Fuel level low on MH-12-RT-2244", time: "15 min ago", type: "fuel", unread: true },
  { id: 3, title: "Service due in 7 days", time: "1 hr ago", type: "service", unread: true },
  { id: 4, title: "Route update: Traffic ahead on Mumbai-Pune highway", time: "2 hrs ago", type: "navigation", unread: false },
  { id: 5, title: "Trip TR-0077 completed successfully", time: "3 hrs ago", type: "trip", unread: false },
];

const rcDocuments = [
  { id: 1, name: "Driving License", number: "MH-2018-2244", type: "Heavy Vehicle", expiry: "2026-09-10", status: "Expiring Soon", icon: "FileText", color: "bg-primary/10 text-primary" },
  { id: 2, name: "Vehicle Insurance", number: "INS-MH-2026-4455", type: "Comprehensive", expiry: "2027-03-12", status: "Valid", icon: "Shield", color: "bg-success-light text-success" },
  { id: 3, name: "Fitness Certificate", number: "FC-MH-2026-1122", type: "Annual Fitness", expiry: "2027-01-15", status: "Valid", icon: "CheckCircle", color: "bg-success-light text-success" },
  { id: 4, name: "PUC Certificate", number: "PUC-MH-2026-3344", type: "Pollution Under Control", expiry: "2026-12-20", status: "Valid", icon: "Car", color: "bg-success-light text-success" },
  { id: 5, name: "RC Book", number: "RC-MH-12-RT-2244", type: "Registration", expiry: "2028-01-20", status: "Valid", icon: "BookOpen", color: "bg-success-light text-success" },
  { id: 6, name: "Route Permit", number: "RP-MH-PUNE-2026", type: "Interstate Permit", expiry: "2026-12-31", status: "Valid", icon: "Map", color: "bg-success-light text-success" },
  { id: 7, name: "Delivery Challan", number: "DC-TR-0084", type: "Trip Document", expiry: "—", status: "Valid", icon: "FileText", color: "bg-info-light text-primary" },
  { id: 8, name: "Invoice Copy", number: "INV-2026-042", type: "Trip Document", expiry: "—", status: "Valid", icon: "FileText", color: "bg-info-light text-primary" },
];

const emergencyContacts = [
  { id: 1, name: "Fleet Manager", person: "Rajesh Mehta", phone: "+91 98765 43200", icon: "Truck", color: "bg-primary/10 text-primary", type: "internal" },
  { id: 2, name: "Safety Officer", person: "Anita Desai", phone: "+91 98765 43201", icon: "Shield", color: "bg-success-light text-success", type: "internal" },
  { id: 3, name: "Roadside Assistance", person: "24/7 Helpline", phone: "1800-103-7777", icon: "Siren", color: "bg-warning-light text-warning", type: "external" },
  { id: 4, name: "Insurance Provider", person: "Bajaj Allianz", phone: "1800-209-5858", icon: "Shield", color: "bg-purple-50 text-purple-600", type: "external" },
  { id: 5, name: "Hospital", person: "Kokilaben Hospital", phone: "+91 22 3099 9999", icon: "Ambulance", color: "bg-danger-light text-danger", type: "external" },
  { id: 6, name: "Police Station", person: "Andheri PS", phone: "022-2620 5555", icon: "Building2", color: "bg-info-light text-primary", type: "external" },
];

const waypoints = [
  { name: "Mumbai Central", dist: "0 km", eta: "06:00 AM", status: "Departed" },
  { name: "Panvel Toll Plaza", dist: "35 km", eta: "06:45 AM", status: "Passed" },
  { name: "Khalapur", dist: "62 km", eta: "07:30 AM", status: "Passed" },
  { name: "Lonavala", dist: "96 km", eta: "08:30 AM", status: "Upcoming" },
  { name: "Pimpri-Chinchwad", dist: "125 km", eta: "09:45 AM", status: "Upcoming" },
  { name: "Pune", dist: "148 km", eta: "11:30 AM", status: "Destination" },
];

const weeklyDistanceData = [
  { label: "Mon", value: 245 }, { label: "Tue", value: 312 }, { label: "Wed", value: 189 }, { label: "Thu", value: 420 }, { label: "Fri", value: 285 }, { label: "Sat", value: 148 }, { label: "Sun", value: 0 },
];

const fuelTrendData = [
  { label: "Mon", value: 85 }, { label: "Tue", value: 72 }, { label: "Wed", value: 90 }, { label: "Thu", value: 68 }, { label: "Fri", value: 82 }, { label: "Sat", value: 78 }, { label: "Sun", value: 100 },
];

const performanceData = {
  weeklyTrips: [3, 5, 2, 4, 6, 3, 1],
  monthlyDistance: [1200, 1800, 900, 2100, 1500],
  fuelEfficiency: [4.8, 5.1, 4.6, 5.2, 4.9],
  safetyScore: [95, 97, 98, 96, 99],
  avgSpeed: [62, 58, 71, 65, 59],
  drivingHours: [8, 9, 6, 10, 7],
  tripCompletion: [100, 97, 100, 98, 99],
};

const rcFuelLogs = [
  { id: "FL-001", driver: "Vikram Singh", vehicle: "MH-12-RT-2244", date: "2026-07-12", liters: 120, cost: "₹10,800", station: "HP Petrol, Pune", mileage: "5.2 km/L", fuelType: "Diesel", status: "Approved" },
  { id: "FL-002", driver: "Vikram Singh", vehicle: "MH-12-RT-2244", date: "2026-07-10", liters: 95, cost: "₹8,550", station: "BPCL, Mumbai", mileage: "4.8 km/L", fuelType: "Diesel", status: "Approved" },
  { id: "FL-003", driver: "Vikram Singh", vehicle: "MH-12-RT-2244", date: "2026-07-08", liters: 110, cost: "₹9,900", station: "IOCL, Panvel", mileage: "5.0 km/L", fuelType: "Diesel", status: "Pending" },
  { id: "FL-004", driver: "Vikram Singh", vehicle: "MH-12-RT-2244", date: "2026-07-06", liters: 88, cost: "₹7,920", station: "HP Petrol, Lonavala", mileage: "5.4 km/L", fuelType: "Diesel", status: "Approved" },
  { id: "FL-005", driver: "Vikram Singh", vehicle: "MH-12-RT-2244", date: "2026-07-04", liters: 130, cost: "₹11,700", station: "BPCL, Nagpur", mileage: "4.6 km/L", fuelType: "Diesel", status: "Approved" },
];

export { rcTrips, rcNotifications, rcDocuments, emergencyContacts, waypoints, weeklyDistanceData, fuelTrendData, performanceData, rcFuelLogs };
