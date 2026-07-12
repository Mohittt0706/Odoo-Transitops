export const vehicles = [
  { id: "VH-001", name: "Tata Prima 4040.S", type: "Heavy Truck", plate: "KL-07-AU-4521", status: "Active", driver: "Rajesh Kumar", fuel: 78, lastService: "2026-06-28", mileage: "124,500 km" },
  { id: "VH-002", name: "Ashok Leyland 4220", type: "Heavy Truck", plate: "KA-01-MN-3312", status: "Active", driver: "Suresh Patel", fuel: 62, lastService: "2026-07-01", mileage: "98,200 km" },
  { id: "VH-003", name: "Eicher Pro 6036", type: "Medium Truck", plate: "TN-09-BC-7890", status: "In Maintenance", driver: "—", fuel: 45, lastService: "2026-07-10", mileage: "156,800 km" },
  { id: "VH-004", name: "Mahindra Blazo X25", type: "Heavy Truck", plate: "MH-12-RT-2244", status: "Active", driver: "Vikram Singh", fuel: 91, lastService: "2026-06-15", mileage: "67,300 km" },
  { id: "VH-005", name: "BharatBenz 2528", type: "Medium Truck", plate: "DL-03-KP-5567", status: "Active", driver: "Anil Sharma", fuel: 55, lastService: "2026-07-05", mileage: "201,400 km" },
  { id: "VH-006", name: "Tata Ultra 1918", type: "Light Truck", plate: "GJ-06-HJ-1123", status: "Inactive", driver: "—", fuel: 30, lastService: "2026-05-20", mileage: "89,600 km" },
  { id: "VH-007", name: "Volvo FH16", type: "Heavy Truck", plate: "RJ-14-AB-9988", status: "Active", driver: "Mohammed Ali", fuel: 84, lastService: "2026-07-08", mileage: "45,200 km" },
  { id: "VH-008", name: "Scania R450", type: "Heavy Truck", plate: "UP-32-CD-6677", status: "Active", driver: "Deepak Verma", fuel: 72, lastService: "2026-06-22", mileage: "178,900 km" },
  { id: "VH-009", name: "Isuzu FVR", type: "Medium Truck", plate: "AP-08-EF-4455", status: "In Maintenance", driver: "—", fuel: 20, lastService: "2026-07-11", mileage: "234,100 km" },
  { id: "VH-010", name: "AMW 2523", type: "Heavy Truck", plate: "KL-03-GH-3344", status: "Active", driver: "Jose Thomas", fuel: 68, lastService: "2026-07-03", mileage: "112,700 km" },
];

export const drivers = [
  { id: "DR-001", name: "Rajesh Kumar", license: "KL-2019-4521", expiry: "2027-03-15", status: "Active", rating: 4.8, trips: 342, phone: "+91 98765 43210", experience: "8 years", compliance: 98 },
  { id: "DR-002", name: "Suresh Patel", license: "KA-2020-3312", expiry: "2027-06-20", status: "Active", rating: 4.6, trips: 287, phone: "+91 98765 43211", experience: "6 years", compliance: 95 },
  { id: "DR-003", name: "Vikram Singh", license: "MH-2018-2244", expiry: "2026-09-10", status: "Active", rating: 4.9, trips: 512, phone: "+91 98765 43212", experience: "12 years", compliance: 99 },
  { id: "DR-004", name: "Anil Sharma", license: "DL-2021-5567", expiry: "2027-01-25", status: "Active", rating: 4.3, trips: 198, phone: "+91 98765 43213", experience: "4 years", compliance: 92 },
  { id: "DR-005", name: "Mohammed Ali", license: "RJ-2017-9988", expiry: "2026-08-30", status: "On Leave", rating: 4.7, trips: 621, phone: "+91 98765 43214", experience: "10 years", compliance: 97 },
  { id: "DR-006", name: "Deepak Verma", license: "UP-2020-6677", expiry: "2027-04-18", status: "Active", rating: 4.5, trips: 256, phone: "+91 98765 43215", experience: "5 years", compliance: 94 },
  { id: "DR-007", name: "Jose Thomas", license: "KL-2019-3344", expiry: "2027-02-28", status: "Active", rating: 4.8, trips: 389, phone: "+91 98765 43216", experience: "7 years", compliance: 96 },
  { id: "DR-008", name: "Arun Nair", license: "TN-2021-1188", expiry: "2026-07-20", status: "Suspended", rating: 3.9, trips: 87, phone: "+91 98765 43217", experience: "2 years", compliance: 78 },
];

export const trips = [
  { id: "TR-0084", from: "Mumbai", to: "Pune", driver: "Vikram Singh", vehicle: "MH-12-RT-2244", status: "In Transit", departure: "2026-07-12 06:00", eta: "2026-07-12 11:30", distance: "148 km", cargo: "Electronics", value: "₹12,50,000" },
  { id: "TR-0083", from: "Delhi", to: "Jaipur", driver: "Anil Sharma", vehicle: "DL-03-KP-5567", status: "Completed", departure: "2026-07-11 08:00", eta: "2026-07-11 14:00", distance: "268 km", cargo: "Textiles", value: "₹8,75,000" },
  { id: "TR-0082", from: "Bangalore", to: "Chennai", driver: "Suresh Patel", vehicle: "KA-01-MN-3312", status: "In Transit", departure: "2026-07-12 04:30", eta: "2026-07-12 10:00", distance: "346 km", cargo: "Auto Parts", value: "₹15,20,000" },
  { id: "TR-0081", from: "Kochi", to: "Coimbatore", driver: "Rajesh Kumar", vehicle: "KL-07-AU-4521", status: "Pending", departure: "2026-07-13 05:00", eta: "2026-07-13 12:00", distance: "195 km", cargo: "Pharmaceuticals", value: "₹22,00,000" },
  { id: "TR-0080", from: "Ahmedabad", to: "Rajkot", driver: "Jose Thomas", vehicle: "KL-03-GH-3344", status: "Completed", departure: "2026-07-11 07:00", eta: "2026-07-11 11:00", distance: "216 km", cargo: "Chemicals", value: "₹6,40,000" },
  { id: "TR-0079", from: "Hyderabad", to: "Visakhapatnam", driver: "Deepak Verma", vehicle: "UP-32-CD-6677", status: "In Transit", departure: "2026-07-12 03:00", eta: "2026-07-12 12:00", distance: "625 km", cargo: "Steel Products", value: "₹34,50,000" },
  { id: "TR-0078", from: "Kolkata", to: "Patna", driver: "Mohammed Ali", vehicle: "RJ-14-AB-9988", status: "Cancelled", departure: "2026-07-11 09:00", eta: "—", distance: "590 km", cargo: "Machinery", value: "₹41,20,000" },
  { id: "TR-0077", from: "Chennai", to: "Bangalore", driver: "Vikram Singh", vehicle: "MH-12-RT-2244", status: "Completed", departure: "2026-07-10 06:00", eta: "2026-07-10 11:30", distance: "346 km", cargo: "FMCG Goods", value: "₹9,80,000" },
];

export const maintenance = [
  { id: "MT-001", vehicle: "Tata Prima 4040.S", plate: "KL-07-AU-4521", type: "Oil Change", status: "Scheduled", date: "2026-07-15", cost: "₹12,500", technician: "Ravi Mechanicals" },
  { id: "MT-002", vehicle: "Eicher Pro 6036", plate: "TN-09-BC-7890", type: "Engine Overhaul", status: "In Progress", date: "2026-07-10", cost: "₹85,000", technician: "Transit Auto Care" },
  { id: "MT-003", vehicle: "Isuzu FVR", plate: "AP-08-EF-4455", type: "Brake Replacement", status: "In Progress", date: "2026-07-11", cost: "₹34,200", technician: "FleetFix Pro" },
  { id: "MT-004", vehicle: "Mahindra Blazo X25", plate: "MH-12-RT-2244", type: "Tire Rotation", status: "Completed", date: "2026-07-08", cost: "₹8,400", technician: "Ravi Mechanicals" },
  { id: "MT-005", vehicle: "Volvo FH16", plate: "RJ-14-AB-9988", type: "AC Servicing", status: "Scheduled", date: "2026-07-18", cost: "₹15,600", technician: "CoolTech Services" },
  { id: "MT-006", vehicle: "BharatBenz 2528", plate: "DL-03-KP-5567", type: "Battery Replacement", status: "Completed", date: "2026-07-05", cost: "₹22,000", technician: "PowerCell India" },
];

export const fuelLogs = [
  { id: "FL-001", driver: "Rajesh Kumar", vehicle: "KL-07-AU-4521", date: "2026-07-12", liters: 120, cost: "₹10,800", station: "HP Petrol, Kochi", mileage: "5.2 km/L" },
  { id: "FL-002", driver: "Vikram Singh", vehicle: "MH-12-RT-2244", date: "2026-07-11", liters: 95, cost: "₹8,550", station: "BPCL, Mumbai", mileage: "4.8 km/L" },
  { id: "FL-003", driver: "Suresh Patel", vehicle: "KA-01-MN-3312", date: "2026-07-11", liters: 110, cost: "₹9,900", station: "IOCL, Bangalore", mileage: "5.0 km/L" },
  { id: "FL-004", driver: "Anil Sharma", vehicle: "DL-03-KP-5567", date: "2026-07-10", liters: 88, cost: "₹7,920", station: "HP Petrol, Delhi", mileage: "5.4 km/L" },
  { id: "FL-005", driver: "Deepak Verma", vehicle: "UP-32-CD-6677", date: "2026-07-10", liters: 130, cost: "₹11,700", station: "BPCL, Hyderabad", mileage: "4.6 km/L" },
  { id: "FL-006", driver: "Jose Thomas", vehicle: "KL-03-GH-3344", date: "2026-07-09", liters: 75, cost: "₹6,750", station: "IOCL, Kochi", mileage: "5.5 km/L" },
];

export const incidents = [
  { id: "IN-001", date: "2026-07-10", driver: "Arun Nair", vehicle: "TN-09-BC-7890", type: "Minor Collision", severity: "Low", status: "Resolved", location: "Chennai-Bangalore Highway", description: "Side mirror damage due to lane drift" },
  { id: "IN-002", date: "2026-07-08", driver: "Deepak Verma", vehicle: "UP-32-CD-6677", type: "Breakdown", severity: "Medium", status: "Investigating", location: "NH-44, near Kurnool", description: "Engine overheating reported" },
  { id: "IN-003", date: "2026-07-05", driver: "Mohammed Ali", vehicle: "RJ-14-AB-9988", type: "OverSpeeding", severity: "High", status: "Under Review", location: "Rajasthan Highway", description: "Speed recorded at 112 km/h in 80 zone" },
  { id: "IN-004", date: "2026-07-02", driver: "Anil Sharma", vehicle: "DL-03-KP-5567", type: "Tire Blowout", severity: "Medium", status: "Resolved", location: "NH-8, near Jaipur", description: "Front right tire burst at highway speed" },
  { id: "IN-005", date: "2026-06-28", driver: "Vikram Singh", vehicle: "MH-12-RT-2244", type: "Cargo Damage", severity: "Low", status: "Resolved", location: "Mumbai Warehouse", description: "Minor packaging damage during loading" },
];

export const inspections = [
  { id: "IS-001", vehicle: "Tata Prima 4040.S", plate: "KL-07-AU-4521", type: "Pre-Trip", date: "2026-07-12", inspector: "S. Menon", result: "Pass", notes: "All systems operational" },
  { id: "IS-002", vehicle: "Ashok Leyland 4220", plate: "KA-01-MN-3312", type: "Monthly", date: "2026-07-10", inspector: "R. Verma", result: "Pass", notes: "Minor brake pad wear noted" },
  { id: "IS-003", vehicle: "Eicher Pro 6036", plate: "TN-09-BC-7890", type: "Annual", date: "2026-07-08", inspector: "K. Patel", result: "Fail", notes: "Engine oil leak detected, pending repair" },
  { id: "IS-004", vehicle: "Isuzu FVR", plate: "AP-08-EF-4455", type: "Pre-Trip", date: "2026-07-07", inspector: "A. Kumar", result: "Conditional", notes: "Tires need replacement within 2 weeks" },
  { id: "IS-005", vehicle: "Volvo FH16", plate: "RJ-14-AB-9988", type: "Monthly", date: "2026-07-05", inspector: "S. Menon", result: "Pass", notes: "Excellent condition" },
];

export const compliance = [
  { driver: "Rajesh Kumar", insurance: "Valid", fitness: "Valid", pollution: "Valid", tax: "Valid", overall: 98 },
  { driver: "Suresh Patel", insurance: "Valid", fitness: "Valid", pollution: "Valid", tax: "Valid", overall: 95 },
  { driver: "Vikram Singh", insurance: "Valid", fitness: "Valid", pollution: "Valid", tax: "Valid", overall: 99 },
  { driver: "Anil Sharma", insurance: "Valid", fitness: "Expired", pollution: "Valid", tax: "Valid", overall: 88 },
  { driver: "Mohammed Ali", insurance: "Valid", fitness: "Valid", pollution: "Expired", tax: "Valid", overall: 91 },
  { driver: "Deepak Verma", insurance: "Valid", fitness: "Valid", pollution: "Valid", tax: "Valid", overall: 94 },
  { driver: "Jose Thomas", insurance: "Valid", fitness: "Valid", pollution: "Valid", tax: "Expired", overall: 86 },
  { driver: "Arun Nair", insurance: "Expired", fitness: "Expired", pollution: "Expired", tax: "Expired", overall: 42 },
];

export const expenses = [
  { id: "EX-001", category: "Fuel", vehicle: "KL-07-AU-4521", date: "2026-07-12", amount: "₹10,800", status: "Approved", approvedBy: "Finance Admin" },
  { id: "EX-002", category: "Toll", vehicle: "MH-12-RT-2244", date: "2026-07-11", amount: "₹2,450", status: "Approved", approvedBy: "Finance Admin" },
  { id: "EX-003", category: "Maintenance", vehicle: "TN-09-BC-7890", date: "2026-07-10", amount: "₹85,000", status: "Pending", approvedBy: "—" },
  { id: "EX-004", category: "Fuel", vehicle: "KA-01-MN-3312", date: "2026-07-11", amount: "₹9,900", status: "Approved", approvedBy: "Finance Admin" },
  { id: "EX-005", category: "Parking", vehicle: "DL-03-KP-5567", date: "2026-07-10", amount: "₹350", status: "Approved", approvedBy: "Finance Admin" },
  { id: "EX-006", category: "Insurance", vehicle: "RJ-14-AB-9988", date: "2026-07-08", amount: "₹45,000", status: "Pending", approvedBy: "—" },
  { id: "EX-007", category: "Fuel", vehicle: "UP-32-CD-6677", date: "2026-07-10", amount: "₹11,700", status: "Approved", approvedBy: "Finance Admin" },
  { id: "EX-008", category: "Driver Allowance", vehicle: "KL-03-GH-3344", date: "2026-07-09", amount: "₹1,500", status: "Approved", approvedBy: "Finance Admin" },
];

export const invoices = [
  { id: "INV-2026-042", client: "Reliance Retail", amount: "₹12,50,000", date: "2026-07-12", dueDate: "2026-07-27", status: "Pending", trips: 3 },
  { id: "INV-2026-041", client: "Flipkart Logistics", amount: "₹8,75,000", date: "2026-07-11", dueDate: "2026-07-26", status: "Paid", trips: 2 },
  { id: "INV-2026-040", client: "Amazon India", amount: "₹15,20,000", date: "2026-07-10", dueDate: "2026-07-25", status: "Pending", trips: 4 },
  { id: "INV-2026-039", client: "Tata Chemicals", amount: "₹6,40,000", date: "2026-07-09", dueDate: "2026-07-24", status: "Paid", trips: 1 },
  { id: "INV-2026-038", client: "Wipro Technologies", amount: "₹34,50,000", date: "2026-07-08", dueDate: "2026-07-23", status: "Overdue", trips: 5 },
  { id: "INV-2026-037", client: "HUL Distribution", amount: "₹9,80,000", date: "2026-07-07", dueDate: "2026-07-22", status: "Paid", trips: 2 },
];

export const deliveries = [
  { id: "DL-001", truck: "KL-07-AU-4521", driver: "Rajesh Kumar", origin: "Mumbai", destination: "Pune Warehouse", eta: "11:30 AM", status: "In Transit", cargo: "Electronics", dock: "Dock 3" },
  { id: "DL-002", truck: "KA-01-MN-3312", driver: "Suresh Patel", origin: "Bangalore", destination: "Chennai Hub", eta: "10:00 AM", status: "In Transit", cargo: "Auto Parts", dock: "Dock 1" },
  { id: "DL-003", truck: "DL-03-KP-5567", driver: "Anil Sharma", origin: "Delhi", destination: "Jaipur Center", eta: "2:00 PM", status: "Completed", cargo: "Textiles", dock: "Dock 5" },
  { id: "DL-004", truck: "KL-03-GH-3344", driver: "Jose Thomas", origin: "Ahmedabad", destination: "Rajkot Depot", eta: "11:00 AM", status: "Completed", cargo: "Chemicals", dock: "Dock 2" },
  { id: "DL-005", truck: "UP-32-CD-6677", driver: "Deepak Verma", origin: "Hyderabad", destination: "Vizag Port", eta: "12:00 PM", status: "Delayed", cargo: "Steel Products", dock: "Dock 7" },
  { id: "DL-006", truck: "RJ-14-AB-9988", driver: "Mohammed Ali", origin: "Kolkata", destination: "Patna Warehouse", eta: "—", status: "Cancelled", cargo: "Machinery", dock: "—" },
];

export const warehouse = [
  { id: "WH-001", name: "Mumbai Central Hub", capacity: "10,000 sq ft", used: "7,200 sq ft", utilization: 72, status: "Active", manager: "Priya Sharma", temperature: "24°C" },
  { id: "WH-002", name: "Chennai Distribution", capacity: "8,500 sq ft", used: "6,800 sq ft", utilization: 80, status: "Active", manager: "Karthik Rajan", temperature: "26°C" },
  { id: "WH-003", name: "Delhi North Facility", capacity: "12,000 sq ft", used: "10,800 sq ft", utilization: 90, status: "Near Full", manager: "Amit Kumar", temperature: "22°C" },
  { id: "WH-004", name: "Bangalore Tech Park", capacity: "6,000 sq ft", used: "3,600 sq ft", utilization: 60, status: "Active", manager: "Sneha Patel", temperature: "25°C" },
  { id: "WH-005", name: "Kochi Port Terminal", capacity: "15,000 sq ft", used: "12,000 sq ft", utilization: 80, status: "Active", manager: "Anoop Menon", temperature: "28°C" },
];

export const inventory = [
  { id: "INV-001", item: "Electronics Package A", quantity: 245, location: "Mumbai Hub", lastUpdated: "2026-07-12", status: "In Stock", category: "Electronics" },
  { id: "INV-002", item: "Auto Parts Kit B", quantity: 120, location: "Chennai Hub", lastUpdated: "2026-07-12", status: "In Stock", category: "Auto Parts" },
  { id: "INV-003", item: "Textile Bundle C", quantity: 80, location: "Delhi Facility", lastUpdated: "2026-07-11", status: "Low Stock", category: "Textiles" },
  { id: "INV-004", item: "Chemical Drums D", quantity: 45, location: "Kochi Terminal", lastUpdated: "2026-07-11", status: "In Stock", category: "Chemicals" },
  { id: "INV-005", item: "Steel Coils E", quantity: 15, location: "Vizag Port", lastUpdated: "2026-07-10", status: "Critical", category: "Metals" },
  { id: "INV-006", item: "FMCG Cartons F", quantity: 500, location: "Bangalore Park", lastUpdated: "2026-07-12", status: "In Stock", category: "FMCG" },
];

export const receivers = [
  { id: "RC-001", name: "Reliance Retail Ltd", contact: "Rajesh Mehta", phone: "+91 98200 12345", address: "Mumbai, Maharashtra", totalDeliveries: 45, pendingDeliveries: 3, rating: 4.8 },
  { id: "RC-002", name: "Flipkart Logistics", contact: "Priya Gupta", phone: "+91 98111 23456", address: "Noida, UP", totalDeliveries: 32, pendingDeliveries: 2, rating: 4.6 },
  { id: "RC-003", name: "Amazon India", contact: "Vikash Singh", phone: "+91 98333 34567", address: "Hyderabad, Telangana", totalDeliveries: 67, pendingDeliveries: 5, rating: 4.9 },
  { id: "RC-004", name: "Tata Chemicals", contact: "Meena Patel", phone: "+91 98444 45678", address: "Ahmedabad, Gujarat", totalDeliveries: 18, pendingDeliveries: 1, rating: 4.4 },
  { id: "RC-005", name: "HUL Distribution", contact: "Suresh Iyer", phone: "+91 98555 56789", address: "Chennai, Tamil Nadu", totalDeliveries: 28, pendingDeliveries: 0, rating: 4.7 },
];

export const proofOfDelivery = [
  { id: "POD-001", tripId: "TR-0083", client: "Flipkart Logistics", deliveredAt: "2026-07-11 14:15", signedBy: "Priya Gupta", photo: true, notes: "Delivered to warehouse B, dock 2" },
  { id: "POD-002", tripId: "TR-0080", client: "Tata Chemicals", deliveredAt: "2026-07-11 11:20", signedBy: "Meena Patel", photo: true, notes: "Sealed containers verified" },
  { id: "POD-003", tripId: "TR-0077", client: "HUL Distribution", deliveredAt: "2026-07-10 11:45", signedBy: "Suresh Iyer", photo: true, notes: "All 200 cartons accounted for" },
  { id: "POD-004", tripId: "TR-0076", client: "Reliance Retail", deliveredAt: "2026-07-09 16:30", signedBy: "Rajesh Mehta", photo: false, notes: "Pending photo upload" },
  { id: "POD-005", tripId: "TR-0075", client: "Amazon India", deliveredAt: "2026-07-08 09:00", signedBy: "Vikash Singh", photo: true, notes: "Express delivery, all items intact" },
];

export const training = [
  { id: "TR-001", course: "Defensive Driving", driver: "All Drivers", date: "2026-07-15", duration: "4 hours", status: "Scheduled", instructor: "Safety Academy" },
  { id: "TR-002", course: "Hazardous Materials Handling", driver: "Jose Thomas, Deepak Verma", date: "2026-07-20", duration: "8 hours", status: "Scheduled", instructor: "HazMat Institute" },
  { id: "TR-003", course: "First Aid & Emergency Response", driver: "All Drivers", date: "2026-06-30", duration: "6 hours", status: "Completed", instructor: "Red Cross India" },
  { id: "TR-004", course: "Fatigue Management", driver: "Rajesh Kumar, Vikram Singh", date: "2026-06-25", duration: "3 hours", status: "Completed", instructor: "Wellness Corp" },
];

export const licenses = [
  { driver: "Rajesh Kumar", licenseNo: "KL-2019-4521", type: "Heavy Vehicle", issued: "2019-03-15", expiry: "2027-03-15", status: "Valid" },
  { driver: "Suresh Patel", licenseNo: "KA-2020-3312", type: "Heavy Vehicle", issued: "2020-06-20", expiry: "2027-06-20", status: "Valid" },
  { driver: "Vikram Singh", licenseNo: "MH-2018-2244", type: "Heavy Vehicle", issued: "2018-09-10", expiry: "2026-09-10", status: "Expiring Soon" },
  { driver: "Anil Sharma", licenseNo: "DL-2021-5567", type: "Medium Vehicle", issued: "2021-01-25", expiry: "2027-01-25", status: "Valid" },
  { driver: "Mohammed Ali", licenseNo: "RJ-2017-9988", type: "Heavy Vehicle", issued: "2017-08-30", expiry: "2026-08-30", status: "Expiring Soon" },
  { driver: "Deepak Verma", licenseNo: "UP-2020-6677", type: "Heavy Vehicle", issued: "2020-04-18", expiry: "2027-04-18", status: "Valid" },
  { driver: "Jose Thomas", licenseNo: "KL-2019-3344", type: "Heavy Vehicle", issued: "2019-02-28", expiry: "2027-02-28", status: "Valid" },
  { driver: "Arun Nair", licenseNo: "TN-2021-1188", type: "Light Vehicle", issued: "2021-07-20", expiry: "2026-07-20", status: "Expired" },
];

export const assignments = [
  { id: "AS-001", driver: "Rajesh Kumar", vehicle: "KL-07-AU-4521", trip: "TR-0081", route: "Kochi → Coimbatore", startDate: "2026-07-13", endDate: "2026-07-13", status: "Scheduled" },
  { id: "AS-002", driver: "Vikram Singh", vehicle: "MH-12-RT-2244", trip: "TR-0084", route: "Mumbai → Pune", startDate: "2026-07-12", endDate: "2026-07-12", status: "Active" },
  { id: "AS-003", driver: "Suresh Patel", vehicle: "KA-01-MN-3312", trip: "TR-0082", route: "Bangalore → Chennai", startDate: "2026-07-12", endDate: "2026-07-12", status: "Active" },
  { id: "AS-004", driver: "Anil Sharma", vehicle: "DL-03-KP-5567", trip: "TR-0083", route: "Delhi → Jaipur", startDate: "2026-07-11", endDate: "2026-07-11", status: "Completed" },
  { id: "AS-005", driver: "Jose Thomas", vehicle: "KL-03-GH-3344", trip: "TR-0080", route: "Ahmedabad → Rajkot", startDate: "2026-07-11", endDate: "2026-07-11", status: "Completed" },
  { id: "AS-006", driver: "Deepak Verma", vehicle: "UP-32-CD-6677", trip: "TR-0079", route: "Hyderabad → Vizag", startDate: "2026-07-12", endDate: "2026-07-12", status: "Active" },
];

export const notifications = [
  { id: 1, title: "Vehicle KL-07-AU-4521 maintenance due in 3 days", type: "warning", time: "5 min ago", read: false },
  { id: 2, title: "Driver license for Arun Nair has expired", type: "danger", time: "1 hr ago", read: false },
  { id: 3, title: "Trip TR-0084 departed successfully", type: "success", time: "2 hrs ago", read: true },
  { id: 4, title: "Fuel expense report for July ready for review", type: "info", time: "3 hrs ago", read: true },
  { id: 5, title: "Compliance score dropped below 90% for Anil Sharma", type: "warning", time: "5 hrs ago", read: false },
  { id: 6, title: "New delivery confirmed at Mumbai Hub", type: "success", time: "6 hrs ago", read: true },
  { id: 7, title: "Invoice INV-2026-038 is overdue", type: "danger", time: "1 day ago", read: true },
  { id: 8, title: "Monthly fleet utilization report available", type: "info", time: "1 day ago", read: true },
];
