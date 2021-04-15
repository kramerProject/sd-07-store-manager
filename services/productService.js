const productModel = require('../models/productModel');

const registerProduct = async (name, quantity) => {
  return await productModel.registerProduct(name, quantity);
};

const getByName = async (name) => {
  return await productModel.getByName(name);
};

const getAll = async () => {
  return await productModel.getAll();
};

const getById = async (id) => {
  return await productModel.getById(id);
};

const updateProduct = async (id, name, quantity) => {
  return await productModel.updateProduct(id, name, quantity);
};

const removeProduct = async (id) => {
  return await productModel.removeProduct(id);
};

module.exports = {
  registerProduct,
  getByName,
  getAll,
  getById,
  updateProduct,
  removeProduct,
};
