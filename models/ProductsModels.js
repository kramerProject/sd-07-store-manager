const connect = require('../config/connect');
const ObjectId = require('mongodb').ObjectId;

// criar endpoint - cadastro produtos
const createProduct = async(name, quantity) => {
  connect().then(db => db.collection('products')
    .insertOne({ name, quantity }))
    .then(result => result.ops)
    .catch(err => console.log(err.message));
};

const getProductByName = async (name) => {
  connect().then(db => db.collection('products')
    .findOne({name}))
    .catch(err => console.log(err.message));
};

const getProduct = async () => {
  connect().then(db => db.collection('products')
    .find().toArray())
    .catch(err => console.log(err.message));
};

const getProductById = async (id) => {
  connect().then(db => db.collection('products')
    .findOne({_id: ObjectId(id)}))
    .catch(err => console.log(err.message));
};

const updateProductsById = async (id, name, quantity) => {
  connect().then(db => db.collection('products')
    .findOneAndUpdate({_id: ObjectId(id)},
      {$set: {name, quantity}},
      {returnOriginal: false}))
    .catch(err => console.log(err.message));
};

const deleteProductsById = async (id) => {
  connect().then(db => db.collection('products')
    .findOneAndDelete({_id: ObjectId(id)}))
    .then(response => response.value)
    .catch(err => console.log(err.message));
};

module.exports = {
  createProduct,
  getProductByName,
  getProduct,
  getProductById,
  updateProductsById,
  deleteProductsById,
};