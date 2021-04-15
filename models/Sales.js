const { ObjectId } = require('mongodb');
const connection = require('../config/conn');

const getAll = async () => connection()
  .then(db => db.collection('sales').find())
  .then(collections => collections.toArray());


const add = async (itensSold) => (
  connection().then(async (db) => {
    const sale = await db
      .collection('sales').insertOne({ 'itensSold': itensSold});
    return sale.ops[0];
  })
);

const exclude = async (id) =>
  connection().then( async (db) => {
    await db
      .collection('products').deleteOne({ _id: ObjectId(id) });
    const { name, quantity } = db.collection('products').findOne(ObjectId(id));
    return { _id: id, name: name, quantity: quantity };
  });

const getById = async(id) => {
  if (!ObjectId(id)) return null;
  return connection()
    .then(db => db.collection('sales').findOne(ObjectId(id)));
};

module.exports = {
  add,
  getAll,
  getById,
  exclude,
};