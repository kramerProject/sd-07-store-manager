const Product = require('../models/productModel');

const verifyName = async (name) => {
  let message;
  const MIN_NAME_LENGTH = 5;
  const allProducts = await Product.getAllProducts();
  const isNotUnique = allProducts.find(product => product.name === name);
  if (name.length < MIN_NAME_LENGTH) {
    message = '"name" length must be at least 5 characters long';
  }
  if (isNotUnique) {
    message = 'Product already exists';
  }
  return message;
};

const verifyQuantity = (quantity) => {
  let message;
  const MIN_QUANTITY = 0;
  if (typeof quantity === 'string') {
    message = '"quantity" must be a number';
  }
  if (quantity <= MIN_QUANTITY) {
    message = '"quantity" must be larger than or equal to 1';
  }
  return message;
};

const verifyEntries = async (name, quantity) => {
  const checkNameEntries = await verifyName(name);
  const checkQuantityEntries = verifyQuantity(quantity);
  const tests = [checkNameEntries, checkQuantityEntries];
  return tests.find(test => test !== undefined);
};

module.exports = {
  verifyEntries,
};
