const saleModel = require('../models/saleModel');

const registerSale = async (sales) => {
  return await saleModel.registerSale(sales);
};

const getAll = async () => {
  return await saleModel.getAll();
};

const getById = async (id) => {
  return await saleModel.getById(id);
};

const removeSale = async (id) => {
  return await saleModel.removeSale(id);
};

module.exports = {
  registerSale,
  getAll,
  getById,
  removeSale,
};
