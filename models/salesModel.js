const connection = require('./connection');

const SALES = 'sales';

const getAll = () => {
  return connection
    .then((db) => {
      db.collection(SALES).find().toArray();
    });
};

module.exports = { getAll };
