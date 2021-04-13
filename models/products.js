const connection = require('./connection');

const PRODUCTS_COLLECTION = 'products';

const createProduct = ({name, quantity}) => {
  return connection()
    .then((db) => db.collection(PRODUCTS_COLLECTION).insertOne({
      name,
      quantity,
    }))
    .then((result) => ({
      _id: result.insertedId,
      name,
      quantity,
    }));
};

const findByName = (name) => {
  return connection()
    .then((db) => db.collection(PRODUCTS_COLLECTION).find({ name: name }).toArray());
};

module.exports = {
  createProduct,
  findByName,
};
