const connection = require('../../config/connection');
const { ObjectId, MongoClient } = require('mongodb');

const getAll = async () => {
  connection()
    .then((db) =>
      db.collection('products')
        .find().toArray());
};

const createProduct = async (name, quantity) => {
  const product = await connection()
    .then((db) =>
      db.collection('products')
        .insertOne({ name, quantity })
    );

  return { _id: product.insertedId, name, quantity };
};

const countByNameDuplicate = async (name) => {
  const product = await connection()
    .then((db) =>
      db.collection('products')
        .countDocuments({ 'name': name }));
  return product;
};

module.exports = {
  getAll,
  createProduct,
  countByNameDuplicate,
};
