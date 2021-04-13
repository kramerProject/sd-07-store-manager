const SaleModel = require('../models/SaleModel');
const { ObjectId } = require('mongodb');
const { NOT_FOUND } = require('../controllers/status');

function convertToObjectID(value) {
  try {
    return ObjectId(value);
  } catch (error) {
    throw {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
      err_number: NOT_FOUND,
    };
  }
}

const find = async () => {
  return await SaleModel.find();
};

const create = async (sales) => {
  return await SaleModel.create(sales);
};

const get = async (id) => {
  id = convertToObjectID(id);
  return await SaleModel.get(id);
};

module.exports = {
  find,
  get,
  create,
};
