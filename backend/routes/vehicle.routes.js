const express = require('express');
const router = express.Router();

const {
  create,
  getAll,
  getById,
  update,
  remove,
} = require('../controllers/vehicles/vehicle.controller');
const authenticate = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');
const validate = require('../middleware/validator.middleware');
const {
  createVehicleSchema,
  updateVehicleSchema,
  querySchema,
} = require('../validators/vehicle.validator');
const { ROLES } = require('../constants/roles');

router.post(
  '/',
  authenticate,
  authorize(ROLES.OPERATION_LEAD),
  validate(createVehicleSchema),
  create
);

router.get(
  '/',
  authenticate,
  validate(querySchema, 'query'),
  getAll
);

router.get(
  '/:id',
  authenticate,
  getById
);

router.put(
  '/:id',
  authenticate,
  authorize(ROLES.OPERATION_LEAD),
  validate(updateVehicleSchema),
  update
);

router.delete(
  '/:id',
  authenticate,
  authorize(ROLES.OPERATION_LEAD),
  remove
);

module.exports = router;
