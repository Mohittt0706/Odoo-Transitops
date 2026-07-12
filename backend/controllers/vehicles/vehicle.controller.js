const vehicleService = require('../../services/vehicle.service');
const { sendSuccess } = require('../../utils/responseHandler');

const create = async (req, res, next) => {
  try {
    const vehicle = await vehicleService.create(req.body);
    sendSuccess(res, { vehicle }, 'Vehicle created successfully', 201);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const result = await vehicleService.getAll(req.query);
    sendSuccess(res, result, 'Vehicles fetched successfully');
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const vehicle = await vehicleService.getById(req.params.id);
    sendSuccess(res, { vehicle }, 'Vehicle fetched successfully');
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const vehicle = await vehicleService.update(req.params.id, req.body);
    sendSuccess(res, { vehicle }, 'Vehicle updated successfully');
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    await vehicleService.remove(req.params.id);
    sendSuccess(res, {}, 'Vehicle deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = { create, getAll, getById, update, remove };
