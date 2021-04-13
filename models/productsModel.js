const connect = require('../config/conn');
const { ObjectId } = require('mongodb');

const add = async (name, quantity) => {
  connect().then(async (db) => {
    const product = await db.collection('products').insertOne({ name, quantity });
    return product.ops[0];
  });
};
