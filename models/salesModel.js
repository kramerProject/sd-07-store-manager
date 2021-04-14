const connect = require('../config/conn');
const { ObjectId } = require('mongodb');

const add = async (sales) =>
  connect().then(async (db) => {
    const itensSold = await db.collection('sales').insertOne({ itensSold: sales });
    return itensSold.ops[0];
  });

module.exports = {
  add,
};

// { "itensSold": [{ "productId": "5f43cbf4c45ff5104986e81d", "quantity": 2 }] }
