const maintenanceService = require('../../services/maintenance.service');
const { sendSuccess } = require('../../utils/responseHandler');

const create = async (req, res, next) => {
  try {
    const record = await maintenanceService.create(req.body);
    sendSuccess(res, { record }, 'Maintenance record created successfully', 201);
  } catch (error) {
    next(error);
  }
};

const findAll = async (req, res, next) => {
  try {
    const result = await maintenanceService.findAll(req.query);
    sendSuccess(res, { records: result.records, pagination: result.pagination }, 'Maintenance records fetched successfully');
  } catch (error) {
    next(error);
  }
};

const findById = async (req, res, next) => {
  try {
    const record = await maintenanceService.findById(req.params.id);
    sendSuccess(res, { record }, 'Maintenance record fetched successfully');
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const record = await maintenanceService.update(req.params.id, req.body);
    sendSuccess(res, { record }, 'Maintenance record updated successfully');
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const record = await maintenanceService.remove(req.params.id);
    sendSuccess(res, { record }, 'Maintenance record retrieved');
  } catch (error) {
    next(error);
  }
};

module.exports = { create, findAll, findById, update, remove };
