const connect = require('../../config/connection');
const { ObjectId } = require('mongodb');

const COLLECTION_SALES_NAME = 'sales';

const add = async (itensSold) =>
  connect().then(async (db) => {
    const newItensSold = await db.collection(COLLECTION_SALES_NAME)
      .insertOne({ itensSold });
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

const update = (id, itensSold) => 
  connect().then(async (db) => {
    try {
      const { modifiedCount } =  await db.collection(COLLECTION_SALES_NAME).updateOne(
        { _id: ObjectId(id) },
        { $set: { itensSold } },
      );
      if (modifiedCount) {
        return {
          _id: id,
          itensSold,
        };
      }
      return null;
    } catch(error) {
      return null;
    }
  });

const del = (id) => 
  connect().then(async (db) => {
    try {
      const { deletedCount } =  await db.collection(COLLECTION_SALES_NAME)
        .deleteOne({ _id: ObjectId(id) });
      if (deletedCount) {
        return id;
      }
    } catch(error) {
      return null;
    }
  });


module.exports = {
  add,
  findById,
  findAll,
  update,
  del,
};