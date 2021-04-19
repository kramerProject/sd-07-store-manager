const connect = require('../config/conn');
const { ObjectId, Db } = require('mongodb');

const addSale = async (salesList) => {
  return await connect().then(async (db) => {
    const sale = await db.collection('sales').insertOne({
      '_id': ObjectId(),
      'itensSold': salesList
    });
    return sale.ops[0];
  });
};

module.exports = {
  addSale,
};