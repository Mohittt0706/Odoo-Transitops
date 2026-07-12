const Joi = require('joi');

const createFuelSchema = Joi.object({
  vehicleId: Joi.string().required().messages({
    'any.required': 'Vehicle is required',
  }),
  tripId: Joi.string().optional().allow('', null),
  liters: Joi.number().positive().required().messages({
    'any.required': 'Liters is required',
    'number.positive': 'Liters must be greater than zero',
  }),
  cost: Joi.number().min(0).required().messages({
    'any.required': 'Cost is required',
    'number.min': 'Cost cannot be negative',
  }),
  fuelStation: Joi.string().trim().optional().allow('', null),
  odometerReading: Joi.number().min(0).optional().allow(null).messages({
    'number.min': 'Odometer reading cannot be negative',
  }),
  date: Joi.date().iso().optional().messages({
    'date.format': 'Date must be a valid ISO date',
  }),
});

const updateFuelSchema = Joi.object({
  liters: Joi.number().positive().messages({
    'number.positive': 'Liters must be greater than zero',
  }),
  cost: Joi.number().min(0).messages({
    'number.min': 'Cost cannot be negative',
  }),
  fuelStation: Joi.string().trim().optional().allow('', null),
  odometerReading: Joi.number().min(0).optional().allow(null).messages({
    'number.min': 'Odometer reading cannot be negative',
  }),
  date: Joi.date().iso().optional().messages({
    'date.format': 'Date must be a valid ISO date',
  }),
}).min(1).messages({
  'object.min': 'At least one field must be provided for update',
});

const querySchema = Joi.object({
  search: Joi.string().trim().optional(),
  vehicleId: Joi.string().optional(),
  tripId: Joi.string().optional(),
  dateFrom: Joi.date().iso().optional().messages({
    'date.format': 'dateFrom must be a valid ISO date',
  }),
  dateTo: Joi.date().iso().optional().messages({
    'date.format': 'dateTo must be a valid ISO date',
  }),
  sort: Joi.string()
    .valid('latest', 'oldest', 'highestCost', 'lowestCost')
    .optional()
    .default('latest')
    .messages({
      'any.only': 'Sort must be one of: latest, oldest, highestCost, lowestCost',
    }),
  page: Joi.number().integer().min(1).optional().default(1),
  limit: Joi.number().integer().min(1).max(100).optional().default(10),
});

module.exports = { createFuelSchema, updateFuelSchema, querySchema };
