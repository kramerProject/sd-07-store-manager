const salesModels = require('../models/salesModels');

const createSales = (name, quantity) => {
  return productModel.createSales(name, quantity);
};

const getAllSales = () => {
  return productModel.getAllSales();
};

const getSalesById = (id) => {
  return productModel.getSalesById(id);
};

const updateSales = (id, name, quantity) => {
  return productModel.updateSales(id, name, quantity);
};

const deleteSales = (id) => {
  return productModel.deleteSales(id);
};

module.exports = { createSales, getAllSales, getSalesById, updateSales, deleteSales };
