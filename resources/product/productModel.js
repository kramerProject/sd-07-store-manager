const connect = require('../../config/connection');
const { ObjectId } = require('mongodb');

const COLLECTION_PRODUCTS_NAME = 'products';

const add = async (name, quantity) =>
  connect().then(async (db) => {
    const product = await db.collection(COLLECTION_PRODUCTS_NAME)
      .insertOne({ name, quantity });
    return product.ops[0];
  });

const findByName = async (name) =>
  connect().then(async (db) => {
    const product = await db.collection(COLLECTION_PRODUCTS_NAME).findOne({ name });
    return product;
  });

const findById = (id) => 
  connect().then(async (db) => {
    try {
      const product =  await db.collection(COLLECTION_PRODUCTS_NAME)
        .findOne(ObjectId(id));
      return product;
    } catch(error) {
      return null;
    }
    
  });
  
const findAll = () => 
  connect().then(async (db) => {
    const products =  await db.collection(COLLECTION_PRODUCTS_NAME).find().toArray();
    return products;
  });

const update = (id, name, quantity) => 
  connect().then(async (db) => {
    const { modifiedCount } =  await db.collection(COLLECTION_PRODUCTS_NAME).updateOne(
      { _id: ObjectId(id) },
      { $set: { name, quantity } },
    );
    if (modifiedCount) {
      return {
        _id: id,
        name,
        quantity
      };
    }
    return null;
  });

const del = (id) => 
  connect().then(async (db) => {
    const { deletedCount } =  await db.collection(COLLECTION_PRODUCTS_NAME)
      .deleteOne({ _id: ObjectId(id) });
    if (deletedCount) {
      return id;
    }
    return null;
  });


module.exports = {
  add,
  findByName,
  findById,
  findAll,
  update,
  del,
};
