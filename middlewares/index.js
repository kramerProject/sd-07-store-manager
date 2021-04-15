const errorMiddleware = require('./errorMiddleware');
const nameValidate = require('./nameValidate');
const quantityValidate = require('./quantityValidate');
const productExistsValidate = require('./productExistsValidate');
const idValidate = require('./idValidate');
const idSaleValidate = require('./idSaleValidate');
const quantityOrWrongId = require('./quantityOrWrongId');
const stockControl = require('./stockControl');

module.exports = {
  errorMiddleware,
  nameValidate,
  quantityValidate,
  productExistsValidate,
  idValidate,
  idSaleValidate,
  quantityOrWrongId,
  stockControl,
};