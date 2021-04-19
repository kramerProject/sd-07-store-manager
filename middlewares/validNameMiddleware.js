const { ENTITY } = require('../CODE_ERROR');
const { findNameProducts } = require('../controllers');

async function validNameMiddleware(req, res, next) {
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

  const nameProduct = await findNameProducts(name);

  if (!nameProduct) return res.status(ENTITY).json(type_erro2);

  next();
}

module.exports = { validNameMiddleware };
