const connect = require('../config/connection');
// const { ObjectId } = require('mongodb');

const getAllNames = async () => {
  const db = await connect();
  return db.collection('products').find({}, { _id: 0, name: 1 }).toArray();
};

const addNewProduct = async (name, quantity) => {
  const db = await connect();
  db.collection('products').insertOne({ name, quantity });
};

const getProductByName = async (name) => {
  const db = await connect();
  return db.collection('products').findOne({ name });
}

module.exports = {
  getAllNames,
  addNewProduct,
  getProductByName,
};
