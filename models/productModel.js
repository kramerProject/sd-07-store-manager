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

const updateProduct = async (id, { name, quantity }) => {
  if (!ObjectId.isValid(id)) return null;

  const product = await connect()
    .then((db) => db.collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } }));
  return product;
};

const deleteProduct = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const productIdd = await productId(id);
  if (productIdd) {
    connect().then(async (db) => {
      db.collection('products').deleteOne({ _id: ObjectId(id) });
    });
    return productIdd;
  }
};

module.exports = {
  createAllProducts,
  getProductName,
  getAll,
  productId,
  updateProduct,
  deleteProduct
};
