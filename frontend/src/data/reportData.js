export const reportCategories = [
  'Fleet', 'Fuel', 'Revenue', 'Maintenance', 'Driver', 'Trip', 'Safety'
];

export const reportStatuses = ['Active', 'Pending', 'Archived'];
export const reportFormats = ['PDF', 'Excel', 'CSV', 'JSON'];

const firstNames = ['John', 'Jane', 'Mike', 'Sarah', 'Alex', 'Emily', 'David', 'Lisa', 'Robert', 'Anna', 'James', 'Mary', 'William', 'Patricia', 'Richard', 'Jennifer', 'Joseph', 'Linda', 'Thomas', 'Barbara'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Wilson', 'Anderson', 'Taylor', 'Thomas', 'Moore', 'Jackson', 'Martin', 'Lee', 'Thompson', 'White'];

function randomItem(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function randomDate(start, end) {
  const d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return d.toISOString().split('T')[0];
}
function randomCurrency( min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

export const reports = Array.from({ length: 100 }, (_, i) => {
  const firstName = randomItem(firstNames);
  const lastName = randomItem(lastNames);
  const status = randomItem(reportStatuses);
  const format = randomItem(reportFormats);
  const category = randomItem(reportCategories);
  return {
    id: `RPT-${String(i + 1).padStart(4, '0')}`,
    name: `${category} Report - ${randomItem(['Q1', 'Q2', 'Q3', 'Q4', 'Monthly', 'Annual', 'Summary', 'Detailed', 'Executive'])} ${randomInt(2024, 2026)}`,
    category,
    generatedBy: `${firstName} ${lastName}`,
    createdDate: randomDate(new Date('2024-01-01'), new Date('2026-07-12')),
    status,
    format,
    size: `${randomInt(100, 5000)} KB`,
  };
});

export const monthlyRevenue = [
  { label: 'Jan', value: 425000, trips: 320, profit: 125000 },
  { label: 'Feb', value: 389000, trips: 298, profit: 112000 },
  { label: 'Mar', value: 452000, trips: 345, profit: 138000 },
  { label: 'Apr', value: 478000, trips: 367, profit: 145000 },
  { label: 'May', value: 512000, trips: 389, profit: 158000 },
  { label: 'Jun', value: 498000, trips: 378, profit: 152000 },
  { label: 'Jul', value: 534000, trips: 401, profit: 165000 },
  { label: 'Aug', value: 556000, trips: 415, profit: 172000 },
  { label: 'Sep', value: 521000, trips: 392, profit: 160000 },
  { label: 'Oct', value: 567000, trips: 425, profit: 178000 },
  { label: 'Nov', value: 589000, trips: 438, profit: 185000 },
  { label: 'Dec', value: 612000, trips: 452, profit: 195000 },
];

export const monthlyExpenses = [
  { label: 'Jan', value: 300000, fuel: 120000, maintenance: 80000, salary: 65000, other: 35000 },
  { label: 'Feb', value: 277000, fuel: 108000, maintenance: 72000, salary: 65000, other: 32000 },
  { label: 'Mar', value: 314000, fuel: 125000, maintenance: 84000, salary: 65000, other: 40000 },
  { label: 'Apr', value: 333000, fuel: 132000, maintenance: 90000, salary: 65000, other: 46000 },
  { label: 'May', value: 354000, fuel: 140000, maintenance: 96000, salary: 65000, other: 53000 },
  { label: 'Jun', value: 346000, fuel: 136000, maintenance: 92000, salary: 65000, other: 53000 },
  { label: 'Jul', value: 369000, fuel: 145000, maintenance: 100000, salary: 68000, other: 56000 },
  { label: 'Aug', value: 384000, fuel: 150000, maintenance: 105000, salary: 68000, other: 61000 },
  { label: 'Sep', value: 361000, fuel: 142000, maintenance: 96000, salary: 68000, other: 55000 },
  { label: 'Oct', value: 389000, fuel: 152000, maintenance: 108000, salary: 68000, other: 61000 },
  { label: 'Nov', value: 404000, fuel: 158000, maintenance: 112000, salary: 70000, other: 64000 },
  { label: 'Dec', value: 417000, fuel: 162000, maintenance: 115000, salary: 70000, other: 70000 },
];

export const fleetUtilization = [
  { label: 'Jan', value: 72 },
  { label: 'Feb', value: 68 },
  { label: 'Mar', value: 75 },
  { label: 'Apr', value: 78 },
  { label: 'May', value: 82 },
  { label: 'Jun', value: 79 },
  { label: 'Jul', value: 85 },
  { label: 'Aug', value: 88 },
  { label: 'Sep', value: 84 },
  { label: 'Oct', value: 86 },
  { label: 'Nov', value: 90 },
  { label: 'Dec', value: 92 },
];

export const fuelConsumption = [
  { label: 'Jan', value: 12000 },
  { label: 'Feb', value: 10800 },
  { label: 'Mar', value: 13200 },
  { label: 'Apr', value: 13800 },
  { label: 'May', value: 14500 },
  { label: 'Jun', value: 14200 },
  { label: 'Jul', value: 15000 },
  { label: 'Aug', value: 15500 },
  { label: 'Sep', value: 14800 },
  { label: 'Oct', value: 15200 },
  { label: 'Nov', value: 15800 },
  { label: 'Dec', value: 16200 },
];

export const vehicleStatusData = [
  { label: 'Active', value: 42, color: '#059669' },
  { label: 'In Maintenance', value: 8, color: '#D97706' },
  { label: 'Inactive', value: 5, color: '#DC2626' },
  { label: 'Reserve', value: 3, color: '#6366F1' },
];

export const revenueDistribution = [
  { label: 'Transport', value: 45, color: '#1E3A5F' },
  { label: 'Logistics', value: 25, color: '#059669' },
  { label: 'Warehousing', value: 15, color: '#D97706' },
  { label: 'Express', value: 10, color: '#7C3AED' },
  { label: 'Other', value: 5, color: '#06B6D4' },
];

export const vehiclePerformance = [
  { id: 'VH-001', name: 'Volvo FH16', type: 'Heavy Truck', usage: 92, distance: 15800, fuelEfficiency: 6.2, maintenanceScore: 88, revenue: 245000, cost: 175000, status: 'Active' },
  { id: 'VH-002', name: 'Scania R500', type: 'Heavy Truck', usage: 88, distance: 14200, fuelEfficiency: 5.8, maintenanceScore: 92, revenue: 218000, cost: 158000, status: 'Active' },
  { id: 'VH-003', name: 'Mercedes Actros', type: 'Heavy Truck', usage: 85, distance: 13800, fuelEfficiency: 6.5, maintenanceScore: 85, revenue: 205000, cost: 165000, status: 'Active' },
  { id: 'VH-004', name: 'MAN TGX', type: 'Heavy Truck', usage: 78, distance: 12500, fuelEfficiency: 5.5, maintenanceScore: 75, revenue: 185000, cost: 148000, status: 'Maintenance' },
  { id: 'VH-005', name: 'DAF XF', type: 'Medium Truck', usage: 90, distance: 14500, fuelEfficiency: 7.2, maintenanceScore: 90, revenue: 198000, cost: 142000, status: 'Active' },
  { id: 'VH-006', name: 'Iveco Stralis', type: 'Medium Truck', usage: 72, distance: 11800, fuelEfficiency: 5.0, maintenanceScore: 70, revenue: 165000, cost: 138000, status: 'Inactive' },
  { id: 'VH-007', name: 'Kenworth T680', type: 'Heavy Truck', usage: 95, distance: 16200, fuelEfficiency: 6.8, maintenanceScore: 95, revenue: 268000, cost: 182000, status: 'Active' },
  { id: 'VH-008', name: 'Peterbilt 579', type: 'Heavy Truck', usage: 82, distance: 13200, fuelEfficiency: 6.0, maintenanceScore: 82, revenue: 195000, cost: 155000, status: 'Active' },
  { id: 'VH-009', name: 'Freightliner Cascadia', type: 'Medium Truck', usage: 76, distance: 12200, fuelEfficiency: 5.2, maintenanceScore: 72, revenue: 175000, cost: 145000, status: 'Maintenance' },
  { id: 'VH-010', name: 'Mack Anthem', type: 'Heavy Truck', usage: 87, distance: 14000, fuelEfficiency: 6.3, maintenanceScore: 86, revenue: 225000, cost: 168000, status: 'Active' },
  { id: 'VH-011', name: 'Volvo VNL 860', type: 'Heavy Truck', usage: 80, distance: 13000, fuelEfficiency: 5.7, maintenanceScore: 78, revenue: 188000, cost: 152000, status: 'Active' },
  { id: 'VH-012', name: 'International LT', type: 'Medium Truck', usage: 70, distance: 11500, fuelEfficiency: 4.8, maintenanceScore: 68, revenue: 158000, cost: 135000, status: 'Inactive' },
];

export const driverPerformance = [
  { name: 'Rajesh Kumar', trips: 145, revenue: 425000, score: 98, fuelEff: 6.8, incidents: 0 },
  { name: 'Suresh Patel', trips: 132, revenue: 389000, score: 95, fuelEff: 6.5, incidents: 1 },
  { name: 'Vikram Singh', trips: 158, revenue: 452000, score: 99, fuelEff: 7.1, incidents: 0 },
  { name: 'Anil Sharma', trips: 118, revenue: 345000, score: 88, fuelEff: 5.9, incidents: 2 },
  { name: 'Deepak Verma', trips: 140, revenue: 410000, score: 94, fuelEff: 6.4, incidents: 1 },
  { name: 'Jose Garcia', trips: 152, revenue: 438000, score: 96, fuelEff: 6.7, incidents: 0 },
  { name: 'Michael Chen', trips: 128, revenue: 372000, score: 91, fuelEff: 6.1, incidents: 1 },
  { name: 'Carlos Rodriguez', trips: 135, revenue: 398000, score: 93, fuelEff: 6.3, incidents: 1 },
  { name: 'Ahmed Hassan', trips: 148, revenue: 418000, score: 97, fuelEff: 6.9, incidents: 0 },
  { name: 'David Kim', trips: 122, revenue: 358000, score: 89, fuelEff: 6.0, incidents: 2 },
];

export const fuelData = [
  { vehicle: 'Volvo FH16', fuelCost: 45200, consumption: 6200, efficiency: 6.2, mileage: 15800 },
  { vehicle: 'Scania R500', fuelCost: 41800, consumption: 5800, efficiency: 5.8, mileage: 14200 },
  { vehicle: 'Mercedes Actros', fuelCost: 43500, consumption: 6050, efficiency: 6.5, mileage: 13800 },
  { vehicle: 'MAN TGX', fuelCost: 38500, consumption: 5400, efficiency: 5.5, mileage: 12500 },
  { vehicle: 'DAF XF', fuelCost: 39800, consumption: 5550, efficiency: 7.2, mileage: 14500 },
  { vehicle: 'Iveco Stralis', fuelCost: 35200, consumption: 4950, efficiency: 5.0, mileage: 11800 },
  { vehicle: 'Kenworth T680', fuelCost: 47500, consumption: 6500, efficiency: 6.8, mileage: 16200 },
  { vehicle: 'Peterbilt 579', fuelCost: 40500, consumption: 5650, efficiency: 6.0, mileage: 13200 },
  { vehicle: 'Freightliner Cascadia', fuelCost: 37500, consumption: 5250, efficiency: 5.2, mileage: 12200 },
  { vehicle: 'Mack Anthem', fuelCost: 42800, consumption: 5900, efficiency: 6.3, mileage: 14000 },
];

export const roiData = vehiclePerformance.map(v => ({
  ...v,
  purchaseCost: randomInt(150000, 350000),
  totalOperationalCost: v.cost,
  netProfit: v.revenue - v.cost,
  roi: Math.round(((v.revenue - v.cost) / v.cost) * 100),
  lifetimeValue: randomInt(500000, 1200000),
}));

export const operationalCostBreakdown = [
  { category: 'Fuel', value: 1728000, color: '#DC2626' },
  { category: 'Maintenance', value: 1150000, color: '#D97706' },
  { category: 'Insurance', value: 420000, color: '#6366F1' },
  { category: 'Driver Salary', value: 798000, color: '#059669' },
  { category: 'Parking', value: 156000, color: '#06B6D4' },
  { category: 'Toll Charges', value: 284000, color: '#8B5CF6' },
  { category: 'Repairs', value: 345000, color: '#F43F5E' },
  { category: 'Taxes', value: 198000, color: '#14B8A6' },
  { category: 'Miscellaneous', value: 112000, color: '#FB923C' },
];

export const departmentSpending = [
  { department: 'Transport', value: 1850000 },
  { department: 'Logistics', value: 1250000 },
  { province: 'Warehouse', value: 890000 },
  { department: 'Maintenance', value: 1150000 },
  { department: 'Admin', value: 450000 },
];

export const quarterlyRevenue = [
  { quarter: 'Q1 2025', value: 1266000 },
  { quarter: 'Q2 2025', value: 1488000 },
  { quarter: 'Q3 2025', value: 1611000 },
  { quarter: 'Q4 2025', value: 1768000 },
  { quarter: 'Q1 2026', value: 1420000 },
  { quarter: 'Q2 2026', value: 1650000 },
];

export const annualRevenue = [
  { year: '2021', value: 4200000 },
  { year: '2022', value: 5100000 },
  { year: '2023', value: 5850000 },
  { year: '2024', value: 6450000 },
  { year: '2025', value: 7150000 },
  { year: '2026', value: 3950000 },
];

export const fleetGrowthData = [
  { label: '2021', value: 28 },
  { label: '2022', value: 35 },
  { label: '2023', value: 42 },
  { label: '2024', value: 48 },
  { label: '2025', value: 55 },
  { label: '2026', value: 58 },
];

export const maintenanceTrend = [
  { label: 'Jan', value: 82000 },
  { label: 'Feb', value: 74000 },
  { label: 'Mar', value: 86000 },
  { label: 'Apr', value: 92000 },
  { label: 'May', value: 98000 },
  { label: 'Jun', value: 94000 },
  { label: 'Jul', value: 102000 },
  { label: 'Aug', value: 108000 },
  { label: 'Sep', value: 98000 },
  { label: 'Oct', value: 110000 },
  { label: 'Nov', value: 115000 },
  { label: 'Dec', value: 118000 },
];

export const tripPerformance = [
  { label: 'Completed', value: 3450 },
  { label: 'In Transit', value: 128 },
  { label: 'Scheduled', value: 450 },
  { label: 'Cancelled', value: 85 },
  { label: 'Delayed', value: 62 },
];

export const vehicleHealthData = [
  { label: 'Excellent', value: 18, color: '#059669' },
  { label: 'Good', value: 22, color: '#06B6D4' },
  { label: 'Fair', value: 10, color: '#D97706' },
  { label: 'Poor', value: 5, color: '#DC2626' },
];
