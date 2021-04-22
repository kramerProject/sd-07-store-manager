const { ENTITY, ZERO, NOT_FOUND  } = require('../CODE_ERROR');
const { findIdProduct } = require('../models');

async function validQuantitySaleMiddleware(req, res, next) {
  const sales = req.body;
  const E1 = {
    err: {
      code: 'invalid_data',
      message: 'quantity is required',
    },
  };
  const E2 = {
    err: {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    },
  };
  const E3 = {
    err: {
      code: 'stock_problem',
      message: 'Such amount is not permitted to sell',
    },
  };

  for (const saleProduct of sales) {
    if (saleProduct === undefined || saleProduct === null ) {
      return res.status(ENTITY).json(E1);
    }
    const { quantity, productId } = saleProduct;
    if (!Number.isInteger(quantity) || quantity <= ZERO ){
      return res.status(ENTITY).json(E2);
    }
    try {
      await findIdProduct(productId);
    } catch (error) {
      return res.status(NOT_FOUND).json(E3);
    }
  }

  next();
}

module.exports = { validQuantitySaleMiddleware };
