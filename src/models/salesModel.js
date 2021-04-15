const connect = require('../config/connection');
const { ObjectId } = require('mongodb');

// const getProductById = async (id) => {
//   const db = await connect();
//   return db.collection('products').findOne(ObjectId(id));
// };

const addNewSale = async (salesArray) => {
  const db = await connect();
  return db.collection('sales').insertOne({ itensSold: salesArray });
};

module.exports = {
  // getProductById,
  addNewSale,
};
