const productsModel = require('../models/productsModel');
const status = require('../config/status');

const ONE = 1;
const FIVE = 5;
const validateProduct = async (name, quantity) => {
  if (!name || name.length < FIVE) {
    return {
      code: 'invalid_data',
      status: status.UNPROCESSABLE_ENTITY,
      message: '"name" length must be at least 5 characters long',
    };
  }
  if (!quantity || quantity < ONE) {
    return {
      code: 'invalid_data',
      status: status.UNPROCESSABLE_ENTITY,
      message: '"quantity" must be larger than or equal to 1',
    };
  }
  if ( typeof quantity !== 'number') {
    return {
      code: 'invalid_data',
      status: status.UNPROCESSABLE_ENTITY,
      message: '\"quantity\" must be a number',
    };
  }
  const findProductsByNane = await productsModel.findProductsByNane(name);
  if(findProductsByNane !== null) {
    return {
      code: 'invalid_data',
      status: status.UNPROCESSABLE_ENTITY,
      message: 'Product already exists',
    };
  }
  
  const result = await productsModel.addProduct(name, quantity);
  return result;
};

module.exports = {
  validateProduct,
};
