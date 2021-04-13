const connection = require('../config/connection');
const { ObjectId } = require('mongodb');

const getAllProducts = async () => {
  return connection().then((db) => db.collection('products').find().toArray());
};

const getProductById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  return connection().then((db) => db.collection('products').findOne(ObjectId(id)));
};

const addNewProduct = async (name, quantity) => {
  return connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((item) => item.ops[0]);
};

const updateProduct = async (id, name, quantity) => {
  connection().then((db) =>
    db.collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }),
  );

  return { _id: id, name, quantity };
};

const deleteProduct = async (id) => {
  connection().then(db => db.collection('products').deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  getAllProducts,
  getProductById,
  addNewProduct,
  updateProduct
};
