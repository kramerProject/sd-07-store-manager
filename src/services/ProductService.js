const { ObjectId } = require('mongodb');
const { UNPROCESSABLE_ENTITY } = require('../controllers/status');
const ProductModel = require('../models/ProductModel');

function convertToObjectID(value) {
  try {
    return ObjectId(value);
  } catch (error) {
    throw {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
      err_number: UNPROCESSABLE_ENTITY,
    };
  }
}

module.exports = {
  create: async (name, quantity) => {
    return await ProductModel.create(name, quantity);
  },
  find: async () => {
    return await ProductModel.find();
  },
  get: async (field, value) => {
    if (field === '_id') {
      value = convertToObjectID(value);
    }

    return await ProductModel.get(field, value);
  },
};
