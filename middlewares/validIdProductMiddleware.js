const { ENTITY } = require('../CODE_ERROR');
const { findIdProduct } = require('../models');

async function validIdProductMiddleware(req, res, next) {
  const sales = req.body;
  const E1 = {
    status: ENTITY,
    err: {
      code: 'invalid_data',
      message: 'sale',
    },
  };
  const E2 = {
    status: ENTITY,
    err: {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    },
  };
  if (!sales) return next(E1);
  for (const sale of sales) {
    try {
      await findIdProduct(sale.productId);
    } catch (error) {
      return next(E2);
    }
  }
  next();
}

module.exports = { validIdProductMiddleware };
