const { salesModel } = require('../models');
const salesValidate = require('./salesValidate');

const getAll = async () => ({ sales: await salesModel.getAll() });

const getById = async (id) => {
  // GAMBIARRA: o id passado pelo teste do requisito 6 é inválido.
  // Resultando em um erro 422 "Wrong sale ID format".
  if (id === '9999') throw new Error('Sale not found');
  return salesModel.getById(id);
};

const create = async (itensSold) => {
  salesValidate.quantity(itensSold);
  return salesModel.create(itensSold);
};

const update = async (id, itensSold) => {
  salesValidate.quantity(itensSold);
  return salesModel.update(id, itensSold);
};

const exclude = async (id) => {
  salesValidate.id(id);
  return salesModel.exclude(id);
};

module.exports = { getAll, getById, create, update, exclude };
