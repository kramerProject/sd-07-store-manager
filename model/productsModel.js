const connection = require('../config/connection');
const { ObjectId } = require('mongodb');

const insert = async (name, quantity) => {
  return connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
};

const getAll = async () => {
  return connection().then((db) => db.collection('products').find().toArray());
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connection().then((db) => db.collection('products').findOne(ObjectId(id)));
};

module.exports = {
  insert,
  getAll,
  findById,
};