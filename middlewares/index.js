const validateNameMiddleware = require('./validateName');
const validateNameDuplicatedMiddleware = require('./validateNameDuplicated');
const validateQuantityMiddleware = require('./validateQuantity');
const validateProductNotExistMiddleware = require('./validateProductNotExist');
const validateSaleProdQuantityMiddleware = require('./validateSaleProdQuantity');

module.exports = {
  validateNameMiddleware,
  validateNameDuplicatedMiddleware,
  validateQuantityMiddleware,
  validateProductNotExistMiddleware,
  validateSaleProdQuantityMiddleware   
};