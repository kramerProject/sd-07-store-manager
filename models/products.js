const connection = require('../config/connection');
const { ObjectId } = require('mongodb');

const getDbCollection = async (db) => {
  return connection()
    .then((db) => db.collection('products'));
};

const getProducts = async () => {
  return getDbCollection()
    .then((collection) => collection.find().toArray());
};

const getProductById = async (id) => {
  return getDbCollection()
    .then((collection) => collection.findOne(ObjectId(id)));
};

const findOneProductByName = async (name) => {
  return getDbCollection()
    .then((collection) => collection.findOne({ name }));
};

const updateProduct = async (_id, name, quantity) => {
  return getDbCollection()
    .then((collection) => collection.updateOne(
      { _id: ObjectId(_id) },
      { $set: { name, quantity } }
    ));
};

const registerProduct = async (name, quantity) => {
  return getDbCollection()
    .then((collection) => collection.insertOne({ name, quantity }));
};

const deleteProduct = async (id) => {
  return getDbCollection()
    .then((collection) => collection.deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  registerProduct,
  findOneProductByName,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
