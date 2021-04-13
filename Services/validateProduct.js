const Product = require('../Models/Products');

const codes = {
  invalid: 'invalid_data',
};

const numbers = {
  nameLength: 5,
  minQuantity: 1
};

const message = {
  productName: {
    err: {
      code: codes.invalid, 
      message: '\"name"\ length must be at least 5 characters long',
    }
  },
  productExists: {
    err: {
      code: codes.invalid, 
      message: 'Product already exists',
    }
  },
  quantity: {
    err: {
      code: codes.invalid, 
      message: '\"quantity"\ must be larger than or equal to 1',
    }
  },
  quantityNotNumber: {
    err: {
      code: codes.invalid, 
      message: '\"quantity"\ must be a number',
    }
  },
  wrongId: {
    err: {
      code: codes.invalid, 
      message: 'Wrong id format',
    }
  }
};

const productName = (name) => {
  if(name.length < numbers.nameLength || typeof(name) !== 'string') 
    return true;
  return false;
};

const productExists = async (name) => {
  if(await Product.getByProductName(name))
    return true;
  return false;
};

const isntNumber = (qty) => {
  if(typeof(qty) !== 'number')
    return true;
  return false;
};

const minQuantity = (qty) => {
  if(qty < numbers.minQuantity)
    return true;
  return false;
};

module.exports = {
  productName,
  message,
  productExists,
  minQuantity,
  isntNumber,
};