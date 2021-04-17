const {addSale} = require('../Models/sales/addSale');
const {getAllSales} = require('../Models/sales/getAllSales');
const {getSaleById} = require('../Models/sales/getSaleById');

const serviceAddSale = async (arrayProduct) => {
  return addSale(arrayProduct);
};

const serviceGetAllSales = async () => {
  return getAllSales();
};

const serviceGetSaleById = async (id) => {
  return getSaleById(id);
};

module.exports = {
  serviceAddSale,
  serviceGetAllSales,
  serviceGetSaleById,
};