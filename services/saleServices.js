const { addSaleDB } = require('../models/saleModel')

const addSaleService = async (name, quantity) => {
  if (quantity <= 0) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    };
  }
  const data = await addSaleDB( name, quantity );
  return data;
};

module.exports = {
  addSaleService
};