const { ENTITY } = require('../CODE_ERROR');
const { findNameProduct } = require('../models');

async function validProductMiddleware(req, res, next) {
  const { name } = req.body;
  const type_erro1 = {
    err: {
      code: 'invalid_data',
      message: 'name is required',
    },
  };
  const type_erro2 = {
    err: {
      code: 'invalid_data',
      message: 'name is required',
    },
  };
  if (!name) return res.status(ENTITY).json(type_erro1);

  const nameProduct = await findNameProduct(name);

  if (!nameProduct) return res.status(ENTITY).json(type_erro2);

  next();
}

module.exports = { validProductMiddleware };
