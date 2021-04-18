const { deleteProduct,getOneProduct, getProducts,
  insertProduct, updateProduct } = require('./productsService');
const purchaseInsertion = require('./purchaseService');

module.exports = {
  deleteProduct,
  getOneProduct,
  getProducts,
  insertProduct,
  purchaseInsertion,
  updateProduct
};
