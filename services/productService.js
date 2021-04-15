const allProducts = require('../models/productModel');
const zero = 0;

const productIsValid = async (name, quantity) => {
  const productList = await allProducts.getAll();
  const productExists = await productList.find((product) => product.name === name);
  const prodMinSize = 5;

  if(name.lenght < prodMinSize) return err = {
    response: {err: {
      'code': 'invalid_data',
      'message': '"name" length must be at least 5 characters long'
    }},
    code: 422,
  };
  if(quantity <= zero) return err = {
    response: {err: {
      'code': 'invalid_data',
      'message': '"quantity" must be larger than or equal to 1'
    }},
    code: 422,
  };
  if(typeof quantity !== 'number') return err = {
    response: {err: {
      'code': 'invalid_data',
      'message': '"quantity" must be a number'
    }},
    code: 422,
  };
  if(productExists) return err = {
    response: {err: {
      'code': 'invalid_data', 
      'message': 'Product already exists'
    }
    },
    code: 422,
  };
  const result = await allProducts.createProduct(name, quantity);
  return {
    response: result, 
    code: 201
  };
};


module.exports = {
  productIsValid
};