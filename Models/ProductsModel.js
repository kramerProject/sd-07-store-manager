const connect = require('../config/conn');
const { ObjectId } = require('mongodb');

const addProduct = async (name, quantity) => {
  const result = await connect().then((db) =>
    db.collection('products').insertOne({ name, quantity }));
  return result.ops[0];
};

const getAllProducts = async () => {
  const result = await connect()
    .then((db) => db.collection('products').find().toArray());
  return result;
};

const getProductsById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connect().then((db) => db.collection('products').findOne(ObjectId(id)));
};

const updateProductById = async (id, name, quantity) => {
  return connect().then(async (db) => {
    await db
      .collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
    return { _id: id, name, quantity };
  });
};

const deleteProductById = async (id) => {
  return connect().then(async (db) =>
    db.collection('products').deleteOne({ _id: ObjectId(id) })
  );
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductsById,
  updateProductById,
  deleteProductById
};
