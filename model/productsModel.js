const connect = require('../config/connection');

function addItem(name, quantity) {
  connect().then(async (db) => {
    const productList = await db.collection('products').insertOne({ name, quantity });
    return { _id: productList.insertedId, name, quantity };
  });
}

module.exports = {
  addItem
};