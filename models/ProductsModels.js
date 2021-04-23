const connect = require('../config/connect');
const ObjectId = require('mongodb').ObjectId;

// criar endpoint - cadastro produtos
const createProduct = async(name, quantity) => {
  return connect().then(db => db.collection('products').insertOne({ name, quantity }))
    .then(response => response.ops).catch(error => console.error(error.message));
};

const getProductByName = async (name) => {
  return connect().then(db => db.collection('products').findOne({name}))
    .catch(error => console.error(error.message));
};

const getProduct = async () => {
  return connect().then(db => db.collection('products').find().toArray())
    .catch(error => console.error(error.message));
};

const getProductById = async (id) => {
  return connect().then(db => db.collection('products').findOne({_id: ObjectId(id)}))
    .catch(error => console.error(error.message));
};

const updateProductsById = async (id, name, quantity) => {
  return connect().then(db => db.collection('products')
    .findOneAndUpdate({_id: ObjectId(id)},
      {$set: {name, quantity}},
      {returnOriginal: false}))
    .catch(error => console.error(error.message));
};

const deleteProductsById = async (id) => {
  return connect().then(db => db.collection('products')
    .findOneAndDelete({_id: ObjectId(id)}))
    .then(response => response.value)
    .catch(error => console.error(error.message));
};

module.exports = {
  createProduct,
  getProductByName,
  getProduct,
  getProductById,
  updateProductsById,
  deleteProductsById,
};