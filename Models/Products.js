const Connect = require('../Config/Connect');
const ObjectId = require('mongodb').ObjectID;

const create = async (name, quantity) => {
  return Connect()
    .then(db => db.collection('products')
      .insertOne({name, quantity}))
    .then(result => result.ops)
    .catch(error => console.log(error));
};

const getByProductName = async (name) => {
  return Connect()
    .then(db => db.collection('products')
      .findOne({name}))
    .catch(error => console.log(error.message));
};

const getProduct = async () => {
  return Connect()
    .then(db => db.collection('products')
      .find()
      .toArray())
    .then(response => response)
    .catch(err => console.log(err));
};

const getByProductId = async (id) => {
  return Connect()
    .then(db => db.collection('products')
      .findOne({_id: ObjectId(id)}))
    .then(response => response)
    .catch(err => console.log(err));
};

module.exports = {
  create,
  getByProductName,
  getProduct,
  getByProductId
};