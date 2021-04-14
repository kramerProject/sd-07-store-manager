const salesModels = require('../models/sales');
const { ObjectId } = require('mongodb');

const ONE = 1;

const validateSales = ({ id, quantity }) => {
  if (
    ObjectId.isValid(id)
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

module.exports = {
  createSales,
};
