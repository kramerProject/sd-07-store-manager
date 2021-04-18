const { ObjectId } = require('mongodb');
const connection = require('../config/dbConnection');

const PRODUCT_COLLECTION = 'products';
const getAll = async () => {
  const allProducts = await connection()
    .then((db) => db.collection(PRODUCT_COLLECTION).find().toArray());
 
  return allProducts;
};

const findById = async (id) => {
  const selectedProduct = await connection()
    .then((db) => db.collection(PRODUCT_COLLECTION).findOne(ObjectId(id)));
 
  return selectedProduct;
};

const create = async (name, quantity) => {
  const product = await connection()
    .then((db) => db.collection(PRODUCT_COLLECTION).insertOne({ name, quantity }));
  
  return product;
};

const update = async (id, name, quantity) => {
  const product = await connection()
    .then((db) => db.collection(PRODUCT_COLLECTION)
      .updateOne({ _id: ObjectId(id)}, { $set: { name, quantity } } ));
  return product;
};

const exclude = async (id) => {

  return await connection().
    then((db) => db.collection(PRODUCT_COLLECTION).deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  getAll,
  create,
  findById,
  update,
  exclude
};