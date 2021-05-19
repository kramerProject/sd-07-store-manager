const { productsModel } = require('../models');
const productValidate = require('./productValidate');

const getAll = async () => ({ products: await productsModel.getAll() });

const create = async (product) => {
  const { name, quantity } = product;
  await productValidate.existsName(name);
  productValidate.name(name);
  productValidate.quantity(quantity);
  return productsModel.create(name, quantity);
};

const update = async (product) => {
  const { id, name, quantity } = product;
  productValidate.name(name);
  productValidate.quantity(quantity);
  return productsModel.update(id, name, quantity);
};

const exclude = async (id) => {
  await productValidate.id(id);
  return productsModel.exclude(id);
};

const getById = async (id) => {
  await productValidate.id(id);
  return productsModel.getById(id);
};

module.exports = { getAll, create, getById, update, exclude };
