const { ENTITY } = require('../CODE_ERROR');
const { findIdProduct } = require('../models');

async function validIdProductMiddleware(req, res, next) {
  const sales = req.body;
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
  if (!sales) return res.status(ENTITY).json(type_erro1);
  for (const sale of sales) {
    try {
      await findIdProduct(sale.productId);
    } catch (error) {
      return res.status(ENTITY).json(type_erro2);
    }
  }

  next();
}

module.exports = { validIdProductMiddleware };
