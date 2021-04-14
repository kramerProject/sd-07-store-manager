const connect = require('../config/connection');

function addItem(name, quantity) {
  connect().then( (db) => {
    const productList = db.collection('products').insertOne({ name, quantity });
    return productList.ops[0];
  });
}

module.exports = {
  addItem
};