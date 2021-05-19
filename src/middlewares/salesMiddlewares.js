const { StatusCodes: { UNPROCESSABLE_ENTITY, NOT_FOUND } } = require('http-status-codes');
const salesService = require('../services/salesService');
const productService = require('../services/productService');

const ZERO = 0;
const ONE = 1;

const checkIdsAndQuantities = (req, res, next) => {
  const { body } = req;
  let shouldExit = false;
  body.forEach((product) => {
    const { productId, quantity } = product;
    console.log(productId, quantity);
    const productExists = productService.findById(productId);
    console.log('produtoretorno', productExists);
    console.log('tipo', typeof quantity);
    if( productExists.length < ONE
      || quantity <= ZERO
      || typeof quantity !== 'number') {
      console.log('entrou');
      shouldExit = true;
      console.log('dentro', shouldExit);
    }
  });
  console.log('bad', shouldExit);
  if(shouldExit) {
    return res.status(UNPROCESSABLE_ENTITY).send({
      'err': {
        'code': 'invalid_data',
        'message': 'Wrong product ID or invalid quantity'
      }
    });
  }
  next();
};

const hasQuantity = (req, res, next) => {
  const { body } = req;
  for( let i = ZERO; i < body.length; i+=ONE) {
    const { productId, quantity } = body[i];
    productService.findById(productId)
      .then(response => {
        if(response.quantity - quantity < ZERO) {
          console.log('entrou');
          return res.status(NOT_FOUND).send({
            'err': {
              'code': 'stock_problem',
              'message': 'Such amount is not permitted to sell'
            }
          });
        }
      });
  }
  next();
};

const idParamsExists = async (req, res, next) => {
  const { id } = req.params;
  const ZERO = 0;
  const exists = await salesService.findById(id);
  if (!exists || exists.length === ZERO) {
    return res.status(UNPROCESSABLE_ENTITY).send({
      'err': {
        'code': 'invalid_data',
        'message': 'Wrong sale ID format'
      }
    });
  }
  next();
};

module.exports = {
  checkIdsAndQuantities,
  idParamsExists,
  hasQuantity,
};