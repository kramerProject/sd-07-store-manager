const connect = require('../config/connection');
const { ObjectId } = require('mongodb');

const addProductModel = async (name, quantity) => {
  return connect()
    .then((db) => db.collection('products').insertOne({ name, quantity }))
    .then((result) => result.ops[0]);
};

const findProductsByNameModel = async (name) => {
  return connect().then((db) => db.collection('products').findOne({ name }));
};

const findAllProductsModel = async () => {
  return connect().then((db) => db.collection('products').find().toArray());
};

const findByIdProductsModel = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connect().then((db) => db.collection('products').findOne(ObjectId(id)));
};

const updatePoductModel = async (id, name, quantity) => {
  return connect().then((db) =>
    db.collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } })
  ).then(()=> ({_id: id, name, quantity}));
};

const excludeModel = async (id) => {
  return connect().then((db) => 
    db.collection('products').deleteOne({_id: ObjectId(id)}));
};

module.exports = {
  addProductModel,
  findProductsByNameModel,
  findAllProductsModel,
  findByIdProductsModel,
  updatePoductModel,
  excludeModel,
};

/* const createProduct = async (name, quantity) => {
  return connection().then(
    db => db.collection('products').insertOne({ name, quantity })
  ).then((result) => ({ _id: result.insertedId, name, quantity }));
}; */
