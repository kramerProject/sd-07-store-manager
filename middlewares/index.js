const validateProduct = require('./validateProduct');
const checkDuplicate = require('./checkDuplicate');
const errorMiddleware = require('./errorMiddleware');

module.exports = {
  validateProduct,
  checkDuplicate,
  errorMiddleware,
};
