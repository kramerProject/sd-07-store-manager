const { ObjectId } = require('mongodb');
const modelsProducts = require("../models/modelsProducts");

const rulesInsProd = async (name, quantity) => {
  if (name.length < 6) {
    throw {
      code: 'invalid_data',
      message: '"name" length must be at least 5 characters long',
    };
  }
  if (quantity < 1) {
    throw {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1',
    };
  }
  if (typeof quantity !== 'number') {
    // if (!Number.isInteger(quantity)) {
    throw {
      code: 'invalid_data',
      message: '"quantity" must be a number',
    };
  }
  return true;
};

const create = async (name, quantity) => {
  const rules = await rulesInsProd(name, quantity);
  if (!rules) {
    return false
  };
  const nameInvalid = await modelsProducts.getByName(name);
  if (nameInvalid) {
    throw {
      code: 'invalid_data',
      message: 'Product already exists',
    };
  }
  const productInserted = await modelsProducts.create(name, quantity);
  return productInserted;
};

module.exports = {
  create
};
