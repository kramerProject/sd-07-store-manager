const connect = require('../config/connect');

const addSale = async (bodyReq) => {
  return connect().then(async (db) => {
    const sales = await db.collection('sales').insertOne({ itensSold: bodyReq });

    return sales.ops[0];
  });
};

const getAll = async () => {
  return await connect().then((db) => db.collection('sales').find().toArray());
};

const getForId = async () => {
  return await connect().then((db) => db.collection('sales').findOne(ObjectId(id)));
};

module.exports = {
  addSale,
  getAll,
  getForId,
};