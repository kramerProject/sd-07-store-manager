const salesModel = require('../models/SalesModel');

const create = async (itens) => { 
  const insertedId = await salesModel.create(itens);
  return { _id: insertedId, itensSold: itens };
};

const update = async (id, itens) => {
  const result = await salesModel.update(id, itens);
  return (result.n) ? true : false;
};

const remove = async (id) => {
  const result = await salesModel.remove(id);
  return (result.n) ? true : false;
};

const getById = async (id) => {
  const sale = await salesModel.findById(id);
  return sale;
};

const getAll = async () => {
  const sales = await salesModel.findAll();
  return sales;
};

const quantityVerify = (itens) => {
  const MIN_QUANTITY = 1;
  return itens.every(({ quantity }) => quantity >= MIN_QUANTITY);
};

const typeVerify = (itens) => {
  return itens.every(({ quantity }) => typeof quantity === 'number');
};

module.exports = {
  create,
  update,
  remove,
  getById,
  getAll,
  quantityVerify,
  typeVerify,
};
