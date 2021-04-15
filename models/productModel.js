const connection = require('../config/connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  return connection().then((db) => db.collection('products').find().toArray());
};

const createProduct = async (name, quantity) => {
  return connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => result.ops[0]);
};

const getById = async (id) => {
  return connection()
    .then((db) => db.collection('products').findOne(ObjectId(id)))
    .catch((err) => err);
};

const updateProduct = async (id, name, quantity) => {
  return connection()
    .then((db) =>
      // db.collection('products').updateOne({_id: ObjectId(id)}, {$set: {name, quantity}}))
      db
        .collection('products')
        .findOneAndUpdate(
          { _id: ObjectId(id) },
          { $set: { name, quantity } },
          { returnOriginal: false },
        ),
    )
    .catch((err) => err);
};

const deleteProduct = async (id) => {
  if(!ObjectId.isValid(id)) return null;
  return connection()
    .then((db) => db.collection('products').findOneAndDelete({ _id: ObjectId(id)}));
};

module.exports = {
  getAll,
  createProduct,
  getById,
  updateProduct,
  deleteProduct
};
