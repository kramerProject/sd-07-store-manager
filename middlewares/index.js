const validateNameMiddleware = require('./validateName');
const validateNameDuplicatedMiddleware = require('./validateNameDuplicated');
const validateQuantityMiddleware = require('./validateQuantity');
const validateProductNotExistMiddleware = require('./validateProductNotExist');
const validateSaleProdQuantityMiddleware = require('./validateSaleProdQuantity');
const validateSaleExistsMiddleware = require('./validateSaleExists');
const validateSaleExcludeMiddleware = require('./validateSaleExclude');

module.exports = {
  validateNameMiddleware,
  validateNameDuplicatedMiddleware,
  validateQuantityMiddleware,
  validateProductNotExistMiddleware,
  validateSaleProdQuantityMiddleware,
  validateSaleExistsMiddleware,
  validateSaleExcludeMiddleware   
};