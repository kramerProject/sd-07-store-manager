const saleModel = require('../models/Sales');
const helper = require('../helpers/isValid');

// const routeType = 'sales';

const getAll = async () => {
  const sales = await saleModel.getAll();

  return sales;
};

const create = async (items) => {
  console.log(items);
  // const { quantity } = items;
  // const sales = await getAll();
  
  // const alreadyIncluded = await helper.productExist(sales, name);
  // const nameType = helper.nameIsAString(name);
  // const nameLength = helper.nameIsOk(name);
  const quantityLength = helper.quantityIsOkSales(items);
  const quantityIsInteger = helper.isIntegerForSales(items);
  console.log(quantityIsInteger);
  // if (alreadyIncluded.code) return alreadyIncluded;
  // if (nameLength.code) return nameLength;
  // if (nameType.code) return nameType;
  if (quantityLength.code) return quantityLength;
  if (quantityIsInteger.code) return quantityIsInteger;
  
  const sales = await saleModel.create(items);

  return sales;
};

const findById = async (id) => {
  const sales = await getAll();

  const iDsearch = await helper.searchIdcontent(sales, id);

  if (iDsearch.code) {
    return iDsearch;
  }

  const sale = await saleModel.findById(id);
  return sale;
};

const update = async (id, name, quantity) => {

  const nameType = helper.nameIsAString(name);
  const nameLength = helper.nameIsOk(name);
  const quantityLength = helper.quantityIsOk(quantity);
  const quantityIsInteger = helper.IsInteger(quantity);

  if (nameLength.code) return nameLength;
  if (quantityIsInteger.code) return quantityIsInteger;
  if (nameType.code) return nameType;
  if (quantityLength.code) return quantityLength;

  const sale = await saleModel.update(id, name, quantity);

  return sale;
};

const exclude = async (id) => {
  const sales = await getAll();
  const iDsearch = await helper.searchIdcontent(sales, id);

  if (iDsearch.code) {
    return iDsearch;
  }
  
  const sale = await saleModel.exclude(id);
  console.log(sale);
  return sale;
};

module.exports = {
  getAll,
  create,
  findById,
  update,
  exclude
};