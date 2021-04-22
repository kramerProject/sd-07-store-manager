const { ProductsModel } = require('../models');

const validName = (name) => {
  const minLengthName = 5;
  if (name.length < minLengthName) {
    const error = new Error ('"name" length must be at least 5 characters long');
    error.statusCode = 'invalid_data';
    throw error;
  }
};

const existName = async (name) => {
  const nameVerify = await ProductsModel.findByName(name);
  if (nameVerify) {
    const error = new Error ('Product already exists');
    error.statusCode = 'invalid_data';
    throw error;
  }
};

const validQuantity = (quantity) => {
  const minQuantity = 0;
  if (quantity <= minQuantity) {
    const error = new Error ('"quantity" must be larger than or equal to 1');
    error.statusCode = 'invalid_data';
    throw error;
  }
};

const validNumber = (quantity) => {
  const minQuantity = 0;
  if (typeof quantity === 'string') {
    const error = new Error ('"quantity" must be a number');
    error.statusCode = 'invalid_data';
    throw error;
  }
};

const existID = async (id) => {
  await validID(id);
  const idVerify = await ProductsModel.getByID(id);
  if (!idVerify) {
    const error = new Error ('Wrong id format');
    error.statusCode = 'invalid_data';
    throw error;
  }
  return idVerify;
};

const validID = async (id) => {
  const minLengthID = 24;
  if (typeof id !== 'string' || id.length < minLengthID) {
    const error = new Error ('Wrong id format');
    error.statusCode = 'invalid_data';
    throw error;
  };
  return true;
};



module.exports = {
  validName,
  existName,
  validQuantity,
  validNumber,
  existID,
  validID,
};
