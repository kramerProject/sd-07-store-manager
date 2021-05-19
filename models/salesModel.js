const connection = require('./connection');

const SALES = 'sales';

const getAll = () => {
  return connection
    .then((db) => {
      db.collection(SALES).find().toArray();
    });
};

const create = (itensSold) => {
  return connection()
    .then((db) => {
      return db.collection(SALES).insertOne({ itensSold });
    })
    .then((result) => ({ _id: result.insertedId, itensSold }));
};

module.exports = { getAll, create };
