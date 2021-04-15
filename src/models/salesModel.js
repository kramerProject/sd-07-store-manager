const connect = require('../config/connection');
const { ObjectId } = require('mongodb');

const addNewSale = async (salesArray) => {
  const db = await connect();
  return db.collection('sales').insertOne({ itensSold: salesArray });
};

const getAll = async () => {
  const db = await connect();
  return db.collection('sales').find().toArray();
};

const getById = async (id) => {
  const db = await connect();
  return db.collection('sales').findOne(ObjectId(id));
};

const updateById = async (id, salesArray) => {
  const db = await connect();
  return db.collection('sales').updateOne(
    { _id: ObjectId(id) }, { $set: { itensSold: salesArray } },
  );
};

const deleteById = async (id) => {
  const db = await connect();
  db.collection('sales').deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  addNewSale,
  getAll,
  getById,
  updateById,
  deleteById,
};
