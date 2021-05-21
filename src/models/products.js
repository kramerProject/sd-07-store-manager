const connection = require('./connection');

const create = async (name, quantity) =>
  connection()
    .then ((db) => db.collection('products').insertOne({ name, quantity }));

const getAll = async () =>
  connection()
    .then ((db) => db.collection('products').find().toArray());

const getProduct = async (id) => {
  if(!Object.isValid(id)) {
    return null;
  }
};

module.exports = {
  create,
  getAll,
  getProduct,
};
