const Sales = require('../Models/Sales');
const {
  productDoesntExists,
  message,
  saleQuantityInvalid,
  quantityIsntNumber,
} = require('./validateSales');

const status = {
  ok: 200,
  created: 201,
  unprocessableEntity: 422,
  notFound: 404,
};

const create = async (product) => {
  switch (true) {
  case await productDoesntExists(product):
    return {code: status.unprocessableEntity, message: message.invalidIdOrQty};
  case saleQuantityInvalid(product):
    return {code: status.unprocessableEntity, message: message.invalidIdOrQty};
  case quantityIsntNumber(product):
    return {code: status.unprocessableEntity, message: message.invalidIdOrQty};
  default:
    const result = await Sales.create(product);
    return {code: status.ok , message:result};
  }
};

const getSales = async () => {
  const salesList = await Sales.getSales();
  return { code: status.ok, message: {sales: salesList}};
};

const getBySaleId = async (id) => {
  const sale = await Sales.getBySaleId(id);
  if(!sale)
    return { code: status.notFound, message: message.saleNotFound};
  return {code: status.ok, message: sale};
};

const updateSale = async (id, sale) => {
  switch (true) {
  case await productDoesntExists(sale):
    return {code: status.unprocessableEntity, message: message.invalidIdOrQty};
  case saleQuantityInvalid(sale):
    return {code: status.unprocessableEntity, message: message.invalidIdOrQty};
  case quantityIsntNumber(sale):
    return {code: status.unprocessableEntity, message: message.invalidIdOrQty};
  default:
    const updatedSale = await Sales.updateSale(id, sale);
    return {code: status.ok, message: updatedSale};
  }
};

const deleteSale = async (id) => {
  const deleted = await Sales.deleteSale(id);
  if(!deleted) return {code: status.unprocessableEntity, message: message.wrongIdFormat};
  return {code: status.ok, message: deleted};
};

module.exports = {
  create,
  getSales,
  getBySaleId,
  updateSale,
  deleteSale,
};