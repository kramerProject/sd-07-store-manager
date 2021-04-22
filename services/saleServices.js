const {
  createSales,
  getAllModel,
  getSalesByIdModel,
} = require('../models/salesModel');
const { ObjectId } = require('mongodb');

const validateQuantity = (sales) => {
  const forbiddenQuantity = 0;
  const isValid = sales.some(
    (sale) => sale.quantity <= forbiddenQuantity || typeof sale.quantity !== 'number');
  
  if (isValid) {
    throw new Error('Wrong product ID or invalid quantity');
  }

  return false;
};

const createSalesService = async (sales) => {
  validateQuantity(sales);

  const createdSales = await createSales(sales);
  return createdSales;
};

const getAllService = async () => {
  const salesList = await getAllModel();
  return { sales: salesList };
};

const validateId = (id) => {
  if (!ObjectId.isValid(id)) {
    return true;
  }
  return false;
};

const getSalesByIdService = async (id) => {
  const isValid = validateId(id);

  if (isValid) {
    throw new Error('Sale not found');
  }

  const sale = await getSalesByIdModel(id);

  if (typeof sale === null || typeof sale === undefined) {
    throw new Error('Sale not found');
  }

  return sale;
};

module.exports = {
  createSalesService,
  getAllService,
  getSalesByIdService,
};