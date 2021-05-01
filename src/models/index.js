const { 
  addProduct,
  productNameExist,
  getProducts,
  getProductsById,
  updateProduct,
  deleteProductsById,
} = require('./productsModel');

const {
  addSale,
  getSales,
} = require('./salesModel');

module.exports = {
  addProduct,
  productNameExist,
  getProducts,
  getProductsById,
  updateProduct,
  deleteProductsById,
  addSale,
  getSales
};
