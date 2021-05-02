const { addProductModel, getAllProductsModel } = require('../models/productsModel');

const addProductService = async(name, quantity) => {
  return await addProductModel(name, quantity);
};

const getAllProductsService = async() => {
  return await getAllProductsModel();
};

module.exports = { addProductService, getAllProductsService };
