const { ObjectId } = require('mongodb');
const conn = require('../config/conn');

const addNewSale = async (sale) => {
  return await conn().then((db) =>
    db.collection('sales')
      .insertOne({ itensSold: sale })
      .then((result) => ({ _id: result.insertedId,
        itensSold: sale })));
};

const findSale = async (name) => {
  return await conn().then((db) =>
    db.collection('sales').findOne({ name }));
};

const findAllSales = async () => {
  return await conn().then((db) =>
    db.collection('sales').find().toArray());
};

const findSaleById = async (id) => {
  if (!ObjectId.isValid(id)) throw new Error;
  return await conn().then((db) =>
    db.collection('sales').findOne(ObjectId(id)));
};

const updateSale = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) throw new Error;
  return await conn().then((db) =>
    db.collection('sales').updateOne({ _id: ObjectId(id) },
      { $set: { name, quantity } })
      .then(() => ({ _id: ObjectId(id), name, quantity })));
};

const deleteSale = async (id) => {
  if (!ObjectId.isValid(id)) throw new Error;
  return await conn().then((db) =>
    db.collection('sales').deleteOne({ _id: ObjectId(id) }))
    .then(() => findSalesById(id));
};

module.exports = {
  addNewSale,
  findSale,
  findAllSales,
  findSaleById,
  updateSale,
  deleteSale,
};
