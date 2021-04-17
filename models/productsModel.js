const connection = require('./connection');
// const { ObjectId } = require('mongodb');

const findProduct = async (name) => {
  const result = await connection().then((db) =>
    db.collection('products').findOne({ name }));
  return result;
};

const productRegistration = async (name, quantity) => {
  const result = await connection().then((db) => 
    db.collection('products').insertOne({ name, quantity }));
  return result.ops[0];
};

module.exports = { productRegistration, findProduct };