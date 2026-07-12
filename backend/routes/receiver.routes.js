const express = require('express');
const router = express.Router();

const authenticate = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');
const validate = require('../middleware/validator.middleware');
const {
  createReceiverSchema,
  updateReceiverSchema,
  receiverQuerySchema,
} = require('../validators/receiver.validator');
const {
  create,
  findAll,
  findById,
  update,
  remove,
} = require('../controllers/receiver/receiver.controller');
const { ROLES } = require('../constants/roles');

router.use(authenticate);

router.get('/', validate(receiverQuerySchema, 'query'), findAll);
router.get('/:id', findById);

router.post('/', authorize(ROLES.OPERATION_LEAD), validate(createReceiverSchema), create);
router.put('/:id', authorize(ROLES.OPERATION_LEAD), validate(updateReceiverSchema), update);
router.delete('/:id', authorize(ROLES.OPERATION_LEAD), remove);

module.exports = router;