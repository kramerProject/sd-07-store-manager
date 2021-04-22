const connection = require('../config/conn');

const { ObjectId } = require('mongodb');

const SALES = 'sales';

const getAll = async () => {
  return connection().then(db => db.collection(SALES).find({}).toArray());
};

const getById = async (id) => {
  return connection().then(db =>
    db.collection(SALES).findOne(ObjectId(id))
  );
};

const create = async (tradeIn) => {
  const sale = await connection().then(db =>
    db.collection(SALES).insertOne({ itemSold: tradeIn })
  );
  return sale.ops[0];
};

const update = async ({id, name, quantity}) => {
  if(!ObjectId.isValid(id)) return null;
  
  const sale = await connection().then((db) => db
    .collection(SALES)
    .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } })
  );
  return sale;
};

const exclude = async (id) => {
  return connection().then((db) => db
    .collection(SALES)
    .deleteOne({ _id: ObjectId(id) })
  );
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  exclude
};
