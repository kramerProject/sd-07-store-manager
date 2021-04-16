const Product = require('../models/productModel');

const code = 'invalid_data';

const invalidId = {
  err: {
    code,
    message: 'Wrong id format'
  }
};

const idIsValid = async (id) => {
  const productById = await Product.getProductById(id);

  if(productById === null) throw new Error(JSON.stringify(invalidId));
};

const productIdValidation = async (id) => {
  await idIsValid(id);
};

module.exports = {
  productIdValidation,
};
