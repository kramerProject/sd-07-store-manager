const connect = require('../../config/connection');
// const { ObjectId } = require('mongodb');

const COLLECTION_SALES_NAME = 'sales';

const add = async (itensSold) =>
  connect().then(async (db) => {
    // console.log('MODEL itensSold: ', itensSold);
    const newItensSold = await db.collection(COLLECTION_SALES_NAME)
      .insertOne({ itensSold });
    // console.log('MODEL newItensSold: ', newItensSold);
    return newItensSold.ops[0];
  });

module.exports = {
  add,
};