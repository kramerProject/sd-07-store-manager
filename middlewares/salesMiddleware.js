const productsModel = require('../models/productsModel');
const UNPROCESSABLE_ENTITY = 422;
const EMPTY = 0;

const checkId = async (request, response, next) => {
  const sale = request.body;
  if (!sale) {
    return response.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'sale',
      }
    });
  }
  for (const product of sale) {
    if (!(await productsModel.findProductById(product.productId))) {
      return response.status(UNPROCESSABLE_ENTITY).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        }
      });
    }
  };
  next();
};

const checkProductQuantity = (request, response, next) => {
  const sale = request.body;
  for (const product of sale) {
    if (product.quantity === undefined || product.quantity  === null) {
      return response.status(UNPROCESSABLE_ENTITY).json({
        err: {
          code: 'invalid_data',
          message: 'quantity is required',
        }
      });
    }
    if (typeof product.quantity === 'string') {
      return response.status(UNPROCESSABLE_ENTITY).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        }
      });
    }
    if (product.quantity <= EMPTY) {
      return response.status(UNPROCESSABLE_ENTITY).json({
        err: {
          code: 'invalid_data',
          message: 'Wrong product ID or invalid quantity',
        }
      });
    }
  };
  next();
};

module.exports = {
  checkId,
  checkProductQuantity,
};
