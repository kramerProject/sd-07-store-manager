const { ENTITY, MIN } = require('../CODE_ERROR');

async function validSizeNameMiddleware(req, res, next) {
  const { name } = req.body;
  const type_erro1 = {
    err: {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long',
    },
  };
  
  if (name.length < MIN) return res.status(ENTITY).json(type_erro1);
  next();
}

module.exports = { validSizeNameMiddleware };
