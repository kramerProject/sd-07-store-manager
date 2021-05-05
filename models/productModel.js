const { ObjectId } = require('mongodb');
const connect = require('../config/connection');

const getAllProducts = async () => {
  return connect()
    .then((db) => db.collection('products').find().toArray());

};

const getProductById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connect().then((db) => db.collection('products').findOne(ObjectId(id)));
};

const createProduct = async (name, quantity) =>
  connect().then((db) =>
    db.collection('products').insertOne({
      name,
      quantity,
    })).then((result) => result.ops[0]);

const editProductById = async (name, quantity, id) => {
  connect().then((db) =>
    db.collection('products').updateOne({ _id: ObjectId(id) },
      { $set: { name, quantity } }));
  return { name, quantity };
};

const deleteProductById = async (id) => {
  connect().then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
  editProductById,
  deleteProductById,
};