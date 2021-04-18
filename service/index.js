const productModel = require('../models/productModels');

const createProducts = async (name, quantity) => {
  try {
    const response = await productModel.createProducts(name, quantity);
    return response;
      
  } catch (err) {
    console.error('createProducts em ./service');
    console.error(err);
  }
};

module.exports = { createProducts };
