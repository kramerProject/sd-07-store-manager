const { SalesModel } = require('../models');

const validQuantityAndType = (quantity) => {
  const minQuantity = 0;
  if (quantity <= minQuantity || typeof quantity === 'string') {
    const error = new Error ('Wrong product ID or invalid quantity');
    error.statusCode = 'invalid_data';
    throw error;
  }
  return true;
};

const existID = async (id) => {
  try {
    const idVerify = await SalesModel.getByID(id);
    if (!idVerify) {
      throw new Error;
    }
    return idVerify;
  } catch (error) {
    error.message = 'Sale not found';
    error.statusCode = 'not_found';
    throw error;
  }
};

const validID = async (id) => {
  const minLengthID = 24;
  if (typeof id !== 'string' || id.length < minLengthID) {
    const error = new Error ('Wrong product ID or invalid quantity');
    error.statusCode = 'invalid_data';
    throw error;
  };
  return true;
};

module.exports = {
  validQuantityAndType,
  existID,
  validID,
};
