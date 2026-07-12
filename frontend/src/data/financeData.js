function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function pick(arr) { return arr[rand(0, arr.length - 1)]; }
function pad(n, len) { return String(n).padStart(len, "0"); }
function months() { return ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]; }

const vehicles = [
  { plate: "KL-07-AU-4521", name: "Tata Prima 4040.S" }, { plate: "KA-01-MN-3312", name: "Ashok Leyland 4220" },
  { plate: "TN-09-BC-7890", name: "Eicher Pro 6036" }, { plate: "MH-12-RT-2244", name: "Mahindra Blazo X25" },
  { plate: "DL-03-KP-5567", name: "BharatBenz 2528" }, { plate: "RJ-14-AB-9988", name: "Volvo FH16" },
  { plate: "UP-32-CD-6677", name: "Scania R450" }, { plate: "KL-03-GH-3344", name: "AMW 2523" },
  { plate: "AP-08-EF-4455", name: "Isuzu FVR" }, { plate: "MH-04-XY-7788", name: "Tata LPT 3523" },
];
const clients = ["Reliance Retail","Flipkart Logistics","Amazon India","Tata Chemicals","Wipro Technologies","HUL Distribution","ITC Limited","Bharti Airtel","Mahindra Logistics","Godrej Group","Adani Logistics","L&T Infrastructure"];
const expenseCats = ["Fuel","Maintenance","Toll","Insurance","Parking","Repair","Taxes","Permits","Registration","Cleaning","Other"];
const departments = ["Transport","Logistics","Warehouse","Administration","Maintenance"];
const statuses = ["Pending","Approved","Rejected","Paid","Overdue","Cancelled","Refunded"];
const invStatuses = ["Pending","Paid","Overdue","Processing"];

const financeExpenses = Array.from({ length: 100 }, (_, i) => {
  const v = pick(vehicles); const cat = pick(expenseCats); const dept = pick(departments); const s = pick(statuses);
  const d = rand(1, 28); const amt = cat === "Fuel" ? rand(3000, 18000) : cat === "Maintenance"||cat==="Repair" ? rand(5000, 85000) : cat==="Insurance" ? rand(15000, 55000) : cat==="Toll" ? rand(200, 3500) : rand(200, 12000);
  return {
    id: `EXP-${pad(i+1,3)}`, vehicle: v.plate, vehicleName: v.name, category: cat, department: dept, amount: amt,
    approvedBy: s==="Approved"||s==="Paid" ? "Finance Admin" : "—", paymentStatus: s,
    date: `2026-${pad(rand(1,7),2)}-${pad(d,2)}`, invoice: Math.random()>0.3 ? `INV-2026-${pad(rand(1,999),4)}` : null,
  };
}).sort((a,b) => new Date(b.date)-new Date(a.date));

const financeRevenue = Array.from({ length: 100 }, (_, i) => {
  const v = pick(vehicles); const c = pick(clients);
  const d = rand(1, 28); const amt = rand(15000, 500000);
  return {
    id: `REV-${pad(i+1,3)}`, vehicle: v.plate, vehicleName: v.name, client: c, amount: amt,
    type: pick(["Transport","Logistics","Warehousing","Express"]), date: `2026-${pad(rand(1,7),2)}-${pad(d,2)}`,
    status: pick(["Completed","Processing","Pending"]),
  };
}).sort((a,b) => new Date(b.date)-new Date(a.date));

const financeInvoices = Array.from({ length: 50 }, (_, i) => {
  const c = pick(clients); const v = pick(vehicles);
  const d = rand(1, 28); const amt = rand(25000, 800000); const tax = Math.round(amt * 0.18);
  const status = pick(invStatuses);
  return {
    id: `INV-2026-${pad(i+1,4)}`, client: c, vehicle: v.plate, vehicleName: v.name, trip: `TR-${pad(rand(1,99),4)}`,
    amount: amt, tax, total: amt + tax, paymentStatus: status,
    dueDate: `2026-${pad(rand(7,9),2)}-${pad(d,2)}`, date: `2026-${pad(rand(1,7),2)}-${pad(d,2)}`,
    email: Math.random() > 0.5 ? "sent" : "pending",
  };
}).sort((a,b) => new Date(b.date)-new Date(a.date));

const monthlyRevenue = months().map((m) => ({ label: m, value: rand(18, 45) * 10000 }));
const monthlyExpenses = months().map((m) => ({ label: m, value: rand(12, 30) * 10000 }));
const monthlyProfit = monthlyRevenue.map((r, i) => ({ label: r.label, value: r.value - monthlyExpenses[i].value }));
const expenseDist = expenseCats.map((c, i) => ({ label: c, value: rand(5, 30), color: ["#2563EB","#F59E0B","#22C55E","#8B5CF6","#EC4899","#EF4444","#14B8A6","#F97316","#6366F1","#84CC16","#A1A1AA"][i] }));
const roiData = vehicles.map((v) => ({ ...v, purchaseCost: rand(25, 80) * 100000, revenue: rand(15, 50) * 100000, cost: rand(10, 30) * 100000, profit: rand(5, 20) * 100000, roi: rand(12, 45) }));

const fuelStatsData = {
  monthlyCost: months().map((m) => ({ label: m, value: rand(80, 200) * 1000 })),
  consumption: months().map((m) => ({ label: m, value: rand(6000, 14000) })),
  vehicleRanking: vehicles.map((v) => ({ name: v.name, plate: v.plate, cost: rand(30000, 150000), consumption: rand(300, 1800), efficiency: (4.2 + Math.random() * 1.5).toFixed(1) })),
  avgCostPerKm: (10 + Math.random() * 4).toFixed(2),
  fuelEfficiency: (4.8 + Math.random() * 0.6).toFixed(1),
};

const maintStatsData = {
  monthlyCost: months().map((m) => ({ label: m, value: rand(40, 120) * 1000 })),
  breakdown: [
    { label: "Repair", value: 40, color: "#F59E0B" }, { label: "Service", value: 30, color: "#2563EB" },
    { label: "Parts", value: 20, color: "#22C55E" }, { label: "Labour", value: 10, color: "#8B5CF6" },
  ],
  vehicleRanking: vehicles.map((v) => ({ name: v.name, plate: v.plate, cost: rand(5000, 60000), count: rand(1, 6) })),
};

const revenueStats = {
  monthly: months().map((m) => ({ label: m, value: rand(15, 50) * 10000 })),
  byVehicle: vehicles.slice(0, 8).map((v) => ({ name: v.name, plate: v.plate, revenue: rand(20000, 200000) })),
  growth: [8, 12, 15, 10, 18, 22, 20],
};

export { financeExpenses, financeRevenue, financeInvoices, monthlyRevenue, monthlyExpenses, monthlyProfit, expenseDist, roiData, fuelStatsData, maintStatsData, revenueStats, vehicles, clients, expenseCats, departments };
