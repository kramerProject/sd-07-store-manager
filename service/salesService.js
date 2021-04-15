const saleModel = require('../models/salesModel');
const SalesSchema = require('../schemas/SalesSchema');

const OK = 200;
const created = 201;

const add = async (itensSold) => {

  const validation = await SalesSchema.validatePost(itensSold);

  if (validation.err) return validation;

  const id = await saleModel.add(itensSold);

  const newSale = {
    _id: id,
    itensSold
  };

  return { code: OK, newSale };
};

const getAll = async () => {

  const sales = await saleModel.getAll();

  return { code: OK, sales };
};

const getById = async (id) => {

  const validation = await SalesSchema.validateId(id);

  if (validation.err) return validation;

  const sales = await saleModel.getById(id);

  return { code: OK, sales };
};

const update = async (id, itensSold) => {

  const validation = await SalesSchema.validatePut(itensSold);

  if (validation.err) return validation;

  await saleModel.update(id, itensSold);

  const sale = {
    _id: id,
    itensSold
  };
  return sale;
};


module.exports = {
  add,
  getAll,
  getById,
  update
};