const connect = require('../config/conn');
const { ObjectId } = require('mongodb');

const getProductById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connect().then((db) => db.collection('products').findOne(ObjectId(id)));
};

const updateProductById = async (id, name, quantity) => {
  return connect().then(async (db) => {
    await db
      .collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
    return { _id: id, name, quantity };
  });
};

module.exports = {
  getProductById,
  updateProductById
};
