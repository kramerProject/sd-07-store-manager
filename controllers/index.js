const {
  createNewProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} = require('./productsController');

const {
  createNewSales,
  getAllSales,
  getSaleById,
  updateSaleById,
  deleteSaleById,
} = require('./salesController');

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
