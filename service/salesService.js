const saleModel = require('../models/salesModel');
const SalestSchema = require('../schemas/SalesSchema');

const created = 200;

const add = async (itensSold) => {

  const validation = await SalestSchema.validatePost(itensSold);

  if (validation.err) return validation;

  const id = await saleModel.add(itensSold);

  const newSale = {
    _id: id,
    itensSold
  };

  return { code: created, newSale };
};

const getAll = async () => {
  const sales = await saleModel.getAll();

  const resultSales = { sales };

  return resultSales;
};

const getById = async (id) => {
  return await saleModel.getById(id);


};


module.exports = {
  add,
  getAll,
  getById,
};