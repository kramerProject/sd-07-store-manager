const { ObjectId } = require('mongodb');
const connection = require('./connection');
const errorHandler = require('../helpers/errorHandler');

const findProductByName = (name) => connection()
  .then((db) => db.collection('products').findOne({ name }))
  .catch(errorHandler);

const findProductById = (id) => connection()
  .then((db) => db.collection('products').findOne(ObjectId(id)))
  .catch(() => ({ status: 'error' }));

const addProduct = (name, quantity) => connection()
  .then((db) => db.collection('products').insertOne({ name, quantity }))
  .then((result) => result)
  .catch(errorHandler);

const findAllProducts = () => connection()
  .then((db) => db.collection('products').find().toArray())
  .catch(errorHandler);

const updateProduct = (id, name, quantity) => connection()
  .then((db) => db.collection('products').updateOne(
    { _id: id },
    { $set: { name, quantity } },
  ))
  .then((result) => result)
  .catch(errorHandler);

const updateProductQuantity = (id, quantity) => connection()
  .then((db) => db.collection('products').updateOne(
    { _id: ObjectId(id) },
    { $inc: { quantity } },
  ))
  .then((result) => result)
  .catch(errorHandler);

const deleteProduct = (id) => connection()
  .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }))
  .catch(errorHandler);

module.exports = {
  findAllProducts,
  findProductByName,
  findProductById,
  addProduct,
  updateProduct,
  updateProductQuantity,
  deleteProduct,
};
