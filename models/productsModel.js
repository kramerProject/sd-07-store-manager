const connect = require('../config/connection');
const { ObjectId } = require('mongodb');

const getAllProducts = async () => {
  const products = await connect()
    .then((db) => db.collection('products').find().toArray());
  return products;
};

const findByName = async (name) => {
  const product = await connect()
    .then((db) => db.collection('products')
      .findOne({name}));
  return product;
};

const findProductById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const product = await connect()
    .then((db) =>
      db.collection('products').findOne(ObjectId(id))
    );
  return product;
};

const create = async (name, quantity) => {
  const newProduct = await connect()
    .then(db => db.collection('products')
      .insertOne({ name, quantity }));
  return {
    _id: newProduct.insertedId,
    name,
    quantity
  };
};

const update = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) return null;
  const product = await connect()
    .then((db) => db.collection('products')
      .findOneAndUpdate({ _id: ObjectId(id) },
        { $set: { name, quantity } },
        { returnOriginal: false })
    );
  return product.value;
};

module.exports = {
  getAllProducts,
  findByName,
  findProductById,
  create,
  update,
};
