const Product = require('../models/productModel');

const code = 'invalid_data';
const nameSize = 5;
const quantityValue = 1;

const invalidName = {
  err: {
    code,
    message: '"name" length must be at least 5 characters long'
  }
};

const existentName = {
  err: {
    code,
    message: 'Product already exists'
  }
};

const invalidQuantity = {
  err: {
    code,
    message: '"quantity" must be larger than or equal to 1'
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
    throw new Error(JSON.stringify(invalidName));
};

const nameExists = async (name) => {
  const productByname = await Product.getProductByName(name);
  if(productByname) throw new Error(JSON.stringify(existentName));
};

const quantityIsValid = (quantity) => {
  if (quantity < quantityValue) {
    throw new Error(JSON.stringify(invalidQuantity));
  } else if (typeof quantity !== 'number') {
    throw new Error(JSON.stringify(notNumberQuantity));
  }
};

const productDataValidation = async(reqProduct) => {
  nameIsValid(reqProduct.name);
  quantityIsValid(reqProduct.quantity);
  await nameExists(reqProduct.name);
};

module.exports = {
  productDataValidation,
};
