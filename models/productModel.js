const { ObjectId } = require('bson');
const connection = require('./connection');


const createNewProduct = async (name, quantity ) => connection()
  .then((db) => db.collection('products')
    .insertOne({name, quantity}));

const searchProduct = async (name) => connection()
  .then((db) => db.collection('products')
    .findOne({name}));

const getAllProducts = async () => connection()
  .then((db) => db.collection('products')
    .find().toArray());

const findByProductId = async (id) => connection()
  .then((db) => db.collection('products')
    .findOne(ObjectId(id)));


module.exports = {
  createNewProduct,
  searchProduct,
  getAllProducts,
  findByProductId,
};
