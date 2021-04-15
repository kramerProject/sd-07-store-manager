const services = require('../services/productServices');

const {
  statusHttp,
  quantityIsNumber,
  verifyPositiveInteger,
} = services;

const { C_422 } = statusHttp;

const quantityValidationsMiddleware = (req, res, next) => {
  const { quantity } = req.body;
  try {
    if (!quantityIsNumber(quantity)) {
      return res
        .status(C_422)
        .send({
          err: {
            code: 'invalid_data',
            message: '"quantity" must be a number',
          }
        });
    }
    if (verifyPositiveInteger(quantity)) {
      return res
        .status(C_422)
        .send({
          err: {
            code: 'invalid_data',
            message: '"quantity" must be larger than or equal to 1',
          }
        });
    }
    next();

  } catch (error) {
    next({
      err: {
        code: error.code,
        message: error.message,
      }
    });
  }
};

module.exports = quantityValidationsMiddleware;