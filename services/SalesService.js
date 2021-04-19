const saleModel = require('../models/Sales');
const helper = require('../helpers/isValid');

const routeType = 'sales';

const getAll = async () => {
  const sales = await saleModel.getAll();

  return sales;
};

const create = async (items) => {
 
  const quantityLength = helper.quantityIsOkSales(items);
  const quantityIsInteger = helper.isIntegerForSales(items);
 
  if (quantityLength.code) return quantityLength;
  if (quantityIsInteger.code) return quantityIsInteger;
  
  const sales = await saleModel.create(items);

  return sales;
};

const findById = async (id) => {
  const sales = await getAll();

  const iDsearch = await helper.searchSaleIdcontent(sales, id);
 
  if (iDsearch.code) {
    return iDsearch;
  }

  const sale = await saleModel.findById(id);
 
  return sale;
};

const update = async (id, items) => {

  const quantityLength = helper.quantityIsOkSales(items);
  const quantityIsInteger = helper.isIntegerForSales(items);
 
  if (quantityLength.code) return quantityLength;
  if (quantityIsInteger.code) return quantityIsInteger;

  const sales = await saleModel.update(id, items);

  return sales;
};

const exclude = async (id) => {
  const sales = await getAll();
  const iDsearch = await helper.searchIdcontent(sales, id);

  if (iDsearch.code) {
    return iDsearch;
  }
  
  const sale = await saleModel.exclude(id);

  return sale;
};

module.exports = {
  getAll,
  create,
  findById,
  update,
  exclude
};