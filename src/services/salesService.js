const sales = require('../models/salesModel');

const addSales = async (body) => {
  const result = await sales.addSale(body);
  if (!result) return {
    err: {
      code: 'invalid_data',
      message: 'Product dont exists',
    }
  };

  return result;
};

const getAll = async () => {
  const result = await sales.getAll();
  return result;
};

const getById = async (id) => {
  const result = await sales.getById(id);

  if (!result) return {
    err: {
      code: 'not_found',
      message: 'Sale not found'
    }
  };

  return result;
};

const updateSale = async (id, body) => {
  const result = await sales.updateSale(id, body);
  if (!result) return {
    err: {
      code: 'not_found',
      message: 'Sale not found'
    }
  };
  return result;
};

const deleteSale = async (id) => {
  const result = await sales.deleteSale(id);
  if (!result) return {
    err: {
      code: 'invalid_data',
      message: 'Wrong sale ID format'
    }
  };
  return result;
};

module.exports = {
  addSales,
  getAll,
  getById,
  updateSale,
  deleteSale,
};