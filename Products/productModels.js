const connection = require('../connection');
const { validationsToAdd } = require('./productErrors');
const { ObjectId } = require('mongodb');

const addProduct = async (name, quantity) => {
  const itemName = await connection().then((db) =>
    db.collection('products').findOne({ name }));

  const isNotValid = await validationsToAdd(name, quantity, itemName);
  if (isNotValid) throw new Error(isNotValid);

  const addItem = await connection().then((db) =>
    db.collection('products').insertOne({ name, quantity }));
    
  return { _id: addItem.insertedId, name, quantity };
};

const getAllProducts = async () => {
  return await connection().then((db) => db.collection('products').find().toArray());
};

const getProductById = async (id) => {
  if (!ObjectId.isValid(id)) throw new Error('Wrong id format');

  return await connection().then((db) =>
    db.collection('products').findOne(ObjectId(id)));
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductById
};
