const connection = require('../config/connection');

const { ObjectId } = require('mongodb');

const getAll = async () => {
  const allProducts = await connection().then((db) =>
    db.collection('products').find().toArray(),
  );
  return allProducts;
};

const create = async (name, quantity) => {
  const product = await connection().then((db) =>
    db.collection('products').insertOne({ name, quantity }),
  );

  return { _id: product.insertedId, name, quantity };
};

module.exports = { create, getAll };
