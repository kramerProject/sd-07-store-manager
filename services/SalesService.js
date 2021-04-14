const SalesModel = require('../models/SalesModel');
const SalesSchema = require('../schemas/SalesSchema');

const createSale = async (sales) => {
  
  const salesRes = await SalesModel.createSale(sales);

  return salesRes;
};


module.exports = {
  createSale
};