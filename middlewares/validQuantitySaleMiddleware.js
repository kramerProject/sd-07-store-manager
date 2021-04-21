const { ENTITY, ZERO } = require('../CODE_ERROR');

async function validQuantitySaleMiddleware(req, res, next) {
  const product = req.body;
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
  if (product === undefined) return res.status(ENTITY).json(type_erro1);
  if (product === null) return res.status(ENTITY).json(type_erro1);
  const { quantity } = product[0];
  if (quantity <= ZERO ) return res.status(ENTITY).json(type_erro3);
  if (!Number.isInteger(quantity)) return res.status(ENTITY).json(type_erro2);

  next();
}

module.exports = { validQuantitySaleMiddleware };
