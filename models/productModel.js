const connect = require('../config/conn');
const { ObjectId } = require('mongodb');

const addProduct = async (name, quantity) =>
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

const updateProduct = async (id, name, quantity) =>  {
  return connect().then((db) => {
    const item = db.collection('products').updateOne(
      { _id: ObjectId(id) }, 
      { $set: { name, quantity }}
    );
    return { _id: id, name, quantity };
  });
};
   

module.exports = {
  addProduct,
  findByName,
  getAll,
  getById,
  updateProduct,
};