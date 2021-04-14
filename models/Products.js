const { ObjectId } = require('mongodb');
const connection = require('../config/conn');

const getAll = async () => connection()
  .then(db => db.collection('products').find())
  .then(collections => collections.toArray());

const getByName = async (name) => connection()
  .then(db => db.collection('products').findOne({ name: name }));

const getById = async (id) => {
  if (!ObjectId(id)) return null;

  return connection()
    .then(db => db.collection('products').findOne(ObjectId(id)));
};

const add = async (name, quantity) => (
  connection().then(async (db) => {
    const product = await db
      .collection('products').insertOne({ name: name, quantity: quantity });
    return product.ops[0];
  })
);

module.exports = {
  getAll,
  getByName,
  getById,
  add,
};