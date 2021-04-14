const connection = require('./connection');
// const { ObjectId } = require('mongodb');

const createProduct = async (name, quantity) => connection()
  .then((db) => db.collection('products').insertOne({ name, quantity })
    .then((product) => product.ops[0]));

const getAllProducts = async () => connection()
  .then((db) => db.collection('products').find().toArray());

module.exports = {
  createProduct,
  getAllProducts
};
