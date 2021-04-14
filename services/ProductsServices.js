const { json } = require('body-parser');
const productsModel = require('../models/ProductsModel');

const five = 5;
const zero = 0;
const unprocessable = 422;
const success = 201;
const OK = 200;

const nameLenght = {
  err: {
    code: 'invalid_data',
    message: '"name" length must be at least 5 characters long',
  },
};

const duplicateProduct = {
  err: {
    code: 'invalid_data',
    message: 'Product already exists',
  },
};

const lowQuantity = {
  err: {
    code: 'invalid_data',
    message: '"quantity" must be larger than or equal to 1',
  },
};

const stringQuantity = {
  err: {
    code: 'invalid_data',
    message: '"quantity" must be a number',
  },
};

const validateCustomHTTP = (message, http = unprocessable) => {
  return {
    http,
    message,
  };
};

const successValidate = (message) => {
  return {
    http: success,
    message,
  };
};

const isValidRegister = async (name, quantity) => {
  const productDuplicated = await productsModel.findProductByName(name);
  if (name.length < five) return nameLenght;
  if (productDuplicated) return duplicateProduct;
  if (quantity <= zero) return lowQuantity;
  if (typeof quantity === 'string') return stringQuantity;
  return null;
};

const createProducts = async (name, quantity) => {
  const validate = await isValidRegister(name, quantity);
  if(validate){
    return validateCustomHTTP(validate);
  }
  const productsService = await productsModel.createProducts(name, quantity);
  return successValidate(productsService);
};

module.exports = {
  createProducts,
};
