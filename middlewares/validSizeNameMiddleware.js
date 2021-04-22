const { ENTITY, MIN } = require('../CODE_ERROR');

async function validSizeNameMiddleware(req, res, next) {
  const product = req.body;
  const { name } = product;
  const E1 = {
    status: ENTITY,
    err: {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long',
    },
  };
  if (name.length < MIN) return next(E1);
  next();
}

module.exports = { validSizeNameMiddleware };
