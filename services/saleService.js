const Product = require('../models/productModel');
const MIN_QUANTITY = 0;

const verifyProduct = async (entries) => {
  const FIRST_PRODUCT = 0;
  const MIN_QUANTITY = 0;
  const allProducts = await Product.getAllProducts();
  const intersection = entries
    .filter(entry => allProducts
      .find(product => entry.productId.toString() === product._id.toString()));
  const selectedProduct = await Product
    .getProductById(intersection[FIRST_PRODUCT].productId);
  const remaining = selectedProduct.quantity - intersection[FIRST_PRODUCT].quantity;
  if (remaining < MIN_QUANTITY) return 'Such amount is not permitted to sell';
  return false;
};

const verifyEntries = (entries) => {
  const MIN_QUANTITY = 0;
  const typeCheck = entries
    .every(entry => typeof entry.quantity === 'number');
  const quantityCheck = entries
    .every(entry => entry.quantity > MIN_QUANTITY);
  if (!typeCheck || !quantityCheck) {
    return 'Wrong product ID or invalid quantity';
  }
  return false;
};

module.exports = {
  verifyEntries,
  verifyProduct,
};