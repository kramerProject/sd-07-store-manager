const connect = require('../config/connection');
const { ObjectId } = require('mongodb');

const getAllSales = async () => {
  const allSales = await connect()
    .then((db) => db.collection('sales').find().toArray());
  return { sales: allSales };
};

const findSaleById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const sale = await connect()
    .then((db) => db.collection('sales').findOne(ObjectId(id)));
  return sale;
};

const create = async (itensSold) => {
  const addProduct = await connect()
    .then(db => db.collection('sales')
      .insertOne({ itensSold })
    );
  return addProduct.ops[0];
};

module.exports = { create, getAllSales, findSaleById };

