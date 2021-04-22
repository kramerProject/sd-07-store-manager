const { ENTITY, ZERO, NOT_FOUND } = require('../CODE_ERROR');
const { findIdProduct } = require('../models');

async function validQuantitySaleMiddleware(req, res, next) {
  const sales = req.body;
  const E1 = {
    status: ENTITY,
    err: {
      code: 'invalid_data',
      message: 'quantity is required',
    },
  };
  const E2 = {
    status: ENTITY,
    err: {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    },
  };
  const E3 = {
    status: NOT_FOUND,
    err: {
      code: 'stock_problem',
      message: 'Such amount is not permitted to sell',
    },
  };

  for (const saleProduct of sales) {
    if (saleProduct === undefined || saleProduct === null ) return next(E1);
    const { quantity, productId } = saleProduct;
    if (!Number.isInteger(quantity) || quantity <= ZERO ) return next(E2);
    if((await findIdProduct(productId)).quantity < quantity) next(E3);
  }
  next();
}

module.exports = { validQuantitySaleMiddleware };
