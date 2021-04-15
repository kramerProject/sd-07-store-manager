const connection = require('../config/conn');
const { ObjectId } = require('mongodb');

const createProducts = async (name, quantity) => {
  const item = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
  return item;
};

module.exports = { createProducts };
