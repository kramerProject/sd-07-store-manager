const connect = require('../config/connection');
// const { ObjectId } = require('mongodb');


const addSalesModel = async (products) => {
  return connect()
    .then((db) => db.collection('sales').insertOne({itenSold: products}))
    .then((sale) => sale.ops[0]);
};

module.exports = {
  addSalesModel
};
