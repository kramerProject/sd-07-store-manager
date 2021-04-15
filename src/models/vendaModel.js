const connection = require('../config/conn');
const { ObjectId } = require('mongodb');

const { getById } = require('./produtoModel');

const getAllSale = async () => {
  const sales = await connection().then((db) =>
    db.collection('sales').find().toArray());
  return sales;
};

const getByIdSale = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const sale = await connection().then((db) =>
    db.collection('sales').findOne(ObjectId(id)));

  return sale;
};

const validId = async (newSales) => {
  let flag = false;
  for await (const contents of newSales.map(({ productId }) => getById(productId))) {
    if (!contents) {
      flag = true;
    }
  }
  return flag;
};

const createSale = async (newSales) => {
  const sale = await connection().then((db) =>
    db.collection('sales').insertOne({ itensSold: newSales }));

  return { _id: sale.insertedId, itensSold: newSales };
};

const updateSale = async (id, newSales) => {
  const sale = await connection().then((db) => {
    db.collection('sales')
      .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: newSales } });
  });
  return { _id: id, itensSold: newSales };
};
const deleteByIdSale = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const sale = await connection().then((db) =>
    db.collection('sales').deleteOne({ _id: ObjectId(id) }));
  return sale;
};

module.exports = {
  validId,
  createSale,
  getAllSale,
  getByIdSale,
  updateSale,
  deleteByIdSale
};