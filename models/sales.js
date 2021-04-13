const connection = require('./connection');
const { ObjectId } = require('mongodb');

const getDbCollection = async (db) => {
  return connection()
    .then((db) => db.collection('sales'));
};

const getSales = async () => {
  return getDbCollection()
    .then((collection) => collection.find().toArray());
};

const getSaleById = async (id) => {
  return getDbCollection()
    .then((collection) => collection.findOne(ObjectId(id)));
};

const registerSales = async (itensSold) => {
  return getDbCollection()
    .then((collection) => collection.insertOne({ itensSold }));
};

const updateSale = async (_id, itensSold) => {
  return getDbCollection()
    .then((collection) => collection.updateOne(
      { _id: ObjectId(_id) },
      { $set: { itensSold } }
    ));
};

const deleteSale = async (id) => {
  return getDbCollection()
    .then((collection) => collection.deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  registerSales,
  getSales,
  getSaleById,
  deleteSale,
  updateSale
};
