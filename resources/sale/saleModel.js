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

const findById = (id) => 
  connect().then(async (db) => {
    try {
      const sale =  await db.collection(COLLECTION_SALES_NAME)
        .findOne(ObjectId(id));
      return sale;
    } catch(error) {
      return null;
    }
    
  });
  
const findAll = () => 
  connect().then(async (db) => {
    const sales =  await db.collection(COLLECTION_SALES_NAME).find().toArray();
    return sales;
  });

module.exports = {
  add,
  findById,
  findAll,
};