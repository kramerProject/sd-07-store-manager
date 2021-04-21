const {
  createNewProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} = require('./productsService');

const {
  createNewSales,
  getAllSales,
  getSaleById,
  updateSaleById,
  deleteSaleById,
} = require('./salesService');

module.exports = {
  createNewProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  createNewSales,
  getAllSales,
  getSaleById,
  updateSaleById,
  deleteSaleById,
};
