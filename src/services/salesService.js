const model = require('../models/salesModel');
const checkStock = require('../helpers/checkStock');
const {
  invalidData,
  notFound,
  stockProblem,
  checkInfosSales } = require('../helpers/invalidData');

const getSales = () => model.getSales();

const getSaleById = async (id) => { 
  const sale = await model.getSaleById(id);

  if (!sale) notFound('Sale not found');
  return sale;
};

const newSale = async (array) => {
  array.forEach(checkInfosSales);
  const check = await Promise.all(array.map(item => checkStock(item, 'up')));
  if (check.some(v => v === false)) stockProblem('Such amount is not permitted to sell');
  
  const sale = await model.newSale(array);
  if (!sale) invalidData('Wrong product ID or invalid quantity');
  return sale;
};

const updateSale = async (id, array) => {
  array.forEach(checkInfosSales);
  const sale = await model.updateSale(id, array);

  if (!sale) invalidData('Wrong product ID or invalid quantity');
  return sale;
};

const deleteSale = async (id) => {
  const sale = await model.getSaleById(id);
  if (!sale) invalidData('Wrong sale ID format');

  sale.itensSold.forEach(item => checkStock(item, 'del'));

  await model.deleteSale(id);
  return sale;
};

module.exports = {
  getSales,
  getSaleById,
  newSale,
  updateSale,
  deleteSale
};
