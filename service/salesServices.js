const salesModels = require('../models/salesModels');

const createSales = (body) => {
  return salesModels.createSales(body);
};

const getAllSales = () => {
  return salesModels.getAllSales();
};

const getSalesById = (id) => {
  return salesModels.getSalesById(id);
};

const updateSales = (id, name, quantity) => {
  return salesModels.updateSales(id, name, quantity);
};

const deleteSales = (id) => {
  return salesModels.deleteSales(id);
};

module.exports = { createSales, getAllSales, getSalesById, updateSales, deleteSales };
