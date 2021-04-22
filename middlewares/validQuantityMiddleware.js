const { ENTITY, ZERO } = require('../CODE_ERROR');

async function validQuantityMiddleware(req, res, next) {
  const product = req.body;
  const { quantity } = product;
  
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
      message: '"quantity" must be a number',
    },
  };
  const E3 = {
    status: ENTITY,
    err: {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1',
    },
  };
  if (quantity <= ZERO) return next(E3);
  if (quantity === undefined) return next(E1);
  if (quantity === null) return next(E1);
  if (quantity <= null) return next(E1);
  if (!Number.isInteger(quantity))next(E2);

  next();
}

module.exports = { validQuantityMiddleware };
