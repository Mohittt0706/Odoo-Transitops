const express = require('express');
const router = express.Router();

const {
  create,
  getAll,
  getById,
  update,
  remove,
  getVehicleSummary,
} = require('../controllers/vehicles/fuel.controller');
const authenticate = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');
const validate = require('../middleware/validator.middleware');
const { createFuelSchema, updateFuelSchema, querySchema } = require('../validators/fuel.validator');
const { ROLES } = require('../constants/roles');

router.post(
  '/',
  authenticate,
  authorize(ROLES.OPERATION_LEAD, ROLES.FINANCE_HUB, ROLES.ROAD_CAPTAIN),
  validate(createFuelSchema),
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
  '/:id',
  authenticate,
  getById
);

router.put(
  '/:id',
  authenticate,
  authorize(ROLES.OPERATION_LEAD, ROLES.FINANCE_HUB),
  validate(updateFuelSchema),
  update
);

router.delete(
  '/:id',
  authenticate,
  authorize(ROLES.OPERATION_LEAD),
  remove
);

module.exports = router;
