const productsModel = require('../model/products.js');


const validateAlreadyExists = async (name) => {
  let message;
  const all = await productsModel.getAll();
  const alreadyExists = all.find( product => product.name === name);
  if (alreadyExists) {
    message = 'Product already exists';
  }
  return message;
};

const validateName = (name) => {
  let message;
  const five = 5;
  if (name.length < five) {
    message = '"name" length must be at least 5 characters long';
  }
  return message;
};

const validateQuantity = (quantity) => {
  let message;
  const one = 1;
  if (typeof quantity === 'string') {
    message = '"quantity" must be a number';
  }
  if (quantity < one) {
    message = '"quantity" must be larger than or equal to 1';
  }
  return message;
};


module.exports = {
  validateAlreadyExists,
  validateName,
  validateQuantity,
};
