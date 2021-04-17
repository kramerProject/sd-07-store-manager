const Connect = require('../Config/Connect');
const ObjectId = require('mongodb').ObjectId;

const create = async (name, quantity) => 
  Connect()
    .then(db => db.collection('products')
      .insertOne({name, quantity}))
    .then(result => result.ops)
    .catch(error => console.log(error));

const getByProductName = async (name) =>
  Connect()
    .then(db => db.collection('products')
      .findOne({name}))
    .catch(error => console.log(error.message));

const getProduct = async () => 
  Connect()
    .then(db => db.collection('products')
      .find()
      .toArray())
    .catch(err => console.log(err));

const getByProductId = async (id) =>
  Connect()
    .then(db => db.collection('products')
      .findOne({_id: ObjectId(id)}))
    .catch(err => console.log(err));

const updateByProductId = async (id, name, quantity) =>
  Connect()
    .then(db => db.collection('products')
      .findOneAndUpdate({_id: ObjectId(id)}, 
        {$set: {name, quantity}},
        {returnOriginal: false}))
    .catch(error => console.log(error));

const deleteByProductId = async (id) =>
  Connect()
    .then(db => db.collection('products')
      .findOneAndDelete({_id: ObjectId(id)}))
    .then(response => response.value)
    .catch(err => console.log(err));

module.exports = {
  create,
  getByProductName,
  getProduct,
  getByProductId,
  updateByProductId,
  deleteByProductId,
};