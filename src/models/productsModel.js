const connect = require('../config/connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  const db = await connect();
  return db.collection('products').find().toArray();
};

const getAllNames = async () => {
  const db = await connect();
  return db.collection('products').find({}, { _id: 0, name: 1 }).toArray();
};

const getById = async (id) => {
  const db = await connect();
  return db.collection('products').findOne(ObjectId(id));
};

const addNewProduct = async (name, quantity) => {
  const db = await connect();
  db.collection('products').insertOne({ name, quantity });
};

const getProductByName = async (name) => {
  const db = await connect();
  return db.collection('products').findOne({ name });
};

const updateById = async (id, name, quantity) => {
  const db = await connect();
  db.collection('products').updateOne(
    { _id: ObjectId(id) }, { $set: { name, quantity } },
  );
};

const deleteById = async (id) => {
  const db = await connect();
  db.collection('products').deleteOne({ _id: ObjectId(id) })
}

module.exports = {
  getAll,
  getById,
  getAllNames,
  addNewProduct,
  getProductByName,
  updateById,
  deleteById,
};
