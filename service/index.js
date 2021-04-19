const productModel = require('../models/productModels');

const createProducts = async (name, quantity) => {
  const response = await productModel.createProducts(name, quantity);
  return response;
};

const getProductsById = async (id) => {
  await productModel.getById(id);
};

module.exports = { createProducts, getProductsById };
