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

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const product = await connect().then((db) =>
    db.collection('sales').findOne(ObjectId(id)));
  return product;
};

module.exports = {
  add,
  getAll,
  getById
};