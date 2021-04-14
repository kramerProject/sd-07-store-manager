const connect = require('../../config/connection');
const { ObjectId } = require('mongodb');


const add = async (name, quantity) =>
  connect().then(async (db) => {
    const product = await db.collection('products').insertOne({ name, quantity });
    return product.ops[0];
  });

const findByName = async (name) =>
  connect().then(async (db) => {
    const product = await db.collection('products').findOne({ name });
    return product;
  });

const findById = (id) => 
  connect().then(async (db) => {
    try {
      const product =  await db.collection('products').findOne(ObjectId(id));
      return product;
    } catch(error) {
      return null;
    }
    
  });
  
const findAll = () => 
  connect().then(async (db) => {
    const products =  await db.collection('products').find().toArray();
    return products;
  });



module.exports = {
  add,
  findByName,
  findById,
  findAll,
};
