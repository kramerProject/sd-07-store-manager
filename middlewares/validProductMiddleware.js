const { ENTITY } = require('../CODE_ERROR');
const { findNameProduct } = require('../models');

async function validProductMiddleware(req, res, next) {
  const product = req.body;
  const { name } = product;
  const E1 = {
    status: ENTITY,
    err: {
      code: 'invalid_data',
      message: 'name is required',
    },
  };
  const E2 = {
    status: ENTITY,
    err: {
      code: 'invalid_data',
      message: 'Product already exists',
    },
  };
  if (!name) return next(E1);
  const nameProduct = await findNameProduct(name);
  if (!nameProduct) return next(E2);
  next();
}

module.exports = { validProductMiddleware };
