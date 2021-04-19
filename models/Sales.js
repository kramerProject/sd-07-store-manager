const { ObjectId } = require('mongodb');
const connection = require('../config/dbConnection');

const SALES_COLLECTION = 'sales';
const getAll = async () => {
  const allSales = await connection()
    .then((db) => db.collection(SALES_COLLECTION).find().toArray());
 
  return allSales;
};

const findById = async (id) => {
  const selectedSales = await connection()
    .then((db) => db.collection(SALES_COLLECTION).findOne(ObjectId(id)));
 
  return selectedSales;
};

const create = async (itemsSold) => {
  const sale = await connection()
    .then((db) => db.collection(SALES_COLLECTION).insertOne({ itemsSold }));
  
  return sale;
};

const update = async (id, quantity, productId) => {
  const sale = await connection()
    .then((db) => db.collection(SALES_COLLECTION)
      .updateOne({ _id: ObjectId(id), 'itensSold.productId': productId },
        { $set: { 'itensSold.$.quantity': quantity } }));
  return sale;
};

const exclude = async (id) => {
  return await connection().
    then((db) => db.collection(SALES_COLLECTION).deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  getAll,
  create,
  findById,
  update,
  exclude
};
