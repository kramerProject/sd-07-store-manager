const { ENTITY } = require('../CODE_ERROR');
const { findIdProducts } = require('../controllers');

async function validIdProductMiddleware(req, res, next) {
  const { sale } = req.body;
  const type_erro1 = {
    err: {
      code: 'invalid_data',
      message: 'sale',
    },
  };
  const type_erro2 = {
    err: {
      code: 'invalid_data',
      message: 'Wrong product ID or invalid quantity',
    },
  };
  if (!sale) return res.status(ENTITY).json(type_erro1);
  for (const { productId } of sale) {
    const product = await findIdProducts(productId);
    if (!product) return res.status(ENTITY).json(type_erro2);
  }
  next();
}

module.exports = { validIdProductMiddleware };
