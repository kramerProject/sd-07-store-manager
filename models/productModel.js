const connection = require('./connection');

const createNewProduct = async (name, quantity ) => connection()
  .then((db) => db.collection('products')
    .insertOne({name, quantity}));

const existProduct = async (name) => connection()
  .then((db) => db.collection('products')
    .findOne({name}));


module.exports = {
  createNewProduct,
  existProduct,
};
