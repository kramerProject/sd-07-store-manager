const connection = require('../config/connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  return connection().then((db) => db.collection('products').find().toArray());
};

const createProduct = async (name, quantity) => {
  return connection().then((db) =>
    db.collection('products').insertOne({ name, quantity })).then(result => result.ops);
};

const getById = async (id) => {
  return connection().then((db) => 
    db.collection('products').findOne(ObjectId(id)))
    .catch(err => err);
};

module.exports = {
  getAll,
  createProduct,
  getById
};
