const connect = require('../config/connect');
const { ObjectId } = require('mongodb'); 

const add = async (name, quantity) =>{
  return connect().then(async (db) => {
    const product = await db.collection('products').insertOne({ name, quantity });

    return product.ops[0];
  });
};

const getProductByName = async (name) => {
  return await connect().then((db) => db.collection('products').findOne({name}));
};

const getAllProduct = async () => {
  return await connect().then((db) => db.collection('products').find().toArray());
};

const getProductById = async (id) => {
  if (!ObjectId.isValid(id)) throw { code: 'invalid_data', message: 'Wrong id format' };
  return await connect().then((db) => db.collection('products').findOne(ObjectId(id)));
};

module.exports = {
  add,
  getAllProduct,
  getProductById,
  getProductByName,
};