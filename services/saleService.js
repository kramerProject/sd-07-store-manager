const SaleModel = require('../models/saleModel');
const zero = 0;

const quantity = (salesList) => {
  let flag = false;
  salesList.forEach(sale => {
    if (sale.quantity <= zero || typeof sale.quantity === 'string') {
      flag = true; 
    }
  });
  if (flag === true) return { code: 422,
    message: 'Wrong product ID or invalid quantity' };
};
  

const addSale = async (salesList) => {
  const checkQuantity = quantity(salesList);
  if (checkQuantity) return {checkQuantity};
 
  const sale = await SaleModel.addSale(salesList);
  return {code: 200, sale};
};

const getAll = async () => {
  const sales = await SaleModel.getAll();
  return sales;
};

const getById = async (id) => {
  const sale = await SaleModel.getById(id);
  if (sale === null)
    return { code: 404,
      message: 'Sale not found' };
  return { code: 200, sale };
};

const deleteSale = async (id) => {
  const deletedSale = await SaleModel.deleteSale(id);
  if (!deletedSale) return {code: 422, message: 'Wrong sale ID format'};
  return {code: 200, deletedSale};
};

module.exports = {
  addSale,
  quantity,
  getAll,
  getById,
  deleteSale,
};