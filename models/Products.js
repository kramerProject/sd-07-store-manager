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

const update = async (name, quantity, id) =>
  connection().then( async (db) => {
    await db
      .collection('products').updateOne({ _id: ObjectId(id) }, 
        { $set: { name: name, quantity: quantity } });
    return { _id: id, name, quantity };
  });

const exclude = async (id) =>
  connection().then( async (db) => {
    await db
      .collection('products').deleteOne({ _id: ObjectId(id) });
    const { name, quantity } = db.collection('products').findOne(ObjectId(id));
    return { _id: id, name: name, quantity: quantity };
  });

module.exports = {
  getAll,
  getByName,
  getById,
  add,
  update,
  exclude,
};