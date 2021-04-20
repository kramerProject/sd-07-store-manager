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
  return connect().then((db) => db.collection('sales').findOne({_id: ObjectId(id)}));
};

const putByIdSalesModel = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connect().then((db) => db.collection('sales').updateOne({_id: ObjectId(id)}));
};

const deleteSalesModel = async (id) => {
  // if (!ObjectId.isValid(id)) return null;
  return connect().then((db) => db.collection('sales')
    .findOneAndDelete({_id: ObjectId(id)}));
};


module.exports = {
  addSalesModel,
  findAllSalesModel,
  findByIdSalesModel,
  putByIdSalesModel,
  deleteSalesModel
};
