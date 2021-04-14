const connection = require('../config/conn');

const { ObjectId } = require('mongodb');

const createProduct = async (name, quantity) => {
  const product = await connection().then((db) =>
    db.collection('products').insertOne({ name, quantity })
  );

  return { _id: product.insertedId, name, quantity };
};

module.exports = {
  createProduct
};
