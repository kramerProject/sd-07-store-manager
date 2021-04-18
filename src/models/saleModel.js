const connection = require('../../config/connection');
const { ObjectId } = require('mongodb');

const getAllSales = async () =>
  connection()
    .then((db) =>
      db.collection('sales')
        .find().toArray());

const createSale = async (sold) => {
  const sale = await connection()
    .then((db) =>
      db.collection('sales')
        .insertOne({ itensSold: sold })
    );
  return { _id: sale.insertedId, itensSold: sold };
};

module.exports = {
  getAllSales,
  createSale,
};