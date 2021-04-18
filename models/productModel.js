const connect = require('../config/conn');

const getAll = async () =>
  connect().then((db) => db.collection('products').find().toArray());

const getProductName = async (name) => {
  const product = await connect()
    .then((db) => db.collection('products').findOne({ 'name': name }));
  return product;
};

const createAllProducts = async (name, quantity) =>
  connect()
    .then((db) => db.collection('products').insertOne({ name, quantity }));

module.exports = {
  createAllProducts,
  getProductName,
  getAll,
};
