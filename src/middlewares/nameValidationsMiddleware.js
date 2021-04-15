const services = require('../services/productServices');

const {
  statusHttp,
  nameLength,
  verifyCountName,
  verifyVerb,
} = services;

const { C_422 } = statusHttp;

const nameValidationsMiddleware = async (req, res, next) => {
  const { name } = req.body;
  try {
    if (nameLength(name)) {
      return res
        .status(C_422)
        .send({
          err: {
            code: 'invalid_data',
            message: '"name" length must be at least 5 characters long',
          }
        });
    }
    if (await verifyVerb(req) && await verifyCountName(name)) {
      return res
        .status(C_422)
        .send({
          err: {
            code: 'invalid_data',
            message: 'Product already exists',
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

module.exports = nameValidationsMiddleware;