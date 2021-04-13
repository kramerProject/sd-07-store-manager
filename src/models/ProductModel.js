const database = require('../database');
const productCollection = 'products';

module.exports = {
  create: async (name, quantity) => {
    const db = await database.connect();
    const { insertedId: _id} = await db.collection(productCollection)
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
};
