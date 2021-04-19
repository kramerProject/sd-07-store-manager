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

const getAll = async () => {
  return await connect().then((db) => {
    return db.collection('sales').find({}).toArray();
  });
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return await connect().then((db) => {
    return db.collection('sales').findOne(ObjectId(id));
  });
};

const deleteSale = async (id) => {
  const exist = getById(id); 
  if (exist) {
    connect().then(async (db) => {
      db.collection('sales').deleteOne({ _id: ObjectId(id)});
    });
    return exist;
  }
  return false;
};

module.exports = {
  addSale,
  getAll,
  getById,
  deleteSale,
};