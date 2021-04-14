const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createProduct = async (name, quantity) => connection()
  .then((db) => db.collection('products').insertOne({ name, quantity })
    .then((product) => product.ops[0]));

const getAllProducts = async () => connection()
  .then((db) => db.collection('products').find().toArray());

const getProductById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connection().then((db) => db.collection('products').findOne(ObjectId(id)));
};

const deleteProduct = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connection()
    .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct
};
