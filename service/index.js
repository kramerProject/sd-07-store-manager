const productModel = require('../models/productModels');

const createProducts = async (name, quantity) => {
  const response = await productModel.createProducts(name, quantity);
  return response;
};

const getAll = async () => {
  return { "mensagem": "busquem conhecimento" };
};

const getProductsById = async (id) => {
  await productModel.getById(id);
};

module.exports = { createProducts, getAll,getProductsById };
