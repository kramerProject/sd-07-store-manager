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

const create = async (items) => {
  const sale = await connection()
    .then((db) => db.collection(SALES_COLLECTION).insertOne({ items }));
  
  return sale;
};

const update = async (id, name, quantity) => {
  const sale = await connection()
    .then((db) => db.collection(SALES_COLLECTION)
      .updateOne({ _id: ObjectId(id)}, { $set: { name, quantity } } ));
  return sale;
};

const exclude = async (id) => {
  console.log(id);
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