const connection = require('../config/conn');
const { ObjectId } = require('mongodb');

const addProductModel = async(name, quantity) => {
  // const product = await connection().then((db) =>
  //   db.collection('products').insertOne({ name, quantity }));
  // return product.ops[0];
  const db = await connection();
  const product = await db.collection('products').insertOne({ name, quantity });
  return product.ops[0];
};

const getAllProductsModel = async() => {
  const db = await connection();
  return await db.collection('products').find().toArray();
};

const getProductByIdModel = async(id) => {
  if(!ObjectId.isValid(id)) return false;
  const db = await connection();
  return db.collection('products').findOne(ObjectId(id));
};

module.exports = {
  addProductModel,
  getAllProductsModel,
  getProductByIdModel,
};
