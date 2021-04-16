const nameValidationMiddleware = require('./nameValidationMiddleware');
const quantityValidationMiddleware = require('./quantityValidationMiddleware');
const idValidationMiddleware = require('./idValidationMiddleware');
const saleValidationMiddleware = require('./saleValidationMiddleware');

module.exports = {
  nameValidationMiddleware,
  quantityValidationMiddleware,
  idValidationMiddleware,
  saleValidationMiddleware
};