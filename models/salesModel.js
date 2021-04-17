const connect = require('../config/connection');
// const { ObjectId } = require('mongodb');


const addSalesModel = async (productsSales) => {
  return connect()
    .then((db) => db.collection('sales').insertOne({itenSold: productsSales}))
    .then((sale) => sale.ops[0]);
};

module.exports = {
  addSalesModel
};
