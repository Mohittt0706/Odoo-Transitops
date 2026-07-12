const Joi = require('joi');

const createReceiverSchema = Joi.object({
  fullName: Joi.string().trim().required().messages({
    'any.required': 'Full name is required',
  }),
  company: Joi.string().trim().required().messages({
    'any.required': 'Company is required',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email',
    'any.required': 'Email is required',
  }),
  contactNumber: Joi.string().trim().required().messages({
    'any.required': 'Contact number is required',
  }),
  address: Joi.string().trim().required().messages({
    'any.required': 'Address is required',
  }),
});

const updateReceiverSchema = Joi.object({
  fullName: Joi.string().trim(),
  company: Joi.string().trim(),
  email: Joi.string().email(),
  contactNumber: Joi.string().trim(),
  address: Joi.string().trim(),
}).min(1);

const receiverQuerySchema = Joi.object({
  search: Joi.string().trim(),
  company: Joi.string().trim(),
  date: Joi.date(),
  sort: Joi.string().valid('latest', 'oldest', 'name').default('latest'),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
});

module.exports = { createReceiverSchema, updateReceiverSchema, receiverQuerySchema };