const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  return connection()
    .then((db) => db.collection('products').find().toArray())
    .then((produtcs) => produtcs);
};
const create = async (name, quantity) =>
  connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then(result => {
      return ({
        _id: result.insertedId,
        name,
        quantity,
      });
    });

const findByName = async (name) => {
  return connection()
    .then((db) => db.collection('products').findOne({ name: name }));
};

const findById = async (id) => {
  return connection()
    .then((db) => db.collection('products').findOne(ObjectId(id)));
}; 

module.exports = {
  getAll,
  create,
  findByName,
  findById,
};
