const errorMiddleware = require('./errorMiddleware');
const nameValidate = require('./nameValidate');
const quantityValidate = require('./quantityValidate');
const productExistsValidate = require('./productExistsValidate');
const idValidate = require('./idValidate');

module.exports = {
  errorMiddleware,
  nameValidate,
  quantityValidate,
  productExistsValidate,
  idValidate,
};