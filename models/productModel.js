const { ObjectId } = require('mongodb');
const connect = require('../config/connection');

const getAllProducts = async () =>
  connect()
    .then((db) => db.collection('products').find().toArray());

const getProductById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connect().then((db) => db.collection('products').findOne(ObjectId(id)));
};

const createProduct = async (name, quantity) =>
  connect().then((db) =>
    db.collection('products').insertOne({
      name,
      quantity,
    })).then((result) => result.ops[0]);

module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
};