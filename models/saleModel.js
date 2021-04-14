const connect = require('../config/connection');
const { ObjectId } = require('mongodb');

const getAllSales = async () => 
  connect().then((db) => db.collection('sales').find().toArray());

const getProductsById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
    
  return connect().then((db) => db.collection('products').findOne(ObjectId(id)));
};

module.exports = {
  getAllSales,
  getProductsById
};