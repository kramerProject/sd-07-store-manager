const connection = require('../config/connection');
const { ObjectId } = require('mongodb');

const getAll = async () => {
  const sales = await connection().then((db) => db
    .collection('sales')
    .find().toArray());

  return { sales };
};

const getById = async (id) => {
  const sale = await connection().then((db) => db
    .collection('sales')
    .findOne(ObjectId(id)));

  return sale;
};

const add = async (itensSold) => {
  const sale = await connection().then((db) => db
    .collection('sales')
    .insertOne({ itensSold }));

  return {
    _id: sale.insertedId,
    itensSold: [
      ...itensSold
    ]
  };
};

const update = async (id, itensSold) => {
  const sale = await connection().then((db) => db
    .collection('sales')
    .updateOne({ _id: ObjectId(id) } ,{ $set: { itensSold } }));

  return { _id: id, itensSold };
};

const exclude = async (id) => {
  return await connection().then((db) => {
    return db.collection('sales').deleteOne({ _id: ObjectId(id) });
  });
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  exclude
};
