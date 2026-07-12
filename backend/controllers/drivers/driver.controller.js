const driverService = require('../../services/driver.service');
const { sendSuccess } = require('../../utils/responseHandler');

const create = async (req, res, next) => {
  try {
    const driver = await driverService.create(req.body);
    sendSuccess(res, { driver }, 'Driver created successfully', 201);
  } catch (error) {
    next(error);
  }
};

const findAll = async (req, res, next) => {
  try {
    const result = await driverService.findAll(req.query);
    sendSuccess(res, { drivers: result.drivers, pagination: result.pagination }, 'Drivers fetched successfully');
  } catch (error) {
    next(error);
  }
};

const findById = async (req, res, next) => {
  try {
    const driver = await driverService.findById(req.params.id);
    sendSuccess(res, { driver }, 'Driver fetched successfully');
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const driver = await driverService.update(req.params.id, req.body);
    sendSuccess(res, { driver }, 'Driver updated successfully');
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const driver = await driverService.remove(req.params.id);
    sendSuccess(res, { driver }, 'Driver deactivated successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = { create, findAll, findById, update, remove };
