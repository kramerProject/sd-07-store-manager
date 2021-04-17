const Sale = require('../models/saleModel');

const code = 'not_found';

const invalidId = {
  err: {
    code,
    message: 'Sale not found'
  }
};

const idIsValid = async (id) => {
  const saleById = await Sale.getSaleById(id);

  if(saleById === null) throw new Error(JSON.stringify(invalidId));
};

const saleIdValidation = async (id) => {
  await idIsValid(id);
};

module.exports = {
  saleIdValidation,
};
