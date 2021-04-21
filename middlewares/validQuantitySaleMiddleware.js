const { ENTITY, ZERO } = require('../CODE_ERROR');
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
      message: '"quantity" must be a number',
    },
  };
  const E3 = {
    err: {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    },
  };
  const E4 = {
    err: {
      code: 'stock_problem',
      message: '"quantity" must be larger than or equal to 1',
    },
  };

  for (const saleProduct of sales) {
    if (saleProduct === undefined || saleProduct === null ) {
      return res.status(ENTITY).json(E1);
    }
    const { quantity } = saleProduct;
    if (!Number.isInteger(quantity)) return res.status(ENTITY).json(E2);
    if (quantity <= ZERO ) return res.status(ENTITY).json(E3);
    if (!(await findIdProduct(saleProduct.productId))) return res.status(ENTITY).json(E4);
  }

  next();
}

module.exports = { validQuantitySaleMiddleware };
