const connection = require('../config/connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  const products = await connection().then((db) => db
    .collection('products')
    .find().toArray());

  return { products };
};

const getById = async (id) => {
  const product = await connection().then((db) => db
    .collection('products')
    .findOne(ObjectId(id)));

  return product;
};

const add = async (name, quantity) => {
  const product = await connection().then((db) => db
    .collection('products')
    .insertOne({ name, quantity }));

  return { _id: product.insertedId, name, quantity };
};

const update = async (id, name, quantity) => {
  const product = await connection().then((db) => db
    .collection('products')
    .updateOne({ _id: ObjectId(id) } ,{ $set: { name, quantity } }));

  return { _id: product.insertedId, name, quantity };
};

const exclude = async (id) => {
  return await connection().then((db) => {
    return db.collection('products').deleteOne({ _id: ObjectId(id) });
  });
};

const getByName = async (name) => {
  const product = await connection().then((db) => db
    .collection('products')
    .findOne({ name: name }));

  return product;
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  exclude,
  getByName
};
