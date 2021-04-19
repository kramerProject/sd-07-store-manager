const { salesModel } = require('../models');
const STATUS_CODE = require('../helper');

// Requisito 5

const checkProductQuantityAndString = (quantity) => {
  const ZERO = 0;
  if (parseInt(quantity, 10) <= ZERO || typeof quantity !== 'number') throw ({
    status: STATUS_CODE.UNPROCESSABLE_ENTITY,
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity'
  });
};

const checkIfQuantityIsString = (quantity) => {
  if (typeof quantity !== 'number') throw ({
    status: STATUS_CODE.UNPROCESSABLE_ENTITY,
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity'
  });
};

const salesRegistration = async (sale) => {
  sale.forEach((el) => {
    checkProductQuantityAndString(el.quantity);
    // checkIfQuantityIsString(el.quantity);
  });

  const result = await salesModel.salesRegistration(sale);
  return result;
};

// Requisito 6

const getSales = async (id) => {
  const result = await salesModel.getSales(id);
  return result;
};

const checkSaleByID = (result) => {
  if (result === null) throw ({ 
    status: STATUS_CODE.NOT_FOUND,
    code: 'not_found',
    message: 'Sale not found'
  });
};

const getSaleByID = async (id) => {
  const result = await salesModel.getSaleByID(id);
  checkSaleByID(result);
  return result;
};

module.exports = {
  salesRegistration,
  getSales,
  getSaleByID
};