const ProductModel = require('../models/ProductModel');

const getProductById = async(id) => {
  const productRes = await ProductModel.getProductById(id);
   
  return productRes;
};

const deleteProduct = async(id) => {
  const product = await ProductModel.getProductById(id);
  
  if (product) {
    const { name, quantity } = product;
    const productRes = await ProductModel.deleteProduct(id, name, quantity);
    return productRes;
  } else {
    const productRes = await ProductModel.deleteProduct('');
    return productRes;
  }
  
};


module.exports = {
  getProductById,
  deleteProduct
};