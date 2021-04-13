const productModel = require('../models/products');

const ZERO = 0;
const ONE = 1;
const FIVE = 5;

const validateName = (name) => {
  if (typeof name !== 'string' || name.length < FIVE) {
    throw new Error('"name" length must be at least 5 characters long');
  }
};

const validateQuantity = (quantity) => {
  if (typeof quantity !== 'number') {
    throw new Error('"quantity" must be a number');
  }
  if (!Number.isInteger(quantity) || quantity < ONE) {
    throw new Error('"quantity" must be larger than or equal to 1');
  }
};

const createProduct = async ({ name, quantity }) => {
  validateName(name);
  validateQuantity(quantity);

  const registeredNames = await productModel.findByName(name);

  console.log(registeredNames);
  if (registeredNames.length !== ZERO) throw new Error('Product already exists');
  return await productModel.createProduct({ name, quantity });
};

module.exports = {
  createProduct,
};
