const { ProductsModel } = require('../models');

const {
  validName,
  existName,
  validQuantity,
  validNumber,
  existID,
  validID,
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

const getAll = async () => {
  const products = await ProductsModel.getAll();
  return products;
};

const getByID = async (id) => {
  const product = await existID(id);
  return product;
};

const update = async (id, name, quantity) => {
  validName(name);
  validQuantity(quantity);
  validNumber(quantity);

  const updatedProduct = await ProductsModel.updateByID(id, name, quantity);
  return updatedProduct;
};

const excludeByID = async (id) => {
  const product = await existID(id);
  const exclude = await ProductsModel.excludeByID(id);
  return product;
};

// const getByID = async () => {

// };

module.exports = {
  add,
  getAll,
  getByID,
  update,
  excludeByID
};
