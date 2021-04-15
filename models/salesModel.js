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

const update = async (id, sale) => {
  if (!ObjectId.isValid(id)) return null;

  const song = await connect().then((db) =>
    db
      .collection('sales')
      .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: sale } })
  );
};

module.exports = {
  getAll,
  getById,
  add,
  update
};