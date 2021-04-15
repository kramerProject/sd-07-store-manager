const { ObjectId } = require('mongodb');

const connection = require('../config/dbConnection');

const getAll = async () => {
  return await connection().then( (db) => db.collection('sales').find().toArray());
};

module.exports = {
  getAll,
};