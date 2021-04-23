const salesModels = require('../models/SalesModels');
const { message: 
  { mInvalidFormatId, mInvalidIdQtd, mSaleNotFound },
productNotExist, invalidQuantity, quantityNotNumber
} = require('./ValidatedSales');

const createSale = async (product) => {
  switch(true) {
  case await productNotExist(product): throw { message: mInvalidIdQtd };
  case invalidQuantity(product): throw { message: mInvalidIdQtd };
  case quantityNotNumber(product): throw { message: mInvalidIdQtd};
  default:
    const result = await salesModels.createSale(product);
    return { message: result.ops[0] };
  }
};

const getSale = async () => {
  const result = await salesModels.getSale();
  return { message: { sales: result } };
};

const getSaleById = async (id) => {
  const sale = await salesModels.getSaleById(id);
  if(!sale) throw { message: mSaleNotFound };
  return { message: sale };
};

const updateSalesById = async (id, sale) => {
  switch(true) {
  case await productNotExist(sale): throw { message: mInvalidIdQtd };
  case invalidQuantity(sale): throw { message: mInvalidIdQtd };
  case quantityNotNumber(sale): throw { message: mInvalidIdQtd };
  default:
    const updateSale = await salesModels.updateSalesById(id, sale);
    return { message: updateSale.value };
  }
};

const deleteSalesById = async (id) => {
  const deleteSale = await salesModels.deleteSalesById(id);
  if(!deleteSale) throw { message: mInvalidFormatId };
  return { message: deleteSale };
};

module.exports = {
  createSale,
  getSale,
  getSaleById,
  updateSalesById,
  deleteSalesById
};