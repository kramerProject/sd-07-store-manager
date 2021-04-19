const { ENTITY, ZERO } = require('../CODE_ERROR');

async function validQuantityMiddleware(req, res, next) {
  const { quantity } = req.body;
  const type_erro1 = {
    err: {
      code: 'invalid_data',
      message: 'quantity is required',
    },
  };
  const type_erro2 = {
    err: {
      code: 'invalid_data',
      message: '"quantity" must be a number',
    },
  };
  const type_erro3 = {
    err: {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1',
    },
  };
  if (quantity === undefined) return res.status(ENTITY).json(type_erro1);
  if (quantity === null) return res.status(ENTITY).json(type_erro1);
  if (Number.isInteger(quantity)) return res.status(ENTITY).json(type_erro2);
  if (quantity <= null) return res.status(ENTITY).json(type_erro1);
  if (quantity <= ZERO) return res.status(ENTITY).json(type_erro3);
  next();
}

module.exports = { validQuantityMiddleware };
