const { deleteProduct,getOneProduct, getProducts,
  insertProduct, updateProduct } = require('./productsService');
const { getOnePurchase, getPurchase, purchaseInsertion, updatePurchase }
  = require('./purchaseService');

module.exports = {
  deleteProduct,
  getOneProduct,
  getOnePurchase,
  getProducts,
  getPurchase,
  insertProduct,
  purchaseInsertion,
  updateProduct,
  updatePurchase,
};
