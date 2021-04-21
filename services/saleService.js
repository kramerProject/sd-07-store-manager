const model = require('../models/saleModel');

const createNewSale = async (sales) => {
  const {insertedId, ops } = await model.createNewSale(sales);
  const {itensSold} = ops[0];

  return {
    _id: insertedId,
    itensSold
  };
};

const getAllSales = async () => {
  const sales = await model.getAllSales();
  const objectArraySales = {sales: [...sales]};
  return objectArraySales;
};

const findBySaleId = async (id) => await model.findBySaleId(id);

const updateSale = async (id, sale) => await model.updateSale(id, sale);

const deleteSale = async (id) => {
  const { itensSold } = await model.findBySaleId(id);
  const del = await model.deleteSale(id);

  return {
    _id: id,
    itensSold,
  };
};

module.exports = {
  createNewSale,
  getAllSales,
  findBySaleId,
  updateSale,
  deleteSale,
};
