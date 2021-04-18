const { delProduct, getOnePdt, getProductByName,
  getProductsList, registerProduct,
  updatePdtById } = require('./productsModel');
const insertPurchase = require('./purchaseModel');
 
module.exports = {
  delProduct,
  getOnePdt,
  getProductByName,
  getProductsList,
  insertPurchase,
  registerProduct,
  updatePdtById,
};
