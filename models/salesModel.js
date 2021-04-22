const connect = require('../config/connect');
const { ObjectId } = require('mongodb');

const createSales = async (sales) => {
  return connect().then((db) => db.collection('sales').insertOne(
    { itensSold: [...sales]}))
    .then(sale => sale.ops[0])
    .catch(error => error.message);
};

const getAllModel = async () => {
  return connect().then((db) => db.collection('sales').find().toArray())
    .catch(error => error.message);
};

const getSalesByIdModel = async (id) => {
  return connect().then((db) => db.collection('sales').findOne({_id: ObjectId(id)}))
    .catch((error) => error.message);
};

module.exports = {
  createSales,
  getAllModel,
  getSalesByIdModel,
};