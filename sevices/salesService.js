const SalesModel = require('../models/salesModel');
const ProductsModel = require('../models/productsModel');
const { ObjectId } = require('mongodb');

const PRODUCT_MIN_QNT = 0;

const validIdAndQuantity = async (sale) => {
  sale.some((item) => {
    const { quantity } = item;
    if(quantity <= PRODUCT_MIN_QNT || typeof quantity !== 'number') throw({
      'code': 'invalid_data',
      'message': 'Wrong product ID or invalid quantity'
    });
  });
};

const create = async (sale) => {
  await validIdAndQuantity(sale);
  const newSale = await SalesModel.create(sale);
  return newSale;
};

const getAllSales = async () => {
  const allSales = await SalesModel.getAllSales();
  return allSales;
};

const validId = async (id) => {
  const validSale = await SalesModel.findSaleById(id);
  if (!validSale) {
    throw({
      'code': 'not_found',
      'message': 'Sale not found',
    });
  } else {
    return validSale;
  }
};

const findSaleById = async (id) => {
  const sale = await validId(id);
  return sale;

};

module.exports = { create, getAllSales, findSaleById };
