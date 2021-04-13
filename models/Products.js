const connection = require('connection');
const { ObjectId } = require('mongodb');

const createProducts = async (name, quantity) => {
  connection()
    .then((db) =>
      db.collection('products').insertOne({name, quantity})
    ).then((result) => result);
};

module.exports = {
  createProducts,
};