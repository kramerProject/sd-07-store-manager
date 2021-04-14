const conn = require('../config/conn');
const { ObjectId } = require('mongodb');

const addSale = async (products) => conn()
  .then(async (db) => {
    const sale = await db.collection('sales').insertOne({itensSold: products});
    return sale.ops[0];
  });

const getAllSales = async () => conn()
  .then((db) => db.collection('sales').find().toArray());

const getSaleById = async (id) => conn()
  .then((db) => db.collection('sales').findOne({_id: ObjectId(id)}));

const updateSale = async (id, products) => conn()
  .then(async (db) => {
    await db.collection('sales').updateOne(
      { _id: ObjectId(id) },
      { $set: {itensSold: products}}
    );
    return ({ _id: id, itensSold: products });
  });

const deleteSale = async (id) => conn()
  .then(async (db) => {
    const deletedSale = await getSaleById(id);
    await db.collection('sales').deleteOne({_id: ObjectId(id)});
    return deletedSale;
  });

module.exports = {
  addSale,
  getSaleById,
  getAllSales,
  updateSale,
  deleteSale,
};