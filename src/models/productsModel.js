const { connection } = require('../../configs');
const { ObjectId } = require('mongodb');

const creatProduct = async (name, quantity) => {
  const createdProduct = await connection().then((db) => db.collection('products')
    .insertOne({ name, quantity }));
  return createdProduct.ops[0];
};

const updateProduct = async (id, name, quantity) => {
  const updatedProduct = await connection().then((db) => db.collection('products')
    .updateOne({_id: ObjectId(id)}, {$set: {name: name, quantity: quantity}}));
  return updatedProduct;
};

const deleteProduct = async (id) => {
  const deletedProduct = await connection().then((db) => db.collection('products')
    .deleteOne({ _id: ObjectId(id) }));
  return deletedProduct;
};

const getAllProducts = async () => {
  const listedProducts = await connection().then((db) => db.collection('products')
    .find().toArray());
  return listedProducts;
};

const getProductById = async (id) => {
  const findedProduct = await connection().then((db) => db.collection('products')
    .findOne({ _id: ObjectId(id)}));
  return findedProduct;
};

module.exports = {
  creatProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
};
