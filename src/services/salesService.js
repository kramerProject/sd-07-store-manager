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

module.exports = {
  addSales,
};