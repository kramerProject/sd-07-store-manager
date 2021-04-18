const { ObjectId } = require('bson');
const connection = require('../configs/connection');

const checkIfExists = async (product) => {
  const productRes = await connection().then((db) => 
    db.collection('products').findOne({ 'name': product }));

  return productRes;
};

const deleteProduct = async (id, name, quantity) => {

  const res = await connection().then((db) => db
    .collection('products')
    .deleteOne({ _id: ObjectId(id)}));

  return {
    _id: id,
    name,
    quantity
  };
};

const updateProduct = async (id, name, quantity) => {
  const res = await connection().then((db) => db
    .collection('products')
    .updateOne({ _id: ObjectId(id)}, { $set: { name, quantity } }));

  
  return {
    _id: id,
    name,
    quantity
  };
};

const updateAfterSales = async (id, qt) => {
  const res = await connection().then((db) => db
    .collection('products')
    .updateOne({ _id: ObjectId(id)}, { $inc: { quantity: qt } }));

  
  return {
    _id: id,
    qt
  };
};

const getProductById = async (id) => {
  const res = await connection().then((db) => 
    db.collection('products').findOne(ObjectId(id)));

  return res;
};

const getAllProducts = async () => {
  const res = await connection().then((db) => db.collection('products').find().toArray());

  return res;
};

const createProduct = async (name, quantity) => {
  const creationRes = await connection().then((db) => 
    db.collection('products').insertOne({ name, quantity }));

  return creationRes.ops[0];
};

module.exports = {
  checkIfExists,
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  updateAfterSales
};