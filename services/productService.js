const { productsModel } = require('../models');
const validate = require('./validate');

const getAll = async () => ({ products: await productsModel.getAll() });

const create = async (product) => {
  const { name, quantity } = product;
  await validate.existsName(name);
  validate.name(name);
  validate.quantity(quantity);
  return productsModel.create(name, quantity);
};

const update = async (product) => {
  const { id, name, quantity } = product;
  validate.name(name);
  validate.quantity(quantity);
  return productsModel.update(id, name, quantity);
};

const exclude = async (id) => {
  await validate.id(id);
  return productsModel.exclude(id);
};

const getById = async (id) => {
  await validate.id(id);
  return productsModel.getById(id);
};

module.exports = { getAll, create, getById, update, exclude };
