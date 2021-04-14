const connection = require('../config/connections');
const { ObjectId } = require('mongodb');

const createSales = async (itensSold) => {
  const newSale = await connection().then((db) =>
    db.collection('sales').insertOne({ itensSold }),
  );
  return { _id: newSale.insertedId, itensSold };
};

const getAllSales = async () =>
  connection().then((db) => db.collection('sales').find().toArray());

const getSaleById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  
  return connection().then((db) => db.collection('sales').findOne(ObjectId(id)));
};

module.exports = {
  createSales,
  getAllSales,
  getSaleById
};