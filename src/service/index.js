const { deleteProduct,getOneProduct, getProducts,
  insertProduct, updateProduct } = require('./productsService');
const { delPurchase, getOnePurchase, getPurchase, purchaseInsertion, updatePurchase }
  = require('./purchaseService');

module.exports = {
  deleteProduct,
  delPurchase,
  getOneProduct,
  getOnePurchase,
  getProducts,
  getPurchase,
  insertProduct,
  purchaseInsertion,
  updateProduct,
  updatePurchase,
};
