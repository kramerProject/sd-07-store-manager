const productModel = require('../models/productModel');
const { ObjectId } = require('mongodb');

const productUpdateMiddleware = async (req, res, next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const FIVE = 5;
  const ZERO = 0;
  const NUMBER_CONDITION = 24;

  if (!ObjectId.isValid(id) || id.length !== NUMBER_CONDITION)
    return res.status('422').send({ err: {
      code: 'invalid_data',
      message: 'Wrong id format'
    } });

  const idExist = await productModel.findById(id);

  if (!idExist)
    return res.status('422').send({ err: {
      code: 'invalid_data',
      message: 'Wrong id format'
    } });

  if (name.length <= FIVE || !name) return res.status('422').send({ err: {
    code: 'invalid_data',
    message: '"name" length must be at least 5 characters long'
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

module.exports = productUpdateMiddleware;
