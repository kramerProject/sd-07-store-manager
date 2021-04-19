const productModel = require('../models/productModels');

const createProducts = async (name, quantity) => {
  const response = await productModel.createProducts(name, quantity);
  return response;
};

const getProducts = async (id) => {
  if (id === undefined) {
    return await productModel.getAll();
  };
  await productModel.getById(id);
};

module.exports = { createProducts, getProducts };
