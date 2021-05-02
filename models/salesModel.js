const connection = require('../config/conn');
const { ObjectId } = require('mongodb');

const createSalesModel = async(salesArrayOfItens) => {
  const db = await connection();
  const product = await db
    .collection('sales')
    .insertOne({ itensSold: [...salesArrayOfItens] });
  return product.ops[0];
};

const getAllSalesModel = async() => {
  const db = await connection();
  return await db.collection('sales').find().toArray();
};

const getSaleByIdModel = async(id) => {
  if(!ObjectId.isValid(id)) return false;
  const db = await connection();
  return db.collection('sales').findOne(ObjectId(id));
};

module.exports = {
  createSalesModel,
  getAllSalesModel,
  getSaleByIdModel,
};
