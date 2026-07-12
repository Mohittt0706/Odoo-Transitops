const BASE = 'http://localhost:5000/api';
let passed = 0, failed = 0, fixed = 0;
const issues = [];

const R = {
  OL: 'OPERATION_LEAD', RC: 'ROAD_CAPTAIN', SO: 'SAFETY_OFFICER',
  FH: 'FINANCE_HUB', DC: 'DESTINATION_CONTROL'
};

const roles = [R.OL, R.RC, R.SO, R.FH, R.DC];
const tokens = {};
let vehicleId, driverId, receiverId, tripId, maintId, fuelId, expenseId, notifId;

const req = async (path, method = 'GET', body = null, token = null) => {
  const opts = { method, headers: { 'Content-Type': 'application/json' } };
  if (body) opts.body = JSON.stringify(body);
  if (token) opts.headers['Authorization'] = `Bearer ${token}`;
  let res;
  try {
    res = await fetch(`${BASE}${path}`, opts);
  } catch (e) {
    return { status: 0, ok: false, data: { message: e.message } };
  }
  let data;
  try { data = await res.json(); } catch { data = {}; }
  return { status: res.status, ok: res.ok, data };
};

const assert = (cond, msg) => {
  if (cond) { passed++; return true; }
  failed++;
  console.error(`    ❌ ${msg}`);
  issues.push(msg);
  return false;
};

const assertSt = (actual, expected, desc) => {
  return assert(actual === expected, `${desc}: expected ${expected}, got ${actual}`);
};

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {

console.log('\n========== FLEETPILOT COMPREHENSIVE BACKEND VERIFICATION ==========\n');

// ===== SETUP =====
console.log('--- SETUP: Register users for all roles ---');
const ts = Date.now();
const userData = {};
for (const role of roles) {
  const email = `test.${role.toLowerCase()}.${ts}@test.com`;
  const pwd = 'Test123!';
  let r = await req('/auth/register', 'POST', { fullName: `Test ${role}`, email, password: pwd, role });
  if (r.status === 201) {
    tokens[role] = r.data.token;
    userData[role] = { email, password: pwd, userId: r.data.user?._id };
    console.log(`  ✅ ${role} registered`);
  } else {
    r = await req('/auth/login', 'POST', { email, password: pwd });
    if (r.status === 200) {
      tokens[role] = r.data.token;
      userData[role] = { email, password: pwd };
      console.log(`  ✅ ${role} logged in`);
    } else {
      console.log(`  ❌ Cannot get token for ${role}`);
      failed++;
    }
  }
}
const OL = tokens[R.OL];
const RC = tokens[R.RC];
const SO = tokens[R.SO];
const FH = tokens[R.FH];
const DC = tokens[R.DC];

// =====================================================================
// 1. AUTHENTICATION
// =====================================================================
console.log('\n═══ 1. AUTHENTICATION ═══');
console.log('  --- Register ---');
let r = await req('/auth/register', 'POST', { fullName: 'Dup', email: `test.dup.${ts}@test.com`, password: 'Test123!', role: R.OL });
r = await req('/auth/register', 'POST', { fullName: 'Dup', email: `test.dup.${ts}@test.com`, password: 'Test123!', role: R.OL });
assertSt(r.status, 409, 'Register duplicate email returns 409');

console.log('  --- Login ---');
r = await req('/auth/login', 'POST', { email: userData[R.OL].email, password: userData[R.OL].password });
assertSt(r.status, 200, 'Login valid credentials');
r = await req('/auth/login', 'POST', { email: userData[R.OL].email, password: 'wrong' });
assertSt(r.status, 401, 'Login invalid password returns 401');
r = await req('/auth/login', 'POST', { email: 'nonexistent@test.com', password: 'Test123!' });
assertSt(r.status, 401, 'Login nonexistent email returns 401');

console.log('  --- Profile ---');
r = await req('/auth/profile', 'GET', null, OL);
assertSt(r.status, 200, 'Profile with valid token');
r = await req('/auth/profile');
assertSt(r.status, 401, 'Profile without token');

console.log('  --- Validation ---');
r = await req('/auth/register', 'POST', { email: 'x@x.com', password: '123456', role: R.OL });
assertSt(r.status, 400, 'Register missing name returns 400');
r = await req('/auth/login', 'POST', { password: '123' });
assertSt(r.status, 400, 'Login missing email returns 400');

// =====================================================================
// 2. AUTHORIZATION
// =====================================================================
console.log('\n═══ 2. AUTHORIZATION ═══');
console.log('  --- Vehicles ---');
r = await req('/vehicles', 'POST', { registrationNumber: `AUTH${ts}`, vehicleName: 'AuthTest', vehicleType: 'Truck', maxLoadCapacity: 1000, acquisitionCost: 50000 }, RC);
assertSt(r.status, 403, 'RC cannot create vehicle');
r = await req('/vehicles/000000000000000000000000', 'DELETE', null, RC);
assertSt(r.status, 403, 'RC cannot delete vehicle');
r = await req('/vehicles/000000000000000000000000', 'PUT', { vehicleName: 'x' }, RC);
assertSt(r.status, 403, 'RC cannot update vehicle');

console.log('  --- Drivers ---');
r = await req('/drivers', 'POST', {}, RC);
assertSt(r.status, 403, 'RC cannot create driver');
r = await req('/drivers/000000000000000000000000', 'DELETE', null, RC);
assertSt(r.status, 403, 'RC cannot delete driver');

console.log('  --- Trips ---');
r = await req('/trips/000000000000000000000000/dispatch', 'POST', null, RC);
assertSt(r.status, 403, 'RC cannot dispatch trip');
r = await req('/trips', 'POST', {}, DC);
assertSt(r.status, 403, 'DC cannot create trip');
r = await req('/trips/000000000000000000000000', 'DELETE', null, DC);
assertSt(r.status, 403, 'DC cannot delete trip');

console.log('  --- Fuel ---');
r = await req('/fuel', 'POST', {}, SO);
assertSt(r.status, 403, 'SO cannot create fuel log');

console.log('  --- Expenses ---');
r = await req('/expenses', 'POST', {}, SO);
assertSt(r.status, 403, 'SO cannot create expense');

console.log('  --- Reports ---');
r = await req('/reports/overview', 'GET', null, RC);
assertSt(r.status, 403, 'RC cannot access overview');
r = await req('/reports/fleet', 'GET', null, RC);
assertSt(r.status, 403, 'RC cannot access fleet');
r = await req('/reports/finance', 'GET', null, SO);
assertSt(r.status, 403, 'SO cannot access finance');
r = await req('/reports/drivers', 'GET', null, RC);
assertSt(r.status, 403, 'RC cannot access drivers report');
r = await req('/reports/maintenance', 'GET', null, RC);
assertSt(r.status, 403, 'RC cannot access maintenance report');

console.log('  --- Confirm Delivery ---');
r = await req('/trips/000000000000000000000000/confirm-delivery', 'PATCH', {}, RC);
assertSt(r.status, 403, 'RC cannot confirm delivery');

// =====================================================================
// 3. VEHICLES
// =====================================================================
console.log('\n═══ 3. VEHICLES ═══');
console.log('  --- Create ---');
r = await req('/vehicles', 'POST', { registrationNumber: `TRK${ts}`, vehicleName: 'Test Truck', vehicleType: 'Truck', maxLoadCapacity: 5000, odometer: 12000, acquisitionCost: 75000 }, OL);
assertSt(r.status, 201, 'Create vehicle');
vehicleId = r.data.vehicle?._id;
assert(!!vehicleId, 'Vehicle has _id');

r = await req('/vehicles', 'POST', { registrationNumber: `TRK${ts}`, vehicleName: 'Test Truck', vehicleType: 'Truck', maxLoadCapacity: 5000, acquisitionCost: 75000 }, OL);
assertSt(r.status, 409, 'Duplicate registration returns 409');

r = await req('/vehicles', 'POST', { vehicleName: 'NoReg' }, OL);
assertSt(r.status, 400, 'Missing registration returns 400');

console.log('  --- Read ---');
r = await req('/vehicles', 'GET', null, RC);
assertSt(r.status, 200, 'Get all vehicles (RC can view)');
assert(Array.isArray(r.data.vehicles), 'Vehicles is array');

r = await req(`/vehicles/${vehicleId}`, 'GET', null, OL);
assertSt(r.status, 200, 'Get vehicle by ID');
r = await req('/vehicles/000000000000000000000000', 'GET', null, OL);
assertSt(r.status, 404, 'Get non-existent returns 404');

console.log('  --- Update ---');
r = await req(`/vehicles/${vehicleId}`, 'PUT', { vehicleName: 'Updated Truck' }, OL);
assertSt(r.status, 200, 'Update vehicle');
r = await req('/vehicles/000000000000000000000000', 'PUT', { vehicleName: 'x' }, OL);
assertSt(r.status, 404, 'Update non-existent returns 404');
const vReg2 = `TRK2${ts}`;
await req('/vehicles', 'POST', { registrationNumber: vReg2, vehicleName: 'Truck 2', vehicleType: 'Truck', maxLoadCapacity: 3000, acquisitionCost: 50000 }, OL);
r = await req(`/vehicles/${vehicleId}`, 'PUT', { registrationNumber: vReg2 }, OL);
assertSt(r.status, 409, 'Update to duplicate registration returns 409');

console.log('  --- Soft Delete ---');
r = await req(`/vehicles/${vehicleId}`, 'DELETE', null, OL);
assertSt(r.status, 200, 'Delete vehicle (soft)');
r = await req(`/vehicles/${vehicleId}`, 'GET', null, OL);
assertSt(r.status, 404, 'Soft-deleted vehicle returns 404');

console.log('  --- Search/Filter/Sort/Pagination ---');
r = await req('/vehicles', 'POST', { registrationNumber: `TRK3${ts}`, vehicleName: 'Fresh Truck', vehicleType: 'Truck', maxLoadCapacity: 4000, acquisitionCost: 60000 }, OL);
vehicleId = r.data.vehicle?._id;

r = await req('/vehicles?search=Fresh', 'GET', null, OL);
assertSt(r.status, 200, 'Search vehicles');
assert(r.data.vehicles.length > 0, 'Search returns results');

r = await req('/vehicles?status=AVAILABLE', 'GET', null, OL);
assertSt(r.status, 200, 'Filter by status');
r = await req('/vehicles?vehicleType=Truck', 'GET', null, OL);
assertSt(r.status, 200, 'Filter by type');
r = await req('/vehicles?sort=vehicleName', 'GET', null, OL);
assertSt(r.status, 200, 'Sort by name');
r = await req('/vehicles?page=1&limit=5', 'GET', null, OL);
assertSt(r.status, 200, 'Pagination');
assert(r.data.pagination?.page === 1, 'Page is 1');
assert(r.data.pagination?.limit === 5, 'Limit is 5');

// =====================================================================
// 4. DRIVERS
// =====================================================================
console.log('\n═══ 4. DRIVERS ═══');
console.log('  --- Create ---');
const futureDate = new Date(Date.now() + 365 * 86400000).toISOString();
r = await req('/drivers', 'POST', { fullName: 'Test Driver', licenseNumber: `DL${ts}`, licenseCategory: 'Class A', licenseExpiry: futureDate, contactNumber: '9999999999', safetyScore: 85 }, OL);
assertSt(r.status, 201, 'Create driver');
driverId = r.data.driver?._id;
assert(!!driverId, 'Driver has _id');

r = await req('/drivers', 'POST', { fullName: 'Test Driver', licenseNumber: `DL${ts}`, licenseCategory: 'Class A', licenseExpiry: futureDate, contactNumber: '9999999999' }, OL);
assertSt(r.status, 409, 'Duplicate license returns 409');
r = await req('/drivers', 'POST', { fullName: 'Bad', licenseNumber: `BL${ts}`, licenseCategory: 'A', licenseExpiry: new Date(Date.now() - 1 * 86400000).toISOString(), contactNumber: '8888888888' }, OL);
assertSt(r.status, 400, 'Expired license returns 400');
r = await req('/drivers', 'POST', { fullName: 'NoLicense' }, OL);
assertSt(r.status, 400, 'Missing license returns 400');

console.log('  --- Read ---');
r = await req('/drivers', 'GET', null, RC);
assertSt(r.status, 200, 'Get all drivers');
assert(Array.isArray(r.data.drivers), 'Drivers is array');
r = await req(`/drivers/${driverId}`, 'GET', null, OL);
assertSt(r.status, 200, 'Get driver by ID');
r = await req('/drivers/000000000000000000000000', 'GET', null, OL);
assertSt(r.status, 404, 'Get non-existent returns 404');

console.log('  --- Update ---');
r = await req(`/drivers/${driverId}`, 'PUT', { safetyScore: 90 }, OL);
assertSt(r.status, 200, 'Update driver');

console.log('  --- Search/Filter ---');
r = await req('/drivers?search=Test', 'GET', null, OL);
assertSt(r.status, 200, 'Search drivers');
assert(r.data.drivers.length > 0, 'Search returns results');
r = await req('/drivers?status=AVAILABLE', 'GET', null, OL);
assertSt(r.status, 200, 'Filter by status');
r = await req('/drivers?page=1&limit=5', 'GET', null, OL);
assertSt(r.status, 200, 'Pagination');

console.log('  --- Soft Delete ---');
r = await req(`/drivers/${driverId}`, 'DELETE', null, OL);
assertSt(r.status, 200, 'Delete driver (soft)');
r = await req(`/drivers/${driverId}`, 'GET', null, OL);
assertSt(r.status, 404, 'Soft-deleted driver returns 404');

console.log('  --- Fresh driver for trips ---');
r = await req('/drivers', 'POST', { fullName: 'Trip Driver', licenseNumber: `TD${ts}`, licenseCategory: 'Class A', licenseExpiry: futureDate, contactNumber: '7777777777', safetyScore: 95 }, OL);
driverId = r.data.driver?._id;

// =====================================================================
// 5. RECEIVERS
// =====================================================================
console.log('\n═══ 5. RECEIVERS ═══');
console.log('  --- Create ---');
r = await req('/receivers', 'POST', { fullName: 'Test Receiver', company: 'Test Corp', email: `receiver${ts}@test.com`, contactNumber: '8888888888', address: '123 Test St' }, OL);
assertSt(r.status, 201, 'Create receiver');
receiverId = r.data.receiver?._id;
assert(!!receiverId, 'Receiver has _id');

r = await req('/receivers', 'POST', { fullName: 'NoEmail' }, OL);
assertSt(r.status, 400, 'Missing email returns 400');

console.log('  --- Read ---');
r = await req('/receivers', 'GET', null, RC);
assertSt(r.status, 200, 'Get all receivers');
assert(Array.isArray(r.data.receivers), 'Receivers is array');
r = await req(`/receivers/${receiverId}`, 'GET', null, OL);
assertSt(r.status, 200, 'Get receiver by ID');
r = await req('/receivers/000000000000000000000000', 'GET', null, OL);
assertSt(r.status, 404, 'Get non-existent returns 404');

console.log('  --- Update ---');
r = await req(`/receivers/${receiverId}`, 'PUT', { company: 'Updated Corp' }, OL);
assertSt(r.status, 200, 'Update receiver');

console.log('  --- Search ---');
r = await req('/receivers?search=Test', 'GET', null, OL);
assertSt(r.status, 200, 'Search receivers');
r = await req('/receivers?page=1&limit=5', 'GET', null, OL);
assertSt(r.status, 200, 'Pagination');

console.log('  --- Hard Delete ---');
r = await req(`/receivers/${receiverId}`, 'DELETE', null, OL);
assertSt(r.status, 200, 'Delete receiver');
r = await req(`/receivers/${receiverId}`, 'GET', null, OL);
assertSt(r.status, 404, 'Deleted receiver returns 404');

console.log('  --- Fresh receiver for trips ---');
r = await req('/receivers', 'POST', { fullName: 'Trip Receiver', company: 'Trip Corp', email: `triprec${ts}@test.com`, contactNumber: '7777777777', address: '456 Trip Ave' }, OL);
receiverId = r.data.receiver?._id;

// =====================================================================
// 6. TRIPS - Full Lifecycle + Business Rules
// =====================================================================
console.log('\n═══ 6. TRIPS ═══');
console.log('  --- Create ---');
r = await req('/trips', 'POST', { source: 'Mumbai', destination: 'Delhi', cargoWeight: 2000, plannedDistance: 1400, vehicleId, driverId, receiverId }, OL);
assertSt(r.status, 201, 'Create trip');
tripId = r.data.trip?._id;
assert(!!tripId, 'Trip has _id');

r = await req('/trips', 'POST', { source: 'NoVeh' }, OL);
assertSt(r.status, 400, 'Missing fields returns 400');

console.log('  --- Read ---');
r = await req('/trips', 'GET', null, RC);
assertSt(r.status, 200, 'Get all trips');
assert(Array.isArray(r.data.trips), 'Trips is array');
r = await req(`/trips/${tripId}`, 'GET', null, OL);
assertSt(r.status, 200, 'Get trip by ID');
r = await req('/trips/000000000000000000000000', 'GET', null, OL);
assertSt(r.status, 404, 'Get non-existent returns 404');

console.log('  --- Search/Filter ---');
r = await req('/trips?search=Mumbai', 'GET', null, OL);
assertSt(r.status, 200, 'Search trips');
r = await req('/trips?status=DRAFT', 'GET', null, OL);
assertSt(r.status, 200, 'Filter by status');
r = await req(`/trips?vehicleId=${vehicleId}`, 'GET', null, OL);
assertSt(r.status, 200, 'Filter by vehicle');

console.log('  --- Dispatch ---');
r = await req(`/trips/${tripId}/dispatch`, 'POST', null, OL);
assertSt(r.status, 200, 'Dispatch trip');
r = await req(`/trips/${tripId}/dispatch`, 'POST', null, OL);
assertSt(r.status, 400, 'Re-dispatch fails: not DRAFT');

console.log('  --- Confirm Delivery ---');
r = await req(`/trips/${tripId}/confirm-delivery`, 'PATCH', { receiverRemarks: 'Received OK', receiverSignature: 'TestSig' }, DC);
assertSt(r.status, 200, 'Confirm delivery as DC');
r = await req(`/trips/${tripId}`, 'GET', null, OL);
assert(r.data.trip?.status === 'COMPLETED', `Trip status is COMPLETED, got ${r.data.trip?.status}`);

console.log('  --- Second trip: Complete ---');
r = await req('/trips', 'POST', { source: 'Pune', destination: 'Goa', cargoWeight: 1000, plannedDistance: 500, vehicleId, driverId, receiverId }, OL);
tripId = r.data.trip?._id;
r = await req(`/trips/${tripId}/dispatch`, 'POST', null, OL);
assertSt(r.status, 200, 'Dispatch second trip');
r = await req(`/trips/${tripId}/complete`, 'POST', { actualDistance: 520 }, RC);
assertSt(r.status, 200, 'Complete trip (RC)');
r = await req(`/trips/${tripId}`, 'GET', null, OL);
assert(r.data.trip?.status === 'COMPLETED', `Status is COMPLETED, got ${r.data.trip?.status}`);
assert(r.data.trip?.actualDistance === 520, 'Actual distance recorded');

console.log('  --- Third trip: Cancel ---');
r = await req('/trips', 'POST', { source: 'Chennai', destination: 'Bangalore', cargoWeight: 800, plannedDistance: 350, vehicleId, driverId, receiverId }, OL);
tripId = r.data.trip?._id;
r = await req(`/trips/${tripId}/dispatch`, 'POST', null, OL);
assertSt(r.status, 200, 'Dispatch third trip');
r = await req(`/trips/${tripId}/cancel`, 'POST', null, OL);
assertSt(r.status, 200, 'Cancel trip');
r = await req(`/trips/${tripId}`, 'GET', null, OL);
assert(r.data.trip?.status === 'CANCELLED', `Status is CANCELLED, got ${r.data.trip?.status}`);
r = await req(`/trips/${tripId}/cancel`, 'POST', null, OL);
assertSt(r.status, 400, 'Re-cancel fails: already cancelled');

console.log('  --- Business Rules ---');
r = await req('/trips', 'POST', { source: 'A', destination: 'B', cargoWeight: 100, plannedDistance: 100, vehicleId, driverId, receiverId }, OL);
const draftId = r.data.trip?._id;
r = await req(`/trips/${draftId}/complete`, 'POST', { actualDistance: 100 }, RC);
assertSt(r.status, 400, 'Complete DRAFT trip fails');
r = await req(`/trips/${draftId}/confirm-delivery`, 'PATCH', {}, DC);
assertSt(r.status, 400, 'Confirm delivery on DRAFT fails');

console.log('  --- Soft Delete ---');
r = await req(`/trips/${draftId}`, 'DELETE', null, OL);
assertSt(r.status, 200, 'Delete trip (soft)');
r = await req(`/trips/${draftId}`, 'GET', null, OL);
assertSt(r.status, 404, 'Soft-deleted trip returns 404');

// =====================================================================
// 7. MAINTENANCE
// =====================================================================
console.log('\n═══ 7. MAINTENANCE ═══');
console.log('  --- Create ---');
r = await req('/maintenance', 'POST', { vehicleId, issue: 'Engine noise', description: 'Strange noise from engine', cost: 15000, maintenanceDate: new Date().toISOString(), technicianName: 'Mech Pro' }, OL);
assertSt(r.status, 201, 'Create maintenance');
maintId = r.data.record?._id || r.data.maintenance?._id || r.data._id;
assert(!!maintId, 'Maintenance has _id');

r = await req('/maintenance', 'POST', { vehicleId: 'x' }, OL);
assertSt(r.status, 400, 'Missing fields returns 400');

console.log('  --- Read ---');
r = await req('/maintenance', 'GET', null, RC);
assertSt(r.status, 200, 'Get all maintenance');
assert(Array.isArray(r.data.records || r.data.maintenance), 'Maintenance is array');
r = await req(`/maintenance/${maintId}`, 'GET', null, OL);
assertSt(r.status, 200, 'Get by ID');
r = await req('/maintenance/000000000000000000000000', 'GET', null, OL);
assertSt(r.status, 404, 'Get non-existent returns 404');

console.log('  --- Update ---');
r = await req(`/maintenance/${maintId}`, 'PUT', { status: 'IN_PROGRESS' }, OL);
assertSt(r.status, 200, 'Update maintenance');

console.log('  --- Search/Filter ---');
r = await req('/maintenance?search=Engine', 'GET', null, OL);
assertSt(r.status, 200, 'Search');
r = await req(`/maintenance?vehicleId=${vehicleId}`, 'GET', null, OL);
assertSt(r.status, 200, 'Filter by vehicle');

console.log('  --- Delete ---');
r = await req(`/maintenance/${maintId}`, 'DELETE', null, OL);
assertSt(r.status, 200, 'Delete maintenance');
r = await req(`/maintenance/${maintId}`, 'GET', null, OL);
assertSt(r.status, 404, 'Deleted returns 404');

// =====================================================================
// 8. FUEL
// =====================================================================
console.log('\n═══ 8. FUEL ═══');
console.log('  --- Create ---');
r = await req('/fuel', 'POST', { vehicleId, liters: 50, cost: 5000, fuelStation: 'Indian Oil', odometerReading: 15000, date: new Date().toISOString() }, OL);
assertSt(r.status, 201, 'Create fuel log');
fuelId = r.data.fuelLog?._id;
assert(!!fuelId, 'Fuel has _id');

r = await req('/fuel', 'POST', { vehicleId: 'x' }, OL);
assertSt(r.status, 400, 'Missing fields returns 400');

console.log('  --- Read ---');
r = await req('/fuel', 'GET', null, RC);
assertSt(r.status, 200, 'Get all fuel logs');
assert(Array.isArray(r.data.fuelLogs), 'Fuel is array');
r = await req(`/fuel/${fuelId}`, 'GET', null, OL);
assertSt(r.status, 200, 'Get by ID');
r = await req('/fuel/000000000000000000000000', 'GET', null, OL);
assertSt(r.status, 404, 'Get non-existent returns 404');

console.log('  --- Vehicle Summary ---');
r = await req(`/fuel/summary/vehicle/${vehicleId}`, 'GET', null, OL);
assert(r.status === 200, `Fuel vehicle summary: ${r.status}`);
if (r.status === 200) assert(r.data.summary !== undefined, 'Summary has data');

console.log('  --- Update ---');
r = await req(`/fuel/${fuelId}`, 'PUT', { liters: 60 }, OL);
assertSt(r.status, 200, 'Update fuel');

console.log('  --- Delete ---');
r = await req(`/fuel/${fuelId}`, 'DELETE', null, OL);
assertSt(r.status, 200, 'Delete fuel');

// =====================================================================
// 9. EXPENSES
// =====================================================================
console.log('\n═══ 9. EXPENSES ═══');
console.log('  --- Create ---');
r = await req('/expenses', 'POST', { vehicleId, type: 'Toll', amount: 500, description: 'Highway toll', date: new Date().toISOString() }, OL);
assertSt(r.status, 201, 'Create expense');
expenseId = r.data.expense?._id || r.data.record?._id || r.data._id;
assert(!!expenseId, 'Expense has _id');

r = await req('/expenses', 'POST', { amount: -1 }, OL);
assertSt(r.status, 400, 'Negative amount returns 400');

console.log('  --- Read ---');
r = await req('/expenses', 'GET', null, RC);
assertSt(r.status, 200, 'Get all expenses');
assert(Array.isArray(r.data.records || r.data.expenses), 'Expenses is array');
r = await req(`/expenses/${expenseId}`, 'GET', null, OL);
assertSt(r.status, 200, 'Get by ID');
r = await req('/expenses/000000000000000000000000', 'GET', null, OL);
assertSt(r.status, 404, 'Get non-existent returns 404');

console.log('  --- Vehicle Summary ---');
r = await req(`/expenses/summary/vehicle/${vehicleId}`, 'GET', null, OL);
assert(r.status === 200, `Expense vehicle summary: ${r.status}`);

console.log('  --- Update ---');
r = await req(`/expenses/${expenseId}`, 'PUT', { amount: 600 }, OL);
assertSt(r.status, 200, 'Update expense');

console.log('  --- Delete ---');
r = await req(`/expenses/${expenseId}`, 'DELETE', null, OL);
assertSt(r.status, 200, 'Delete expense');

// =====================================================================
// 10. DASHBOARD
// =====================================================================
console.log('\n═══ 10. DASHBOARD ═══');
r = await req('/dashboard', 'GET', null, OL);
assertSt(r.status, 200, 'Dashboard for OL');
r = await req('/dashboard', 'GET', null, RC);
assertSt(r.status, 200, 'Dashboard for RC');
r = await req('/dashboard', 'GET', null, SO);
assertSt(r.status, 200, 'Dashboard for SO');
r = await req('/dashboard', 'GET', null, FH);
assertSt(r.status, 200, 'Dashboard for FH');
r = await req('/dashboard', 'GET', null, DC);
assertSt(r.status, 200, 'Dashboard for DC');
r = await req('/dashboard');
assertSt(r.status, 401, 'Dashboard without token');

// =====================================================================
// 11. REPORTS
// =====================================================================
console.log('\n═══ 11. REPORTS ═══');
r = await req('/reports/overview', 'GET', null, OL);
assertSt(r.status, 200, 'Overview report');
r = await req('/reports/fleet', 'GET', null, OL);
assertSt(r.status, 200, 'Fleet report');
r = await req('/reports/trips', 'GET', null, OL);
assertSt(r.status, 200, 'Trips report');
r = await req('/reports/trips', 'GET', null, RC);
assertSt(r.status, 200, 'Trips report for RC');
r = await req('/reports/drivers', 'GET', null, OL);
assertSt(r.status, 200, 'Drivers report');
r = await req('/reports/drivers', 'GET', null, SO);
assertSt(r.status, 200, 'Drivers report for SO');
r = await req('/reports/finance', 'GET', null, OL);
assertSt(r.status, 200, 'Finance report');
r = await req('/reports/finance', 'GET', null, FH);
assertSt(r.status, 200, 'Finance report for FH');
r = await req('/reports/maintenance', 'GET', null, OL);
assertSt(r.status, 200, 'Maintenance report');

// =====================================================================
// 12. NOTIFICATIONS
// =====================================================================
console.log('\n═══ 12. NOTIFICATIONS ═══');
console.log('  --- Create ---');
r = await req('/notifications', 'POST', { userId: userData[R.OL].userId, title: 'Test', message: 'Test notification' }, OL);
assertSt(r.status, 201, 'Create notification');
notifId = r.data.notification?._id;
assert(!!notifId, 'Notification has _id');

console.log('  --- Read ---');
r = await req('/notifications', 'GET', null, OL);
assertSt(r.status, 200, 'Get notifications');
assert(Array.isArray(r.data.notifications), 'Notifications is array');

console.log('  --- Mark Read ---');
r = await req(`/notifications/${notifId}/read`, 'PATCH', null, OL);
assertSt(r.status, 200, 'Mark as read');

console.log('  --- Delete ---');
r = await req(`/notifications/${notifId}`, 'DELETE', null, OL);
assertSt(r.status, 200, 'Delete notification');

// =====================================================================
// 13. ERROR HANDLING
// =====================================================================
console.log('\n═══ 13. ERROR HANDLING ═══');
console.log('  --- 404 Not Found ---');
r = await req('/vehicles/000000000000000000000000', 'GET', null, OL);
assertSt(r.status, 404, 'Vehicle 404');
r = await req('/drivers/000000000000000000000000', 'GET', null, OL);
assertSt(r.status, 404, 'Driver 404');
r = await req('/receivers/000000000000000000000000', 'GET', null, OL);
assertSt(r.status, 404, 'Receiver 404');
r = await req('/trips/000000000000000000000000', 'GET', null, OL);
assertSt(r.status, 404, 'Trip 404');
r = await req('/maintenance/000000000000000000000000', 'GET', null, OL);
assertSt(r.status, 404, 'Maintenance 404');

console.log('  --- 401 Unauthorized (no token) ---');
r = await req('/vehicles');
assertSt(r.status, 401, 'Vehicles no token');
r = await req('/drivers');
assertSt(r.status, 401, 'Drivers no token');
r = await req('/trips');
assertSt(r.status, 401, 'Trips no token');
r = await req('/fuel');
assertSt(r.status, 401, 'Fuel no token');
r = await req('/expenses');
assertSt(r.status, 401, 'Expenses no token');
r = await req('/maintenance');
assertSt(r.status, 401, 'Maintenance no token');
r = await req('/receivers');
assertSt(r.status, 401, 'Receivers no token');
r = await req('/dashboard');
assertSt(r.status, 401, 'Dashboard no token');
r = await req('/reports/overview');
assertSt(r.status, 401, 'Reports no token');
r = await req('/notifications');
assertSt(r.status, 401, 'Notifications no token');

console.log('  --- 401 Invalid Token ---');
r = await req('/vehicles', 'GET', null, 'invalidtoken');
assertSt(r.status, 401, 'Invalid token returns 401');

// =====================================================================
// SUMMARY
// =====================================================================
console.log('\n\n========== VERIFICATION COMPLETE ==========');
console.log(`\n✅ Total APIs Tested: ${passed + failed}`);
console.log(`✅ Passed: ${passed}`);
console.log(`❌ Failed: ${failed}`);
console.log(`🔧 Fixed: ${fixed}`);
if (issues.length > 0) {
  console.log(`\n⚠️  Remaining Issues (${issues.length}):`);
  issues.forEach((i, idx) => console.log(`  ${idx + 1}. ${i}`));
} else {
  console.log('\n✅ Remaining Issues: 0');
}
console.log('\n==========================================\n');
if (failed > 0) process.exit(1);

})();
