const productsModels = require('../models/ProductsModels');

const statusData = {
  invalid: 'invalid_data',
};

const numbers = {
  lengthOfName: 5,
  minQuantity: 1
};

const message = {
  productName: {
    err: {
      code: statusData.invalid, 
      message: '\"name"\ length must be at least 5 characters long',
    }
  },
  productExists: {
    err: {
      code: statusData.invalid,  
      message: 'Product already exists',
    }
  },
  quantity: {
    err: {
      code: statusData.invalid, 
      message: '\"quantity"\ must be larger than or equal to 1',
    }
  },
  isNotNumber: {
    err: {
      code: statusData.invalid,  
      message: '\"quantity"\ must be a number',
    }
  },
  invalidFormatId: {
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

const isNotNumber = (qtd) => {
  if(typeof(qtd) !== 'number')
    return true;
  return false;
};

const minQuantity = (qtd) => {
  if(qtd < numbers.minQuantity)
    return true;
  return false;
};

module.exports = {
  message,
  productName,
  productExists,
  isNotNumber,
  minQuantity,
}; 