const connection = require('./connection');

const getAll = async () => connection().then ((db) => db.collection('products').find());

module.exports = {
  getAll,
};
