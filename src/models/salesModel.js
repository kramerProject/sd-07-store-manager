const { connection } = require('../../configs');
const { ObjectId } = require('mongodb');

const creatSale = async (saleInfos) => {
  const createdSale = await connection().then((db) => db.collection('sales')
    .insertOne({ itensSold: saleInfos }));
  return createdSale.ops[0];
};

const updateSale = async (id, saleInfos) => {
  await connection().then((db) => db.collection('sales')
    .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: saleInfos } }));
  const updatedSale = await getSaleById(id);
  console.log(updatedSale);
  return updatedSale;
};

const deleteSale = async (id) => {
  const deletedSale = await connection().then((db) => db.collection('sales')
    .deleteOne({ _id: ObjectId(id) }));
  return deletedSale;
};

const getAllSales = async () => {
  const listedSale = await connection().then((db) => db.collection('sales')
    .find().toArray());
  return listedSale;
};

const getSaleById = async (id) => {
  const foundSale = await connection().then((db) => db.collection('sales')
    .findOne({ _id: ObjectId(id)}));
  return foundSale;
};

module.exports = {
  creatSale,
  updateSale,
  deleteSale,
  getAllSales,
  getSaleById,
};
