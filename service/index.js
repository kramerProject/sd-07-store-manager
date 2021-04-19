const productModel = require('../models/productModels');

const createProducts = (name, quantity) => {
  return productModel.createProducts(name, quantity);
};

const getAll = () => {
  return productModel.getAll();
};

const getProductsById = (id) => {
  return productModel.getById(id);
};

const updateById = (id, name, quantity) => {
  return productModel.updateById(id, name, quantity);
};

module.exports = { createProducts, getAll, getProductsById, updateById };
