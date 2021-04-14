const connection = require('../config/connection');
const { ObjectId } = require('mongodb');

const insert = async (saleArray) => {
  return connection()
    .then((db) => db.collection('products').insertOne({ itensSold: saleArray }));
};

module.exports = {
  insert,
};