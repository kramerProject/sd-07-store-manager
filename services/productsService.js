const productsModel = require('../models/productsModel');

const createProduct = async (name, quantity) => {
  const newProduct = await productsModel.create(name, quantity);

  return newProduct;
};

module.exports = { createProduct };
