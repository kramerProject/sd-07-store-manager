const { createSalesModel } = require('../models/salesModel');

const createSalesService = async(salesArrayOfItens) => {
  return await createSalesModel(salesArrayOfItens);
};

module.exports = { createSalesService };
