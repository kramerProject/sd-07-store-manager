const connection = require('../../config/conn');
const { ObjectId } = require('mongodb');

const create = async (name, quantity) => {
  const product = await connection().then((db) => {
    return db.collection('products').insertOne({ name, quantity });
  });
  return product;
};

const ready = async () => {
  const products = await connection().then((db) => {
    return db.collection('products').find().toArray();
  });
  return products;
};

const update = () => {};

const exclude = () => {};

module.exports = {
  create,
  ready,
  update,
  exclude,
};
