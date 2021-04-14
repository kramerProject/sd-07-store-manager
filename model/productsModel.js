const connect = require('../config/connection');
const ObjectId = require('mongodb').ObjectId;

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
    return result;
  });
}

async function modelGetAll() {
  return await connect().then((db) => {
    return db.collection('products').find({}).toArray();
  });
}

async function modelGetById(id) {
  return connect().then((db) => {
    try {
      return db.collection('products').findOne(ObjectId(id));
    } catch (err) {
      return false;
    }
  });
}
async function updateById(id, name, quantity) {
  return connect().then((db) => {
    try {
      const item = db.collection('products').updateOne({_id: ObjectId(id)}, {
        $set: {
          name,
          quantity,
        }
      });;
      return {_id: item.upsertedId, name, quantity};
    } catch (err) {
      return false;
    }
  });
}
module.exports = {
  addItem,
  findItemByName,
  modelGetAll,
  modelGetById,
  updateById
};