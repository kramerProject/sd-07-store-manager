const SalesModel = require('../models/salesModel');
const ProductsModel = require('../models/productsModel');
const { ObjectId } = require('mongodb');

async function serviceAddSales(itensSold) {
  const allProducts = await ProductsModel.getAllProducts();
  const MIN_QUANTITY = 0;
  itensSold.forEach(item => {
    const product = allProducts.find((products) => {
      return String(products._id) === item.productId;
    });
    if (!product)
      throw { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' };
    const quantity = product.quantity - item.quantity;
    if(quantity < MIN_QUANTITY )
      throw { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' };
  });

  const sale = await SalesModel.add(itensSold);
  return sale;
}

async function serviceGetAllSales() {
  return await SalesModel.getAllSales();
}

async function serviceGetSalesById(id) {
  const salesId = await SalesModel.getSalesById(id);
  if (!salesId)
    throw { responseError: 404, code: 'not_found', message: 'Sale not found' };
  return salesId;
}

const serviceUpdateSale = async (id, sale) => {
  const salesId = await SalesModel.getSalesById(id);
  if (!salesId)
    throw { responseError: 404, code: 'not_found', message: 'Sale not found' };
  return await SalesModel.updateSale(id, sale);
};

async function serviceExcludeSale(id) {
  if (!ObjectId.isValid(id))
    throw { responseError: 422, code: 'invalid_data', message: 'Wrong sale ID format'};
  return await serviceGetSalesById(id);
}

module.exports = {
  serviceAddSales,
  serviceGetAllSales,
  serviceGetSalesById,
  serviceUpdateSale,
  serviceExcludeSale
};