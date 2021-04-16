const validateNameMiddleware = require('./validateName');
const validateNameDuplicatedMiddleware = require('./validateNameDuplicated');
const validateQuantityMiddleware = require('./validateQuantity');
const validateProductNotExistMiddleware = require('./validateProductNotExist');

module.exports = {
  validateNameMiddleware,
  validateNameDuplicatedMiddleware,
  validateQuantityMiddleware,
  validateProductNotExistMiddleware   
};