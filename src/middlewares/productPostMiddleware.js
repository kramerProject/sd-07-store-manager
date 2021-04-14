const productModel = require('../models/productModel');

const productMiddleware = async (req, res, next) => {
  const FIVE = 5;
  const ZERO = 0;
  const { name, quantity } = req.body;

  const nameExist = await productModel.findByName(name);

  if (name.length <= FIVE || !name) return res.status('422').send({ err: {
    code: 'invalid_data',
    message: '"name" length must be at least 5 characters long'
  } });

  if (nameExist) return res.status('422').send({ err: {
    code: 'invalid_data',
    message: 'Product already exists'
  } });

  if (quantity <= ZERO || !quantity) return res.status('422').send({ err: {
    code: 'invalid_data',
    message: '"quantity" must be larger than or equal to 1'
  } });

  if (typeof quantity === 'string') return res.status('422').send({ err: {
    code: 'invalid_data',
    message: '"quantity" must be a number'
  } });

  next();
};

module.exports = productMiddleware;
