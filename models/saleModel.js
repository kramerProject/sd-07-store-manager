const connect = require('../config/connection');
const { ObjectId } = require('mongodb');

const register = async (sale) =>
  connect().then(async (db) => { 
    const sales = await db.collection('sales').insertOne({ sale });
    return {_id: sales.insertedId, 'itensSold': sale };
  });


const getAllSales = async () => {
  return await connect().then((db) => db.collection('sales').find().toArray());
};

const getProductsById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
    
  return connect().then((db) => db.collection('products').findOne(ObjectId(id)));
};

module.exports = {
  register,
  getAllSales,
  getProductsById
};