const fuelService = require('../../services/fuel.service');
const { sendSuccess } = require('../../utils/responseHandler');

const create = async (req, res, next) => {
  try {
    const fuelLog = await fuelService.create(req.body);
    sendSuccess(res, { fuelLog }, 'Fuel log created successfully', 201);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const result = await fuelService.getAll(req.query);
    sendSuccess(res, result, 'Fuel logs fetched successfully');
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const fuelLog = await fuelService.getById(req.params.id);
    sendSuccess(res, { fuelLog }, 'Fuel log fetched successfully');
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const fuelLog = await fuelService.update(req.params.id, req.body);
    sendSuccess(res, { fuelLog }, 'Fuel log updated successfully');
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await fuelService.remove(req.params.id);
    sendSuccess(res, {}, 'Fuel log deleted successfully');
  } catch (error) {
    next(error);
  }
};

const getVehicleSummary = async (req, res, next) => {
  try {
    const result = await fuelService.getVehicleSummary(req.params.vehicleId);
    sendSuccess(res, result, 'Fuel summary fetched successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = { create, getAll, getById, update, remove, getVehicleSummary };
