const { findProductByName } = require('../models/ProductModel');
const { ObjectId } = require('mongodb');
const status = require('../services/status');
const MIN_CHARACTERS_NAME = 5;
const ZERO = 0;

const validName = async (req, _res, next) => {
  const { name } = req.body;
  /*  if () {
     next({
       code: 'invalid_data',
       status: status.UNPROCESSABLE_ENTITY,
       message: '"name" length must be at least 5 characters long'
     });
   } */

  if (!name || name.length < MIN_CHARACTERS_NAME) {
    next({
      code: 'invalid_data',
      status: status.UNPROCESSABLE_ENTITY,
      message: '"name" length must be at least 5 characters long',
    });
    /*
    { error: { message: <mensagem de erro>, code: <código do erro> } }
    */
  }
  if ((await findProductByName(name)).length > ZERO) {
    console.log(await findProductByName(name));
    next({
      code: 'invalid_data',
      status: status.UNPROCESSABLE_ENTITY,
      message: 'Product already exists',
    });
  }
  next();
};

const validQuantity = (req, _res, next) => {
  const { quantity } = req.body;
  if (!quantity || quantity < 1) {
    next({
      code: 'invalid_data',
      status: status.UNPROCESSABLE_ENTITY,
      message: '\"quantity\" must be larger than or equal to 1',
    });
  }
  if (typeof quantity !== 'number') {
    next({
      code: 'invalid_data',
      status: status.UNPROCESSABLE_ENTITY,
      message: '\"quantity\" must be a number',
    });
  }
  next();
};

const validId = (req, _res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    next({
      code: 'invalid_data',
      status: status.UNPROCESSABLE_ENTITY,
      message: 'Wrong id format',
    });
  }
  next();
};

module.exports = {
  validName,
  validQuantity,
  validId,
};
