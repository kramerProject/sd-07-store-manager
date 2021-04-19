const { delProduct, getOnePdt, getProductByName,
  getProductsList, registerProduct,
  updatePdtById } = require('./productsModel');
const { delPurch, getOnePurch, getPurchaseList, insertPurchase,
  updtPurch } = require('./purchaseModel');
 
module.exports = {
  delProduct,
  delPurch,
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
