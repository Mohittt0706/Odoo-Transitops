const express = require('express');
const router = express.Router();

const {
  create,
  getAll,
  getById,
  update,
  remove,
  getVehicleSummary,
  getTripSummary,
} = require('../controllers/finance/expense.controller');
const authenticate = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');
const validate = require('../middleware/validator.middleware');
const { createExpenseSchema, updateExpenseSchema, querySchema } = require('../validators/expense.validator');
const { ROLES } = require('../constants/roles');

router.post(
  '/',
  authenticate,
  authorize(ROLES.OPERATION_LEAD, ROLES.FINANCE_HUB),
  validate(createExpenseSchema),
  create
);

router.get(
  '/',
  authenticate,
  validate(querySchema, 'query'),
  getAll
);

router.get(
  '/summary/vehicle/:vehicleId',
  authenticate,
  getVehicleSummary
);

router.get(
  '/summary/trip/:tripId',
  authenticate,
  getTripSummary
);

router.get(
  '/:id',
  authenticate,
  getById
);

router.put(
  '/:id',
  authenticate,
  authorize(ROLES.OPERATION_LEAD, ROLES.FINANCE_HUB),
  validate(updateExpenseSchema),
  update
);

router.delete(
  '/:id',
  authenticate,
  authorize(ROLES.OPERATION_LEAD),
  remove
);

module.exports = router;
