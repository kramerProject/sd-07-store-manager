const { ObjectId } = require('mongodb');
const connection = require('./connections');

const findProductByName = (name) => connection()
  .then((db) => db.collection('products').findOne({ name }))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

const findProductById = (id) => connection()
  .then((db) => db.collection('products').findOne(ObjectId(id)))
  .catch(() => ({ status: 'error' }));

const addProduct = (name, quantity) => connection()
  .then((db) => db.collection('products').insertOne({ name, quantity }))
  .then((result) => result)
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

const findAllProducts = () => connection()
  .then((db) => db.collection('products').find().toArray())
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

const updateProduct = (id, name, quantity) => connection()
  .then((db) => db.collection('products').updateOne(
    { _id: id },
    { $set: { name, quantity } },
  ))
  .then((result) => result)
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

const updateProductQuantity = (id, quantity) => connection()
  .then((db) => db.collection('products').updateOne(
    { _id: ObjectId(id) },
    { $inc: { quantity } },
  ))
  .then((result) => result)
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

const deleteProduct = (id) => connection()
  .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }))
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

module.exports = {
  findAllProducts,
  findProductByName,
  findProductById,
  addProduct,
  updateProduct,
  updateProductQuantity,
  deleteProduct,
};
