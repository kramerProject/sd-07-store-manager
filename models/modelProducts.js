const connect = require('../config/conn');
const { ObjectId } = require('mongodb');

const productAdd = async (name, quantity) => {
  const product = await connect().then((db) =>
    db.collection('products').insertOne({ name, quantity }));
  return product.ops[0];
};

const productsGet = async () => {
  const allProducts = await connect()
    .then((db) => db.collection('products').find().toArray());
  return allProducts;
};

const productById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connect().then((db) => db.collection('products').findOne(ObjectId(id)));
};

const productUpdate = async (id, name, quantity) => {
  return connect().then(async (db) => {
    const product = await db
      .collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
    return { _id: id, name, quantity };
  });
};

const productDelete = async (id) => {
  return connect().then(async (db) =>
    db.collection('products').deleteOne({ _id: ObjectId(id) })
  );
};

module.exports = {
  productAdd,
  productsGet,
  productById,
  productUpdate,
  productDelete
};
