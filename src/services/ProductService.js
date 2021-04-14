const { ObjectId } = require('mongodb');
const { UNPROCESSABLE_ENTITY } = require('../controllers/status');
const ProductModel = require('../models/ProductModel');

const ZERO = 0;

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

const create = async (name, quantity) => {
  return await ProductModel.create(name, quantity);
};

const find = async () => {
  return await ProductModel.find();
};

const get = async (field, value) => {
  if (field === '_id') {
    value = convertToObjectID(value);
  }

  return await ProductModel.get(field, value);
};

const update = async (id, data) => {
  id = convertToObjectID(id);
  return await ProductModel.update(id, data);
};

const _delete = async(id) => {
  const exists = await get('_id', id);
  if (exists.length === ZERO)
    throw {
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
      err_number: UNPROCESSABLE_ENTITY,
    };
  await ProductModel.delete(ObjectId(id));
  return exists;
};

module.exports = {
  create,
  find,
  get,
  update,
  delete: _delete,
};
