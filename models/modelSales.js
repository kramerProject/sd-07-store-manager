const connect = require('../config/conn');
const { ObjectId } = require('mongodb');

const addSale = async (body) => {
  const sale = await connect().then((db) =>
    db.collection('sales').insertOne({ itensSold: body }));
  return sale.ops[0];
};

const getSales = async () => {
  const allSales = await connect().then((db) => db.collection('sales').find().toArray());
  return allSales;
};

const getSaleById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connect().then((db) => db.collection('sales').findOne(ObjectId(id)));
};

const updateSale = async (id, itensSold) => {
  return connect().then(async (db) => {
    const saleUpdate = await db
      .collection('sales')
      .updateOne(
        { _id: ObjectId(id) },
        { $set: { itensSold } });
    return { _id: id, itensSold };
  });
};

const deleteSale = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const deletedSale = await connect()
    .then(async (db) => db.collection('sales').deleteOne({ _id: ObjectId(id) }));
  return deletedSale;
};

module.exports = {
  addSale,
  getSales,
  getSaleById,
  updateSale,
  deleteSale
};
