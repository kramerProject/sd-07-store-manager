const productsModel = require('../models/productsModel');
const errorObj = {
  err: {
    code: 'invalid_data',
    message: ''
  }
};

const createProduct = async (name, quantity) => {
  return await productsModel.createProduct(name, quantity);
};

const getProductById = async (id) => {
  const productById = await productsModel.getProductById(id);
  
  if(!productById) {
    errorObj.err.message = 'Wrong id format';
    return errorObj;
  }

  return productById;
};

module.exports = {
  createProduct,
  getProductById
};