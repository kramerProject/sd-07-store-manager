const connection = require('./connection');
const { ObjectId } = require('mongodb');

const findProduct = async (name) => {
  const result = await connection().then((db) =>
    db.collection('products').findOne({ name }));
  return result;
};

const productRegistration = async (name, quantity) => {
  const result = await connection().then((db) => 
    db.collection('products').insertOne({ name, quantity }));
  return result.ops[0];
};

const allProductsList = async () => {
  const result = await connection().then((db) =>
    db.collection('products').find().toArray());
  return result;
};

const getProductByID = async (id) => {
  try {
    const result = await connection().then((db) =>
      db.collection('products').findOne(ObjectId(id)));
    return result;
  } catch (error) {
    return null;
  }
};

module.exports = {
  productRegistration,
  findProduct,
  allProductsList,
  getProductByID
};