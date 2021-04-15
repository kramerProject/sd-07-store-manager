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

async function updateSale(id, sale) {
  await connect().then(async (db) => {
    await db
      .collection('sales')
      .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: sale } });
  });
  return { _id: id, itensSold: sale };
}

module.exports = {
  add,
  getAllSales,
  getSalesById,
  updateSale,
};
