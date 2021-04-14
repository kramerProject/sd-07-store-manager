const connect = require('../config/connection');
const { ObjectId } = require('mongodb');

const register = async (name, quantity) =>
  connect().then(async (db) => { 
    const products = await db.collection('products').insertOne({ name, quantity });

    return {_id: products.insertedId, name, quantity };
  });

const getAllProducts = async () => {
  return await connect().then((db) => db.collection('products').find().toArray());
};

const getProductsById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  
  return await connect().then((db) => db.collection('products').findOne(ObjectId(id)));
};

const update = async (id, name, quantity) =>
  connect().then(async (db) => {
    const product = await db
      .collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });

    return { _id: id, name, quantity };
  });

const exclude = async (id) =>
  connect().then(async (db) =>
    db.collection('products').deleteOne({ _id: ObjectId(id) })
  );

module.exports = {
  register,
  getAllProducts,
  getProductsById,
  update, 
  exclude
};

