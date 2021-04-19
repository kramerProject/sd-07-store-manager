const connection = require('./connection');
const { ObjectId } = require('mongodb');

const salesRegistration = async (sale) => {
  const result = await connection().then((db) => 
    db.collection('products').insertOne({ itensSold: sale }));
  return result.ops[0];
};

module.exports = {
  salesRegistration
};