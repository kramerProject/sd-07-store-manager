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

const editSaleById = async (sales, id) => {
  connect().then((db) =>
    db.collection('sales').updateOne({ _id: ObjectId(id) },
      { $set: { itensSold: sales } }));
  return { _id: ObjectId(id), itensSold: sales };
};

module.exports = {
  getAllSales,
  newSale,
  getSaleById,
  editSaleById,
};