const {addSale} = require('../Models/sales/addSale');
const {getAllSales} = require('../Models/sales/getAllSales');
const {getSaleById} = require('../Models/sales/getSaleById');
const {updateSale} = require('../Models/sales/updateSale');
const {deleteSale} = require('../Models/sales/deleteSale');

const serviceAddSale = async (arrayProduct) => {
  return addSale(arrayProduct);
};

const serviceGetAllSales = async () => {
  return getAllSales();
};

const serviceGetSaleById = async (id) => {
  return getSaleById(id);
};

const serviceUpdateSale = async (id, updateData) => {
  return updateSale(id, updateData);
};

const serviceDeleteSale = async (id) => {
  return deleteSale(id);
};


module.exports = {
  serviceAddSale,
  serviceGetAllSales,
  serviceGetSaleById,
  serviceUpdateSale,
  serviceDeleteSale,
};