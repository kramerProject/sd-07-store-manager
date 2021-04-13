const { response } = require('express');
const connect = require('../db');
const { ObjectId } = require('mongodb');

const getByProductName = async (name) => {
  return connect()
    .then(db => db.collection('products')
      .findOne({name}))
    .catch(error => console.log(error.message));
};

const insertProduct = async (name, quantity) => {
  return connect()
    .then(db => db.collection('products')
      .insertOne({name, quantity}))
    .then(result => result.ops)
    .catch(error => console.log(error));
};

const getAllProducts = async () => {
  return connect()
    .then(db => db.collection('products')
      .find().toArray().then(response => response))
    .catch(error => console.log(error.message));
};

const getByProductId = async (id) => {
  return connect()
    .then(db => db.collection('products')
      .findOne({_id: ObjectId(id)})
      .then(response => response))
    .catch(error => console.log(error.message));
};

const updateProduct = async (id, name, quantity) => {
  return connect()
    .then(db => db.collection('products')
      .findOneAndUpdate({_id: ObjectId(id)}, {$set: {name, quantity}}))
    .then(response => getByProductId(response.value._id))
    .then(result => result)
    .catch(error => console.log(error));
};

const deleteOneProduct = async (id) => {
  return connect()
    .then(db => db.collection('products')
      .findOneAndDelete({_id: ObjectId(id)}))
    .then(result => result)
    .catch(error => console.log(error));
};


module.exports = {
  getByProductName,
  insertProduct,
  getAllProducts,
  getByProductId,
  updateProduct,
  deleteOneProduct
};