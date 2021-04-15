const salesModels = require('../models/sales');
const { ObjectId } = require('mongodb');

const ONE = 1;

const validateSales = ({ productId, quantity }) => {
  if (
    !ObjectId.isValid(productId)
    || typeof quantity !== 'number'
    || quantity < ONE
  ) {
    throw new Error('Wrong product ID or invalid quantity');
  }
};

const createSales = async (sales) => {
  for (sale of sales) {
    validateSales(sale);
  }

  return salesModels.createSale(sales);
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) throw new Error('Sale not found');

  const result = await salesModels.findById(id);

  if (!result) throw new Error('Sale not found');

  return result;
};

const getAll = async () => await salesModels.getAll();

const updateSales = async (id, sales) => {
  validateSales(sales);

  return await salesModels.updateSales(id, sales);
};

const deleteSale = async (id) => {
  if (!ObjectId.isValid(id)) throw new Error('Wrong sale ID format');

  return await salesModels.deleteSale(id);
};

module.exports = {
  createSales,
  findById,
  getAll,
  updateSales,
  deleteSale,
};
