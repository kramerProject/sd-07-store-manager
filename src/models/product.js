const { ObjectId } = require('bson');
const connection = require('./connection');

const getAll = async () =>
  connection().then ((db) => db.collection('products').find().toArray());

const getOne = async (id) =>
  connection().then ((db) => db.collection('products').findOne(ObjectId(id)));

const create = async (name, quantity) =>
  connection().then ((db) => db.collection('products').insertOne({ name, quantity }));

const update = async (id, name, quantity) => {
  connection().then ((db) => db.collection('products').updateOne(
    { _id: ObjectId(id) },
    { $set: { name, quantity } } )
  );
  return {
    _id: id,
    name,
    quantity
  };
};


module.exports = {
  getAll,
  getOne,
  create,
  update,
};
