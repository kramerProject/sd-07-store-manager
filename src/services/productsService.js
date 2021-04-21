const { ProductsModel } = require('../models');

const {
  validName,
  existName,
  validQuantity,
  validNumber,
} = require('../validations/productValidation');

const add = async (name, quantity) => {
  await existName(name);
  validName(name);
  existName(name);
  validQuantity(quantity);
  validNumber(quantity);

  const product = await ProductsModel.add(name, quantity);

  return product;
};

module.exports = {
  add,
};
