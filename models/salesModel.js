const connect = require('../config/connection');
const { ObjectId } = require('mongodb');

async function add(itensSold) {
  return await connect().then(async (db) => {
    const product = await db.collection('sales').insertOne({ itensSold });
    return product.ops[0];
  });
}

async function getAllSales() {
  return await connect().then((db) => db.collection('sales').find().toArray());
}

async function getSalesById(id) {
  if (!ObjectId.isValid(id)) return null;
  return connect().then((db) => db.collection('sales').findOne(ObjectId(id)));
}

module.exports = {
  add,
  getAllSales,
  getSalesById,
};
