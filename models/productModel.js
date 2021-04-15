const connect = require('../config/conn');
const { ObjectId } = require('mongodb');

const add = async (name, quantity) =>
  connect().then(async (db) => {
    const product = await db.collection('product').insertOne({ name, quantity });
    return {
      _id: product.insertedId,
      name,
      quantity,
    };;
  });

const findByName = async (name) =>
  connect().then(async (db) => {
    const product = await db.collection('product').findOne({'name': name});
    console.log(product);
    return product;
  });


module.exports = {
  add,
  findByName,
};