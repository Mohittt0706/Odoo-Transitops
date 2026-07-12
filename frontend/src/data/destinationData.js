export const receivers = [];
export const incomingDeliveries = [];
export const completedDeliveries = [];
export const dockData = [];
export const warehouseWorkers = [];
export const warehouseSections = [];
export const podRecords = [];

<<<<<<< HEAD
export const dailyDeliveries = [];
export const monthlyDeliveryTrend = [];
export const dockUtilizationHistory = [];
export const warehouseCapacityHistory = [];
export const avgWaitingTime = [];
export const delayAnalysis = [];
export const workerProductivity = [];
export const storageDistribution = [];
export const incomingOutgoing = [];
=======
const drivers = ['Rajesh Kumar','Suresh Patel','Vikram Singh','Anil Sharma','Deepak Verma','Jose Thomas','Mohammed Ali','Arun Nair','Karthik Rajan','Sneha Patel','Amit Kumar','Priya Sharma'];
const trucks = ['KL-07-AU-4521','KA-01-MN-3312','MH-12-RT-2244','DL-03-KP-5567','GJ-06-HJ-1123','RJ-14-AB-9988','UP-32-CD-6677','AP-08-EF-4455','KL-03-GH-3344','TN-09-BC-7890','MH-04-XY-1234','KA-05-PQ-5678'];
const origins = ['Mumbai','Bangalore','Delhi','Chennai','Kolkata','Hyderabad','Ahmedabad','Pune','Jaipur','Kochi','Lucknow','Nagpur','Bhopal','Chandigarh','Visakhapatnam','Indore','Coimbatore','Guwahati','Thiruvananthapuram','Bhubaneswar'];
const destinations = ['Mumbai Central Hub','Chennai Distribution','Delhi North Facility','Bangalore Tech Park','Kochi Port Terminal','Pune Logistics Center','Jaipur Warehouse','Hyderabad Hub','Ahmedabad Depot','Lucknow Distribution','Nagpur Transit Hub','Visakhapatnam Port','Bhopal Storage','Chandigarh Logistics','Indore Warehouse'];
const cargoTypes = ['Electronics','Textiles','Auto Parts','Pharmaceuticals','Chemicals','Steel Products','FMCG Goods','Machinery','Food Products','Furniture','Plastics','Paper Rolls','Beverages','Packaging Material','Spare Parts','Medical Equipment','Frozen Foods','Clothing','Books','Fertilizers'];
const docks = ['Dock 1','Dock 2','Dock 3','Dock 4','Dock 5','Dock 6','Dock 7','Dock 8','Dock 9','Dock 10','Dock 11','Dock 12','Dock 13','Dock 14','Dock 15','Dock 16','Dock 17','Dock 18','Dock 19','Dock 20','Dock A1','Dock A2','Dock B1','Dock B2','Dock C1'];
const companies = ['Reliance Retail Ltd','Flipkart Logistics','Amazon India','Tata Chemicals','HUL Distribution','Wipro Technologies','Adani Logistics','Mahindra Logistics','Transport Corporation','DHL Supply Chain','Blue Dart Express','Gati Limited','Safe Express','Delhivery Logistics','Future Supply Chain'];
const receiverNames = ['Rajesh Mehta','Priya Gupta','Vikash Singh','Meena Patel','Suresh Iyer','Anita Desai','Rahul Verma','Deepa Nair','Arun Kumar','Sunita Sharma','Vijay Reddy','Kavita Joshi','Ravi Menon','Pooja Agarwal','Rohit Singh'];
const phonePrefixes = ['98200','98111','98333','98444','98555','98765','98666','98888','98999','98123'];
const statuses = ['Incoming','On Route','Arrived','Waiting Dock','Dock Assigned','Unloading','Delayed','Completed','Cancelled'];
const podStatuses = ['Verified','Pending','Awaiting Photo','Uploaded','Partially Uploaded','Rejected'];
const vehicles = ['TATA-001','TATA-002','ASHOK-001','ASHOK-002','BHARAT-001','BHARAT-002','EICHER-001','EICHER-002','VOLVO-001','VOLVO-002','SCANIA-001','SCANIA-002','TATA-003','TATA-004','ASHOK-003','BHARAT-003','EICHER-003','VOLVO-003','SCANIA-003','TATA-005'];
const warehouses = ['Mumbai Central Hub','Chennai Distribution','Delhi North Facility','Bangalore Tech Park','Kochi Port Terminal','Pune Logistics Center','Jaipur Warehouse','Hyderabad Hub','Ahmedabad Depot','Lucknow Distribution'];
export const receivers = Array.from({ length: 50 }, (_, i) => ({
  id: `RC-${String(i + 1).padStart(3, '0')}`,
  name: pick(companies),
  contact: pick(receiverNames),
  phone: `+91 ${pick(phonePrefixes)} ${rnd(10000, 99999)}`,
  email: `${pick(receiverNames).toLowerCase().replace(' ', '.')}@company.com`,
  address: `${pick(['Mumbai','Delhi','Bangalore','Chennai','Hyderabad','Pune','Ahmedabad','Kolkata'])}, India`,
  totalDeliveries: rnd(5, 120),
  pendingDeliveries: rnd(0, 8),
  verified: Math.random() > 0.15,
  verificationDate: Math.random() > 0.2 ? rndDate(-365, 0) : null,
  rating: Math.round((3.5 + Math.random() * 1.5) * 10) / 10,
  digitalSignature: Math.random() > 0.25,
}));

export const incomingDeliveries = Array.from({ length: 50 }, (_, i) => ({
  id: `INC-${String(i + 1).padStart(3, '0')}`,
  truck: pick(trucks),
  driver: pick(drivers),
  vehicle: pick(vehicles),
  source: pick(origins),
  destination: pick(warehouses),
  arrivalTime: `${rndDate(-1, 2)} ${rndTime()}`,
  eta: `${rndTime()}`,
  dock: pick(docks),
  cargo: pick(cargoTypes),
  weight: `${rnd(500, 25000)} kg`,
  priority: pick(['High', 'Medium', 'Low']),
  status: pick(['Incoming', 'On Route', 'Arrived', 'Waiting Dock', 'Dock Assigned', 'Unloading', 'Delayed', 'Completed', 'Cancelled']),
  notes: Math.random() > 0.5 ? `Special handling required: ${pick(['Fragile', 'Perishable', 'Hazardous', 'Oversized', 'Temperature Controlled'])}` : '',
}));

export const completedDeliveries = Array.from({ length: 60 }, (_, i) => ({
  id: `CMP-${String(i + 1).padStart(3, '0')}`,
  vehicle: pick(trucks),
  driver: pick(drivers),
  arrivalTime: `${rndDate(-30, -1)} ${rndTime()}`,
  completionTime: `${rndDate(-30, -1)} ${rndTime()}`,
  receiver: pick(companies),
  cargo: pick(cargoTypes),
  weight: `${rnd(500, 25000)} kg`,
  dock: pick(docks),
  podStatus: pick(podStatuses),
  status: pick(['Completed', 'Confirmed', 'Rejected']),
  rating: Math.round((3 + Math.random() * 2) * 10) / 10,
  unloadingTime: `${rnd(30, 180)} min`,
  notes: Math.random() > 0.6 ? pick(['All items accounted for', 'Minor packaging damage', 'Signed without issues', 'Partial delivery accepted', 'Rush delivery']) : '',
}));

const dockNames = ['Dock 1','Dock 2','Dock 3','Dock 4','Dock 5','Dock 6','Dock 7','Dock 8','Dock 9','Dock 10','Dock 11','Dock 12','Dock 13','Dock 14','Dock 15','Dock 16','Dock 17','Dock 18','Dock 19','Dock 20','Dock A1','Dock A2','Dock B1','Dock B2','Dock C1'];
export const dockData = dockNames.map((name, i) => ({
  id: `DCK-${String(i + 1).padStart(3, '0')}`,
  name,
  status: pick(['Available', 'Occupied', 'Reserved', 'Maintenance']),
  utilization: rnd(20, 100),
  currentVehicle: Math.random() > 0.4 ? pick(trucks) : null,
  cargoType: Math.random() > 0.4 ? pick(cargoTypes) : null,
  assignedWorker: Math.random() > 0.4 ? pick(drivers) : null,
}));

export const warehouseWorkers = Array.from({ length: 30 }, (_, i) => ({
  id: `WRK-${String(i + 1).padStart(3, '0')}`,
  name: pick(receiverNames),
  role: pick(['Loader', 'Forklift Operator', 'Supervisor', 'Packer', 'Inspector', 'Dock Worker', 'Inventory Clerk']),
  shift: pick(['Morning', 'Afternoon', 'Night']),
  active: Math.random() > 0.15,
  productivity: rnd(60, 100),
}));

export const warehouseSections = [
  { name: 'Section A - General Storage', capacity: 5000, used: 3800, type: 'Dry' },
  { name: 'Section B - Cold Storage', capacity: 2000, used: 1650, type: 'Cold' },
  { name: 'Section C - Fragile Goods', capacity: 1500, used: 1200, type: 'Controlled' },
  { name: 'Section D - Bulk Items', capacity: 4000, used: 2100, type: 'Dry' },
  { name: 'Section E - Hazardous Materials', capacity: 1000, used: 600, type: 'Ventilated' },
  { name: 'Section F - Export Processing', capacity: 2500, used: 2200, type: 'Controlled' },
  { name: 'Section G - Return Processing', capacity: 800, used: 350, type: 'Dry' },
  { name: 'Section H - Express Dispatch', capacity: 1200, used: 900, type: 'Dry' },
];

export const podRecords = Array.from({ length: 100 }, (_, i) => ({
  id: `POD-${String(i + 1).padStart(3, '0')}`,
  deliveryId: `CMP-${String(rnd(1, 60)).padStart(3, '0')}`,
  receiver: pick(companies),
  driver: pick(drivers),
  vehicle: pick(trucks),
  deliveryTime: `${rndDate(-30, 0)} ${rndTime()}`,
  signedBy: pick(receiverNames),
  signature: Math.random() > 0.15,
  photos: rnd(0, 5),
  documents: rnd(0, 3),
  status: pick(podStatuses),
  notes: Math.random() > 0.5 ? pick(['All items delivered in good condition', 'Package slightly damaged - noted', 'Verified and accepted', 'Partial delivery due to stock issue', 'Signed under reservation']) : '',
}));

export const dailyDeliveries = [
  { label: 'Mon', incoming: 12, completed: 10, delayed: 2 },
  { label: 'Tue', incoming: 15, completed: 13, delayed: 1 },
  { label: 'Wed', incoming: 10, completed: 9, delayed: 3 },
  { label: 'Thu', incoming: 18, completed: 16, delayed: 1 },
  { label: 'Fri', incoming: 14, completed: 12, delayed: 2 },
  { label: 'Sat', incoming: 8, completed: 7, delayed: 1 },
  { label: 'Sun', incoming: 5, completed: 4, delayed: 0 },
];

export const monthlyDeliveryTrend = [
  { label: 'Jan', value: 245 }, { label: 'Feb', value: 232 },
  { label: 'Mar', value: 268 }, { label: 'Apr', value: 285 },
  { label: 'May', value: 302 }, { label: 'Jun', value: 298 },
  { label: 'Jul', value: 315 }, { label: 'Aug', value: 328 },
  { label: 'Sep', value: 310 }, { label: 'Oct', value: 342 },
  { label: 'Nov', value: 358 }, { label: 'Dec', value: 375 },
];

export const dockUtilizationHistory = [
  { label: 'Mon', value: 72 }, { label: 'Tue', value: 78 },
  { label: 'Wed', value: 65 }, { label: 'Thu', value: 82 },
  { label: 'Fri', value: 76 }, { label: 'Sat', value: 55 },
  { label: 'Sun', value: 35 },
];

export const warehouseCapacityHistory = [
  { label: 'Jan', value: 68 }, { label: 'Feb', value: 71 },
  { label: 'Mar', value: 74 }, { label: 'Apr', value: 78 },
  { label: 'May', value: 76 }, { label: 'Jun', value: 80 },
  { label: 'Jul', value: 82 }, { label: 'Aug', value: 85 },
  { label: 'Sep', value: 84 }, { label: 'Oct', value: 86 },
  { label: 'Nov', value: 88 }, { label: 'Dec', value: 87 },
];

export const avgWaitingTime = [
  { label: 'Mon', value: 28 }, { label: 'Tue', value: 32 },
  { label: 'Wed', value: 25 }, { label: 'Thu', value: 38 },
  { label: 'Fri', value: 30 }, { label: 'Sat', value: 22 },
  { label: 'Sun', value: 15 },
];

export const delayAnalysis = [
  { cause: 'Traffic Congestion', value: 35 },
  { cause: 'Documentation Issues', value: 22 },
  { cause: 'Dock Unavailability', value: 18 },
  { cause: 'Vehicle Breakdown', value: 12 },
  { cause: 'Weather Conditions', value: 8 },
  { cause: 'Labor Shortage', value: 5 },
];

export const workerProductivity = [
  { name: 'Rajesh M.', value: 95 }, { name: 'Priya G.', value: 88 },
  { name: 'Vikash S.', value: 92 }, { name: 'Meena P.', value: 78 },
  { name: 'Suresh I.', value: 85 }, { name: 'Anita D.', value: 90 },
  { name: 'Rahul V.', value: 82 }, { name: 'Deepa N.', value: 87 },
  { name: 'Arun K.', value: 76 }, { name: 'Sunita S.', value: 91 },
];

export const storageDistribution = [
  { label: 'General Storage', value: 45, color: '#1E3A5F' },
  { label: 'Cold Storage', value: 15, color: '#06B6D4' },
  { label: 'Fragile Goods', value: 10, color: '#D97706' },
  { label: 'Bulk Items', value: 18, color: '#059669' },
  { label: 'Hazardous', value: 5, color: '#DC2626' },
  { label: 'Export', value: 7, color: '#7C3AED' },
];

export const incomingOutgoing = [
  { label: 'Mon', incoming: 12, outgoing: 10 },
  { label: 'Tue', incoming: 15, outgoing: 13 },
  { label: 'Wed', incoming: 10, outgoing: 9 },
  { label: 'Thu', incoming: 18, outgoing: 16 },
  { label: 'Fri', incoming: 14, outgoing: 12 },
  { label: 'Sat', incoming: 8, outgoing: 7 },
  { label: 'Sun', incoming: 5, outgoing: 4 },
];
>>>>>>> 90419a56f07a1c3e5e8232fb608c5213f033379b
