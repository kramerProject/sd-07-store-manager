const salesModel = require('../models/salesModel');
const ZERO = 0;

const createSale = async (itensSold) => {
  const quantityValue = itensSold.some(element => element.quantity <= ZERO);
  if (quantityValue) 
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    };
  const quantityType = itensSold.some(element => typeof element.quantity !== 'number');
  if (quantityType) 
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    };
  return await salesModel.create(itensSold);
};

const getAllSales = async () => {
  const allSales = await salesModel.getAll();
  return { sales: allSales };
};

const getSaleById = async (id) => {
  const saleFound = await salesModel.getById(id);
  if (saleFound === null) {
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      }
    };
  }
  return saleFound;
};

const updateSale = async (id, sale) => {
  const quantityValue = sale.some(element => element.quantity <= ZERO);
  if (quantityValue) 
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    };
  const quantityType = sale.some(element => typeof element.quantity !== 'number');
  if (quantityType) 
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity'
      }
    };
  return await salesModel.update(id, sale);
};

const deleteSale = async (id) => {
  const saleFound = await salesModel.getById(id);
  if (saleFound === null) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      }
    };
  }
  await salesModel.exclude(id);
  return saleFound;
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale
};