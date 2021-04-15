const validateProduct = require('./validateProduct');
const checkDuplicate = require('./checkDuplicate');
const errorMiddleware = require('./errorMiddleware');
const validateSale = require('./validateSale');

module.exports = {
  validateProduct,
  checkDuplicate,
  errorMiddleware,
  validateSale,
};
