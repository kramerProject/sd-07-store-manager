const connect = require('../config/conn');
const { ObjectId } = require('mongodb');

const add = async (sales) =>
  connect().then(async (db) => {
    const itensSold = await db.collection('sales').insertOne({ itensSold: sales });
    return itensSold.ops[0];
  });

const getAll = async () =>
  connect().then(async (db) => await db.collection('sales').find().toArray());

const getOne = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connect().then((db) => db.collection('sales').findOne(ObjectId(id)));
};

const updateOne = async (id, itensSold) =>
  connect().then(async (db) => {
    await db.collection('sales')
      .updateOne({ _id: ObjectId(id) }, { $set: { itensSold } });

    return {
      _id: id,
      itensSold,
    };
  });

const exclude = async (id) => {
  const sale = await getOne(id);

  connect().then(async (db) => 
    db.collection('sales').deleteOne({ _id: ObjectId(id) })
  );

  return {
    _id: id,
    itensSold: sale.itensSold,
  };
};

module.exports = {
  add,
  getAll,
  getOne,
  updateOne,
  exclude,
};

// { "itensSold": [{ "productId": "5f43cbf4c45ff5104986e81d", "quantity": 2 }] }
