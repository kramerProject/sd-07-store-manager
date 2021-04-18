const model = require('../models/productModel');

const createNewProduct = async (name, quantity) => {
  const {insertedId } = await model.createNewProduct(name, quantity);

  return {
    id: insertedId,
    name,
    quantity,
  };
};

const existProduct = async (name) => {
  const result = await model.existProduct(name);
  return result;
};

module.exports = {
  createNewProduct,
  existProduct,
};
