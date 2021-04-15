const connect = require('../config/connection');
const ObjectId = require('mongodb').ObjectId;

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
  return connect().then((db) => {
    try {
      return db.collection('sales').findOne(ObjectId(id));
    } catch (err) {
      return false;
    }
  });
}

async function modelUpdateSalesById(salesId, productId, quantity) {
  return connect().then((db) => {
    try {
      const item = db.collection('sales').updateOne({ _id: ObjectId(salesId) }, {
        $push: {
          itensSold: { productId, quantity, }
        }
      });;
      return { _id: salesId, itensSold: [
        {productId, quantity,}
      ] };
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

module.exports = {
  modelAddToSales,
  modelGetAllSales,
  modelGetSalesById,
  modelUpdateSalesById,
  modelDeleteSalesById
};