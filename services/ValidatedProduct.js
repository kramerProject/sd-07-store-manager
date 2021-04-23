const productsModels = require('../models/ProductsModels');

const statusData = {
  invalid: 'invalid_data',
};

const numbers = {
  lengthOfName: 5,
  minQuantity: 1
};

const messages = {
  mProductName: {
    err: {
      code: statusData.invalid, 
      message: '\"name"\ length must be at least 5 characters long',
    }
  },
  mProductExists: {
    err: {
      code: statusData.invalid,  
      message: 'Product already exists',
    }
  },
  mQuantity: {
    err: {
      code: statusData.invalid, 
      message: '\"quantity"\ must be larger than or equal to 1',
    }
  },
  mIsNotNumber: {
    err: {
      code: statusData.invalid,  
      message: '\"quantity"\ must be a number',
    }
  },
  mInvalidFormatId: {
    err: {
      code: statusData.invalid,  
      message: 'Wrong id format',
    }
  }
};

const productName = (name) => {
  if(name.length < numbers.lengthOfName || typeof(name) !== 'string') 
    return true;
  return false;
};

const productExists = async (name) => {
  if(await productsModels.getProductByName(name))
    return true;
  return false;
};

const minQuantity = (quantity) => {
  if(quantity < numbers.minQuantity)
    return true;
  return false;
};

const isNotNumber = (quantity) => {
  if(typeof(quantity) !== 'number')
    return true;
  return false;
};

module.exports = {
  messages,
  productName,
  productExists,
  isNotNumber,
  minQuantity,
}; 