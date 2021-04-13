const connect = require('../config/conn');
const { ObjectId } = require('mongodb');

const add = async (name, quantity) =>
  connect().then(async (db) => {
    const product = await db.collection('products').insertOne({ name, quantity });
    return product.ops[0];
  });

const getAll = async () =>
  connect().then(async (db) => await db.collection('products').find().toArray());

const getOne = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connect().then((db) => db.collection('products').findOne(ObjectId(id)));
};

const updateOne = async (id, name, quantity) =>
  connect().then(async (db) => {
    await db
      .collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });

    return {
      _id: id,
      name,
      quantity,
    };
  });

module.exports = {
  add,
  getAll,
  getOne,
  updateOne,
};
