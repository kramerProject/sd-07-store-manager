const connect = require('../../config/connection');
// const { ObjectId } = require('mongodb');


const add = async (name, quantity) =>
  connect().then(async (db) => {
    const product = await db.collection('products').insertOne({ name, quantity });
    return product.ops[0];
  });

const findByName = async (name) =>
  connect().then(async (db) => {
    const product = await db.collection('products').findOne({ 'name': name });
    return product;
  });



module.exports = {
  add,
  findByName,
};
