const express = require('express');
const router = express.Router();

const {
  create,
  getAll,
  getById,
  update,
  remove,
  dispatch,
  complete,
  cancel,
} = require('../controllers/trips/trip.controller');
const authenticate = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');
const validate = require('../middleware/validator.middleware');
const {
  createTripSchema,
  updateTripSchema,
  completeTripSchema,
  querySchema,
} = require('../validators/trip.validator');
const { ROLES } = require('../constants/roles');

router.post(
  '/',
  authenticate,
  authorize(ROLES.OPERATION_LEAD),
  validate(createTripSchema),
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
  validate(updateTripSchema),
  update
);

router.delete(
  '/:id',
  authenticate,
  authorize(ROLES.OPERATION_LEAD),
  remove
);

router.post(
  '/:id/dispatch',
  authenticate,
  authorize(ROLES.OPERATION_LEAD),
  dispatch
);

router.post(
  '/:id/complete',
  authenticate,
  authorize(ROLES.OPERATION_LEAD, ROLES.ROAD_CAPTAIN),
  validate(completeTripSchema),
  complete
);

router.post(
  '/:id/cancel',
  authenticate,
  authorize(ROLES.OPERATION_LEAD),
  cancel
);

module.exports = router;
