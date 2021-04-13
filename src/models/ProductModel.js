const { ObjectId } = require('mongodb');
const database = require('../database');

const productCollection = 'products';

module.exports = {
  create: async (name, quantity) => {
    const db = await database.connect();
    const { insertedId: _id } = await db.collection(productCollection)
      .insertOne({ name, quantity });
    return { _id, name, quantity };
  },
  find: async () => {
    const db = await database.connect();
    return await db.collection(productCollection).find({}).toArray();
  },
  get: async (field, value) => {
    const db = await database.connect();
    return await db.collection(productCollection).find({ [field]: value }).toArray();
  },
  update: async (id, data) => {
    const db = await database.connect();
    await db.collection(productCollection).updateOne(
      { _id: id },
      { $set: { ...data } }
    );
    return { _id: id, ...data };
  },
  delete: async (id) => {
    const db = await database.connect();
    await db.collection(productCollection).deleteOne({ _id: ObjectId(id) });
  }
};
