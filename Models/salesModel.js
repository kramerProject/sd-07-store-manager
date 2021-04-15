const connect = require('../config/connect');
const { ObjectId } = require('mongodb');

const addSale = async (bodyReq) => {
  return connect().then(async (db) => {
    const sales = await db.collection('sales').insertOne({ itensSold: bodyReq });

    return sales.ops[0];
  });
};

const getAll = async () => {
  return await connect().then((db) => db.collection('sales').find().toArray());
};

const getForId = async (id) => {
  return await connect().then((db) => db.collection('sales').findOne(ObjectId(id)));
};

const update = async (id, bodyReq) => {
  await  connect().then(async (db) => {
    await db.collection('sales')
      .updateOne({ _id: ObjectId(id) }, { $set: {itensSold: bodyReq } });
  });
  return { _id: id, itensSold: bodyReq };
};

module.exports = {
  addSale,
  getAll,
  getForId,
  update,
};