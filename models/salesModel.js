const connect = require('../config/connection');
const { ObjectId } = require('mongodb');


const addSalesModel = async (products) => {
  return connect()
    .then((db) => db.collection('sales').insertOne({itensSold: products}))
    .then((sale) => sale.ops[0]);
};

const findAllSalesModel = async () => {
  return connect().then((db) => db.collection('sales').find().toArray());
};

const findByIdSalesModel = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connect().then((db) => db.collection('sales').findOne(ObjectId(id)));
};

module.exports = {
  addSalesModel,
  findAllSalesModel,
  findByIdSalesModel
};
