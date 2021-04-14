const connect = require('../config/connection');
// const { ObjectId } = require('mongodb');

const addProduct = async (name, quantity) => {
  return connect()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => result.ops[0]);
};

const findProductsByNane = async (name) => {
  return connect().then((db) => db.collection('products').findOne({ name }));
};

module.exports = {
  addProduct,
  findProductsByNane,
};

/* const createProduct = async (name, quantity) => {
  return connection().then(
    db => db.collection('products').insertOne({ name, quantity })
  ).then((result) => ({ _id: result.insertedId, name, quantity }));
}; */
