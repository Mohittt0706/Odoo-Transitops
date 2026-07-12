const { sendError } = require('../utils/responseHandler');

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const message = error.details.map((d) => d.message).join(', ');
      return sendError(res, message, 400);
    }
    next();
  };
};

module.exports = validate;
