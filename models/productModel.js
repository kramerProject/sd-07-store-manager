const connect = require('../config/connect');
const { ObjectId } = require('mongodb');

const createProduct = async (name, quantity) => {
  return connect().then(db => db.collection('products').insertOne({ name, quantity }))
    .then(response => response.ops[0])
    .catch(error => console.error(error.message));
};

const getProductByName = async (name) => {
  return connect().then((db) => db.collection('products').findOne({name}))
    .catch(error => error.message);
};

const getAllProducts = async () => {
  return connect().then((db) => db.collection('products').find().toArray())
    .catch(error => error.message);
};

const getProductById = async (id) => {
  return connect().then((db) => db.collection('products').findOne({_id: ObjectId(id)}))
    .catch(error => error.message);
};

const updateById = async (id, name, quantity) => {
  return connect().then((db) => db.collection('products').updateOne(
    { _id: ObjectId(id)},
    {$set: { name, quantity }})
  )
    .catch(error => error.message);
};

module.exports = {
  createProduct,
  getProductByName,
  getAllProducts,
  getProductById,
  updateById,
};