const { ObjectId } = require('mongodb');
const { findById } = require('../models/productsModel');

const erros = {
  invalid_sale: 'Wrong product ID or invalid quantity',
};

const minQuantity = 1;
const code = 422;
let err = {
  code: 'invalid_data'
};

const isValidId = (value) => (ObjectId.isValid(value));
const isNotNumber = (value) => (typeof value !== 'number');
const minValue = (value, min) => (value < min);

const validateSale = (sale) => {
  let saleList = [];
  if (Array.isArray(sale)) {
    saleList = sale;
  } else {
    saleList.push(sale);
  }

  const validateItens = saleList.every((item) => {
    switch (true) {
      case (!isValidId(item.productId)):
      case (isNotNumber(item.quantity)):
      case (minValue(item.quantity, minQuantity)):
        err = { ...err, message: 'Wrong product ID or invalid quantity' };
        return false;
      default: return true;
    }
  });

  if (validateItens) return {};

  return { code, err };
};

const isExistingProduct = async (sale) => {
  const validadeProduct = sale.every(async (item) => {
    const product = await findById(item.productId);
    if (product === null) return false;
    return true;
  });

  if (validadeProduct) return {};

  err = { ...err, message: 'isExistingProduct' };
  return { code, err };
};

module.exports = {
  validateSale,
  isExistingProduct,
};