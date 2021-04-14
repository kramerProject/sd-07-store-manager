const connect = require('../configuration/connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  const products = await connect().then((db) =>
    db.collection('products').find().toArray());
  return products;
};

const countByName = async (name) => {
  const product = await connect().then((db) =>
    db.collection('products').countDocuments({ 'name': name }));
  return product;
};

const add = async (name, quantity) => {
  const product = await connect().then((db) =>
    db.collection('products').insertOne({ name, quantity }));
  return product.ops[0];
};

module.exports = {
  add,
  getAll,
  countByName
};
