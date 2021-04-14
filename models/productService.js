const connection = require('../configs/connection');
const { sendError } = require('../configs/erro');
const { status, errors } = require('../configs/status');

const collection = 'products';

const createProduct = async ({ name, quantity }, res) => {
  const product = await connection()
    .then((db) => db.collection(collection).findOne({ name }));

  if (product) {
    sendError(status.unprocessableEntity, errors.productExists, res);
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
