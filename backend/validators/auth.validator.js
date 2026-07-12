const Joi = require('joi');

const { ROLES_ARRAY } = require('../constants/roles');

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email',
    'any.required': 'Email is required',
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required',
  }),
});

const registerSchema = Joi.object({
  fullName: Joi.string().trim().required().messages({
    'any.required': 'Full name is required',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email',
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters',
    'any.required': 'Password is required',
  }),
  role: Joi.string()
    .valid(...ROLES_ARRAY)
    .required()
    .messages({
      'any.required': 'Role is required',
      'any.only': 'Invalid role',
    }),
});

module.exports = { loginSchema, registerSchema };
