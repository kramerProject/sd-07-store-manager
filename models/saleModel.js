const connection = require('../config/connection');
const { ObjectId } = require('mongodb');

const registerSale = async (sales) => {
  const { insertedId } = await connection().then((db) => 
    db.collection('sales').insertOne({ itensSold: sales }));
  return {
    _id: insertedId,
    itensSold: sales,
  };
};

const getAll = async () => {
  return await connection().then((db) =>
    db.collection('sales').find().toArray());
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return await connection().then((db) => 
    db.collection('sales').findOne(ObjectId(id)));
};

const removeSale = async (id) => {
  return await connection().then((db) => 
    db.collection('sales').deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  registerSale,
  getAll,
  getById,
  removeSale,
};
