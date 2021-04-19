const { delProduct, getOnePdt, getProductByName,
  getProductsList, registerProduct,
  updatePdtById } = require('./productsModel');
const { getOnePurch, getPurchaseList, insertPurchase,
  updtPurch } = require('./purchaseModel');
 
module.exports = {
  delProduct,
  getOnePdt,
  getOnePurch,
  getProductByName,
  getProductsList,
  getPurchaseList,
  insertPurchase,
  registerProduct,
  updatePdtById,
  updtPurch,
};
