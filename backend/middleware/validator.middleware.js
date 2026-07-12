const { sendError } = require('../utils/responseHandler');

const validate = (schema, source = 'body') => {
  return (req, res, next) => {
    const data = source === 'query' ? req.query : req.body;
    const { error, value } = schema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      const message = error.details.map((d) => d.message).join(', ');
      return sendError(res, message, 400);
    }
    if (source === 'query') {
      req.query = value;
    } else {
      req.body = value;
    }
    next();
  };
};

module.exports = validate;
