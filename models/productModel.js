const connect = require('../config/conn');
const { ObjectId } = require('mongodb');

const add = async (name, quantity) =>
  connect().then(async (db) => {
    const product = await db.collection('products').insertOne({ name, quantity });
    return {
      _id: product.insertedId,
      name,
      quantity,
    };;
  });

const findByName = async (name) =>
  connect().then(async (db) => {
    const product = await db.collection('products').findOne({'name': name});
    return product;
  });

const getAll = async () => {
  return await connect().then((db) => {
    return db.collection('products').find({}).toArray();
  });
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return await connect().then((db) => {
    return db.collection('products').findOne(ObjectId(id));
  });
};


module.exports = {
  add,
  findByName,
  getAll,
  getById,
};