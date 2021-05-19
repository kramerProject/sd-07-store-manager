const connection = require('./connection');

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
      return db.collection(SALES).findOne(ObjectId(id));
    });
};

const create = (itensSold) => {
  return connection()
    .then((db) => {
      return db.collection(SALES).insertOne({ itensSold });
    })
    .then((result) => ({ _id: result.insertedId, itensSold }));
};

module.exports = { getAll, create, getById };
