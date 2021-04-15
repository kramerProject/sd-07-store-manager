const connect = require('../config/connect');

const addSale = async (bodyReq) => {
  return connect().then(async (db) => {
    const sales = await db.collection('sales').insertOne({ itensSold: bodyReq });

    return sales.ops[0];
  });
};

module.exports = {
  addSale,
};