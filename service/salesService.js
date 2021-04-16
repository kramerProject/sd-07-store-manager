const saleModel = require('../models/salesModel');
const SalesSchema = require('../schemas/SalesSchema');

const OK = 200;

const add = async (itensSold) => {

  const validation = await SalesSchema.validatePost(itensSold);

  if (validation.err) return validation;

  const newSale = await saleModel.add(itensSold);

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

  return { code: OK, sale };

};

const exclude = async (id) => {

  const validation = await SalesSchema.validateDelete(id);

  if (validation.err) return validation;

  const sales = await saleModel.getById(id);
  const sale = await saleModel.exclude(id);

  return { code: OK, sale, sales };
};

module.exports = {
  add,
  getAll,
  getById,
  update,
  exclude
};