
const services = require('../services/productServices');
const productModel = require('../models/productModel');

const { getProductById } = productModel;

const {
  statusHttp,
} = services;

const { C_422 } = statusHttp;

const productIdExistisMiddleware = async (req, res, next) => {
  const { id } = req.params;
  const result = await getProductById(id);
  try {
    if (!result) {
      return res
        .status(C_422)
        .send({
          err: {
            code: 'invalid_data',
            message: 'Wrong id format',
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

module.exports = productIdExistisMiddleware;