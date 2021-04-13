const database = require('../database');

const salesCollection = 'sales';

module.exports = {
  create: async (sales) => {
    const db = await database.connect();
    const { insertedId: _id } = await db.collection(salesCollection)
      .insertOne({ itensSold: sales });
    return { _id, itensSold: sales };
  },
};
