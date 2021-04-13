const connection = require('../config/connection');
const { ObjectId } = require('mongodb');

const addSale = async (body) => {
  const sale = [...body];
  const result = await connection()
    .then((db) => db.collection('sales').insertOne({ intesSold: sale }));
  return {
    _id: result.insertedId,
    itensSold: body,
  };
};

module.exports = {
  addSale,
};