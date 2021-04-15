const connection = require('../../config/connection');
const { ObjectId } = require('mongodb');

const findAll = async () => {
  return connection()
    .then((db) => db.collection('products').find().toArray());
};

const findById = async (id) => {
  return connection()
    .then((db) => db.collection('products').findOne(ObjectId(id)));
};

const findByName = async (name) => {
  return connection()
    .then((db) => db.collection('products').findOne({ name }));
};

const create = async (name, quantity) => {
  return connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
};

const update = async (id, name, quantity) => {
  connection()
    .then((db) => db.collection('products').updateOne({ _id: ObjectId(id)},
      { $set: { name, quantity } }));
};

const exclude = async (id) => {
  connection()
    .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  findByName,
  create,
  findAll,
  findById,
  update,
  exclude
};
