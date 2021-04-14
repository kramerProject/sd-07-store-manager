const allProducts = require('../models/productModel')

const productIsValid = async (name, quantity) => {
  const productList = await allProducts.getAll();
  const productExists = productList.find((product) => product.name === name);
  const prodMinSize = 5;

  if(name.lenght < prodMinSize) return err = {
    response: {err: {
      'code': 'invalid_data',
      'message': '"name" length must be at least 5 characters long'
    }},
    code: 422,
  }
  if(quantity <= 0) return err = {
    response: {err: {
      'code': 'invalid_data',
      'message': '"quantity" must be larger than or equal to 1'
    }},
    code: 422,
  }
  if(typeof quantity !== 'number') return err = {
    response: {err: {
      'code': 'invalid_data',
      'message': '"quantity" must be a number'
    }},
    code: 422,
  }
  if(productExists) return err = {
    response: {err: {
        'code': 'invalid_data', 
        'message': 'Product already exists'
      }
    },
    code: 422,
  };
  return {
    response: productList, 
    code: 201
  };
}

module.exports = {
  productIsValid
}