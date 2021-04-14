const connection = require('../config/connection');
const { ObjectId } = require('mongodb');

const insert = async (saleArray) => {
  return connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: saleArray }));
};

const getAll = async () => {
  return connection().then((db) => db.collection('sales').find().toArray());
};

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connection().then((db) => db.collection('sales').findOne(ObjectId(id)));
};

module.exports = {
  insert,
  getAll,
  findById,
};