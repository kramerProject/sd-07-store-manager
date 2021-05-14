const { StatusCodes: { UNPROCESSABLE_ENTITY } } = require('http-status-codes');
const { findByName } = require('../services/productService');

const checkNameAndQuantity = (req, res, next) => {
  const { name, quantity } = req.body;
  const minNameLength = 5;
  const ZERO = 0;
  if(typeof name !== 'string' || name.length <= minNameLength) {
    return res.status(UNPROCESSABLE_ENTITY).send({
      'err': {
        'code': 'invalid_data',
        'message': '\"name\" length must be at least 5 characters long'
      }
    });
  }
  if(typeof quantity !== 'number') {
    return res.status(UNPROCESSABLE_ENTITY).send({
      'err': {
        'code': 'invalid_data',
        'message': '\"quantity\" must be a number'
      }
    });
  }
  if(quantity <= ZERO) {
    return res.status(UNPROCESSABLE_ENTITY).send({
      'err': {
        'code': 'invalid_data',
        'message': '\"quantity\" must be larger than or equal to 1'
      }
    });
  }
  next();
};
//testado - funcionando.
const itExists = async (req, res, next) => {
  const { name } = req.body;
  const exists = await findByName(name);
  if (exists !== undefined) {
    res.status(UNPROCESSABLE_ENTITY).send({
      'err': {
        'code': 'invalid_data',
        'message': 'Product already exists'
      }
    });
  }
  next();
};
const idExists = (req, res, next) => {
  const { id } = req.body;
  const ZERO = 0;
  const exists = findById(id);
  if (!exists || exists.length === ZERO) {
    res.status(UNPROCESSABLE_ENTITY).send({
      'err': {
        'code': 'invalid_data',
        'message': 'Wrong id format'
      }
    });
  }
  next();
};

module.exports = {
  checkNameAndQuantity,
  itExists,
  idExists,
};