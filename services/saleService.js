const Product = require('../models/productModel');

const verifyEntries = (entries) => {
  const MIN_QUANTITY = 0;
  const typeCheck = entries
    .every(entry => typeof entry.quantity === 'number');
  const quantityCheck = entries
    .every(entry => entry.quantity > MIN_QUANTITY);
  console.log('quantidade', quantityCheck);
  if (!typeCheck || !quantityCheck) {
    return 'Wrong product ID or invalid quantity';
  }
  return false;
};

module.exports = {
  verifyEntries,
};