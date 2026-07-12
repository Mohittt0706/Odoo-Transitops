const Joi = require('joi');

const createVehicleSchema = Joi.object({
  registrationNumber: Joi.string().trim().uppercase().required().messages({
    'any.required': 'Registration number is required',
    'string.empty': 'Registration number cannot be empty',
  }),
  vehicleName: Joi.string().trim().required().messages({
    'any.required': 'Vehicle name is required',
    'string.empty': 'Vehicle name cannot be empty',
  }),
  vehicleType: Joi.string().trim().required().messages({
    'any.required': 'Vehicle type is required',
    'string.empty': 'Vehicle type cannot be empty',
  }),
  maxLoadCapacity: Joi.number().positive().required().messages({
    'any.required': 'Max load capacity is required',
    'number.positive': 'Max load capacity must be greater than zero',
  }),
  odometer: Joi.number().min(0).default(0).messages({
    'number.min': 'Odometer cannot be negative',
  }),
  acquisitionCost: Joi.number().min(0).required().messages({
    'any.required': 'Acquisition cost is required',
    'number.min': 'Acquisition cost cannot be negative',
  }),
  status: Joi.string()
    .valid('AVAILABLE', 'ON_TRIP', 'IN_SHOP', 'RETIRED')
    .default('AVAILABLE')
    .messages({
      'any.only': 'Invalid vehicle status',
    }),
});

const updateVehicleSchema = Joi.object({
  registrationNumber: Joi.string().trim().uppercase().messages({
    'string.empty': 'Registration number cannot be empty',
  }),
  vehicleName: Joi.string().trim().messages({
    'string.empty': 'Vehicle name cannot be empty',
  }),
  vehicleType: Joi.string().trim().messages({
    'string.empty': 'Vehicle type cannot be empty',
  }),
  maxLoadCapacity: Joi.number().positive().messages({
    'number.positive': 'Max load capacity must be greater than zero',
  }),
  odometer: Joi.number().min(0).messages({
    'number.min': 'Odometer cannot be negative',
  }),
  acquisitionCost: Joi.number().min(0).messages({
    'number.min': 'Acquisition cost cannot be negative',
  }),
  status: Joi.string()
    .valid('AVAILABLE', 'ON_TRIP', 'IN_SHOP', 'RETIRED')
    .messages({
      'any.only': 'Invalid vehicle status',
    }),
}).min(1).messages({
  'object.min': 'At least one field must be provided for update',
});

const querySchema = Joi.object({
  search: Joi.string().trim().optional(),
  status: Joi.string()
    .valid('AVAILABLE', 'ON_TRIP', 'IN_SHOP', 'RETIRED')
    .optional()
    .messages({
      'any.only': 'Invalid vehicle status filter',
    }),
  vehicleType: Joi.string().trim().optional(),
  sort: Joi.string()
    .valid('latest', 'oldest', 'vehicleName')
    .optional()
    .default('latest')
    .messages({
      'any.only': 'Sort must be one of: latest, oldest, vehicleName',
    }),
  page: Joi.number().integer().min(1).optional().default(1),
  limit: Joi.number().integer().min(1).max(100).optional().default(10),
});

module.exports = { createVehicleSchema, updateVehicleSchema, querySchema };
