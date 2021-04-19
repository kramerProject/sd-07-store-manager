const salesModel = require('../models/salesModel');
const status = require('../config/status');
const productsModel = require('../models/productsModel');

const ZERO = 0;
const validateProductSales = async (productId, quantity) => {
  const resultId = await productsModel.findByIdProductsModel(productId);
  if (!resultId || typeof quantity !== 'number' || quantity <= ZERO) {
    return false;
  };
  return true;
};

const addSalesService = async (products) => {
  const productsEvery = products.every((product) => {
    const validate = validateProductSales(product.productId, product.quantity);
    return validate;
  });
  
  if (!productsEvery) {
    return {
      err: {
        code: 'invalid_data',
        status: status.UNPROCESSABLE_ENTITY,
        message: 'Wrong product ID or invalid quantity',
      },
    };
  }
  const resultProducts = await salesModel.addSalesModel(products);
  return resultProducts;
};

module.exports = {
  addSalesService,
};
