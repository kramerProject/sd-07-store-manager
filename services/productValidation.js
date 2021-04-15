const allProducts = require('../models/productModel');

const minSize = 5;
const zero = 0;

const minChar = (name) => {
  if(name.length < minSize) return err = {
    response: {err: {
      'code': 'invalid_data',
      'message': '"name" length must be at least 5 characters long'
    }},
    status: 422,
  };
};

const isDuplicated = async (name) => {
  const productList = await allProducts.getAll();
  const duplicate = productList.find((product) => product.name === name);
  if(duplicate) return err = {
    response: {err: {
      'code': 'invalid_data', 
      'message': 'Product already exists'
    }
    },
    status: 422,
  };
};

const minQtd = (quantity) => {
  if(quantity <= zero) return err = {
    response: {err: {
      'code': 'invalid_data',
      'message': '"quantity" must be larger than or equal to 1'
    }},
    status: 422,
  };
};

const isNumber = (quantity) => {
  if(typeof quantity !== 'number') return err = {
    response: {err: {
      'code': 'invalid_data',
      'message': '"quantity" must be a number'
    }},
    status: 422,
  };
};

module.exports = {
  minChar,
  isDuplicated,
  minQtd,
  isNumber
};