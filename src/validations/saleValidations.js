const productModel = require('../models/productModel');

const ZERO = 0;

const verifyProductsId = async (arrayOfSales) => {
  const arrayOfProducts = await productModel.getAllProducts();
  const arrayOfIds = arrayOfProducts.map(product => product._id);
  for (let index = ZERO; index < arrayOfSales.length; index++) {
    const element = arrayOfSales[index];
    const validation = await productModel.getProductById(element.productId);

    if(validation === null) {
      return true;
    }
  }
  return false;
};

const verifyQuantity = (arrayOfSales) => {
  const validation = arrayOfSales
    .some(sale => (sale.quantity <= ZERO) || (typeof sale.quantity === 'string'));
  return validation;
};

module.exports = {
  verifyProductsId,
  verifyQuantity
};
