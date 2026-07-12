const Joi = require('joi');

const createTripSchema = Joi.object({
  source: Joi.string().trim().required().messages({
    'any.required': 'Source is required',
    'string.empty': 'Source cannot be empty',
  }),
  destination: Joi.string().trim().required().messages({
    'any.required': 'Destination is required',
    'string.empty': 'Destination cannot be empty',
  }),
  cargoWeight: Joi.number().min(0).required().messages({
    'any.required': 'Cargo weight is required',
    'number.min': 'Cargo weight cannot be negative',
  }),
  plannedDistance: Joi.number().min(0).required().messages({
    'any.required': 'Planned distance is required',
    'number.min': 'Planned distance cannot be negative',
  }),
  vehicleId: Joi.string().required().messages({
    'any.required': 'Vehicle is required',
  }),
  driverId: Joi.string().required().messages({
    'any.required': 'Driver is required',
  }),
  receiverId: Joi.string().required().messages({
    'any.required': 'Receiver is required',
  }),
});

const updateTripSchema = Joi.object({
  source: Joi.string().trim().messages({
    'string.empty': 'Source cannot be empty',
  }),
  destination: Joi.string().trim().messages({
    'string.empty': 'Destination cannot be empty',
  }),
  cargoWeight: Joi.number().min(0).messages({
    'number.min': 'Cargo weight cannot be negative',
  }),
  plannedDistance: Joi.number().min(0).messages({
    'number.min': 'Planned distance cannot be negative',
  }),
  vehicleId: Joi.string(),
  driverId: Joi.string(),
  receiverId: Joi.string(),
}).min(1).messages({
  'object.min': 'At least one field must be provided for update',
});

const completeTripSchema = Joi.object({
  actualDistance: Joi.number().min(0).required().messages({
    'any.required': 'Actual distance is required',
    'number.min': 'Actual distance cannot be negative',
  }),
});

const querySchema = Joi.object({
  search: Joi.string().trim().optional(),
  status: Joi.string()
    .valid('DRAFT', 'DISPATCHED', 'COMPLETED', 'CANCELLED')
    .optional()
    .messages({
      'any.only': 'Invalid trip status filter',
    }),
  driverId: Joi.string().optional(),
  vehicleId: Joi.string().optional(),
  dateFrom: Joi.date().iso().optional().messages({
    'date.format': 'dateFrom must be a valid ISO date',
  }),
  dateTo: Joi.date().iso().optional().messages({
    'date.format': 'dateTo must be a valid ISO date',
  }),
  sort: Joi.string()
    .valid('latest', 'oldest', 'source', 'destination')
    .optional()
    .default('latest')
    .messages({
      'any.only': 'Sort must be one of: latest, oldest, source, destination',
    }),
  page: Joi.number().integer().min(1).optional().default(1),
  limit: Joi.number().integer().min(1).max(100).optional().default(10),
});

const confirmDeliverySchema = Joi.object({
  receiverRemarks: Joi.string().trim().allow(''),
  receiverSignature: Joi.string().trim().allow(''),
});

module.exports = {
  createTripSchema,
  updateTripSchema,
  completeTripSchema,
  querySchema,
  confirmDeliverySchema,
};
