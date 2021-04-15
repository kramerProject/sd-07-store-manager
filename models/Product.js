const { ObjectId } = require('mongodb');
const connection = require('../config/dbConnection');

const getAll = async () => {
  const allProducts = await connection()
    .then((db) => db.collection('products').find().toArray());
 
  return allProducts;
};

const findById = async (id) => {
  const selectedProduct = await connection()
    .then((db) => db.collection('products').findOne(ObjectId(id)));
 
  return selectedProduct;
};

const create = async (name, quantity) => {
  const product =  await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
  
  return product;
};

module.exports = {
  getAll,
  create,
  findById
};