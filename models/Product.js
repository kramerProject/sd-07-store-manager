const { ObjectId } = require('mongodb');
const connection = require('../config/dbConnection');

const getAll = async () => {
  return await connection().then((db) => db.collection('products').find().toArray());
};

const create = async (name, quantity) => {
  return await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
};

module.exports = {
  getAll,
  create
};