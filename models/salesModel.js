const connect = require('../config/connection');
const { ObjectId } = require('mongodb');

async function add(itensSold) {
  return await connect().then(async (db) => {
    const product = await db.collection('sales').insertOne({ itensSold });
    return product.ops[0];
  });
}

module.exports = {
  add,
};
