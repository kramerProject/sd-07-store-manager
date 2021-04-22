const connection = require('../config/connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  const products = await connection().then((db) => db
    .collection('products')
    .find().toArray());

  return products;
};

const add = async (name, quantity) => {
  const product = await connection().then((db) => db
    .collection('products')
    .insertOne({ name, quantity }));

  return { _id: product.insertedId, name, quantity };
};

const getByName = async (name) => {
  const product = await connection().then((db) => db
    .collection('products')
    .findOne({ name: name }));

  return product;
};

module.exports = {
  getAll,
  add,
  getByName
};
