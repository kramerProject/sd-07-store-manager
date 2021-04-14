const connection = require('../configs/connection');
const { throwError } = require('../configs/erro');
const { status, errors } = require('../configs/status');

const collection = 'products';

const createProduct = async ({ name, quantity }) => {
  const product = await connection()
    .then((db) => db.collection(collection).findOne({ name }));

  if (product) {
    throw new throwError(status.unprocessableEntity, errors.productExists);
  }

  const created = await connection()
    .then((db) => db.collection(collection).insertOne({ name, quantity }));

  const result = {
    _id: created.insertedId,
    name,
    quantity,
  };

  return result;
};

module.exports = {
  createProduct,
};
