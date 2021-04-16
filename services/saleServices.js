const { addSaleDB } = require('../models/saleModel');

const addSaleService = async (name, quantity) => {
  const zero = 0;
  if (quantity <= zero) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    };
  }
  const data = await addSaleDB(name, quantity);
  return data;
};

module.exports = {
  addSaleService,
};
