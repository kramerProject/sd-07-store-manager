const { createProduct, getProductByName } = require('../models/productModel');

const createProductValidation = (name, quantity) => {
  const minNameLength = 5;
  const minProductQnt = 1;
  if (name.length < minNameLength) {
    throw new Error('\"name\" length must be at least 5 characters long');
  }
  if (quantity < minProductQnt) {
    throw new Error('"\quantity\" must be larger than or equal to 1');
  }
  if (typeof quantity !== 'number') {
    throw new Error('\"quantity\" must be a number');
  }
};

const ifProductExist = async (name) => {
  const product = await getProductByName(name);
  console.log(product);
  if (product !== null) {
    throw new Error ('Product already exists');
  }
};

const insertProduct = async (name, quantity) => {

  await ifProductExist(name);
  createProductValidation(name, quantity);

  const product = await createProduct(name, quantity);
  return product;
};

module.exports = {
  insertProduct,
};