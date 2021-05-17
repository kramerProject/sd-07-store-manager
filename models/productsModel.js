const connection = require('./connection');

const PRODUCTS = 'products';

const getAll = () => {
  return connection
    .then((db) => {
      db.collection(PRODUCTS).find().toArray();
    });
};

module.exports = { getAll };
