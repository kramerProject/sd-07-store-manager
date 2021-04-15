const connect = require('../config/connection');
const { ObjectId } = require('mongodb');

const addProduct = async (name, quantity) => {
  return connect()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => result.ops[0]);
};

const findProductsByName = async (name) => {
  return connect().then((db) => db.collection('products').findOne({ name }));
};

const findAllProducts = async () => {
  return connect().then((db) => db.collection('products').find().toArray());
};

const findByIdProducts = async (id) => {
  if(!ObjectId.isValid(id)) return null;
  return connect().then((db) => db.collection('products').findOne(ObjectId(id)));
};

module.exports = {
  addProduct,
  findProductsByName,
  findAllProducts,
  findByIdProducts,
};

/* const createProduct = async (name, quantity) => {
  return connection().then(
    db => db.collection('products').insertOne({ name, quantity })
  ).then((result) => ({ _id: result.insertedId, name, quantity }));
}; */
