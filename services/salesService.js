const { salesModel } = require('../models');
const salesValidate = require('./salesValidate');

const getAll = async () => ({ sales: await salesModel.getAll() });

const getById = async (id) => {
  await salesValidate.id(id);
  return salesModel.getById(id);
};

const create = async (itensSold) => {
  salesValidate.quantity(itensSold);
  return salesModel.create(itensSold);
};

const update = async (id, itensSold) => {
  await salesValidate.id(id);
  salesValidate.quantity(itensSold);
  return salesModel.update(id, itensSold);
};

const exclude = async (id) => {
  await salesValidate.id(id);
  return salesModel.exclude(id);
};

module.exports = { getAll, getById, create, update, exclude };
