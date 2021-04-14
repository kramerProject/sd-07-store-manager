const database = require('../database');

const salesCollection = 'sales';

module.exports = {
  create: async (sales) => {
    const db = await database.connect();
    const { insertedId: _id } = await db.collection(salesCollection)
      .insertOne({ itensSold: sales });
    return { _id, itensSold: sales };
  },
  find: async () => {
    const db = await database.connect();
    return await db.collection(salesCollection).find({}).toArray();
  },
  get: async (id) => {
    const db = await database.connect();
    return await db.collection(salesCollection).find({ _id: id }).toArray();
  },
  update: async (id, sales) => {
    const db = await database.connect();
    await db.collection(salesCollection).updateOne(
      { _id: id },
      { $set: { itensSold: sales } }
    );
    return { _id: id, itensSold: sales };
  },
  delete: async (id) => {
    const db = await database.connect();
    await db.collection(salesCollection).deleteOne({ _id: id });
  }
};
