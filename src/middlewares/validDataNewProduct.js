const { findByName } = require('../models/produtoModel');

const CODE = 'invalid_data';
const UNPROCESSABLE = 422;
const min = 5;
const zero = 0;
const erro = {
  NULL: 'O campo "name" e "quantity" não podem ser vazios',
  NAME_SIZE: '"name" length must be at least 5 characters long',
  EXITS: 'Product already exists',
  INVALID_QUANTITY: '"quantity" must be larger than or equal to 1',
  TO_NUMBER: '"quantity" must be a number',
};

const checkExist = async (request, response, next) => {
  const { name } = request.body;
  const findProduct = await findByName(name);

  if(findProduct) {
    return response.status(UNPROCESSABLE)
      .json({err: { code: CODE, message: erro.EXITS}});
  }
  next();
};

const checkName = (request, response, next) => {
  const { name, quantity } = request.body;

  if (!name || quantity === undefined) {
    return response.status(UNPROCESSABLE)
      .json({err: { code: UNPROCESSABLE, message: erro.NULL}});
  }
  if (name.length < min) {
    return response.status(UNPROCESSABLE)
      .json({err:{code: CODE, message: erro.NAME_SIZE }});
  }
  next();
};
const checkQuantity = (request, response, next) => {
  const { quantity } = request.body;

  if (quantity <= zero) {
    return response.status(UNPROCESSABLE)
      .json({err: { code: CODE, message: erro.INVALID_QUANTITY}});
  }

  if (typeof quantity !== 'number') {
    return response.status(UNPROCESSABLE)
      .json({err: { code:CODE, message: erro.TO_NUMBER}});
  }
  next();
};

module.exports = {
  checkName,
  checkQuantity,
  checkExist,
};