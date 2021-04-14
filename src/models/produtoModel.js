const connection = require('../config/conn');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  const products = await connection().then((db) =>
    db.collection('products').find().toArray());
  return products;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const product = await connection().then((db) =>
    db.collection('products').findOne(ObjectId(id)));

  return product;
};

const createProduct = async (name, quantity) => {
  const product = await connection().then((db) =>
    db.collection('products').insertOne({ name, quantity })
  );
  return { _id: product.insertedId, name, quantity };
};

const findByName = async (nameRequest) => {
  const product = await connection()
    .then((db) => db.collection('products').findOne({ name: nameRequest }));

  if (!product) return null;

  return product;
};

const update = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const product = await connection().then((db) =>
    db.collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } })
  );
  return product;
};

module.exports = {
  getAll,
  getById,
  createProduct,
  findByName,
  update,
};