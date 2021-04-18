const connection = require('../../config/connection');
const { ObjectId } = require('mongodb');

const createSale = async (sold) => {
  const sale = await connection()
    .then((db) =>
      db.collection('sales')
        .insertOne({ itensSold: sold })
    );
  return { _id: sale.insertedId, itensSold: sold };
};

const getAllSales = async () =>
  connection()
    .then((db) =>
      db.collection('sales')
        .find().toArray());

const getSaleById = async (id) =>
  connection()
    .then((db) =>
      db.collection('sales')
        .findOne({ _id: ObjectId(id)}));

module.exports = {
  getAllSales,
  createSale,
  getSaleById,
};