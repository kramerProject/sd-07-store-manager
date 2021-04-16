const connect = require('../config/connection');
const ObjectId = require('mongodb').ObjectId;
const zero = 0;

async function callDatabase (id, dataBase) {
  return await connect().then(async (db) => {
    try {
      return db.collection('sales').findOne({ _id: ObjectId(id) });
    } catch (error) {
      return false;
    };
  });
}
async function modelAddToSales(salesList) {
  return await connect().then(async (db) => {
    const result = await db.collection('sales').insertOne({
      '_id': ObjectId(),
      'itensSold': salesList
    });
    return result.ops[0];
  });
}

async function modelGetAllSales() {
  return await connect().then((db) => {
    return db.collection('sales').find({}).toArray();
  });
}

async function modelGetSalesById(id) {
  return callDatabase(id, 'sales');
}

async function modelUpdateSalesById(salesId, productList) {
  return connect().then((db) => {
    try {
      db.collection('sales').updateOne({ _id: ObjectId(salesId) }, {
        $set: { itensSold: productList }
      });
      return {
        _id: salesId, itensSold: productList
      };
    } catch (err) {
      return false;
    }
  });
}

async function modelDeleteSalesById(id) {
  const searchedItem = await connect().then(async (db) => {
    try {
      return db.collection('sales').findOne({ _id: ObjectId(id) });
    } catch (err) {
      return false;
    };
  });

  if (searchedItem) {
    connect().then(async (db) => {
      db.collection('sales').deleteOne({ _id: ObjectId(id) });
    });
    return searchedItem;
  }
  return false;
}

async function modelUpdateProductQuantity({ productId, quantity }, addOrDelete) {
  const searchedItem = await connect().then(async (db) => {
    try {
      return db.collection('products').findOne({ _id: ObjectId(productId) });
    } catch (err) {
      return false;
    };
  });

  if (searchedItem) {
    let newValue;
    if (addOrDelete === 'addSales') {
      newValue = searchedItem.quantity - quantity;
    } else {
      newValue = searchedItem.quantity + quantity;
    }
    if (newValue < zero) return false;
    await connect().then(async (db) => {
      db.collection('products').updateOne({ _id: ObjectId(productId) }, {
        $set: { quantity: newValue }
      });
    });
  };
  return true;
}
async function modelFindListById(id) {
  const item = await callDatabase(id, 'sales');
  return item.itensSold;
}

module.exports = {
  modelAddToSales,
  modelGetAllSales,
  modelGetSalesById,
  modelUpdateSalesById,
  modelDeleteSalesById,
  modelUpdateProductQuantity,
  modelFindListById
};