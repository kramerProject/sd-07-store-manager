const { connection } = require('../../configs');
const { ObjectId } = require('mongodb');

const creatProduct = async (name, quantity) => {
  connection().then((db) => db.collection('products')
    .insertOne({ name, quantity }));
};

const updateProduct = async (id, name, quantity) => {
  connection().then((db) => db.collection('products')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }));
};

const deleteProduct = async (id) => {
  connection().then((db) => db.collection('products')
    .deleteOne({ _id: ObjectId(id) }));
};

const getAllProducts = async () => {
  connection().then((db) => db.collection('products')
    .find().toArray());
};

const getProductById = async (id) => {
  connection().then((db) => db.collection('products')
    .findOne(ObjectId(id)).toArray());
};

module.exports = {
  creatProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
};
