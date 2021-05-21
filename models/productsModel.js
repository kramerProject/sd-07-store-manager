const { ObjectId } = require('mongodb');
const connect = require('../config/connection');

const getAll = async () =>
  connect()
    .then((db) => db.collection('products').find().toArray());

const addProduct = async (name, quantity) =>
  connect().then((db) =>
    db.collection('products').insertOne({
      name,
      quantity,
    })).then((result) => result.ops[0]);

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connect().then((db) => db.collection('products').findOne(ObjectId(id)));
};

const update = async (name, quantity, id) => {
  connect().then((db) =>
    db.collection('products').updateOne({ _id: ObjectId(id) },
      { $set: { name, quantity } }));
  return { name, quantity };
};

const remove = async (id) => {
  connect().then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  getAll,
  addProduct,
  getById,
  update,
  remove,
};
