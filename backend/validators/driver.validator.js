const Joi = require('joi');
const { DRIVER_STATUS_ARRAY } = require('../constants/driverStatus');

const createDriverSchema = Joi.object({
  fullName: Joi.string().trim().required().messages({
    'any.required': 'Full name is required',
  }),
  licenseNumber: Joi.string().trim().uppercase().required().messages({
    'any.required': 'License number is required',
  }),
  licenseCategory: Joi.string().trim().required().messages({
    'any.required': 'License category is required',
  }),
  licenseExpiry: Joi.date().required().messages({
    'any.required': 'License expiry date is required',
  }),
  contactNumber: Joi.string().trim().required().messages({
    'any.required': 'Contact number is required',
  }),
  safetyScore: Joi.number().min(0).max(100).default(100),
  status: Joi.string()
    .valid(...DRIVER_STATUS_ARRAY)
    .default('AVAILABLE'),
});

const updateDriverSchema = Joi.object({
  fullName: Joi.string().trim(),
  licenseNumber: Joi.string().trim().uppercase(),
  licenseCategory: Joi.string().trim(),
  licenseExpiry: Joi.date(),
  contactNumber: Joi.string().trim(),
  safetyScore: Joi.number().min(0).max(100),
  status: Joi.string().valid(...DRIVER_STATUS_ARRAY),
}).min(1);

const driverQuerySchema = Joi.object({
  search: Joi.string().trim(),
  status: Joi.string()
    .valid(...DRIVER_STATUS_ARRAY),
  licenseCategory: Joi.string().trim(),
  sort: Joi.string().valid('latest', 'oldest', 'name').default('latest'),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
});

module.exports = { createDriverSchema, updateDriverSchema, driverQuerySchema };
