const express = require('express');
const router = express.Router();

const authenticate = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');
const validate = require('../middleware/validator.middleware');
const {
  createDriverSchema,
  updateDriverSchema,
  driverQuerySchema,
} = require('../validators/driver.validator');
const {
  create,
  findAll,
  findById,
  update,
  remove,
} = require('../controllers/drivers/driver.controller');
const { ROLES } = require('../constants/roles');

router.use(authenticate);

router.get('/', validate(driverQuerySchema, 'query'), findAll);
router.get('/:id', findById);

router.post('/', authorize(ROLES.OPERATION_LEAD), validate(createDriverSchema), create);
router.put('/:id', authorize(ROLES.OPERATION_LEAD), validate(updateDriverSchema), update);
router.delete('/:id', authorize(ROLES.OPERATION_LEAD), remove);

module.exports = router;
