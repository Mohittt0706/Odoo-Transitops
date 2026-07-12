function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function pick(arr) { return arr[rand(0, arr.length - 1)]; }
function pad(n, len) { return String(n).padStart(len, "0"); }

const vehicles = [
  { plate: "KL-07-AU-4521", name: "Tata Prima 4040.S" }, { plate: "KA-01-MN-3312", name: "Ashok Leyland 4220" },
  { plate: "TN-09-BC-7890", name: "Eicher Pro 6036" }, { plate: "MH-12-RT-2244", name: "Mahindra Blazo X25" },
  { plate: "DL-03-KP-5567", name: "BharatBenz 2528" }, { plate: "RJ-14-AB-9988", name: "Volvo FH16" },
  { plate: "UP-32-CD-6677", name: "Scania R450" }, { plate: "KL-03-GH-3344", name: "AMW 2523" },
  { plate: "AP-08-EF-4455", name: "Isuzu FVR" }, { plate: "MH-04-XY-7788", name: "Tata LPT 3523" },
];
const drivers = ["Rajesh Kumar","Amit Singh","Suresh Reddy","Vikram Patel","Manish Verma","Rahul Sharma","Deepak Joshi","Nitin Gupta","Arun Nair","Karan Mehta"];
const departments = ["Transport","Logistics","Warehouse","Administration","Maintenance","Dispatch","Safety","Finance"];
const priorities = ["critical","high","medium","low"];
const statuses = ["read","unread"];
const categories = ["maintenance","trip","license","financial","general"];
const mainCats = ["Service Due","Vehicle Inspection","Oil Change","Brake Service","Tyre Replacement","Battery Replacement"];
const tripCats = ["Trip Assigned","Trip Started","Trip Delayed","Route Changed","ETA Updated","Delivery Completed"];
const licenseCats = ["License Expiring","License Expired","Insurance Expiry","Permit Expiry","Registration Due"];
const financialCats = ["Expense Approved","Expense Rejected","Invoice Generated","Invoice Paid","Invoice Overdue","Budget Exceeded"];
const generalCats = ["System Update","New Feature","Policy Change","Task Assigned","Reminder","Announcement"];

const now = new Date();
function dateStr(daysAgo) {
  const d = new Date(now);
  d.setDate(d.getDate() - daysAgo);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1, 2)}-${pad(d.getDate(), 2)}T${pad(d.getHours(), 2)}:${pad(d.getMinutes(), 2)}:${pad(d.getSeconds(), 2)}`;
}

function genNotification(i) {
  const cat = pick(categories);
  const v = pick(vehicles);
  const d = pick(drivers);
  const dept = pick(departments);
  const pri = pick(priorities);
  const daysAgo = rand(0, 60);
  const read = daysAgo > 1 && Math.random() > 0.3;
  const archived = daysAgo > 30 && Math.random() > 0.7;
  const pinned = !archived && Math.random() > 0.85;

  let subcat, title, desc;
  switch (cat) {
    case "maintenance":
      subcat = pick(mainCats);
      title = `${subcat} — ${v.plate}`;
      desc = `${v.name} requires ${subcat.toLowerCase()}. Scheduled maintenance is overdue.`;
      break;
    case "trip":
      subcat = pick(tripCats);
      title = `${subcat} — ${d}`;
      desc = pick(["Trip has been assigned and is ready.","The vehicle is en route.","Delivery has been completed successfully.","Route has been changed due to traffic.","ETA has been updated by dispatch."]);
      break;
    case "license":
      subcat = pick(licenseCats);
      title = `${subcat} — ${d}`;
      desc = pick(["License is expiring soon. Please renew.","License has expired. Vehicle grounded.","Insurance policy needs renewal.","Permit is due for renewal.","Registration is expiring."]);
      break;
    case "financial":
      subcat = pick(financialCats);
      title = `${subcat} — ${v.plate}`;
      desc = pick(["An expense report has been approved.","Invoice has been generated for the trip.","Payment has been received.","Invoice payment is overdue.","Budget limit has been exceeded."]);
      break;
    default:
      subcat = pick(generalCats);
      title = subcat;
      desc = pick(["A new system update is available.","A new feature has been added.","Company policy has been updated.","You have been assigned a new task.","This is a reminder for pending items."]);
  }

  return {
    id: `NOT-${pad(i + 1, 3)}`,
    title,
    description: desc,
    category: cat,
    subcategory: subcat,
    priority: pri,
    sender: pick(["System","Dispatch","Admin","Finance Dept","Safety Dept","Fleet Manager","HR"]),
    date: dateStr(daysAgo),
    read,
    archived,
    pinned,
    vehicle: v.plate,
    vehicleName: v.name,
    driver: d,
    trip: cat === "trip" || Math.random() > 0.7 ? `TR-${pad(rand(1, 99), 4)}` : null,
    department: dept,
  };
}

const allNotifications = Array.from({ length: 150 }, (_, i) => genNotification(i))
  .sort((a, b) => new Date(b.date) - new Date(a.date));

const maintenanceAlerts = allNotifications.filter((n) => n.category === "maintenance");
const tripAlerts = allNotifications.filter((n) => n.category === "trip");
const licenseAlerts = allNotifications.filter((n) => n.category === "license");
const financialAlerts = allNotifications.filter((n) => n.category === "financial");

const notificationStats = {
  total: allNotifications.length,
  unread: allNotifications.filter((n) => !n.read).length,
  critical: allNotifications.filter((n) => n.priority === "critical").length,
  trip: tripAlerts.length,
  maintenance: maintenanceAlerts.length,
  financial: financialAlerts.length,
  license: licenseAlerts.length,
  archived: allNotifications.filter((n) => n.archived).length,
};

const monthlyTrend = [
  { label: "Jan", value: 95 }, { label: "Feb", value: 112 }, { label: "Mar", value: 88 },
  { label: "Apr", value: 130 }, { label: "May", value: 105 }, { label: "Jun", value: 150 },
  { label: "Jul", value: 125 },
];

export { allNotifications, maintenanceAlerts, tripAlerts, licenseAlerts, financialAlerts, notificationStats, monthlyTrend, vehicles, drivers };

