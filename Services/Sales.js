const Sales = require('../Models/Sales');
const {
  productDoesntExists,
  message,
  saleQuantityInvalid,
  quantityIsntNumber,
} = require('./validateSales');

const create = async (product) => {
  switch (true) {
  case await productDoesntExists(product):
    throw { message: message.invalidIdOrQty };
  case saleQuantityInvalid(product):
    throw { message: message.invalidIdOrQty };
  case quantityIsntNumber(product):
    throw { message: message.invalidIdOrQty };
  default:
    const result = await Sales.create(product);
    return { message:result.ops[0] };
  }
};

const getSales = async () => {
  const salesList = await Sales.getSales();
  return { message: { sales: salesList } };
};

const getBySaleId = async (id) => {
  const sale = await Sales.getBySaleId(id);
  if(!sale)
    throw { message: message.saleNotFound};
  return { message: sale };
};

const updateSale = async (id, sale) => {
  switch (true) {
  case await productDoesntExists(sale):
    throw { message: message.invalidIdOrQty };
  case saleQuantityInvalid(sale):
    throw { message: message.invalidIdOrQty };
  case quantityIsntNumber(sale):
    throw { message: message.invalidIdOrQty };
  default:
    const updatedSale = await Sales.updateSale(id, sale);
    return { message: updatedSale.value };
  }
};

const deleteSale = async (id) => {
  const deleted = await Sales.deleteSale(id);
  if(!deleted) throw { message: message.wrongIdFormat };
  return { message: deleted };
};

module.exports = {
  create,
  getSales,
  getBySaleId,
  updateSale,
  deleteSale,
};