const connection = require('./connection');
const { ObjectId } = require('mongodb');
const PRODUCTS = 'products';

const getAll = () => {
  return connection()
    .then((db) => {
      return db.collection(PRODUCTS).find().toArray();
    });
};

const getById = (id) => {
  return connection()
    .then((db) => {
      return db.collection(PRODUCTS).findOne(ObjectId(id));
    });
};

const create = (name, quantity) => {
  return connection()
    .then((db) => {
      return db.collection(PRODUCTS).insertOne({ name, quantity });
    })
    .then((result) => ({ _id: result.insertedId, name, quantity }));
};

const findByName = (name) => {
  return connection()
    .then((db) => {
      return db.collection(PRODUCTS).findOne({ name });
    });
};

module.exports = { getAll, getById, create, findByName };
