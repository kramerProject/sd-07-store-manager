const connect = require('../db');
const status = require('http-status');
const collectionp = 'products';
const products = require('../services/productService');

async function verifyName(req, res, next) {
  const { name } = req.body;
  const minLength = 5;
  if (name.length < minLength) return res
    .status(status.UNPROCESSABLE_ENTITY)
    .json(
      {
        err:
          { code: 'invalid_data',
            message: '"name" length must be at least 5 characters long' }
      });
  const foundName = await products.getByProductName(name);
  if(foundName) {
    return res
      .status(status.UNPROCESSABLE_ENTITY)
      .json({
        err:
          { code: 'invalid_data',
            message: 'Product already exists' }
      });}
  next();
}

function verifyQuantity(req, res, next) {
  const { quantity } = req.body;
  const minimumValue = 1;

  if (quantity < minimumValue) return res
    .status(status.UNPROCESSABLE_ENTITY).json(
      {
        err:
          { code: 'invalid_data',
            message: '"quantity" must be larger than or equal to 1' }
      });

  if (typeof quantity !== 'number') return res
    .status(status.UNPROCESSABLE_ENTITY).json({
      err:
        { code: 'invalid_data', message: '"quantity" must be a number' }
    });
  next();
}

async function verifyExists(req, res, next) {
  const {id} = req.params;
  const foundId = await products.getByProductId(id);
  if(!foundId){
    return res
      .status(status.UNPROCESSABLE_ENTITY).json({
        err:
          { code: 'invalid_data', message: 'Wrong id format' }
      });
  }
  next();
}

module.exports = { 
  verifyName, 
  verifyQuantity, 
  verifyExists 
};
