<<<<<<< HEAD
const rcTrips = [];
const rcNotifications = [];
const rcDocuments = [];
const emergencyContacts = [];
const waypoints = [];
const weeklyDistanceData = [];
const fuelTrendData = [];
=======
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

>>>>>>> 90419a56f07a1c3e5e8232fb608c5213f033379b
const performanceData = {
  weeklyTrips: [],
  monthlyDistance: [],
  fuelEfficiency: [],
  safetyScore: [],
  avgSpeed: [],
  drivingHours: [],
  tripCompletion: [],
};
const rcFuelLogs = [];

// Route coordinates representing the expressway from Mumbai to Pune
const routeCoordinates = [
  [19.0760, 72.8777], // Mumbai Central (Start)
  [19.0435, 72.9150], // Chembur
  [19.0302, 73.0182], // Vashi
  [19.0185, 73.0984], // Belapur
  [19.0234, 73.1090], // Kalamboli (Start of Expressway)
  [18.9894, 73.1175], // Panvel Toll Plaza (Waypoint 2)
  [18.9221, 73.1789], // Chowk
  [18.8413, 73.2801], // Khalapur Toll Plaza (Waypoint 3)
  [18.7981, 73.3456], // Khopoli
  [18.7712, 73.3982], // Khandala
  [18.7557, 73.4091], // Lonavala (Waypoint 4)
  [18.7410, 73.4560], // Kusgaon
  [18.7290, 73.5510], // Kamshet
  [18.7303, 73.6669], // Talegaon Toll Plaza
  [18.6650, 73.7420], // Dehu Road
  [18.6298, 73.7997], // Pimpri-Chinchwad (Waypoint 5)
  [18.5980, 73.8120], // Khadki
  [18.5308, 73.8474], // Shivajinagar
  [18.5204, 73.8567]  // Pune Hub (Destination)
];

// Mapping waypoints to their routeCoordinates index
const waypointIndexes = [0, 5, 7, 10, 15, 18];

export { 
  rcTrips, 
  rcNotifications, 
  emergencyContacts, 
  waypoints, 
  weeklyDistanceData, 
  fuelTrendData, 
  performanceData, 
  rcFuelLogs,
  routeCoordinates,
  waypointIndexes
};

