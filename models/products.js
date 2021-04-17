const connection = require('./connection');

const { ObjectId } = require('mongodb');

const { throwError } = require('../utils/errorHandler');

const { status, errors } = require('../utils/status');

const getAll = async () => {
  return await connection()
    .then((db) => db.collection('products').find().toArray());
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return await connection().then((db) => db.collection('products').findOne(ObjectId(id)));
};

const getByName = async (string) => {
  return await connection()
    .then(db => db.collection('products').findOne({ name: string }));
};

const postdata = async (name, quantity) => {
  const product = await connection()
    .then(db => db.collection('products').insertOne({ name, quantity }));

  return { _id: product.insertedId, name, quantity };
};

const editdata = async (id, name, quantity) => {
  // if (!ObjectId.isValid(id)) return null;
  const updatedProduct = await connection().then((db) =>
    db.collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }),
  );
  return updatedProduct;
};

const deletedata = async (id) => {
  return await connection().then((db) => 
    db.collection('products').deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  getAll,
  getById,
  getByName,
  postdata,
  editdata,
  deletedata,
};