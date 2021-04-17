const Sale = require('../models/saleModel');

const code = 'invalid_data';

const invalidId = {
  err: {
    code,
    message: 'Wrong sale ID format'
  }
};

const idIsValid = async (id) => {
  const saleById = await Sale.getSaleById(id);

  if(saleById === null) throw new Error(JSON.stringify(invalidId));
};

const deleteSaleValidation = async (id) => {
  await idIsValid(id);
};

module.exports = {
  deleteSaleValidation,
};
