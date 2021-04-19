const connect = require('../config/conn');
const { ObjectId } = require('mongodb');


const createAllProducts = async (name, quantity) =>
  connect()
    .then((db) => db.collection('products').insertOne({ name, quantity }));

const getProductName = async (name) => {
  const product = await connect()
    .then((db) => db.collection('products').findOne({ 'name': name }));
  return product;
};

const getAll = async () =>
  connect().then((db) => db.collection('products').find().toArray());

const productId = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const data = await connect()
    .then((db) => db.collection('products').findOne(ObjectId(id)));
  // console.log(data);
  return data;
};


module.exports = {
  createAllProducts,
  getProductName,
  getAll,
  productId
};
