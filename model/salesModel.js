const connect = require('../config/connection');
const ObjectId = require('mongodb').ObjectId;

async function modelAddToSales (salesList) {
  return await connect().then(async (db) => {
    const result =  await db.collection('sales').insertOne({
      '_id': ObjectId(), 
      'itensSold': salesList
    });
    return result.ops[0];
  });
}

module.exports = {
  modelAddToSales
};