const SalesModel = require('../models/SalesModel');

const createSale = async (sales) => {
  
  const salesRes = await SalesModel.createSale(sales);

  return salesRes;
};

const getSales = async () => {
  
  const salesRes = await SalesModel.getSales();

  return { sales: salesRes };
};

const getSalesById = async (id) => {
  
  const salesRes = await SalesModel.getSalesById(id);

  return salesRes;
};

const deleteSales = async (id) => {
  const salesRes = await SalesModel.getSalesById(id);
  const delRes = await SalesModel.deleteSales(id, salesRes);
  return delRes;
};


module.exports = {
  createSale,
  getSales,
  getSalesById,
  deleteSales
};