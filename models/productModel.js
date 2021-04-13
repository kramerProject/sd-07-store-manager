const connect = require('../config/connection');
const { ObjectId } = require('mongodb');

const register = async (name, quantity) =>
  connect().then(async (db) => { 
    const products = await db.collection('products').insertOne({ name, quantity });

    return {_id: products.insertedId, name, quantity };
  });

const getAllProducts = async () => 
  connect().then((db) => db.collection('products').find().toArray());

const getProductsById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  
  return connect().then((db) => db.collection('products').findOne(ObjectId(id)));
};

module.exports = {
  register,
  getAllProducts,
  getProductsById
};

