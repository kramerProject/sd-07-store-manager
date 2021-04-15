const connect = require('../config/connn');
const { ObjectId } = require('mongodb');

const add = async ( itensSold ) => {
  const sale = await connect().then((db) =>
    db
      .collection('sales')
      .insertOne({ itensSold })
  );

  return { _id: sale.insertedId };
};

const getAll = async () =>
  connect()
    .then((db) => db.collection('sales').find().toArray());

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const sale = await connect()
    .then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }));
  return sale;
};


module.exports = {
  getAll,
  getById,
  add
};