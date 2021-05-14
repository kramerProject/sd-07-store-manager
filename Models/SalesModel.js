const connect = require('../config/conn');
const { ObjectId } = require('mongodb');

const addSale = async (body) => {
  const result = await connect().then((db) =>
    db.collection('sales').insertOne({ itensSold: body }));
  return result.ops[0];
};

const getAllSales = async () => {
  const result = await connect().then((db) => db.collection('sales').find().toArray());
  return result;
};

const getSaleById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connect().then((db) => db.collection('sales').findOne(ObjectId(id)));
};

const updateSaleById = async (id, itensSold) => {
  return connect().then(async (db) => {
    await db
      .collection('sales')
      .updateOne(
        { _id: ObjectId(id) },
        { $set: { itensSold } });
    return { _id: id, itensSold };
  });
};

const deleteSaleById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const result = await connect()
    .then(async (db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }));
  return result;
};

module.exports = {
  addSale,
  getAllSales,
  getSaleById,
  updateSaleById,
  deleteSaleById
};
