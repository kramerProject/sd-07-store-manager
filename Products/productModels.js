const connection = require('../connection');
const { validationsToAdd, validationsToUpdate } = require('./productErrors');
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

const uptadeProduct = async (id, name, quantity) => {
  const isNotValid = await validationsToUpdate(name, quantity);
  if (isNotValid) throw new Error(isNotValid);

  await connection().then((db) => db.collection('products')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } })
  );

  return { _id: ObjectId(id), name, quantity };
};

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  uptadeProduct
};
