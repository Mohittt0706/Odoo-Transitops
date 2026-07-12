const express = require('express');
const router = express.Router();

const {
  create,
  findAll,
  findById,
} = require('../controllers/receiver/receiver.controller');
const authenticate = require('../middleware/auth.middleware');
const validate = require('../middleware/validator.middleware');
const Joi = require('joi');

const createReceiverSchema = Joi.object({
  fullName: Joi.string().trim().required().messages({
    'any.required': 'Full name is required',
    'string.empty': 'Full name cannot be empty',
  }),
  company: Joi.string().trim().required().messages({
    'any.required': 'Company is required',
    'string.empty': 'Company cannot be empty',
  }),
  contactNumber: Joi.string().trim().required().messages({
    'any.required': 'Contact number is required',
    'string.empty': 'Contact number cannot be empty',
  }),
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required',
    'string.email': 'Please provide a valid email',
  }),
  address: Joi.string().trim().required().messages({
    'any.required': 'Address is required',
    'string.empty': 'Address cannot be empty',
  }),
});

router.use(authenticate);

router.post('/', validate(createReceiverSchema), create);
router.get('/', findAll);
router.get('/:id', findById);

module.exports = router;
