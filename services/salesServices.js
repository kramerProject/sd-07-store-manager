const salesModel = require('../models/salesModel');

const zero = 0;
const unprocessable = 422;
const OK = 200;

const quantityMessage = {
  err: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity',
  },
};

const validateCustomHTTP = (message, http = unprocessable) => {
  return {
    http,
    message,
  };
};

const isValidRegister = async (data) => {
  const quantityError = data.some(
    (sale) => sale.quantity <= zero || typeof sale.quantity === 'string',
  );

  if(quantityError) {
    return quantityMessage;
  }

  return null;
};

const createSales = async (data) => {
  const validate = await isValidRegister(data);
  if(validate) {
    return validateCustomHTTP(validate);
  }
  const salesServices = await salesModel.createSales(data);
  return validateCustomHTTP(salesServices, OK);
};

const updateSale = async (id, data) => {
  const validate = await isValidRegister(data);


  if(validate){
    return validateCustomHTTP(validate);
  }

  const saleUpdated = await salesModel.updateSale(id, data);

  return validateCustomHTTP(saleUpdated, OK);
};

module.exports = {
  createSales,
  updateSale
};
