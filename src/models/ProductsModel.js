const connect = require('../../config/connection');
const { ObjectId } = require('mongodb');

const add = async (name, quantity) =>
  connect().then(async (db) => {
    const product = await db
      .collection('products')
      .insertOne({ name, quantity });

    return product.ops[0];
  });

const findByName = async (name) => 
  connect().then(async (db) => {
    const product = await db
      .collection('products')
      .findOne({ name });

    return product;
  });

const getAll = async () =>
  connect().then(async (db) => {
    const products = await db
      .collection('products')
      .find().toArray();
    
    return products;
  });

const getByID = async (id) =>
  connect().then(async (db) => {
    const product = await db
      .collection('products')
      .findOne(ObjectId(id));
    return product;
  });

const updateByID = async (id, name, quantity) =>
  connect().then(async (db) => {
    const product = await db
      .collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: {name, quantity} });
    
    return { _id: id, name, quantity};
  });

const excludeByID = async (id) =>
  connect().then(async (db) =>
    await db
      .collection('products')
      .deleteOne({ _id: ObjectId(id) })
  );

module.exports = {
  add,
  findByName,
  getAll,
  getByID,
  updateByID,
  excludeByID,
};
