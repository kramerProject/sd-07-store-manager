const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getAllProducts = async () => {
  return await connection()
    .then((db) => db.collection('products').find().toArray());
};

const createProduct = async (name, quantity) => {
  const prod = await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
  return { _id: prod.insertedId, name, quantity };
};

const productById = async (id) => {
  const productData = await connection()
    .then((db) => db.collection('products').findOne({_id: ObjectId(id)}));
  if(!productData) return null; // {
  return productData;
};

const updateQuantity = async(id, quantity) => {
  return await connection()
    .then((db) => db.collection('products')
      .updateOne({ _id: ObjectId(id)}, {$inc: {quantity}}))
    .then(() => ({ _id: ObjectId(id), quantity }))
    .catch((err) => console.log('catch do updateQuantity: ', err.message));;
};

const updateProduct = async(id, name, quantity) => {
  await connection()
    .then((db) => db.collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity }}));
  return { _id: id, name, quantity };
};

const deleteProduct = async(id) => {
  return await connection()
    .then((db) => db.collection('products')
      .deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  getAllProducts,
  createProduct,
  productById,
  updateProduct,
  deleteProduct,
  updateQuantity
};
