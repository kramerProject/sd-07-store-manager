const errorMiddleware = require('./errorMiddleware');
const nameValidate = require('./nameValidate');
const quantityValidate = require('./quantityValidate');
const productExistsValidate = require('./productExistsValidate');
const idValidate = require('./idValidate');
const idSaleValidate = require('./idSaleValidate');
const quantityOrWrongId = require('./quantityOrWrongId');

module.exports = {
  errorMiddleware,
  nameValidate,
  quantityValidate,
  productExistsValidate,
  idValidate,
  idSaleValidate,
  quantityOrWrongId,
};