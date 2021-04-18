const connection = require('../config/conn');
const { ObjectId } = require('mongodb');

const createProducts = async (name, quantity) => {
  const result = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then(response => response.ops[0]);
  return result;
};

module.exports = { createProducts };
