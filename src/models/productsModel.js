const conn = require('../database');
const { ObjectId } = require('mongodb');

const collectionName = 'products';

const create = async (name, quantity) => {
  conn().then((db) => db.collection(collectionName).insertOne({
    name,
    quantity,
  }));
};

const findAll = async () => {
  return conn().then((db) => db.collection(collectionName).find().toArray());
};

const findById = async (id) => {
  return conn().then((db) => db.collection(collectionName).findOne({ _id: id }));
};

const update = async (id, name, quantity) => {
  conn().then((db) => db.collection(collectionName).updateOne(
    { _id: ObjectId(id) },
    {
      $set: {
        name,
        quantity
      }
    }
  ));
};

module.exports = {
  create,
  findAll,
  findById,
  update,
};

