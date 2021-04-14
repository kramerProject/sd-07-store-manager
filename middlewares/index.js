const errorMiddleware = require('./errorMiddleware');
const nameValidate = require('./nameValidate');
const quantityValidate = require('./quantityValidate');
const productExistsValidate = require('./productExistsValidate');

module.exports = {
  errorMiddleware,
  nameValidate,
  quantityValidate,
  productExistsValidate,
};