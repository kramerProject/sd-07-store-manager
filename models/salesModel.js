const { ObjectId } = require('mongodb');
const connect = require('../config/connection');

const getAll = async () =>
  connect()
    .then((db) => db.collection('sales').find().toArray());


const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  return connect().then((db) => db.collection('sales').findOne(ObjectId(id)));
};

const addSale = async (sales) => {
  const {insertedId} = await connect().then((db) =>
    db.collection('sales').insertOne({itensSold: sales}));
  return { _id: insertedId, itensSold: sales };
};

const update = async (sales, id) => {
  connect().then((db) =>
    db.collection('sales').updateOne({ _id: ObjectId(id) },
      { $set: { itensSold: sales } }));
  return { _id: ObjectId(id), itensSold: sales };
};

const remove = async (id) => {
  connect().then((db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }));
};


module.exports = {
  getAll,
  addSale,
  getById,
  update,
  remove,
};
