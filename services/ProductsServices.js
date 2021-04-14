const { json } = require('body-parser');
const productsModel = require('../models/ProductsModel');

const five = 5;
const zero = 0;
const unprocessable = 422;

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

const isValid = (name, quantity) => {
  // const productDuplicated = await productsModel.findProductByName(name);
  if (name.length < five) {
    const HTTPcode = unprocessable;
    return HTTPcode, nameLenght;
  }
  // if (productDuplicated) {
  //   return res.status(unprocessable).json(duplicateProduct);
  // }
  // if (quantity <= zero) {
  //   return res.status(unprocessable).json(lowQuantity);
  // }
  // if (typeof quantity === 'string') {
  //   return res.status(unprocessable).json(stringQuantity);
  // }
  return isValid;
};

const createProducts = async (name, quantity) => {
  const validate = isValid(name, quantity,);
  if(!validate) {
    const productsService = await productsModel.createProducts(name, quantity);
    return productsService;
  }
};

module.exports = {
  createProducts,
};
