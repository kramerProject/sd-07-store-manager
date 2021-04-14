const connection = require('../config/connections');
const { ObjectId } = require('mongodb');

const findProductByName = async (name) => {
  const existsProduct = await connection()
    .then((db) =>
      db.collection('products').findOne({name})
    );
  return existsProduct;
};

const createProducts = async (name, quantity) => {
  const newProduct = await connection()
    .then((db) =>
      db.collection('products').insertOne({name, quantity})
    );
  return { _id: newProduct.insertedId, name, quantity};
};

module.exports = {
  createProducts,
  findProductByName,
};