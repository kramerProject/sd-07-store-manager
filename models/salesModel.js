const connection = require('./connection');
const { ObjectId } = require('mongodb');
const SALES = 'sales';

const getAll = () => {
  return connection()
    .then((db) => {
      return db.collection(SALES).find().toArray();
    });
};

const getById = (id) => {
  return connection()
    .then((db) => {
      return db.collection(SALES).findOne({ _id: ObjectId(id) });
    }).catch(err => console.log('salesModel.getById: ',err.message));
};

const create = (itensSold) => {
  return connection()
    .then((db) => {
      return db.collection(SALES).insertOne({ itensSold });
    })
    .then((result) => ({ _id: result.insertedId, itensSold }));
};

const update = (id, itensSold) => {
  return connection()
    .then((db) => {
      return db.collection(SALES)
        .updateOne({ _id: ObjectId(id) }, { $set: { itensSold } }, { upsert: true });
    })
    .then(() => ({_id: ObjectId(id), itensSold }));
};

const exclude = (id) => {
  return connection()
    .then((db) => {
      return db.collection(SALES)
        .deleteOne({ _id: ObjectId(id) });
    });
};

module.exports = { getAll, getById, create, update, exclude };
