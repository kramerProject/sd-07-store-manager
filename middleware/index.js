const checkProductInsertion = require('./checkProductInsertion');
const checkProductId = require('./checkProductId');
const checkProductUpdate = require('./checkProductUpdate');
const checkNewSale = require('./checkNewSale');
const checkSaleId = require('./checkSaleId');
const checkSaleUpdate = require('./checkSaleUpdate');
const errorMiddleware = require('./errorMiddleware');

module.exports = {
  checkProductInsertion,
  checkProductId,
  checkProductUpdate,
  checkNewSale,
  checkSaleId,
  checkSaleUpdate,
  errorMiddleware,
};
