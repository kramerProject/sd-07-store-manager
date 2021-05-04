const { ObjectId } = require('mongodb');
const connect = require('../config/connection');

const getAllSales = async () =>
  connect()
    .then((db) => db.collection('sales').find().toArray());

const newSale = async (sales) => {
  const {insertedId} = await connect().then((db) =>
    db.collection('sales').insertOne({itensSold: sales}));
  return { _id: insertedId, itensSold: sales };
};

const getSaleById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connect().then((db) => db.collection('sales').findOne(ObjectId(id)));
};

module.exports = {
  getAllSales,
  newSale,
  getSaleById,
};