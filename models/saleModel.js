const connect = require('../configuration/connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  const sales = await connect().then((db) =>
    db.collection('sales').find().toArray());
  return { sales: sales };
};

const add = async (sale) => {
  const saleResult = await connect().then((db) =>
    db.collection('sales').insertOne({ itensSold: sale }));
  return saleResult.ops[0];
};

module.exports = {
  add,
  getAll
};