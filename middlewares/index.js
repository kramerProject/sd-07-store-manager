const errorMiddleware = require('./error');
const CustomError = require('./CustomError');
const validateProduct = require('./validateProduct');
const validateId = require('./validateProductId');
const validateSales = require('./validateSales');


module.exports = {
  CustomError,
  errorMiddleware,
  validateProduct,
  validateId,
  validateSales,
};
