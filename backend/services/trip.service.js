const Trip = require('../models/Trip');
const Vehicle = require('../models/Vehicle');
const Driver = require('../models/Driver');
const Receiver = require('../models/Receiver');
const { VEHICLE_STATUS } = require('../constants/vehicleStatus');
const { DRIVER_STATUS } = require('../constants/driverStatus');
const { TRIP_STATUS } = require('../constants/tripStatus');

const throwErr = (msg, code) => {
  const err = new Error(msg);
  err.statusCode = code;
  throw err;
};

const validateReferences = async (vehicleId, driverId, receiverId, cargoWeight, skipVehicleCheck) => {
  const vehicle = await Vehicle.findOne({ _id: vehicleId, isActive: true });
  if (!vehicle) throwErr('Vehicle not found', 404);

  const driver = await Driver.findOne({ _id: driverId, isActive: { $ne: false } });
  if (!driver) throwErr('Driver not found', 404);

  const receiver = await Receiver.findById(receiverId);
  if (!receiver) throwErr('Receiver not found', 404);

  if (!skipVehicleCheck && cargoWeight != null && cargoWeight > vehicle.maxLoadCapacity) {
    throwErr(
      `Cargo weight (${cargoWeight}) exceeds vehicle max load capacity (${vehicle.maxLoadCapacity})`,
      400
    );
  }

  return { vehicle, driver, receiver };
};

const create = async (data) => {
  const { vehicle, driver } = await validateReferences(
    data.vehicleId,
    data.driverId,
    data.receiverId,
    data.cargoWeight,
    false
  );

  if (driver.status === DRIVER_STATUS.SUSPENDED) {
    throwErr('Driver status is SUSPENDED. Cannot create trip', 400);
  }

  if (driver.licenseExpiry && new Date(driver.licenseExpiry) < new Date()) {
    throwErr('Driver license has expired', 400);
  }

  const trip = await Trip.create({
    source: data.source,
    destination: data.destination,
    cargoWeight: data.cargoWeight,
    plannedDistance: data.plannedDistance,
    vehicleId: data.vehicleId,
    driverId: data.driverId,
    receiverId: data.receiverId,
    status: TRIP_STATUS.DRAFT,
  });

  return trip;
};

const getAll = async (query) => {
  const filter = { isActive: true };

  if (query.search) {
    const regex = new RegExp(query.search, 'i');
    filter.$or = [{ source: regex }, { destination: regex }];
  }

  if (query.status) filter.status = query.status;
  if (query.driverId) filter.driverId = query.driverId;
  if (query.vehicleId) filter.vehicleId = query.vehicleId;

  if (query.dateFrom || query.dateTo) {
    filter.createdAt = {};
    if (query.dateFrom) filter.createdAt.$gte = new Date(query.dateFrom);
    if (query.dateTo) filter.createdAt.$lte = new Date(query.dateTo);
  }

  let sortObj = {};
  if (query.sort === 'oldest') sortObj.createdAt = 1;
  else if (query.sort === 'source') sortObj.source = 1;
  else if (query.sort === 'destination') sortObj.destination = 1;
  else sortObj.createdAt = -1;

  const page = parseInt(query.page, 10) || 1;
  const limit = parseInt(query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const [trips, total] = await Promise.all([
    Trip.find(filter)
      .populate('vehicleId', 'registrationNumber vehicleName vehicleType')
      .populate('driverId', 'fullName licenseNumber')
      .populate('receiverId', 'fullName company')
      .sort(sortObj)
      .skip(skip)
      .limit(limit),
    Trip.countDocuments(filter),
  ]);

  return {
    trips,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  };
};

const getById = async (id) => {
  const trip = await Trip.findOne({ _id: id, isActive: true })
    .populate('vehicleId', 'registrationNumber vehicleName vehicleType maxLoadCapacity status')
    .populate('driverId', 'fullName licenseNumber licenseCategory status')
    .populate('receiverId', 'fullName company contactNumber');
  if (!trip) throwErr('Trip not found', 404);
  return trip;
};

const update = async (id, data) => {
  const trip = await Trip.findOne({ _id: id, isActive: true });
  if (!trip) throwErr('Trip not found', 404);

  if (trip.status !== TRIP_STATUS.DRAFT) {
    throwErr('Only DRAFT trips can be edited', 400);
  }

  const vehicleId = data.vehicleId || trip.vehicleId;
  const driverId = data.driverId || trip.driverId;
  const receiverId = data.receiverId || trip.receiverId;
  const cargoWeight = data.cargoWeight != null ? data.cargoWeight : trip.cargoWeight;

  const { vehicle, driver } = await validateReferences(
    vehicleId,
    driverId,
    receiverId,
    cargoWeight,
    false
  );

  if (driver.status === DRIVER_STATUS.SUSPENDED) {
    throwErr('Driver status is SUSPENDED. Cannot update trip', 400);
  }

  if (driver.licenseExpiry && new Date(driver.licenseExpiry) < new Date()) {
    throwErr('Driver license has expired', 400);
  }

  Object.assign(trip, data);
  await trip.save();
  return trip;
};

const remove = async (id) => {
  const trip = await Trip.findOne({ _id: id, isActive: true });
  if (!trip) throwErr('Trip not found', 404);
  trip.isActive = false;
  await trip.save();
  return trip;
};

const dispatch = async (id) => {
  const trip = await Trip.findOne({ _id: id, isActive: true });
  if (!trip) throwErr('Trip not found', 404);

  if (trip.status !== TRIP_STATUS.DRAFT) {
    throwErr('Trip cannot be dispatched. Only DRAFT trips can be dispatched', 400);
  }

  const vehicle = await Vehicle.findOne({ _id: trip.vehicleId, isActive: true });
  if (!vehicle) throwErr('Vehicle not found', 404);
  if (vehicle.status !== VEHICLE_STATUS.AVAILABLE) {
    throwErr(`Vehicle status must be AVAILABLE to dispatch. Current: ${vehicle.status}`, 400);
  }

  const driver = await Driver.findOne({ _id: trip.driverId, isActive: { $ne: false } });
  if (!driver) throwErr('Driver not found', 404);
  if (driver.status !== DRIVER_STATUS.AVAILABLE) {
    throwErr(`Driver status must be AVAILABLE to dispatch. Current: ${driver.status}`, 400);
  }

  if (driver.status === DRIVER_STATUS.SUSPENDED) {
    throwErr('Driver status is SUSPENDED and cannot be dispatched', 400);
  }

  if (driver.licenseExpiry && new Date(driver.licenseExpiry) < new Date()) {
    throwErr('Driver license has expired. Cannot dispatch trip', 400);
  }

  if (trip.cargoWeight > vehicle.maxLoadCapacity) {
    throwErr(
      `Cargo weight (${trip.cargoWeight}) exceeds vehicle max load capacity (${vehicle.maxLoadCapacity})`,
      400
    );
  }

  vehicle.status = VEHICLE_STATUS.ON_TRIP;
  await vehicle.save();

  driver.status = DRIVER_STATUS.ON_TRIP;
  await driver.save();

  trip.status = TRIP_STATUS.DISPATCHED;
  trip.dispatchTime = new Date();
  await trip.save();

  return trip;
};

const complete = async (id, actualDistance) => {
  const trip = await Trip.findOne({ _id: id, isActive: true });
  if (!trip) throwErr('Trip not found', 404);

  if (trip.status !== TRIP_STATUS.DISPATCHED) {
    throwErr('Only DISPATCHED trips can be completed', 400);
  }

  const vehicle = await Vehicle.findOne({ _id: trip.vehicleId, isActive: true });
  if (vehicle) {
    vehicle.status = VEHICLE_STATUS.AVAILABLE;
    await vehicle.save();
  }

  const driver = await Driver.findOne({ _id: trip.driverId, isActive: { $ne: false } });
  if (driver) {
    driver.status = DRIVER_STATUS.AVAILABLE;
    await driver.save();
  }

  trip.status = TRIP_STATUS.COMPLETED;
  trip.completionTime = new Date();
  trip.actualDistance = actualDistance;
  await trip.save();

  return trip;
};

const cancel = async (id) => {
  const trip = await Trip.findOne({ _id: id, isActive: true });
  if (!trip) throwErr('Trip not found', 404);

  if (trip.status === TRIP_STATUS.COMPLETED) {
    throwErr('COMPLETED trip cannot be cancelled', 400);
  }

  if (trip.status === TRIP_STATUS.CANCELLED) {
    throwErr('Trip is already cancelled', 400);
  }

  if (trip.status === TRIP_STATUS.DISPATCHED) {
    const vehicle = await Vehicle.findOne({ _id: trip.vehicleId, isActive: true });
    if (vehicle) {
      vehicle.status = VEHICLE_STATUS.AVAILABLE;
      await vehicle.save();
    }

    const driver = await Driver.findOne({ _id: trip.driverId, isActive: { $ne: false } });
    if (driver) {
      driver.status = DRIVER_STATUS.AVAILABLE;
      await driver.save();
    }
  }

  trip.status = TRIP_STATUS.CANCELLED;
  await trip.save();

  return trip;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
  dispatch,
  complete,
  cancel,
};
