const validateProducts = require('./validateProductsMiddleware');
const validateSales = require('./validateSalesMiddleware');
const verifyStock = require('./verifyStock');

module.exports = {
  validateProducts,
  validateSales,
  verifyStock
};
