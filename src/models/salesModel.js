const { connection } = require('../../configs');
const { ObjectId } = require('mongodb');

const creatSale = async (saleInfos) => {
  connection().then((db) => db.collection('sales')
    .insertOne({ itensSold: saleInfos }));
};

const updateSale = async (id, saleInfos) => {
  connection().then((db) => db.collection('sales')
    .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: saleInfos } }));
};

const deleteSale = async (id) => {
  connection().then((db) => db.collection('sales')
    .deleteOne({ _id: ObjectId(id) }));
};

const getAllSales = async () => {
  connection().then((db) => db.collection('sales')
    .find().toArray());
};

const getSaleById = async (id) => {
  connection().then((db) => db.collection('sales')
    .findOne(ObjectId(id)).toArray());
};

module.exports = {
  creatSale,
  updateSale,
  deleteSale,
  getAllSales,
  getSaleById,
};
