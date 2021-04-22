const Sales = require('../models/sales');

var isNaN = function (value) {
  var n = Number(value);
  return n !== n;
};

const createSale = async (sales) => {
  //validação
  const quantidadeNula = 0;
  const firstSale = 0;
  for (let index = firstSale; index < sales.length; index += 1) {
    const { quantity } = sales[index];
    if (quantity <= quantidadeNula)
      return {
        code: 422,
        message: 'Wrong product ID or invalid quantity',
      };
    if (isNaN(quantity))
      return {
        code: 422,
        message: 'Wrong product ID or invalid quantity',
      };
  }

  const result = await Sales.createSale(sales);

  return { code: 200, result };
};

const getAllSales = async () => {
  const result = await Sales.getAllSales();
  return { code: 200, result };
};

const getSaleById = async (id) => {
  const result = await Sales.getSaleById(id);
  if (result === false) return { code: 404, message: 'Sale not found' };

  return { code: 200, result };
};

const updateSale = async (id, itensSold) => {
  const quantidadeNula = 0;
  const { quantity } = itensSold[0];
  if (quantity <= quantidadeNula)
    return {
      code: 422,
      message: 'Wrong product ID or invalid quantity',
    };
  if (isNaN(quantity))
    return {
      code: 422,
      message: 'Wrong product ID or invalid quantity',
    };

  const result = await Sales.updateSale(id, itensSold);

  return { code: 200, result };
};

const deleteSale = async (id) => {
  const result = await Sales.deleteSale(id);

  if (result === false) return { code: 422, message: 'Wrong sale ID format' };

  return { code: 200, result };
};

module.exports = { createSale, getAllSales, getSaleById, updateSale, deleteSale };
