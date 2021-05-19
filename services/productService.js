const { productsModel } = require('../models');
const validate = require('./validate');

const getAll = async () => ({ products: await productsModel.getAll() });

const create = async (product = {}) => {
  const { name, quantity } = product;
  await validate.name(name);
  validate.quantity(quantity);
  return await productsModel.create(name, quantity);
};

const getById = async (id) => {
  await validate.id(id);
  return await productsModel.getById(id);
};

module.exports = { getAll, create, getById };
