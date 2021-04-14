const connect = require('../config/connection');

function addItem(name, quantity) {
  connect().then( (db) => {
    const productList = db.collection('products').insertOne({ name, quantity });
    return {_id: productList.insertedId, name, quantity, };
  });
}

function findItemByName (name) {
  connect().then(async (db) => {
    return await db.collection('products').findOne({ 'name': name });
  });
}

module.exports = {
  addItem,
  findItemByName
};