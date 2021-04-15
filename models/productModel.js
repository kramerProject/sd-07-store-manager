const connection = require('../config/connection');
const { ObjectId } = require('mongodb');

const registerProduct = async (name, quantity) => {
  const { insertedId } = await connection().then((db) =>
    db.collection('products').insertOne({ name, quantity }));
  return {
    _id: insertedId,
    name,
    quantity,
  };
};

const getByName = async (name) => {
  return await connection().then((db) =>
    db.collection('products').findOne({ name }));
};

const getAll = async () => {
  return await connection().then((db) =>
    db.collection('products').find().toArray());
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return await connection().then((db) =>
    db.collection('products').findOne(ObjectId(id)));
};

const updateProduct = async (id, name, quantity) => {
  return await connection().then((db) =>
    db.collection('products').updateOne(
      { _id: ObjectId(id) }, { $set: { name, quantity } }));
};

const removeProduct = async (id) => {
  return await connection().then((db) =>
    db.collection('products').deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  registerProduct,
  getByName,
  getAll,
  getById,
  updateProduct,
  removeProduct,
};
