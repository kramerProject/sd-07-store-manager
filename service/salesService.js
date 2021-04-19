const salesModel = require('../models/salesModel');
const status = require('../config/status');
const productsModel = require('../models/productsModel');

const ZERO = 0;
const validateProductSales = async (productId, quantity) => {
  const resultProductId = await productsModel.findByIdProductsModel(productId);
  if (!resultProductId || typeof quantity !== 'number' || quantity <= ZERO) return false;
  console.log(resultProductId);
  return true;
};

const addSalesService = async (products) => {
  const productsEvery = products.every(async (product) => {
    const validate = await validateProductSales(product.productId, product.quantity);
    console.log(validate);
    return validate;
  });
  console.log('productsEvery',productsEvery);
  if (!productsEvery) {
    return {
      err: {
        code: 'invalid_data',
        status: status.UNPROCESSABLE_ENTITY,
        message: 'Wrong product ID or invalid quantity',
      },
    };
  }
  const salesProducts = await salesModel.addSalesModel(products);
  return salesProducts;
};

module.exports = {
  addSalesService,
};
