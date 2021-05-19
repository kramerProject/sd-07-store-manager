const { productsModel } = require('../models');
const { ObjectId } = require('mongodb');
const validate = require('./validate');

const getAll = async () => {
  try {
    return await productsModel.getAll();

  } catch(error) {
    throw new Error(`Não foi possível encontrar products:\n ${error}`);

  }
};

const create = async (product = {}) => {
  const { name, quantity } = product;
  await validate.name(name);
  validate.quantity(quantity);
  return await productsModel.create(name, quantity);
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) throw new Error('ID inválido.');

  return await productsModel.getById(id);
};

module.exports = { getAll, create, getById };
