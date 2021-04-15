const Product = require('../models/productModel');

const code = 'invalid_data';
const nameSize = 5;
const quantityValue = 1;

// const invalidName = {
//   err: {
//     'code': 'invalid_data' ,
//     'message': '"name" lenght must be at least 5 character long'
//   }
// };

// const invalidName = '"name" lenght must be at least 5 character long';
const invalidName = { teste: '"name" lenght must be at least 5 character long' };

const existentName = {
  err: {
    code,
    message: 'Product already exists'
  }
};

const invalidQuantity = {
  err: {
    code,
    message: '"quantity" must be larger than ou equal to 1'
  }
};

const notNumberQuantity = {
  err: {
    code,
    message: '"quantity" must be a number'
  }
};

const nameIsValid = (name) => {
  if (name.length < nameSize ) 
    throw new Error(invalidName);
};

const nameExists = async (name) => {
  if(await Product.getProductByName(name))
    throw new Error(existentName);
};

const quantityIsValid = (quantity) => {
  if (quantity < quantityValue) {
    throw new Error(invalidQuantity);
  } else if (typeof quantity !== 'number') {
    throw new Error(notNumberQuantity);
  }
};

const ProductIsValid = (reqProduct) => {
  nameIsValid(reqProduct.name);
  nameExists(reqProduct.name);
  quantityIsValid(reqProduct.quantity);
};

module.exports = {
  ProductIsValid,
};
