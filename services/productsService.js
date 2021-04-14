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

const deleteProduct = async (id) => {
  const deletedProduct = await productsModel.deleteProduct(id);
  
  if(!deletedProduct) {
    errorObj.err.message = 'Wrong id format';
    return errorObj;
  }

  return deletedProduct;
};

module.exports = {
  createProduct,
  getProductById,
  deleteProduct
};