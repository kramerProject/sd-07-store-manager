const productMiddleware = require('./product');
const idMiddleware = require('./id');
const updateMiddleware = require('./update');

const salesMiddleware = require('./sales');
const idSaleMiddleware = require('./idSale');
const idDeleteMiddleware = require('./idSaleDelete');

module.exports = {
  productMiddleware,
  idMiddleware,
  updateMiddleware,
  salesMiddleware,
  idSaleMiddleware,
  idDeleteMiddleware
};
