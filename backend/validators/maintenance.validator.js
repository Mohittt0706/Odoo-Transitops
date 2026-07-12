const Joi = require('joi');
const { MAINTENANCE_STATUS_ARRAY } = require('../constants/maintenanceStatus');

const createMaintenanceSchema = Joi.object({
  vehicleId: Joi.string().required().messages({
    'any.required': 'Vehicle ID is required',
  }),
  issue: Joi.string().trim().required().messages({
    'any.required': 'Issue is required',
  }),
  description: Joi.string().trim().required().messages({
    'any.required': 'Description is required',
  }),
  cost: Joi.number().min(0).required().messages({
    'number.min': 'Cost cannot be negative',
    'any.required': 'Cost is required',
  }),
  status: Joi.string()
    .valid(...MAINTENANCE_STATUS_ARRAY)
    .default('OPEN'),
  maintenanceDate: Joi.date().required().messages({
    'any.required': 'Maintenance date is required',
  }),
  completedDate: Joi.date().allow(null),
  technicianName: Joi.string().trim().allow(''),
  remarks: Joi.string().trim().allow(''),
});

const updateMaintenanceSchema = Joi.object({
  issue: Joi.string().trim(),
  description: Joi.string().trim(),
  cost: Joi.number().min(0),
  status: Joi.string().valid(...MAINTENANCE_STATUS_ARRAY),
  maintenanceDate: Joi.date(),
  completedDate: Joi.date().allow(null),
  technicianName: Joi.string().trim().allow(''),
  remarks: Joi.string().trim().allow(''),
}).min(1);

const maintenanceQuerySchema = Joi.object({
  search: Joi.string().trim(),
  status: Joi.string().valid(...MAINTENANCE_STATUS_ARRAY),
  vehicleId: Joi.string(),
  date: Joi.date(),
  sort: Joi.string().valid('latest', 'oldest', 'cost').default('latest'),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
});

module.exports = { createMaintenanceSchema, updateMaintenanceSchema, maintenanceQuerySchema };
