const { ObjectID } = require('bson');
const { salesModel } = require('../models');
const { idOrQtdValidate, saleIdValidate } = require('../validations/sales');

const creatSales = async (saleInfo) => {
  saleInfo.map((element) => idOrQtdValidate(element.productId, element.quantity));
  const createdSale = await salesModel.creatSale( saleInfo);
  return createdSale;
};

const getSales = async () => {
  const salesListed = await salesModel.getAllSales();
  if (salesListed.length < 1) throw new Error('Sale not found');
  return {
    sales: salesListed,
  };
};

const getSaleById = async (id) => {
  if(!ObjectID.isValid(id)) throw new Error('Sale not found');
  const saleById = await salesModel.getSaleById(id) || [];
  if (Object.keys(saleById).length < 1) throw new Error('Sale not found');
  return {
    sales: saleById,
  };
};

const updateSale = async (id, salesInfo) => {
  salesInfo.map((element) => idOrQtdValidate(element.productId, element.quantity));
  const updatedSale = await salesModel.updateSale(id, salesInfo) || [];
  return updatedSale;
};

module.exports = {
  creatSales,
  getSales,
  getSaleById,
  updateSale,
};
