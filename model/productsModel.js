const connect = require('../config/connection');

async function addItem(name, quantity) {
  return connect().then(async (db) => {
    const productList = await db.collection('products').insertOne({ name, quantity });
    return {
      _id: productList.insertedId,
      name,
      quantity,
    };
  });
}

async function findItemByName(name) {
  return await connect().then(async (db) => {
    const result = await db.collection('products').findOne({ 'name': name });
    console.log(result);
    return result;
  });
}

module.exports = {
  addItem,
  findItemByName
};