const productsModel = require('../models/productsModel');

const createProduct = async (name, quantity) => {
  return await productsModel.createProduct(name, quantity);
};

module.exports = {
  createProduct
};