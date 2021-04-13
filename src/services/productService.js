const products = require('../models/productModel');


const addProduct = async (name, quantity) => {
  const result = await products.addProduct(name, quantity);
  if (!result) return {
    err: {
      code: 'invalid_data',
      message: 'Product already exists',
    }
  };

  return result;
};

module.exports = {
  addProduct,
};