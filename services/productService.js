const product = require('../models/productModel');

const createProduct = async (name, quantity) => {

  newProduct = await product.create(name, quantity);

  return newProduct;
};


module.exports = {
  createProduct,
};