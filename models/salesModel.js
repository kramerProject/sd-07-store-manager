const connection = require('../config/connection');
// const { ObjectId } = require('mongodb');

const getAllSales = () => {
  return connection().then(
    db => db.collection('sales').find().toArray()
  );
};

const createSale = async (products) => {
  return connection().then(
    db => db.collection('sale').insertOne({ itensSold: [...products]})
  ).then((result) => result.ops[0]);
};

module.exports = {
  getAllSales,
  createSale,
};
