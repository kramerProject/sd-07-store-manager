const salesModels = require('../models/SalesModels');
const validated = require('./ValidatedSales');

const createSale = async (product) => {
  switch(true) {
  case await validated.productNotExist(product): 
    throw { message: validated.message.invalidIdQtd };
  case validated.invalidQuantity(product):
    throw { message: validated.message.invalidIdQtd };
  case validated.quantityNotNumber(product):
    throw { message: validated.message.invalidIdQtd};
  default:
    const result = await salesModels.createSale(product);
    return { message: result.ops[0] };
  }
};

const getSale = async () => {
  const salesList = await salesModels.getSale();
  return { message: { sales: salesList } };
};

const getSaleById = async (id) => {
  const sale = await salesModels.getSaleById(id);
  if(!sale) throw { message: validated.message.saleNotFound };
  return { message: sale };
};

const updateSalesById = async (id, sale) => {
  switch(true) {
  case await validated.productNotExist(sale):
    throw { message: validated.message.invalidIdQtd };
  case validated.invalidQuantity(sale):
    throw { message: validated.message.invalidIdQtd };
  case validated.quantityNotNumber(sale):
    throw { message: validated.message.invalidIdQtd };
  default:
    const updateSale = await salesModels.updateSalesById(id, sale);
    return { message: updateSale.value };
  }
};

const deleteSalesById = async (id) => {
  const deleteSale = await salesModels.deleteSalesById(id);
  if(!deleteSale) throw { message: validated.message.invalidFormatId };
  return { message: deleteSale };
};

module.exports = {
  createSale,
  getSale,
  getSaleById,
  updateSalesById,
  deleteSalesById
};