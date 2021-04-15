const connection = require('../config/conn');
const { ObjectId } = require('mongodb');

const{ getById } = require('./produtoModel');


const validId = async (newSales) => {
  let flag = false;
  for await (const contents of newSales.map(({productId}) => getById (productId))) {
    if (!contents) {
      flag = true;
    }
  }
  return flag;
};

const createSale = async (newSales) => {
  const sale = await connection().then((db) =>
    db.collection('sales').insertOne({itensSold: newSales}));

  return { _id: sale.insertedId, itensSold: newSales };
};

module.exports = {
  validId,
  createSale
};
/*
const createProduct = async (name, quantity) => {
  const product = await connection().then((db) =>
    db.collection('products').insertOne({ name, quantity })
  );
  return { _id: product.insertedId, name, quantity };
};

itensSold": [
    {
      "productId": "5f43ba273200020b101fe49f",
      "quantity": 2
*/