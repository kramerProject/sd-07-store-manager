const modelProducts = require('../models/products');

const { status } = require('../utils/status');

const messageErrorNamelt5 = {
  code: 'invalid_data',
  message: '"name" length must be at least 5 characters long',
};

const messageErrorQuantify = {
  code: 'invalid_data',
  message: '"quantity" must be larger than or equal to 1',
};

const messageErrorQuantifyString = {
  code: 'invalid_data',
  message: '"quantity" must be a number',
};

const validatedName = async (req, res, next) => {
  const five = 5;
  const { name } = req.body;
  if (typeof name !== 'string' || name.length < five) {
    return res.status(status.unprocessableEntity).json({
      err: messageErrorNamelt5
    });
  }
  
  next();
};

const validatedQuantity = (req, res, next) => {
  const zero = 0;
  const { quantity } = req.body;
  if (quantity === undefined || quantity < zero || quantity === zero) {
    return res.status(status.unprocessableEntity).json({
      err: messageErrorQuantify,
    });
  }

  next();
};

const validatedQuantityString = (req, res, next) => {
  const { quantity } = req.body;
  if (typeof quantity === 'string') {
    return res.status(status.unprocessableEntity).json({
      err: messageErrorQuantifyString,
    });
  }

  next();
};

const errorMiddleware = (err, _req, res, _next) => {
  if (err.status) {
    return res.status(err.status).send({
      error: err.message,
    });
  }
  res.status(status.internalServerError).send({
    error: err.message,
  });
};

module.exports = {
  validatedName,
  validatedQuantity,
  validatedQuantityString,
  errorMiddleware
};