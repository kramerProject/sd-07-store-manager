const { isValidQuantity, isQuantityNumber } = require('./productService');

function validateQuantity(quantity) {
  if (isValidQuantity(quantity) && isQuantityNumber(quantity)) return true;
  return false;
}

module.exports = {
  validateQuantity
};
