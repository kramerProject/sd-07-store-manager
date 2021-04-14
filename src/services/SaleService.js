const SaleModel = require('../models/SaleModel');
const { ObjectId } = require('mongodb');
const { UNPROCESSABLE_ENTITY, NOT_FOUND } = require('../controllers/status');

const ZERO = 0;

function convertToObjectID(value, method = null) {
  try {
    return ObjectId(value);
  } catch (error) {
    if (method === 'DELETE') {
      throw {
        err: {
          code: 'invalid_data',
          message: 'Wrong sale ID format',
        },
        err_number: UNPROCESSABLE_ENTITY,
      };
    } else {
      throw {
        err: {
          code: 'not_found',
          message: 'Sale not found',
        },
        err_number: NOT_FOUND,
      };
    }
  }
}

const find = async () => {
  return await SaleModel.find();
};

const create = async (sales) => {
  return await SaleModel.create(sales);
};

const get = async (id, method = null) => {
  id = convertToObjectID(id, method);
  return await SaleModel.get(id);
};

const update = async (id, sales) => {
  id = convertToObjectID(id);
  return await SaleModel.update(id, sales);
};

const _delete = async (id, method) => {
  const exists = await get(id, method);
  if (exists.length === ZERO)
    throw {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
      err_number: NOT_FOUND,
    };
  await SaleModel.delete(ObjectId(id));
  return exists;
};

module.exports = {
  find,
  get,
  create,
  update,
  delete: _delete,
};
