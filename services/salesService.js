const salesModel = require('../models/salesModel');

const verifyQuantity = (body) => {
  const minValue = 0;
  const bool = 
    body.some(({ quantity }) => quantity <= minValue || typeof quantity !== 'number');

  if (bool) {
    throw new Error('Wrong product ID or invalid quantity');
  }
};

const createSale = async (body) => {
  try {
    verifyQuantity(body);
    const result = await salesModel.create(body);

    return result;
  } catch (error) {
    return error.message;
  }
  
};

module.exports = { createSale };
