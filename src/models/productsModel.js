const conn = require('../database');
const { ObjectId } = require('mongodb');

const collectionName = 'products';

const create = async (name, quantity) => conn()
  .then((db) => db.collection(collectionName).insertOne({
    name,
    quantity,
  }));

const findAll = async () => conn()
  .then((db) => db.collection(collectionName).find().toArray());

const findById = async (id) => conn()
  .then((db) => db.collection(collectionName).findOne(ObjectId(id)));

const findByName = async (name) => conn()
  .then((db) => db.collection(collectionName).findOne({name}));

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
  return ({
    _id: id,
    name,
    quantity,
  });
};

const remove = async (id) =>
  conn().then((db) => db.collection(collectionName).deleteOne({ _id: ObjectId(id) }));


module.exports = {
  create,
  findAll,
  findById,
  findByName,
  update,
  remove,
};

