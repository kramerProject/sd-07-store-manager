const { ObjectId } = require('mongodb');
const connect = require('../config/connection');

const getAllSales = async () =>
  connect()
    .then((db) => db.collection('sales').find().toArray());

const newSale = async (sales) => {
  connect().then((db) =>
    db.collection('sales').insertMany(sales));
  return { itensSold: sales };
};

module.exports = {
  getAllSales,
  newSale,
};