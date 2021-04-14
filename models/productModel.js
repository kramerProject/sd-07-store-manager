const connection = require('../config/conn');
const { ObjectId } = require('mongodb');

const getAll = async () => { 
  const products = await connection().then((db) =>
    db.collection('products').find().toArray());
  return products;
};

const getById = async (id) => {
  if(!ObjectId.isValid(id)) return null;

  return connection().then((db) => db.collection('products').findOne(ObjectId(id)));
};

const create = async (name, quantity) => {
  const product = await connection().then((db) =>
    db.collection('products').insertOne({ name, quantity }));

  return { _id: product.insertedId, name, quantity };
};

const update = async ({ id, name, quantity }) => {
  if(!ObjectId.isValid(id)) return null;

  const product = await connection().then((db) =>
    db
      .collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }));

  return product;
};

const exclude = async (id) => {
  if(!ObjectId.isValid(id)) return null;

  return connection().then((db) => {
    return db.collection('products').deleteOne({ _id: ObjectId(id) });
  });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude,
};
