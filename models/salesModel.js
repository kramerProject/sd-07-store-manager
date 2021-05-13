const connection = require('../config/connection');
const { ObjectId } = require('mongodb');

const insertSale = async (array) => {
  const sales = await connection().then((db) =>
    db.collection('sales').insertOne({ itensSold: [...array] })
  );
  return sales.ops[0];
};

const findAll = async () =>
  connection()
    .then((db) => db.collection('sales').find().toArray());

const findSaleById = async (id) => {
  const result = await connection()
    .then((db) => db.collection('sales').findOne(ObjectId(id)));
  return result;
};

module.exports = {
  insertSale,
  findAll,
  findSaleById,
};

