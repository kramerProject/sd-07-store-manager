const connection = require('../config/conn');
const { ObjectId } = require('mongodb');

const findProductModel = async(name) => {
  const db = await connection();
  return await db.collection('products').findOne({ name });
};

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

const updateProductModel = async (id, name, quantity) => {
  const db = await connection();
  const updatedProduct = db.collection('products').updateOne(
    { _id: ObjectId(id) }, { $set: { name, quantity }}
  );
  if (!updatedProduct) return false;
  return { _id: id, name, quantity };
};

const deleteProductModel = async (id) => {
  if (!ObjectId.isValid(id)) return false;
  const db = await connection();
  return await db.collection('products').deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  addProductModel,
  getAllProductsModel,
  getProductByIdModel,
  updateProductModel,
  deleteProductModel,
  findProductModel,
};
