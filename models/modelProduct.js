const { connection } = require('./connection');
const { ObjectId } = require('mongodb');

async function addProduct(name, quantity) {
  return await connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((data) => ({ _id: data.insertedId, name, quantity }));
}

async function findNameProduct(name) {
  return await connection().then((db) => db.collection('products').findOne({ name }));
}

async function findAllProduct() {
  return await connection().then((db) => db.collection('products').find({}).toArray());
}

async function findIdProduct(id) {
  if (!ObjectId.isValid(id)) throw new Error();
  return await connection()
    .then((db) => db.collection('products')
      .findOne({ _id: ObjectId(id) }));
}

async function editProduct(id, name, quantity) {
  if (!ObjectId.isValid(id)) throw new Error();
  return await connection().then((db) =>
    db
      .collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } })
      .then(() => ({ _id: ObjectId(id), name, quantity })),
  );
}

async function deleteProduct(id) {
  if (!ObjectId.isValid(id)) throw new Error();
  return await connection()
    .then((db) => db.collection('products').deleteOne({ _id: ObjectId(id) }))
    .then(() => findIdProduct(id));
}

module.exports = {
  addProduct,
  findNameProduct,
  findAllProduct,
  findIdProduct,
  editProduct,
  deleteProduct,
};
