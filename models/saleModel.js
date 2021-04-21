const connection = require('../config/conn');

const { ObjectId } = require('mongodb');

const SALES = 'sales';

const getAll = async () => {
  return connection().then(db => db.collection(SALES).find({}).toArray());
};

const getById = async (id) => {
  if(!ObjectId.isValid(id)) {
    return null;
  }
  return connection().then(db =>
    db.collection(SALES).findOne(ObjectId(id))
  );
};

const create = async ({name, quantity}) => {
  const sale = await connection().then(db =>
    db.collection(SALES).insertOne({ name, quantity })
  );
  return { _id: sale.insertedId, name, quantity };
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
  if(!ObjectId.isValid(id)) return null;

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
