const vehicles = [];
const fuelStations = [];
const expenseCategories = [];
const paymentStatuses = [];
const drivers = [];
const fuelTypes = [];

function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function pick(arr) { return arr[rand(0, arr.length - 1)]; }

function pad(n, len = 3) { return String(n).padStart(len, "0"); }

function fmtDate(month, day) { return `2026-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`; }

const fuelLogs = [];
const expenses = [];

const months = [];
const monthlyFuelCost = [];
const fuelConsumptionTrend = [];
const monthlyOperationalCost = [];
const expenseDistribution = [];

const fuelStats = {
  totalFuelCost: "0",
  monthlyConsumption: "0",
  totalExpenses: "0",
  maintenanceExpenses: "0",
  tollCharges: "0",
  insuranceCost: "0",
  avgFuelEconomy: "0",
  totalDistance: "0",
};

export { vehicles, fuelStations, fuelTypes, expenseCategories, paymentStatuses, drivers, fuelLogs, expenses, months, monthlyFuelCost, fuelConsumptionTrend, monthlyOperationalCost, expenseDistribution, fuelStats };
