const expenseService = require('../../services/expense.service');
const { sendSuccess } = require('../../utils/responseHandler');

const create = async (req, res, next) => {
  try {
    const expense = await expenseService.create(req.body);
    sendSuccess(res, { expense }, 'Expense created successfully', 201);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const result = await expenseService.getAll(req.query);
    sendSuccess(res, result, 'Expenses fetched successfully');
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const expense = await expenseService.getById(req.params.id);
    sendSuccess(res, { expense }, 'Expense fetched successfully');
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const expense = await expenseService.update(req.params.id, req.body);
    sendSuccess(res, { expense }, 'Expense updated successfully');
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await expenseService.remove(req.params.id);
    sendSuccess(res, {}, 'Expense deleted successfully');
  } catch (error) {
    next(error);
  }
};

const getVehicleSummary = async (req, res, next) => {
  try {
    const result = await expenseService.getVehicleSummary(req.params.vehicleId);
    sendSuccess(res, result, 'Expense summary fetched successfully');
  } catch (error) {
    next(error);
  }
};

const getTripSummary = async (req, res, next) => {
  try {
    const result = await expenseService.getTripSummary(req.params.tripId);
    sendSuccess(res, result, 'Trip expense summary fetched successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = { create, getAll, getById, update, remove, getVehicleSummary, getTripSummary };
