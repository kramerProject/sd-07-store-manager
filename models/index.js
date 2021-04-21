const {
  createNewProduct,
  getProductByName,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} = require('./productsModel');

const {
  createNewSale,
  getAllSales,
  getSaleById,
  updateSaleById,
  deleteSaleById,
} = require('./salesModel');

module.exports = {
  createNewProduct,
  getProductByName,
  getProductById,
  getAllProducts,
  updateProductById,
  deleteProductById,
  createNewSale,
  getAllSales,
  getSaleById,
  updateSaleById,
  deleteSaleById,
};
