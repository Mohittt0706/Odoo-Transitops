const Joi = require('joi');

const EXPENSE_TYPES = ['Fuel', 'Maintenance', 'Toll', 'Parking', 'Insurance', 'Other'];

const createExpenseSchema = Joi.object({
  vehicleId: Joi.string().required().messages({
    'any.required': 'Vehicle is required',
  }),
  tripId: Joi.string().optional().allow('', null),
  type: Joi.string()
    .valid(...EXPENSE_TYPES)
    .required()
    .messages({
      'any.required': 'Expense type is required',
      'any.only': 'Invalid expense type: {VALUE}',
    }),
  amount: Joi.number().min(0).required().messages({
    'any.required': 'Amount is required',
    'number.min': 'Amount cannot be negative',
  }),
  description: Joi.string().trim().optional().allow('', null),
  date: Joi.date().iso().optional().messages({
    'date.format': 'Date must be a valid ISO date',
  }),
});

const updateExpenseSchema = Joi.object({
  type: Joi.string()
    .valid(...EXPENSE_TYPES)
    .messages({
      'any.only': 'Invalid expense type: {VALUE}',
    }),
  amount: Joi.number().min(0).messages({
    'number.min': 'Amount cannot be negative',
  }),
  description: Joi.string().trim().optional().allow('', null),
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
  type: Joi.string()
    .valid(...EXPENSE_TYPES)
    .optional()
    .messages({
      'any.only': 'Invalid expense type filter',
    }),
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

module.exports = { createExpenseSchema, updateExpenseSchema, querySchema };
