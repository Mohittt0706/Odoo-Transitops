const vehicles = [
  { id: "VH-001", name: "Tata Prima 4040.S", plate: "KL-07-AU-4521", type: "Heavy Truck", status: "Active", driver: "Rajesh Kumar", fuelType: "Diesel" },
  { id: "VH-002", name: "Ashok Leyland 4220", plate: "KA-01-MN-3312", type: "Heavy Truck", status: "Active", driver: "Suresh Patel", fuelType: "Diesel" },
  { id: "VH-003", name: "Eicher Pro 6036", plate: "TN-09-BC-7890", type: "Medium Truck", status: "In Maintenance", driver: "—", fuelType: "Diesel" },
  { id: "VH-004", name: "Mahindra Blazo X25", plate: "MH-12-RT-2244", type: "Heavy Truck", status: "Active", driver: "Vikram Singh", fuelType: "Diesel" },
  { id: "VH-005", name: "BharatBenz 2528", plate: "DL-03-KP-5567", type: "Medium Truck", status: "Active", driver: "Anil Sharma", fuelType: "Diesel" },
  { id: "VH-006", name: "Tata Ultra 1918", plate: "GJ-06-HJ-1123", type: "Light Truck", status: "Inactive", driver: "—", fuelType: "Petrol" },
  { id: "VH-007", name: "Volvo FH16", plate: "RJ-14-AB-9988", type: "Heavy Truck", status: "Active", driver: "Mohammed Ali", fuelType: "Diesel" },
  { id: "VH-008", name: "Scania R450", plate: "UP-32-CD-6677", type: "Heavy Truck", status: "Active", driver: "Deepak Verma", fuelType: "Diesel" },
  { id: "VH-009", name: "Isuzu FVR", plate: "AP-08-EF-4455", type: "Medium Truck", status: "In Maintenance", driver: "—", fuelType: "Diesel" },
  { id: "VH-010", name: "AMW 2523", plate: "KL-03-GH-3344", type: "Heavy Truck", status: "Active", driver: "Jose Thomas", fuelType: "Diesel" },
  { id: "VH-011", name: "Tata LPT 3523", plate: "MH-04-XY-7788", type: "Heavy Truck", status: "Active", driver: "Sunil Reddy", fuelType: "Diesel" },
  { id: "VH-012", name: "Ashok Leyland 1920", plate: "KA-05-PQ-1122", type: "Medium Truck", status: "Active", driver: "Gopal Das", fuelType: "Diesel" },
  { id: "VH-013", name: "Mahindra Furio 16", plate: "TN-07-RS-3344", type: "Light Truck", status: "Active", driver: "Manoj Iyer", fuelType: "Petrol" },
  { id: "VH-014", name: "Eicher Pro 3016", plate: "GJ-03-TU-5566", type: "Medium Truck", status: "Active", driver: "Kiran Rao", fuelType: "Diesel" },
  { id: "VH-015", name: "BharatBenz 2823", plate: "UP-14-VW-7788", type: "Heavy Truck", status: "Active", driver: "Rakesh Gupta", fuelType: "Diesel" },
];

const fuelStations = [
  "HP Petrol, Kochi", "BPCL, Mumbai", "IOCL, Bangalore", "HP Petrol, Delhi",
  "BPCL, Hyderabad", "IOCL, Kochi", "Reliance Petrol, Pune", "Shell, Chennai",
  "HP Petrol, Ahmedabad", "BPCL, Kolkata", "IOCL, Jaipur", "Shell, Lucknow",
  "Indian Oil, Patna", "Bharat Petroleum, Nagpur", "HP Petrol, Bhopal",
];

const expenseCategories = ["Fuel", "Maintenance", "Toll", "Insurance", "Parking", "Repair", "Taxes", "Permits", "Registration", "Cleaning", "Other"];

const paymentStatuses = ["Pending", "Approved", "Rejected", "Paid", "Overdue", "Cancelled", "Refunded"];

const drivers = ["Rajesh Kumar", "Suresh Patel", "Vikram Singh", "Anil Sharma", "Mohammed Ali", "Deepak Verma", "Jose Thomas", "Arun Nair", "Sunil Reddy", "Gopal Das", "Manoj Iyer", "Kiran Rao", "Rakesh Gupta", "Amit Malhotra", "Ravi Joshi"];

const fuelTypes = ["Diesel", "Petrol", "CNG", "EV"];

function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function pick(arr) { return arr[rand(0, arr.length - 1)]; }

function pad(n, len = 3) { return String(n).padStart(len, "0"); }

function fmtDate(month, day) { return `2026-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`; }

const fuelLogs = Array.from({ length: 50 }, (_, i) => {
  const v = pick(vehicles);
  const d = v.driver !== "—" ? v.driver : pick(drivers);
  const qty = rand(40, 180);
  const cpl = rand(86, 99);
  const prev = rand(10000, 200000);
  const curr = prev + rand(200, 900);
  const day = rand(1, 30);
  const month = rand(6, 7);
  return {
    id: `FL-${pad(i + 1)}`,
    vehicle: v.plate,
    vehicleName: v.name,
    driver: d,
    fuelStation: pick(fuelStations),
    fuelType: v.fuelType,
    quantity: qty,
    costPerLiter: cpl,
    totalCost: qty * cpl,
    odometer: curr,
    prevOdometer: prev,
    mileage: ((curr - prev) / qty).toFixed(1),
    date: fmtDate(month, day),
    status: pick(["Approved", "Pending", "Rejected"]),
    paymentMethod: pick(["Fuel Card", "Cash", "Credit"]),
  };
}).sort((a, b) => new Date(b.date) - new Date(a.date));

const expenses = Array.from({ length: 50 }, (_, i) => {
  const v = pick(vehicles);
  const cat = pick(expenseCategories);
  const status = pick(paymentStatuses);
  const day = rand(1, 30);
  const month = rand(6, 7);
  let amount;
  if (cat === "Fuel") amount = rand(3000, 18000);
  else if (cat === "Maintenance" || cat === "Repair") amount = rand(5000, 85000);
  else if (cat === "Insurance") amount = rand(15000, 55000);
  else if (cat === "Toll") amount = rand(200, 3500);
  else if (cat === "Taxes" || cat === "Permits" || cat === "Registration") amount = rand(5000, 25000);
  else amount = rand(200, 12000);
  return {
    id: `EX-${pad(i + 1)}`,
    vehicle: v.plate,
    vehicleName: v.name,
    category: cat,
    amount,
    date: fmtDate(month, day),
    paymentStatus: status,
    approvedBy: ["Approved", "Paid"].includes(status) ? "Finance Admin" : "—",
    invoice: Math.random() > 0.35 ? `INV-2026-${pad(rand(1, 999), 4)}` : null,
    driver: v.driver !== "—" ? v.driver : pick(drivers),
    description: `${cat} expense for ${v.plate}`,
  };
}).sort((a, b) => new Date(b.date) - new Date(a.date));

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
const monthlyFuelCost = months.map((m) => ({ label: m, value: rand(120, 300) * 1000 }));
const fuelConsumptionTrend = months.map((m) => ({ label: m, value: rand(6000, 12000) }));
const monthlyOperationalCost = months.map((m) => ({ label: m, value: rand(300, 700) * 1000 }));
const expenseDistribution = [
  { label: "Fuel", value: 45, color: "#2563EB" },
  { label: "Maintenance", value: 20, color: "#F59E0B" },
  { label: "Insurance", value: 15, color: "#22C55E" },
  { label: "Toll", value: 10, color: "#8B5CF6" },
  { label: "Others", value: 10, color: "#EC4899" },
];

const fuelStats = {
  totalFuelCost: "₹8,45,200",
  monthlyConsumption: "32,450 L",
  totalExpenses: "₹18,92,500",
  maintenanceExpenses: "₹4,25,800",
  tollCharges: "₹1,82,300",
  insuranceCost: "₹2,40,000",
  avgFuelEconomy: "5.2 km/L",
  totalDistance: "1,68,450 km",
};

export { vehicles, fuelStations, fuelTypes, expenseCategories, paymentStatuses, drivers, fuelLogs, expenses, months, monthlyFuelCost, fuelConsumptionTrend, monthlyOperationalCost, expenseDistribution, fuelStats };
