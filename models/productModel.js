const connect = require('../config/connection');

const register = async (name, quantity) =>
  connect().then(async (db) => { 
    const products = await db.collection('products').insertOne({ name, quantity });

    return {_id: products.insertedId, name, quantity };
  });
   
module.exports = {
  register
};

