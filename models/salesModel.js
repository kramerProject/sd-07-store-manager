const connection = require('./connection');
const { ObjectId } = require('mongodb');

const createSale = async (saleArray) => connection()
  .then((db) => db.collection('sales').insertOne({ itensSold: [...saleArray] })
    .then((product) => product.ops[0]));

const getAllSales = async () => connection()
  .then((db) => db.collection('sales').find().toArray());

const getSaleById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  
  return connection().then((db) => db.collection('sales').findOne(ObjectId(id)));
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById
};
