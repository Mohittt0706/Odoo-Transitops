const Expense = require('../models/Expense');
const Vehicle = require('../models/Vehicle');

const throwErr = (msg, code) => {
  const err = new Error(msg);
  err.statusCode = code;
  throw err;
};

const create = async (data) => {
  const vehicle = await Vehicle.findOne({ _id: data.vehicleId, isActive: true });
  if (!vehicle) throwErr('Vehicle not found', 404);

  const expense = await Expense.create(data);
  return expense;
};

const getAll = async (query) => {
  const filter = {};

  if (query.vehicleId) filter.vehicleId = query.vehicleId;
  if (query.tripId) filter.tripId = query.tripId;
  if (query.type) filter.type = query.type;

  if (query.dateFrom || query.dateTo) {
    filter.date = {};
    if (query.dateFrom) filter.date.$gte = new Date(query.dateFrom);
    if (query.dateTo) filter.date.$lte = new Date(query.dateTo);
  }

  let sortObj = {};
  if (query.sort === 'oldest') sortObj.date = 1;
  else if (query.sort === 'highestCost') sortObj.amount = -1;
  else if (query.sort === 'lowestCost') sortObj.amount = 1;
  else sortObj.date = -1;

  const page = parseInt(query.page, 10) || 1;
  const limit = parseInt(query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const [expenses, total] = await Promise.all([
    Expense.find(filter)
      .populate('vehicleId', 'registrationNumber vehicleName')
      .populate('tripId', 'source destination')
      .sort(sortObj)
      .skip(skip)
      .limit(limit),
    Expense.countDocuments(filter),
  ]);

  return {
    expenses,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  };
};

const getById = async (id) => {
  const expense = await Expense.findById(id)
    .populate('vehicleId', 'registrationNumber vehicleName')
    .populate('tripId', 'source destination');
  if (!expense) throwErr('Expense not found', 404);
  return expense;
};

const update = async (id, data) => {
  const expense = await Expense.findById(id);
  if (!expense) throwErr('Expense not found', 404);
  Object.assign(expense, data);
  await expense.save();
  return expense;
};

const remove = async (id) => {
  const expense = await Expense.findById(id);
  if (!expense) throwErr('Expense not found', 404);
  await Expense.deleteOne({ _id: id });
  return expense;
};

const getVehicleSummary = async (vehicleId) => {
  const vehicle = await Vehicle.findOne({ _id: vehicleId, isActive: true });
  if (!vehicle) throwErr('Vehicle not found', 404);

  const [expenses, expenseAgg] = await Promise.all([
    Expense.find({ vehicleId }).sort({ date: -1 }).populate('tripId', 'source destination'),
    Expense.aggregate([
      { $match: { vehicleId: vehicle._id } },
      {
        $group: {
          _id: '$type',
          totalAmount: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
    ]),
  ]);

  const totalOperationalCost = expenseAgg.reduce((sum, t) => sum + t.totalAmount, 0);
  const typeBreakdown = {};
  expenseAgg.forEach((t) => {
    typeBreakdown[t._id] = { totalAmount: t.totalAmount, count: t.count };
  });

  return {
    vehicle: { _id: vehicle._id, registrationNumber: vehicle.registrationNumber, vehicleName: vehicle.vehicleName },
    summary: {
      totalOperationalCost,
      typeBreakdown,
      totalExpenses: expenses.length,
    },
    recentExpenses: expenses.slice(0, 5),
  };
};

const getTripSummary = async (tripId) => {
  const [expenses, expenseAgg] = await Promise.all([
    Expense.find({ tripId }).sort({ date: -1 }),
    Expense.aggregate([
      { $match: { tripId: new (require('mongoose').Types.ObjectId)(tripId) } },
      {
        $group: {
          _id: '$type',
          totalAmount: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
    ]),
  ]);

  const totalOperationalCost = expenseAgg.reduce((sum, t) => sum + t.totalAmount, 0);
  const typeBreakdown = {};
  expenseAgg.forEach((t) => {
    typeBreakdown[t._id] = { totalAmount: t.totalAmount, count: t.count };
  });

  return {
    tripId,
    summary: {
      totalOperationalCost,
      typeBreakdown,
      totalExpenses: expenses.length,
    },
    expenses,
  };
};

module.exports = { create, getAll, getById, update, remove, getVehicleSummary, getTripSummary };
